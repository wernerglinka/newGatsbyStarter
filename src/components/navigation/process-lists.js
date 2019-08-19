import React from "react";
import { Link } from "gatsby";
import uuid from "uuid/v4";

/**
 * renderList()
 * Function to render a jsx UL
 */
function renderList(list) {
  return (
    <ul>
      {list.map(listItem => {
        return (
          <li
            key={uuid()}
            className={
              (listItem.category ? "categoryTitle" : null) ||
              (listItem.subCategory ? "subCategoryTitle" : null)
            }
          >
            {listItem.category && listItem.category}
            {!listItem.category && listItem.subCategory}
            {!listItem.category && !listItem.subCategory && (
              <Link to={listItem.link}>{listItem.name}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * getLists()
 * Function to process all menu data into categorized lists.
 * These lists will be used in the nav mega menus
 */
function getLists(allLists) {
  const processedLists = [];
  let lists = [];

  allLists.forEach(({ node }, i, array) => {
    if (!node.label) {
      if (node.category && i > 1) {
        processedLists.push(renderList(lists));
        lists = [];
      }
      lists.push(node);

      if (i === array.length - 1) {
        processedLists.push(renderList(lists));
      }
    }
  });

  return processedLists;
}

export default getLists;
