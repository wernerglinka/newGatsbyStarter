/* global document */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import uuid from "uuid/v4";
import RenderDropdown from "./render-dropdown";

/**
 * renderItem()
 * Function to render the individual top menu items
 */
function RenderItem({ item }) {
  // use state object to is easy to extend
  const [menuState, setMenuState] = useState({
    aboutMenuIsActive: false,
    aboutMenuHover: false,
  });

  const resetActive = {
    aboutMenuIsActive: false,
  };

  const resetHover = {
    aboutMenuHover: false,
  };

  const resetAll = {
    ...resetActive,
    ...resetHover,
  };

  /**
   * handleOutsideClick()
   * Function to close main menu when click outside of the nav
   */
  function handleOutsideClick(e) {
    if (e.target.closest("#topMenu")) return;
    setMenuState({
      ...menuState,
      ...resetActive,
    });
  }

  function handleMenuSelection(e) {
    let target = e.target.innerHTML.toLowerCase();
    // use only the label, dropdown html has been removed
    const discardIndex = target.indexOf("<ul");
    if (discardIndex !== -1) {
      target = target.substring(0, discardIndex);
    } else {
      target = target.replace(/ /g, "_");
    }

    switch (target) {
      case "about":
        if (menuState.aboutMenuIsActive) {
          setMenuState({
            ...menuState,
            ...resetAll,
          });
        } else {
          // add active class to LI
          e.target.classList.add("active");
          setMenuState({
            ...menuState,
            ...resetActive,
            aboutMenuIsActive: true,
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

    const discardIndex = target.indexOf("<ul");
    if (discardIndex !== -1) {
      target = target.substring(0, discardIndex);
    } else {
      target = target.replace(/ /g, "_");
    }

    switch (target) {
      case "about":
        setMenuState({
          ...menuState,
          ...resetHover,
          aboutMenuHover: true,
        });
        break;
      default:
    }
  }

  /**
   * handleMouseLeave
   * Function to close top menu on hover
   */
  function handleMouseLeave(e) {
    setMenuState({
      ...menuState,
      ...resetHover,
    });
  }

  /**
   * listen for click outside of the main nav items
   */
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);

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
    <li
      key={uuid()}
      onClick={handleMenuSelection}
      onTouchStart={handleMenuSelection}
      onKeyDown={handleMenuSelection}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="menuitem"
      tabIndex="0"
    >
      {item[0].node.label}

      <RenderDropdown
        menu={item}
        isVisible={menuState.aboutMenuIsActive || menuState.aboutMenuHover}
      />
    </li>
  );
}

RenderItem.propTypes = {
  item: PropTypes.array.isRequired,
};

export default RenderItem;
