/*jshint esversion: 6 */

const path = require('path');

module.exports = {
  '@tags': ['good'],
  'Load Product Page' : function (client) {

    const urls = client.globals.urls;

    client
      .url(urls.base + urls.good.products)
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

  after : function(client) {
    client.end();
  }
};
