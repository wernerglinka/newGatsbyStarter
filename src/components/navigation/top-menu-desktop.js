/* global document */
import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useTopMenuLinks from "../../hooks/useTopMenuLinks";
import RenderDropdown from "./render-dropdown";
import { getMenuState } from "../menu-context";

const TopMenu = styled.ul`
  height: 100%;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;

  > li {
    position: relative;
    padding: 20px;
    cursor: pointer;
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
  const topMenuRef = useRef();
  const [state, dispatch] = getMenuState();

  console.log(state);

  /**
   * handleOutsideClick()
   * Function to close top menu when click outside of the dropdown
   */
  function handleOutsideClick(e) {
    if (topMenuRef.current && !topMenuRef.current.contains(e.target)) {
      dispatch({ type: "RESET", where: "top" });
      console.log("outside click");
    }
  }

  /**
   * handleMenuSelection()
   * Function to open/close main menu mega menus
   */
  function handleMenuSelection(e) {
    // the target has the label and the html for the dropdown in its innerHTML
    let target = e.target.innerHTML.toLowerCase();
    // use only the label, mega menu html has been removed
    const discardIndex = target.indexOf("<ul");
    if (discardIndex !== -1) {
      target = target.substring(0, discardIndex);
    } else {
      target = target.replace(/ /g, "_");
    }

    switch (target) {
      case "about":
        dispatch({ type: "TOGGLE", id: "aboutMenu" });
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
    // the target has the label and the html for the dropdown in its innerHTML
    let target = e.target.innerHTML.toLowerCase();

    const discardIndex = target.indexOf("<ul");
    target = target.substring(0, discardIndex);

    switch (target) {
      case "about":
        dispatch({ type: "START_HOVER", id: "aboutMenu" });
        break;
      default:
    }
  }

  /**
   * handleMouseLeave
   * Function to open maimain menu mega menus
   */
  function handleMouseLeave(e) {
    dispatch({ type: "END_HOVER" });
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

  // build top level menu items
  const allLinks = useTopMenuLinks();
  const processedTopMenu = [];

  Object.values(allLinks).forEach(({ edges: items }) => {
    processedTopMenu.push(items);
  });

  return (
    <TopMenu id="topMenu" ref={topMenuRef}>
      {processedTopMenu.map(item => (
        <Fragment key={uuid()}>
          {item[0].node.link && (
            <li key={uuid()}>
              {item[0].node.external ? (
                // external link uses <a>
                <a href={item[0].node.link}>{item[0].node.label}</a>
              ) : (
                // internal link use Gatsby Link
                <Link to={item[0].node.link}>{item[0].node.label}</Link>
              )}
            </li>
          )}
          {/* not a link must have a dropdown */}
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
                isVisible={state.aboutMenu.active || state.aboutMenu.hover}
              />
            </li>
          )}
        </Fragment>
      ))}
    </TopMenu>
  );
};

export default DesktopTop;
