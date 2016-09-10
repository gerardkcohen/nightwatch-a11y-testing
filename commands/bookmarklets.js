/*jshint esversion: 6 */

const fs = require('fs');
const path = require('path');
const resemble = require('node-resemble-js');

const files = [{
  asset: fs.readFileSync(path.resolve('./3rdParty/css/debugCSS.css'), 'utf8'),
  type: 'style'
}, {
  asset: fs.readFileSync(path.resolve('./3rdParty/css/diagnostic.css'), 'utf8'),
  type: 'style'
}, {
  asset: fs.readFileSync(path.resolve('./3rdParty/css/revenge.css'), 'utf8'),
  type: 'style'
}];

exports.command = function() {
  "use strict";

  this.execute(function(bookmarklets) {
    var s;
    Array.prototype.slice.call(bookmarklets).forEach(function (asset) {
      console.log(asset);
        s = document.createElement(asset.type);
        s.appendChild(document.createTextNode(asset.asset));
        document.head.appendChild(s);
    });
  }, [files]);

  return this;
};
