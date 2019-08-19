/* global document */

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useGetMainNavLinks from "../../hooks/useGetMainNavLinks";
import processLists from "./process-lists";
import PaintMenuPane from "./render-menu-pane";

const Navigation = styled.nav`
  flex: 1 1 50%;
  height: 100%;
`;

const MainMenu = styled.ul`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  list-style: none;

  > li {
    height: 100%;
    padding: 40px 0 0;
    margin: 0 30px;

    &:hover {
      cursor: pointer;
    }

    &:last-child {
      margin-left: auto;
    }

    a {
      text-decoration: none;

      &.active {
        color: #ff0000;
      }
    }
  }
`;

const MenuCTA = styled.button`
  border: 1px solid #333;
  padding: 5px 20px;
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
    solutionsMenuHover: false,
    productsMenuHover: false,
    resourcesMenuHover: false,
  });

  const resetActive = {
    solutionsMenuIsActive: false,
    productsMenuIsActive: false,
    resourcesMenuIsActive: false,
  };

  const resetHover = {
    solutionsMenuHover: false,
    productsMenuHover: false,
    resourcesMenuHover: false,
  };

  const resetAll = {
    ...resetActive,
    ...resetHover,
  };

  // get all nav links from the data layer
  const allLinks = useGetMainNavLinks();

  // create the top level menu
  const topLevelMenu = [];
  // turn object into an array
  const temp = Object.values(allLinks);
  temp.forEach((item, i) => {
    // extract the main menu items
    topLevelMenu.push({
      name: temp[i].edges[0].node.label,
      class: temp[i].edges[0].node.class,
    });
  });

  // build the megamenu content for menu items
  const solutionsMegaMenu = processLists(allLinks.allSolutionsJson.edges);
  const productsMegaMenu = processLists(allLinks.allProductsJson.edges);
  const resourcesMegaMenu = processLists(allLinks.allResourcesJson.edges);
  const getStartedMegaMenu = processLists(allLinks.allGetStartedJson.edges);

  /**
   * handleOutsideClick()
   * Function to close main menu when click outside of the nav
   */
  function handleOutsideClick(e) {
    // only close nav megamenu when clicked outside the nav
    if (e.target.closest("nav")) return;
    setMenuState({
      ...menuState,
      ...resetActive,
    });
  }

  /**
   * handleMenuSelection()
   * Function to open/close main menu mega menus
   */
  function handleMenuSelection(e) {
    // the target has the label and the html for the mega menu in its innerhtml
    let target = e.target.innerHTML.toLowerCase();
    const discardIndex = target.indexOf("<div");
    // use only the label, mega menu html has been removed
    target = target.substring(0, discardIndex);
    switch (target) {
      case "solutions":
        if (menuState.solutionsMenuIsActive) {
          setMenuState({
            ...menuState,
            ...resetAll,
          });
        } else {
          setMenuState({
            ...menuState,
            ...resetActive,
            solutionsMenuIsActive: true,
          });
        }
        break;
      case "products":
        if (menuState.productsMenuIsActive) {
          setMenuState({
            ...menuState,
            ...resetAll,
          });
        } else {
          setMenuState({
            ...menuState,
            ...resetActive,
            productsMenuIsActive: true,
          });
        }
        break;
      case "resources":
        if (menuState.resourcesMenuIsActive) {
          setMenuState({
            ...menuState,
            ...resetAll,
          });
        } else {
          setMenuState({
            ...menuState,
            ...resetActive,
            resourcesMenuIsActive: true,
          });
        }
        break;
      default:
    }
  }

  /**
   * handleMouseEnter
   * Function to open maimain menu mega menus
   *
   * This implementation is identical to PX' current website in that hover over any item
   * resets the clicked state.
   */
  function handleMouseEnter(e) {
    // the target has the label and the html for the mega menu in its innerhtml
    let target = e.target.innerHTML.toLowerCase();
    const discardIndex = target.indexOf("<div");
    // use only the label, mega menu html has been removed
    target = target.substring(0, discardIndex);

    switch (target) {
      case "solutions":
        setMenuState({
          ...menuState,
          ...resetActive,
          solutionsMenuHover: true,
        });
        break;
      case "products":
        setMenuState({
          ...menuState,
          ...resetActive,
          productsMenuHover: true,
        });
        break;
      case "resources":
        setMenuState({
          ...menuState,
          ...resetActive,
          resourcesMenuHover: true,
        });
        break;
      default:
    }
  }

  /**
   * handleMouseLeave
   * Function to open maimain menu mega menus
   */
  function handleMouseLeave(e) {
    setMenuState({
      ...menuState,
      ...resetHover,
    });
  }

  // listen for click outside of the main nav items
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Navigation>
      <MainMenu>
        {topLevelMenu.map(mainMenuItem => {
          return (
            <li
              key={mainMenuItem.name}
              onClick={handleMenuSelection}
              onTouchStart={handleMenuSelection}
              onKeyDown={handleMenuSelection}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="menuitem"
              tabIndex="0"
            >
              {mainMenuItem.class && <MenuCTA>{mainMenuItem.name}</MenuCTA>}
              {!mainMenuItem.class && mainMenuItem.name}

              {mainMenuItem.name === "Solutions" && (
                <PaintMenuPane
                  megaMenu={solutionsMegaMenu}
                  isVisible={
                    menuState.solutionsMenuIsActive ||
                    menuState.solutionsMenuHover
                  }
                />
              )}
              {mainMenuItem.name === "Products" && (
                <PaintMenuPane
                  megaMenu={productsMegaMenu}
                  isVisible={
                    menuState.productsMenuIsActive ||
                    menuState.productsMenuHover
                  }
                />
              )}
              {mainMenuItem.name === "Resources" && (
                <PaintMenuPane
                  megaMenu={resourcesMegaMenu}
                  isVisible={
                    menuState.resourcesMenuIsActive ||
                    menuState.resourcesMenuHover
                  }
                />
              )}
            </li>
          );
        })}
      </MainMenu>
    </Navigation>
  );
};

DesktopMain.propTypes = {};

export default DesktopMain;
