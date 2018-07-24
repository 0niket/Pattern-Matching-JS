const {
  WILDCARD,
  TRUTHY,
  FALSY,
  INSTANCE_OF,
  SHAPE
} = require ("/constants/signature.js").symbols;

const _isObject = function (obj) {
  return Object.prototype.toString.call (obj) === "[object Object]";
};

const isShapeOfCase = function (match) {
  return match.signature === SHAPE;
};

const isInstanceOfCase = function (match) {
  return match.signature === INSTANCE_OF;
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

const matchShape = function (subject, match) {
  // This code block assumes that each match is of type object.
  // This shallowly verifies the match with subject
  // Code assumes that total number of keys in subject are same
  // as total number of keys in match.
  const object = match ();
  return Object.keys (subject)
               .every ((key) => subject [key] === object [key]);
};

const matchInstance = function (subject, match) {
  const className = match ();
  return subject instanceof className;
};

const matchArray = function (subject, match) {
  // This code block assumes that each match is instance of Array.
  // This shallowly verifies the match with subject.
  // Code assumes that total number of keys in subject are same
  // as total number of keys in match.
  return subject.every ((val, i) => val === match [i]);
};

const matchTruthy = function (subject) {
  return [false, null, undefined, 0, NaN, ""].indexOf (subject) === -1;
}

const matchFalsy = function (subject) {
  return matchTruthy (subject) === false;
};

exports.predicates = {
  isShapeOfCase,
  isInstanceOfCase,
  isArray,
  isWildcard,
  isTruthy,
  isFalsy
};

exports.matchMakers = {
  matchShape,
  matchInstance,
  matchArray,
  matchTruthy,
  matchFalsy
};
