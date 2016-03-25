/*jshint esversion: 6 */

const fs = require('fs');
const path = require('path');

const axeCore = fs.readFileSync(path.resolve('./node_modules/axe-core/axe.min.js'), 'utf8');

exports.command = function() {
  this.execute(function(aXe) {
    var s;

    if (!document.querySelector('#nightwatch-axe')) {
      s = document.createElement('script');
      s.id = 'nightwatch-axe';
      s.text = aXe;
      document.head.appendChild(s);
    }
  }, [axeCore]);

  return this;
};
