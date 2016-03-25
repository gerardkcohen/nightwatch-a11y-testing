/*jshint esversion: 6 */

exports.assertion = function(attribute, value, msg) {

  /**
   * The message which will be used in the test output and
   * inside the XML reports
   * @type {string}
   */
  this.message = msg || 'Element is focused';

  /**
   * A value to perform the assertion on. If a function is
   * defined, its result will be used.
   * @type {function|*}
   */
  this.expected = value;

  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   * @type {function}
   */
  this.pass = function(result) {
    return result === this.expected;
  };

  /**
   * The method which returns the value to be used on the
   * assertion. It is called with the result of the command's
   * callback as argument.
   * @type {function}
   */
  this.value = function(result) {
    return result.value;
  };

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   */
  this.command = function(callback) {
    const client = this.api;

    client.elementActive(function (result) {
      client.elementIdAttribute(result.value.ELEMENT, attribute, function (element) {
        callback.call(this, element);
      });
    });

    return this;
  };

};
