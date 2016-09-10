/*jshint esversion: 6 */

module.exports = {
  '@tags': ['bad'],
  'Load Product Page' : function (client) {

    const urls = client.globals.urls;

    client
      .url(urls.base + urls.bad.products)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header > h1', 'Acme Widgets');
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
