import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import uuid from "uuid/v4";

/**
 * renderItem()
 * Function to render the individual top menu items
 */
function renderItem(item) {
  // if the top menu item is a link then we render it as a <Link>
  // if the link is external then we render it as a <a  href=...
  if (item[0].node.link) {
    return (
      <li key={uuid()}>
        {item[0].node.external ? (
          <a href={item[0].node.link}>{item[0].node.label}</a>
        ) : (
          <Link to={item[0].node.link}>{item[0].node.label}</Link>
        )}
      </li>
    );
  }
  // if the top menu item is not a link, then is has a dropdown
  // the top menu item itself is the dropdown trigger
  return (
    <li key={uuid()}>
      <span>{item[0].node.label}</span>
      <ul>
        {item.map(
          ({ node }) =>
            !node.label && (
              <li key={uuid()}>
                <Link to={node.link}>{node.name}</Link>
              </li>
            )
        )}
      </ul>
    </li>
  );
}

export default renderItem;
