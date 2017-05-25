class RSSPlus {
  constructor(app) {
    this.app = app;
    this.feeds = new Set();
  }

  async initialize() {
    const rssConfig = await this.readConfigFile();
    for (const rss of rssConfig.rss) {
      const {url, name, interval} = rss;
      const rs = new RSS(this.app, {url, name, interval});
      this.feeds.add(rs);
      rs.start();
    }
  }

  async readConfigFile() {
    const response = await fetch("config.json");
    return await response.json();
  }
}
