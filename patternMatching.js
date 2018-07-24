(function () {
  const {
    WILDCARD,
    TRUTHY,
    FALSY,
    INSTANCE_OF,
    SHAPE
  } = require ("./commons/symbols.js").symbols;
  const {predicates, matchMakers} = require ("./commons/helpers.js");
  const {
    isArray,
    isWildcard,
    isTruthy,
    isFalsy,
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
        (isWildcard (match)) ||
        (isTruthy (match) && matchTruthy (subject)) ||
        (isFalsy (match) && matchFalsy (subject)) ||
        (isInstanceOfCase (match) && matchInstance (subject, match)) ||
        (isArray (subject) && matchArray (subject, match)) ||
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

  exports.match = match;
} ());
