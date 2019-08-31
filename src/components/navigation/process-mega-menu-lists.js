import React from "react";
import { Link } from "gatsby";
import uuid from "uuid/v4";
import useSiteMetadata from "../../hooks/useSiteMetadata";
import { getMenuState } from "../menu-context";

/**
 * renderList()
 * Renders either a link list or a promo section to be displayed in a mega menu
 */
function renderList(list) {
  // get the cloudinary base url from the site meta data
  const defaultSiteMetadata = useSiteMetadata();
  // build the promo independently from the link lists
  const megaMenuPromo = list[1].promo;

  // close the menus when Link is clicked and new content is loaded
  const [state, dispatch] = getMenuState();

  function handleClick() {
    dispatch({ type: "RESET", where: "all" });
  }

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
    <ul key={uuid()}>
      {list.map((listItem, i) => {
        return (
          <li
            key={`${listItem.link}${i}`}
            className={
              (listItem.category ? "categoryTitle" : null) ||
              (listItem.subCategory ? "subCategoryTitle" : null) ||
              (listItem.empty ? "empty" : null)
            }
          >
            {listItem.category && listItem.category}
            {!listItem.category && listItem.subCategory}
            {!listItem.category &&
              !listItem.subCategory &&
              !listItem.external &&
              !listItem.promo &&
              !listItem.empty && (
                <Link to={listItem.link} onClick={handleClick}>
                  {listItem.name}
                </Link>
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
 * Function to package individual menu lists and a promo section into a mega menu data array.
 */
function getLists(allLists) {
  const processedLists = [];
  let lists = [];

  // - Ignore the label
  // - Separate into individual lists when we see a category member
  // - Return an Array with all content for a single mega menu pane
  allLists.forEach(({ node }, i, array) => {
    if (!node.label) {
      // only start a new list in the middle of the list
      if (node.category && i > 1) {
        // render this sublist and then push to processedLists
        processedLists.push(renderList(lists));
        lists = [];
      }
      lists.push(node);

      // at the end of the list there is no category item to look for
      // so just process the last list
      if (i === array.length - 1) {
        processedLists.push(renderList(lists));
      }
    }
  });

  return processedLists;
}

export default getLists;
