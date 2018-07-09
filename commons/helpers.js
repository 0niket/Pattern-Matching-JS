const {WILDCARD, TRUTHY, FALSY} = require ("./symbols.js").symbols;

const isObject = function (obj) {
  return Object.prototype.toString.call (obj) === "[object Object]";
};

const isArray = function (arr) {
  return arr instanceof Array;
};

const isWildcard = function (match) {
  return match === WILDCARD;
};

const isTruthy = function (match) {
  return match === TRUTHY;
};

const isFalsy = function (match) {
  return match === FALSY;
};

const matchObject = function (subject, match) {
  return Object.keys (subject)
               .every ((key) => subject [key] === match [key]);
};

const matchArray = function (subject, match) {
  return subject.every ((val, i) => val === match [i]);
};

const matchTruthy = function (subject) {
  return [false, null, undefined, 0, NaN, ""].indexOf (subject) === -1;
}

const matchFalsy = function (subject) {
  return matchTruthy (subject) === false;
};

exports.predicates = {
  isObject,
  isArray,
  isWildcard,
  isTruthy,
  isFalsy
};

exports.matchMakers = {
  matchObject,
  matchArray,
  matchTruthy,
  matchFalsy
};
