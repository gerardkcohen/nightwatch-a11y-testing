/*jshint esversion: 6 */

const util = require('util');
var tenon = require('tenon-node');

exports.command = function() {

  "use strict";

  const FAILURE_MSG = '%s\n Description: %s\n Location: Line %d, Column %d\n Help: %s \n';
  const PASS_MSG = '%d Tenon a11y tests passed';
  const BP_URL = 'https://tenon.io/bestpractice.php?tID%d&bpID=%d';
  const self = this;

  var source;

  self
    .source(function(results) {
      source = results.value.trim();
    })
    .perform(function(client, done) {
      let tenonTest = new tenon({
        key: 'GET YOUR TENON API!!!'
      });

      tenonTest.checkSrc(source, {
        projectID: 'Nightwatch Demo',
        store: 0,
        appID: 'Acme',
        ref: 1,
      }, function (err, results) {
        if (err) {
          self.verify.fail(null, null, util.format('Error with request: %s', err));
        } else {
          if (results.resultSet.length) {// errors
              results.resultSet.forEach(function (violation) {
                self.verify.fail(violation.errorTitle, violation.resultTitle, util.format(FAILURE_MSG, violation.errorTitle, violation.errorDescription, violation.position.line, violation.position.column,util.format(BP_URL, violation.tID, violation.bpID)));
              });
          } else {
            self.assert.ok(true, util.format(PASS_MSG, results.resultSummary.tests.passing));
          }
        }

        done();
      });
    });


  return this;
};
