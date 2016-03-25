/*jshint esversion: 6 */

const util = require('util');

exports.command = function (context, config, callback) {

  const FAILURE_MSG = '%s issue: %s\n Description: %s \n Target: (%s)\n Type: %s,\n Help: %s \n';
  const PASS_MSG = '%d aXe a11y tests passed';

  this.executeAsync(function(context, config, done) {
    axe.a11yCheck((context == 'document') ? document : context, config, function (result) {
      done(result);
    });
  }, [context, config], function (results) {
    var value = results.value;
    var violations = value.violations;
    var passes = value.passes;

    if (violations.length) { // we got failures
      violations.forEach(function (violation) {
        violation.nodes.forEach(function (node) {
          var check = node.any[0] || node.none[0] || node.all[0];

          this.verify.fail(check.message, violation.help, util.format(FAILURE_MSG, node.impact, check.message, violation.description, node.target, violation.id, violation.helpUrl));
        }, this);
      }, this);
    } else {
      this.assert.ok(true, util.format(PASS_MSG, passes.length));
    }

  });

  return this;
};
