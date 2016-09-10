/*jshint esversion: 6 */

module.exports = {
  '@tags': ['good'],
  'Load About Page' : function (client) {

    const urls = client.globals.urls;

    client
      .url(urls.base + urls.good.about)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header > h1', 'About Acme');
  },

  'Validate HTML': function (client) {
    client
      .validator();
  },

  'Check aXe a11y': function (client) {
    client
      .injectAxe()
      .aXeCheck('document');
  },

  'Run bookmarklets': function (client) {
    client
      .resemble();
  },

  after : function(client) {
    client.end();
  }
};
