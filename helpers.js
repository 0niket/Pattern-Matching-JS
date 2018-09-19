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
const {arrayUtils} = require ("./utils/array.js");
const {objectUtils} = require ("./utils/object.js");

const _matchShape = function (subject, match) {
  // This code block assumes that each match is of type object.
  // This shallowly verifies the match with subject
  // Code assumes that total number of keys in subject are same
  // as total number of keys in match.
  const object = match ();
  return Object.keys (subject)
               .every ((key) => subject [key] === object [key]);
};

const _matchInstance = function (subject, match) {
  const className = match ();
  return subject instanceof className;
};

const _matchArrayShape = function (subject, match) {
  // This code block assumes that each match is instance of Array.
  // This shallowly verifies the match with subject.
  // Code assumes that total number of keys in subject are same
  // as total number of keys in match.
  const array = match ();
  return subject.every ((val, i) => val === array [i]);
};

const _matchFalsy = function (subject) {
  return [false, null, undefined, 0, NaN, ""].indexOf (subject) !== -1;
};

const _matchTruthy = function (subject) {
  return _matchFalsy (subject) === false;
};

const _matchArrayInstance = function (subject) {
  return arrayUtils.isArray (subject);
};

const _matchBoolInstance = function (subject) {
  return (subject === true || subject === false);
};

const _matchFunctionInstance = function (subject) {
  return subject instanceof Function;
};

const _matchNumberInstance = function (subject) {
  return ((typeof subject === "number") && (!isNaN (subject)));
};

const _matchObjectInstance = function (subject) {
  return objectUtils.isObject (subject);
};

const _matchStringInstance = function (subject) {
  return typeof subject === "string";
};

const areSignatureAndTypeMatching = function (subject, match) {
  const signature = match.signature || match;

  switch (signature) {
    case WILDCARD: return true;
    case TRUTHY: return _matchTruthy (subject);
    case FALSY: return _matchFalsy (subject);
    case ARRAY: return _matchArrayInstance (subject);
    case BOOL: return _matchBoolInstance (subject);
    case FUNCTION: return _matchFunctionInstance (subject);
    case OBJECT: return _matchObjectInstance (subject);
    case NUMBER: return _matchNumberInstance (subject);
    case STRING: return _matchStringInstance (subject);
    case INSTANCE_OF: return _matchInstance (subject, match);
    case ARRAY_OF: return _matchArrayShape (subject, match);
    case OBJECT_OF: return _matchShape (signature, match);
    default: return (subject === match);
  }
};

const matchFnGenerator = function (signature) {
  return function (param) {
    const _fn = () => param;
    _fn.signature = signature;
    return _fn;
  };
};

exports.helpers = {
  areSignatureAndTypeMatching,
  matchFnGenerator
};
