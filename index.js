'use strict';

// Not all keys can use dot notation.
var dotNotationRE = /^[a-z_][a-z0-9_]*$/i;

// Perform strict equality against undefined, by default.
var defaultCheck = function defaultCheck(prop) {
  return prop + ' === undefined';
};

module.exports = function wrapDefaults(defaults) {
  var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCheck;

  var setters = Object.keys(defaults).map(function (key) {
    var access = dotNotationRE.test(key) ? '.' + key : '[\'' + key + '\']';
    var missing = check('props' + access, key);
    if (!missing) return '';
    return '\n  if (' + missing + ') props' + access + ' = defaults' + access;
  }).join('');
  return new Function('defaults', 'return function(props) {' + setters + '\n  return props\n}')(defaults);
};
