const {
  // Identifier signatures
  WILDCARD,
  TRUTHY,
  FALSY,
  ARRAY,
  BOOL,
  FUNCTION,
  NUMBER,
  OBJECT,
  STRING,
  SYMBOL,
  DOM_NODE,
  REACT_ELEMENT,

  // Match function signatures
  ONE_OF,
  ONE_OF_TYPE,
  INSTANCE_OF,
  SHAPE,
  ARRAY_SHAPE,
  OBJECT_OF,
  ARRAY_OF,
  CUSTOM_MATCH,
  HOOK_MATCH_FN
} = require ("./constants/signature.js").symbols;

const _isObject = function (obj) {
  return Object.prototype.toString.call (obj) === "[object Object]";
};

const _isArray = function (arr) {
  return arr instanceof Array;
};

const isShapeOfCase = function (match) {
  return match.signature === SHAPE;
};

const isInstanceOfCase = function (match) {
  return match.signature === INSTANCE_OF;
};

const isArrayOfCase = function (match) {
  return match.signature === ARRAY_OF;
};

const isArrayShapeOfCase = function (match) {
  return match.signature === ARRAY_SHAPE;
};

const isWildcardCase = function (match) {
  return match === WILDCARD;
};

const isTruthyCase = function (match) {
  return match === TRUTHY;
};

const isFalsyCase = function (match) {
  return match === FALSY;
};

const isArrayCase = function (match) {
  return match === ARRAY;
};

const isBoolCase = function (match) {
  return match === BOOL;
};

const isFunctionCase = function (match) {
  return match === FUNCTION;
};

const isNumberCase = function (match) {
  return match === NUMBER;
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

const matchArrayShape = function (subject, match) {
  // This code block assumes that each match is instance of Array.
  // This shallowly verifies the match with subject.
  // Code assumes that total number of keys in subject are same
  // as total number of keys in match.
  const array = match ();
  return subject.every ((val, i) => val === array [i]);
};

const matchFalsy = function (subject) {
  return [false, null, undefined, 0, NaN, ""].indexOf (subject) !== -1;
};

const matchTruthy = function (subject) {
  return matchFalsy (subject) === false;
};

const matchArrayInstance = function (subject) {
  return Array.isArray (subject);
};

const matchBoolInstance = function (subject) {
  return (subject === true || subject === false);
};

const matchFunctionInstance = function (subject) {
  return subject instanceof Function;
};

const matchNumberInstance = function (subject) {
  return ((typeof subject === "number") && (!isNaN (subject)));
};


exports.predicates = {
  isShapeOfCase,
  isInstanceOfCase,
  isArrayShapeOfCase,
  isWildcardCase,
  isTruthyCase,
  isFalsyCase,
  isArrayCase,
  isBoolCase,
  isFunctionCase,
  isNumberCase
};

exports.matchMakers = {
  matchShape,
  matchInstance,
  matchArrayShape,
  matchTruthy,
  matchFalsy,
  matchArrayInstance,
  matchBoolInstance,
  matchFunctionInstance,
  matchNumberInstance
};
