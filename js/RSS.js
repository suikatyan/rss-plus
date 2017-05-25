class RSS {
  constructor(app, config) {
    RSS.MAX_ITEMS = 50;

    this.name = config.name;
    this.url = config.url;
    this.interval = config.interval;
    this.app = app;

    this.items = [];
    this.isInitialized = false;

    this.start();
  }

  start() {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    this.execute_();
  }

  async execute_() {
    const response = await fetch(this.url);
    const xml = await response.text();
    this.onUpdate_();
    for (const item of this.convert_(xml)) {
      if (this.items.indexOf(item.url) > -1) {
        continue;
      }

      this.items.push(item.url);
      if (this.items.length > RSS.MAX_ITEMS) {
        this.hide_(this.items.shift());
      }

      this.show_(item);
    }

    setTimeout(() => {
      this.execute_();
    }, this.interval * 1000);
  }

  convert_(content) {
    let items = [];
    for (let item of Array.from($(content).find("item, entry"))) {
      item = $(item);
      let url = item.find("link").attr("href");
      if (!url) {
        url = item.html().match(/<link>(http.+)/);
        url = url ? url[1] : this.url;
      }

      let update = item.find("updated").text();
      if (!update) {
        update = item.html().match(/<dc:date>([^<]+)/);
        update = update[1];
      }
      update = update ? new Date(update) : new Date();

      const title = item.find("title").text();
      items.push({url, title, update});
    }

    return items;
  }

  show_(item) {
    this.app.ui.append(item.title, item.url, item.update, this.name);
  }

  hide_(url) {
    this.app.ui.remove(url);
  }

  onUpdate_() {
    this.app.ui.onUpdate();
  }
}
