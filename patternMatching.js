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

  match.arrayOf = function (array) {
    const _arrayOf = () => array;
    _arrayOf.signature = ARRAY_OF;
    return _arrayOf;
  };

  exports.match = match;
} ());
