const getChildren = function(element) {
  // Setup siblings array and get the first sibling
  const children = [];
  let child = element.firstChild;

  // Loop through each sibling and push to the array
  while (child) {
    if (child.nodeType === 1 && child !== element) {
      children.push(child);
    }
    child = child.nextSibling;
  }

  return children;
};

export default getChildren;
