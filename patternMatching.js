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
  const matchFnGenerator = function (signature) {
    return function (param) {
      const _fn = () => param;
      _fn.signature = signature;
      return _fn;
    };
  };
  
  match.oneOf = matchFnGenerator (ONE_OF);

  // @TODO: Implement
  match.oneOfType = matchFnGenerator (ONE_OF_TYPE);
  
  match.instanceOf = matchFnGenerator (INSTANCE_OF);
  
  match.shape = matchFnGenerator (SHAPE);

  // @TODO: Make changes as api has changed
  match.arrayShape = matchFnGenerator (ARRAY_SHAPE);

  // @TODO: Implement
  match.objectOf = matchFnGenerator (OBJECT_OF);

  // @TODO: Implement
  match.arrayOf = matchFnGenerator (ARRAY_OF);

  // @TODO: Implement
  match.customMatch = matchFnGenerator (CUSTOM_MATCH);

  exports.match = match;
} ());
