/*jshint esversion: 6 */

const resemble = require('node-resemble-js');
const util = require('util');

exports.assertion = function(before, after, expected) {

  /**
   * The message which will be used in the test output and
   * inside the XML reports
   * @type {string}
   */
  this.message = 'CSS bookmarklets passed!';

  /**
   * A value to perform the assertion on. If a function is
   * defined, its result will be used.
   * @type {function|*}
   */
  this.expected = expected || '0.00';

  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   * @type {function}
   */
  this.pass = function(value) {
    return value === this.expected;
  };

  this.failure = function (result) {
    var failed = result === false;
    if (!failed) {
      this.message = util.format('CSS bookmarklets failed! Expected %s but instead got %s', this.expected, result);
    }
    return failed;
  };

  /**
   * The method which returns the value to be used on the
   * assertion. It is called with the result of the command's
   * callback as argument.
   * @type {function}
   */
  this.value = function(result) {
    return result;
  };

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   */
  this.command = function(callback) {
    resemble(before)
      .compareTo(after)
      .onComplete(function (data) {
        callback.call(this, data.misMatchPercentage);
      });

    return this;
  };

};
