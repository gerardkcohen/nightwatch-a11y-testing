/*jshint esversion: 6 */

module.exports = {
  '@tags': ['bad'],
  'Load Apply Page' : function (client) {
    client
      .url('http://fyvr.net/acme/apply-bad.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header > h1', 'Join the Acme Widgets Team');
  },

  'Validate HTML': function (client) {
    client
      .validator();
  },

  'Check Tab Order': function(client) {
    const TAB = client.Keys.TAB;

    for(var i = 0; i < 9; i++) {
      client.keys([TAB]);
    }

    client
      .assert.isFocused('id', 'f', 'First name field should be focused.')
      .keys([TAB])
      .assert.isFocused('id', 'l', 'Last name field should be focused.')
      .keys([TAB])
      .assert.isFocused('id', 't', 'Telephone field should be focused.')
      .keys([TAB])
      .assert.isFocused('id', 'e', 'Email field should be focused.');
  },

  'Check Tenon a11y': function (client) {
    client
      .tenonCheck();
  },

  'Submit Form': function (client) {
    client
      .setValue('input[id="f"]', 'Jane')
      .setValue('input[id="l"]', 'Doe')
      .setValue('input[id="t"]', '888-888-8888')
      .setValue('input[id="e"]', 'jane@doe.com')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.title('Thnank you for applying | Acme Widgets');
  },

  'Validate Apply Response HTML': function (client) {
    client
      .validator();
  },

  'Check Response Tenon a11y': function (client) {
    client
      .tenonCheck();
  },

  after : function(client) {
    client.end();
  }
};
