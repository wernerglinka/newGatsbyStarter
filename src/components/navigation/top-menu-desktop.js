/* global document */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useGetTopMenuLinks from "../../hooks/useGetTopMenuLinks";
import RenderDropdown from "./render-dropdown";
import { MenuContext } from "../menu-context";

const TopMenu = styled.ul`
  height: 100%;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;

  > li {
    position: relative;
    padding: 20px;
  }

  a {
    text-decoration: none;
  }
`;

/**
 * DesktopTop()
 * Component to render the top menu
 */
const DesktopTop = () => {
  // menu state is stored in MenuContext see src/components/menu-context.js
  const sharedMenuState = useContext(MenuContext);

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
  const allLinks = useGetTopMenuLinks();
  const processedTopMenu = [];

  Object.values(allLinks).forEach(({ edges: items }) => {
    processedTopMenu.push(items);
  });

  return (
    <TopMenu id="topMenu">
      {processedTopMenu.map(item => (
        <Fragment key={uuid()}>
          {item[0].node.link && (
            <li key={uuid()}>
              {item[0].node.external ? (
                <a href={item[0].node.link}>{item[0].node.label}</a>
              ) : (
                <Link to={item[0].node.link}>{item[0].node.label}</Link>
              )}
            </li>
          )}

          {!item[0].node.link && (
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
                isVisible={
                  menuState.aboutMenuIsActive || menuState.aboutMenuHover
                }
              />
            </li>
          )}
        </Fragment>
      ))}
    </TopMenu>
  );
};

export default DesktopTop;
