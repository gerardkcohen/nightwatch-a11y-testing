/*jshint esversion: 6 */

const util = require('util');

exports.assertion = function(context, config) {

  const FAILURE_MSG = ' Issue: %s\n Target: (%s)\n Impact: %s,\n Type: %s,\n Help: %s \n';
  const PASS_MSG = '%d aXe a11y tests passed';

  /**
   * The message which will be used in the test output and
   * inside the XML reports
   * @type {string}
   */
  this.message = null;

  /**
   * Cached results
   * inside the XML reports
   * @type {object|string}
   */
  this.results = null;

  /**
   * A value to perform the assertion on. If a function is
   * defined, its result will be used.
   * @type {function|*}
   */
  this.expected = null;

  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   *
   * Some hackiness in here to get legible logging
   * @type {function}
   */
  this.pass = function(value) {

    var passed = !this.results.violations.length;

    if (passed) {
      this.message = util.format(PASS_MSG, this.results.passes.length);
    } else {
      var violation = this.results.violations[0];
      var node = violation.nodes[0];
      this.expected = violation.help;
      this.message = util.format(FAILURE_MSG, node.any[0].message, node.target, violation.impact, violation.id, violation.helpUrl);
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
    var value = this.results = result.value;

    if (value.violations.length) {// we got errors
        return value.violations[0].nodes[0].any[0].message;
    }
    return result.value;
  };

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   */
  this.command = function(callback) {
    this.api.executeAsync(function (context, config, done) {
      axe.a11yCheck((context == 'document') ? document : context, config, function (result) {
        done(result);
      });
    }, [context, config], function (result) {
        callback.call(this, result);
    });

    return this;
  };

};
