(function () {
  const {WILDCARD, TRUTHY, FALSY} = require ("./commons/symbols.js").symbols;
  
  /**
   * Is Object.
   * A method to check if given value is an object.
   * Returns false if it's premitive, array or function.
   */
  var isObject = function (obj) {
    return Object.prototype.toString.call (obj) === "[object Object]";
  };

  var isArray = function (arr) {
    return arr instanceof Array;
  };

  var matchObject = function (subject, match) {
    return Object.keys (subject)
                 .every ((key) => subject [key] === match [key]);
  };

  var matchArray = function (subject, match) {
    return subject.every ((val, i) => val === match [i]);
  };

  var isWildcard = function (match) {
    return match === WILDCARD;
  };

  var isTruthy = function (match) {
    return match === TRUTHY;
  };

  var matchTruthy = function (subject) {
    return [false, null, undefined, 0, NaN, ""].indexOf (subject) === -1;
  }

  var isFalsy = function (match) {
    return match === FALSY;
  };

  var matchFalsy = function (subject) {
    return matchTruthy (subject) === false;
  };

  var match = function (subject, ...matches) {
    for (let i = 0; i < matches.length; i++) {
      const {match, action} = matches [i];

      // 1. Array:
      // This code block assumes that each match is instance of Array.
      // This shallowly verifies the match with subject.
      // Code assumes that total number of keys in subject are same
      // as total number of keys in match.
      // 2. Object:
      // This code block assumes that each match is of type object.
      // This shallowly verifies the match with subject
      // Code assumes that total number of keys in subject are same
      // as total number of keys in match.
      if (
        (isWildcard (match)) ||
        (isTruthy (match) && matchTruthy (subject)) ||
        (isFalsy (match) && matchFalsy (subject)) ||
        (isArray (subject) && matchArray (subject, match)) ||
        (isObject (subject) && matchObject (subject, match)) ||
        (subject === match)
      ) {
        action (subject);
        return;
      }
    }

    throw "Match exausted";
  };

  match.any = WILDCARD;
  match.truthy = TRUTHY;
  match.falsy = FALSY;

  exports.match = match;
} ());
