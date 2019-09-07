import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { FiChevronDown } from "react-icons/fi";

const SelectWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  margin: 0 30px 30px 0;

  button {
    position: relative;
    width: 100%;
    text-align: left;
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #ccc;
    font-size: 14px;
    cursor: pointer;
  }

  svg {
    position: absolute;
    top: 25%;
    right: 10px;
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 100%;
    background-color: #f5f5f5;
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 0;
    overflow: scroll;
    opacity: 0;
    transition: all 0.5s ease-in-out;

    li {
      padding: 5px 10px;
      font-size: 14px;

      a {
        text-decoration: none;
      }
    }
  }

  &.open {
    ul {
      opacity: 1;
      max-height: 300px;
      padding: 20px 0;
    }
    svg {
      transform: rotate(180deg);
      transition: all 0.5s ease-in-out;
    }
  }
`;

const LinkDropdown = ({ header, pathPrefix, linksList }) => {
  const [dropdownOpen, setDropdownState] = useState(false);

  return (
    <SelectWrapper className={dropdownOpen ? "open" : null}>
      <button
        type="button"
        onClick={() => {
          setDropdownState(!dropdownOpen);
        }}
        onKeyDown={() => {
          setDropdownState(!dropdownOpen);
        }}
        onTouchStart={() => {
          setDropdownState(!dropdownOpen);
        }}
      >
        {header} <FiChevronDown />
      </button>
      <ul>
        {linksList.map(link => (
          <li key={link.name}>
            <Link to={`${pathPrefix}${link.path}`}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </SelectWrapper>
  );
};

LinkDropdown.propTypes = {
  header: PropTypes.string.isRequired,
  pathPrefix: PropTypes.string.isRequired,
  linksList: PropTypes.array.isRequired,
};

export default LinkDropdown;
