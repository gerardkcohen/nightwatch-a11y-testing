
module.exports = {
  '@tags': ['bad'],
  'Load About Page' : function (client) {
    client
      .url('http://fyvr.net/acme/content-bad.html')
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

  after : function(client) {
    client.end();
  }

};
