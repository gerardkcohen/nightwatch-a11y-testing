/*jshint esversion: 6 */

const exec = require('child_process').exec;
const path = require('path');
const util = require('util');

exports.command = function (callback) {

  const SUCCESS_MSG = 'Document checking completed. No errors found.';
  const self = this;

  var source;

  self
  .source(function (results) {
    source = results.value.trim();
  })
  .perform(function (client, done) {
    var cmd = util.format("echo '%s' | java -jar %s --format text -",source.replace("'", '&apos;'), path.resolve('./node_modules/gulp-html/vnu/vnu.jar'));
    exec(cmd, function (error, stdout, stderr) {
      var results = stderr.trim();
      if (results === SUCCESS_MSG) {
        self.assert.ok(true, SUCCESS_MSG);
      } else {
        results = results.split("\n").slice(0, -1);
        while (results.length) {
          self.verify.fail(null, null, results.splice(0, 2).join(' '));
        }
      }
      done();
    });
  });

  return this;
};
