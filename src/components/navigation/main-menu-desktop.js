/* global document */

import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "@emotion/styled";
import useMainNavLinks from "../../hooks/useMainMenuLinks";
import processLists from "./process-mega-menu-lists";
import RenderMegaMenu from "./render-mega-menu";
import getChildren from "../../utilities/getChildren";
import { MenuContext } from "../menu-context";
import useMenuState from "../../hooks/useMenuState";

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

    &.active {
      border-bottom: 10px solid #999;
    }
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
  // menu state is stored in MenuContext see src/components/menu-context.js
  const [menuState, setMenuState] = useContext(MenuContext);
  const mainMenuRef = useRef();
  const { toggleMenuState, hoverMenuState, resetMenuState } = useMenuState();

  // convenience packaging for all status flags so we can use spread syntax below
  // where approriate... less typing
  const resetActive = {
    solutionsMenuIsActive: false,
    productsMenuIsActive: false,
    resourcesMenuIsActive: false,
    getStartedMenuIsActive: false,
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
  const allLinks = useMainNavLinks();

  // create the top level menu items
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
   * resetActiveClass()
   * Helper function to remove the class "active" from all top main menu items
   */
  function resetActiveClass() {
    let children = [];
    // reset active class from all LIs
    children = getChildren(document.getElementById("mainMenu"));
    children.forEach(thisOne => {
      thisOne.classList.remove("active");
    });
  }

  /**
   * handleOutsideClick()
   * Function to close main menu when click outside of the nav
   */
  function handleOutsideClick(e) {
    if (!mainMenuRef.current.contains(e.target)) {
      resetActiveClass();
      resetMenuState(resetAll);
    }
  }

  /**
   * handleMenuSelection()
   * Function to open/close main menu mega menus
   */
  function handleMenuSelection(e) {
    // the target has the label and the html for the mega menu in its innerhtml
    let target = e.target.innerHTML.toLowerCase();

    // use only the label, mega menu html has been removed
    const discardIndex = target.indexOf("<div");
    if (discardIndex !== -1) {
      target = target.substring(0, discardIndex);
    } else {
      target = target.replace(/ /g, "_");
    }

    // reset all li active class then set the class for the selected li below
    resetActiveClass();

    switch (target) {
      case "solutions":
        e.target.classList.add("active");
        toggleMenuState(resetAll, "solutions");
        break;
      case "products":
        e.target.classList.add("active");
        toggleMenuState(resetAll, "products");
        break;
      case "resources":
        e.target.classList.add("active");
        toggleMenuState(resetAll, "resources");
        break;
      case "get_started":
        toggleMenuState(resetAll, "getStarted");
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

    // use only the label, mega menu html has been removed
    const discardIndex = target.indexOf("<div");
    target = target.substring(0, discardIndex);

    switch (target) {
      case "solutions":
        resetActiveClass();
        e.target.classList.add("active");
        hoverMenuState(resetAll, "solutions");
        break;
      case "products":
        resetActiveClass();
        e.target.classList.add("active");
        hoverMenuState(resetAll, "products");
        break;
      case "resources":
        resetActiveClass();
        e.target.classList.add("active");
        hoverMenuState(resetAll, "resources");
        break;
      default:
    }
  }

  /**
   * handleMouseLeave
   * Function to open maimain menu mega menus
   */
  function handleMouseLeave(e) {
    if (
      !menuState.solutionsMenuIsActive &&
      !menuState.productsMenuIsActive &&
      !menuState.resourcesMenuIsActive
    ) {
      resetActiveClass();
    }
    resetMenuState(resetHover);
  }

  /**
   * listen for click outside of the main nav items
   */
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Navigation>
      <MainMenu id="mainMenu" ref={mainMenuRef}>
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
                <RenderMegaMenu
                  megaMenu={solutionsMegaMenu}
                  isVisible={
                    menuState.solutionsMenuIsActive ||
                    menuState.solutionsMenuHover
                  }
                />
              )}
              {mainMenuItem.name === "Products" && (
                <RenderMegaMenu
                  megaMenu={productsMegaMenu}
                  isVisible={
                    menuState.productsMenuIsActive ||
                    menuState.productsMenuHover
                  }
                />
              )}
              {mainMenuItem.name === "Resources" && (
                <RenderMegaMenu
                  megaMenu={resourcesMegaMenu}
                  isVisible={
                    menuState.resourcesMenuIsActive ||
                    menuState.resourcesMenuHover
                  }
                />
              )}
              {mainMenuItem.name === "Get Started" && (
                <RenderMegaMenu
                  megaMenu={getStartedMegaMenu}
                  isVisible={menuState.getStartedMenuIsActive}
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
