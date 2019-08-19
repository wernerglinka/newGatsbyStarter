import React from "react";
import { Link } from "gatsby";
import uuid from "uuid/v4";
import useSiteMetadata from "../../hooks/useSiteMetadata";

/**
 * renderList()
 * Function to render a jsx UL
 */
function renderList(list) {
  // get the cloudinary base url from the site meta data
  const defaultSiteMetadata = useSiteMetadata();
  // build the promo independently from the link lists
  const megaMenuPromo = list[1].promo;
  if (megaMenuPromo) {
    return (
      <div className="promoContainer">
        <div className="promoImage">
          <img
            src={`${defaultSiteMetadata.cloudinaryBaseURL}/${megaMenuPromo.image}`}
            alt=""
          />
        </div>
        <div className="promoProse">
          <h3>{megaMenuPromo.action}</h3>
          <p>{megaMenuPromo.prose}</p>
        </div>
      </div>
    );
  }
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
            {!listItem.category &&
              !listItem.subCategory &&
              !listItem.external &&
              !listItem.promo && (
                <Link to={listItem.link}>{listItem.name}</Link>
              )}
            {!listItem.category && !listItem.subCategory && listItem.external && (
              <a href={listItem.link} target="_blank" rel="noopener noreferrer">
                {listItem.name}
              </a>
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
