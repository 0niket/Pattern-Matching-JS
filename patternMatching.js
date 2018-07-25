(function () {
  const {
    WILDCARD,
    TRUTHY,
    FALSY,
    INSTANCE_OF,
    SHAPE,
    ARRAY_OF
  } = require ("./constants/signature.js").symbols;
  const {predicates, matchMakers} = require ("./helpers.js");
  const {
    isArrayOfCase,
    isWildcardCase,
    isTruthyCase,
    isFalsyCase,
    isShapeOfCase,
    isInstanceOfCase
  } = predicates;
  const {
    matchShape,
    matchInstance,
    matchArray,
    matchTruthy,
    matchFalsy
  } = matchMakers;

  var match = function (subject, ...matches) {
    for (let i = 0; i < matches.length; i++) {
      const {match, action} = matches [i];

      if (
        (isWildcardCase (match)) ||
        (isTruthyCase (match) && matchTruthy (subject)) ||
        (isFalsyCase (match) && matchFalsy (subject)) ||
        (isInstanceOfCase (match) && matchInstance (subject, match)) ||
        (isArrayOfCase (match) && matchArray (subject, match)) ||
        (isShapeOfCase (match) && matchShape (subject, match)) ||
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

  // @TODO: Implement functionality for below identifiers
  match.array = ARRAY;
  match.bool = BOOL;
  match.function = FUNCTION;
  match.number = NUMBER;
  match.object = OBJECT;
  match.string = STRING;
  match.symbol = SYMBOL;
  match.domNode = DOM_NODE;
  match.reactElement = REACT_ELEMENT;

  // @TODO: Implement
  // @TODO: Write generator function instead of repeating code
  match.oneOf = function (values) {
    const _oneOf = () => values;
    _oneOf.signature = ONE_OF;
    return _oneOf;
  };

  // @TODO: Implement
  match.oneOfType = function (types) {
    const _oneOfType = () => types;
    _oneOfType.signature = ONE_OF_TYPE;
    return _oneOfType;
  };
  
  match.instanceOf = function (className) {
    const _instanceOf = () => className;
    _instanceOf.signature = INSTANCE_OF;
    return _instanceOf;
  };
  
  match.shape = function (object) {
    const _shape = () => object;
    _shape.signature = SHAPE;
    return _shape;
  };

  // @TODO: Make changes as api has changed
  match.arrayShape = function (array) {
    const _arrayShape = () => array;
    _arrayShape.signature = ARRAY_SHAPE;
    return _arrayShape;
  };

  // @TODO: Implement
  match.objectOf = function (type) {
    const _objectOf = () => type;
    _objectOf.signature = OBJECT_OF;
    return _objectOf;
  };

  // @TODO: Implement
  match.arrayOf = function (type) {
    const _arrayOf = () => type;
    _arrayOf.signature = ARRAY_OF;
    return _arrayOf;
  };

  // @TODO: Implement
  match.customMatch = function (fn) {
    const _customMatch = () => fn;
    _customMatch.signature = CUSTOM_MATCH;
    return _customMatch;
  };

  exports.match = match;
} ());
