/*jshint esversion: 6 */

module.exports = {
  '@tags': ['bad'],
  'Load About Page' : function (client) {

    const urls = client.globals.urls;

    client
      .url(urls.base + urls.bad.about)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header > h1', 'About Acme - The Bad Version');
  },

  'Validate HTML': function (client) {
    client
      .validator();
  },

  'Check Tenon a11y': function (client) {
    client
      .tenonCheck();
  },

  'Run bookmarklets': function (client) {
    client
      .resemble();
  },

  after : function(client) {
    client.end();
  }

};
