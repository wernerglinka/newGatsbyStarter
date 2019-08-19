const getSiblings = function(element) {
  // Setup siblings array and get the first sibling
  const siblings = [];
  let sibling = element.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

export default getSiblings;
