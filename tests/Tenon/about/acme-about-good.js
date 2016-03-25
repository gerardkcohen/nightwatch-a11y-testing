
module.exports = {
  '@tags': ['good'],
  'Load About Page' : function (client) {
    client
      .url('http://fyvr.net/acme/content-good.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header > h1', 'About Acme');
  },

  'Validate HTML': function (client) {
    client
      .validator();
  },

  'Check Tenon a11y': function (client) {
    client
      .tenonCheck();
  },

  after : function(client) {
    client.end();
  }
};
