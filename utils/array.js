const isArray = function (arr) {
  // For new browsers
  if (Array.isArray) {
    return Array.isArray (arr);
  }

  // For older browsers
  return arr instanceof Array;
};

exports.arrayUtils = {
  isArray
};
