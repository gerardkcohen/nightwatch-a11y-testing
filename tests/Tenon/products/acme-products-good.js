
module.exports = {
  '@tags': ['good'],
  'Load Product Page' : function (client) {
    client
      .url('http://fyvr.net/acme/data-good.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header > h1', 'Acme Widgets');
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
