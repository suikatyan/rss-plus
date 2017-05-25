$(() => {
  const app = {};
  app.ui = new UI();

  const rssPlus = new RSSPlus(app);
  rssPlus.initialize();
});
