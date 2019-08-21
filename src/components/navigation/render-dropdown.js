import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import uuid from "uuid/v4";

const Dropdown = styled.ul`
  position: absolute;
  z-index: 1000;
  list-style: none;
  background: #ccc;
  padding: 10px 0;
  display: none;

  &.open {
    display: block;
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
 * Component to render a dropdown. Dropdown are animated into/from view
 * with framer-motion and styled with emotion
 *
 */
const RenderDropdown = ({ menu, isVisible }) => {
  return (
    <Dropdown className={isVisible ? "open" : null}>
      {menu.map(
        ({ node }) =>
          !node.label && (
            <li key={uuid()}>
              <Link to={node.link}>{node.name}</Link>
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
