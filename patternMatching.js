(function () {
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

  const {predicates, matchMakers} = require ("./helpers.js");
  const {
    isArrayShapeOfCase,
    isWildcardCase,
    isTruthyCase,
    isFalsyCase,
    isFunctionCase,
    isNumberCase,
    isObjectCase,
    isShapeOfCase,
    isInstanceOfCase,
    isArrayCase,
    isBoolCase
  } = predicates;
  const {
    matchShape,
    matchInstance,
    matchArrayShape,
    matchTruthy,
    matchFalsy,
    matchArrayInstance,
    matchBoolInstance,
    matchFunctionInstance,
    matchNumberInstance,
    matchObjectInstance
  } = matchMakers;

  var match = function (subject, ...matches) {
    for (let i = 0; i < matches.length; i++) {
      const {match, action} = matches [i];

      if (
        (isWildcardCase (match)) ||
        (isTruthyCase (match) && matchTruthy (subject)) ||
        (isFalsyCase (match) && matchFalsy (subject)) ||
        (isArrayCase (match) && matchArrayInstance (subject)) ||
        (isBoolCase (match) && matchBoolInstance (subject)) ||
        (isFunctionCase (match) && matchFunctionInstance (subject)) ||
        (isNumberCase (match) && matchNumberInstance (subject)) ||
        (isObjectCase (match) && matchObjectInstance (subject)) ||
        (isInstanceOfCase (match) && matchInstance (subject, match)) ||
        (isArrayShapeOfCase (match) && matchArrayShape (subject, match)) ||
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
  match.array = ARRAY;
  match.bool = BOOL;
  match.function = FUNCTION;
  match.number = NUMBER;
  match.object = OBJECT;

  // @TODO: Implement functionality for below identifiers
  match.string = STRING;
  match.symbol = SYMBOL;
  match.domNode = DOM_NODE;
  match.reactElement = REACT_ELEMENT;

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

  // @TODO: Implement
  // @TODO: hook becomes similar to any other in built API which can be
  // invoked for a particular instance of the match function.
  match.hookMatchFn = matchFnGenerator (HOOK_MATCH_FN);

  exports.match = match;
} ());
