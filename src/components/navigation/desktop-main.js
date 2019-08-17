/* global document */

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useGetMainNavLinks from "../../hooks/useGetMainNavLinks";
import processLists from "./process-lists";

const MainMenu = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    padding: 0 20px;

    a {
      text-decoration: none;

      &.active {
        color: #ff0000;
      }
    }
  }
`;

const MegaMenuPane = styled.div`
  display: relative;
`;

/**
 * DesktopMain
 * Component to render the main menu
 */
const DesktopMain = () => {
  const [menuState, setMenuState] = useState({
    solutionsMenuIsActive: false,
    productsMenuIsActive: false,
    resourcesMenuIsActive: false,
  });

  // get all nav links from the data layer
  const allLinks = useGetMainNavLinks();

  // create the top level menu
  const topLevelMenu = [];
  // turn object into an array
  const temp = Object.values(allLinks);
  temp.forEach((item, i) => {
    // extract the main menu items
    topLevelMenu.push(temp[i].edges[0].node.label);
  });

  // build the megamenu content for menu items
  const solutionsMegaMenu = processLists(allLinks.allSolutionsJson.edges);
  const productsMegaMenu = processLists(allLinks.allProductsJson.edges);
  const resourcesMegaMenu = processLists(allLinks.allResourcesJson.edges);

  /**
   * handleOutsideClick()
   * Function to close main menu when click outside of the nav
   */
  function handleOutsideClick(e) {
    // only close nav megamenu when clicked outside the nav
    if (e.target.closest("nav")) return;
    setMenuState({
      ...menuState,
      solutionsMenuIsActive: false,
      productsMenuIsActive: false,
      resourcesMenuIsActive: false,
    });
  }

  /**
   * handleMenuSelection()
   * Function to open/close main menu mega menus
   */
  function handleMenuSelection(e) {
    const target = e.target.innerHTML.toLowerCase();
    switch (target) {
      case "solutions":
        if (menuState.solutionsMenuIsActive) {
          setMenuState({ ...menuState, solutionsMenuIsActive: false });
        } else {
          setMenuState({
            ...menuState,
            solutionsMenuIsActive: true,
            productsMenuIsActive: false,
            resourcesMenuIsActive: false,
          });
        }
        break;
      case "products":
        if (menuState.productsMenuIsActive) {
          setMenuState({ ...menuState, productsMenuIsActive: false });
        } else {
          setMenuState({
            ...menuState,
            solutionsMenuIsActive: false,
            productsMenuIsActive: true,
            resourcesMenuIsActive: false,
          });
        }
        break;
      case "resources":
        if (menuState.resourcesMenuIsActive) {
          setMenuState({ ...menuState, resourcesMenuIsActive: false });
        } else {
          setMenuState({
            ...menuState,
            solutionsMenuIsActive: false,
            productsMenuIsActive: false,
            resourcesMenuIsActive: true,
          });
        }
        break;
      default:
    }
  }

  // listen for click outside of the main nav items
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav>
      <MainMenu>
        {topLevelMenu.map(mainMenuItem => (
          <li
            key={mainMenuItem}
            onClick={handleMenuSelection}
            onKeyDown={handleMenuSelection}
            role="menuitem"
            tabIndex="0"
          >
            {mainMenuItem}
          </li>
        ))}
      </MainMenu>

      {menuState.solutionsMenuIsActive && (
        <MegaMenuPane>
          {solutionsMegaMenu.map(list => (
            <div key={uuid()}>{list}</div>
          ))}
        </MegaMenuPane>
      )}
      {menuState.productsMenuIsActive && (
        <MegaMenuPane>
          {productsMegaMenu.map(list => (
            <div key={uuid()}>{list}</div>
          ))}
        </MegaMenuPane>
      )}
      {menuState.resourcesMenuIsActive && (
        <MegaMenuPane>
          {resourcesMegaMenu.map(list => (
            <div key={uuid()}>{list}</div>
          ))}
        </MegaMenuPane>
      )}
    </nav>
  );
};

DesktopMain.propTypes = {};

export default DesktopMain;
