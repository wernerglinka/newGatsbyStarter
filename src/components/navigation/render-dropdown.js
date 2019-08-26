import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useMenuState from "../../hooks/useMenuState";

const Dropdown = styled.ul`
  position: absolute;
  z-index: 1000;
  list-style: none;
  background: #ccc;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;

  &.open {
    padding: 10px 0;
    max-height: 200px;
    opacity: 1;
  }

  li {
    white-space: nowrap;
    padding: 5px 20px;

    &:hover {
      background-color: #aaa;
    }
  }
`;

/**
 * RenderDropdown()
 * Component to render a dropdown.
 */
const RenderDropdown = ({ menu, isVisible }) => {
  console.log("Render Dropdown");
  // close the menus when Link is clicked and new content is loaded
  const { resetMenuState } = useMenuState();

  const resetAll = {
    aboutMenuIsActive: false,
    aboutMenuHover: false,
    solutionsMenuIsActive: false,
    productsMenuIsActive: false,
    resourcesMenuIsActive: false,
    getStartedMenuIsActive: false,
    solutionsMenuHover: false,
    productsMenuHover: false,
    resourcesMenuHover: false,
  };

  function handleClick() {
    resetMenuState(resetAll);
    console.log("HandleClick");
  }

  return (
    <Dropdown className={isVisible ? "open" : null}>
      {menu.map(
        ({ node }) =>
          !node.label && (
            <li key={uuid()}>
              <Link to={node.link} onClick={handleClick}>
                {node.name}
              </Link>
            </li>
          )
      )}
    </Dropdown>
  );
};

RenderDropdown.propTypes = {
  menu: PropTypes.array.isRequired,
  isVisible: PropTypes.bool,
};

RenderDropdown.defaultProps = {
  isVisible: false,
};

export default RenderDropdown;
