/*jshint esversion: 6 */

const exec = require('child_process').exec;
const path = require('path');
const util = require('util');

exports.assertion = function() {

  /**
   * The message which will be used in the test output and
   * inside the XML reports
   * @type {string}
   */
  this.message = 'Document checking completed. No errors found.';

  /**
   * Cached results
   * inside the XML reports
   * @type {object|string}
   */
  this.results = '';

  /**
   * A value to perform the assertion on. If a function is
   * defined, its result will be used.
   * @type {function|*}
   */
  this.expected = '0 validation error/ warnings found';

  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   * @type {function}
   */
  this.pass = function(value) { // results
    var passed = (value === this.message);

    if (!passed) {
      this.message = util.format('%d errors found.\n%s\n', this.results.split("\n").slice(0, -1).length/2,this.results);
    }

    return passed;
  };

  /**
   * The method which returns the value to be used on the
   * assertion. It is called with the result of the command's
   * callback as argument.
   *
   * Some hackiness in here to get legible logging
   * @type {function}
   */
  this.value = function(result) {
    this.results = result.trim();
    if (this.results !== this.message) {// we got errors
      return util.format('%d validation error/ warnings found', this.results.split("\n").slice(0, -1).length/2);
    }
    return this.results;
  };

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   */
  this.command = function(callback) {
    this.api
      .source(function (res) {
        var cmd = util.format("echo '%s' | java -jar %s --format text -",res.value.replace("'", '&apos;'), path.resolve('./node_modules/gulp-html/vnu/vnu.jar'));
        exec(cmd, function (error, stdout, stderr) {
          callback.call(this, stderr);
        });
      });

    return this;
  };

};
