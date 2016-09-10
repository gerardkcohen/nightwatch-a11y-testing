/*jshint esversion: 6 */

const resemble = require('node-resemble-js');

exports.command = function (expected) {

  const client = this;

  var
    imgPath = client.globals.visualDirectory + client.options.desiredCapabilities.browserName + '/' + client.currentTest.module,
    before = imgPath + '.png',
    after = imgPath + '-after.png';

  client
    .saveScreenshot(before)
    .bookmarklets()
    .saveScreenshot(after)
    .pause(500)
    .verify.resemble(before, after, expected);

  return this;
};
