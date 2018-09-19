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

  const {
    areSignatureAndTypeMatching,
    matchFnGenerator
  } = require ("./helpers.js").helpers;

  const _match = function (subject, ...matches) {
    for (let i = 0; i < matches.length; i++) {
      const {match, action} = matches [i];

      if (areSignatureAndTypeMatching (subject, match)) {
        action (subject);
        return true;
      }
    }

    return false;
  };

  const types = {
    any: WILDCARD,
    truthy: TRUTHY,
    falsy: FALSY,
    array: ARRAY,
    bool: BOOL,
    function: FUNCTION,
    number: NUMBER,
    object: OBJECT,
    string: STRING,

    // @TODO: Implement functionality for below identifiers
    symbol: SYMBOL,
    domNode: DOM_NODE,
    reactElement: REACT_ELEMENT,

    // Methods to do pattern matching
    oneOf: matchFnGenerator (ONE_OF),
    instanceOf: matchFnGenerator (INSTANCE_OF),
    shape: matchFnGenerator (SHAPE),
    arrayShape: matchFnGenerator (ARRAY_SHAPE),

    // @TODO: Implement
    oneOfType: matchFnGenerator (ONE_OF_TYPE),
    objectOf: matchFnGenerator (OBJECT_OF),
    arrayOf: matchFnGenerator (ARRAY_OF),
    customMatch: matchFnGenerator (CUSTOM_MATCH)
  };

  // Constructor to create new instance of pattern matching by
  // providing subject & corresponding matches.
  const createClass = function (...matches) {
    return {
      match: function (subject) {
        return _match (subject, ...matches);
      }
    };
  };

  exports.PatternMatch = {
    createClass,
    types
  };
} ());
