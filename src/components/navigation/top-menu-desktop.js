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
import useGetTopMenuLinks from "../../hooks/useGetTopMenuLinks";
import RenderDropdown from "./render-dropdown";
import { MenuContext } from "../menu-context";
import useMenuState from "../../hooks/useMenuState";

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
  const [menuState, setMenuState] = useContext(MenuContext);
  const topMenuRef = useRef();
  const { toggleMenuState, hoverMenuState, resetMenuState } = useMenuState();

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
    if (topMenuRef.current.contains(e.target)) return;
    resetMenuState(resetAll);
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
              onClick={() => toggleMenuState(resetAll, "about")}
              onTouchStart={() => toggleMenuState(resetActive, "about")}
              onKeyDown={() => toggleMenuState(resetActive, "about")}
              onMouseEnter={() => hoverMenuState(resetHover, "about")}
              onMouseLeave={() => resetMenuState(resetHover)}
              role="menuitem"
              tabIndex="0"
              ref={topMenuRef}
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
