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
const _ = require ("underscore");

const _matchInstance = function (subject, match) {
  const className = match ();
  return subject instanceof className;
};

const _matchShape = function (subject, match) {
  const object = match ();
  return _.isEqual (subject, object);
};

const _matchArrayShape = function (subject, match) {
  const array = match ();
  return _.isEqual (subject, array);
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
    case ARRAY_SHAPE: return _matchArrayShape (subject, match);
    case SHAPE: return _matchShape (subject, match);
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
