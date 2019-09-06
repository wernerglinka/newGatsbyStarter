import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { FiChevronDown } from "react-icons/fi";

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;

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
    height: 0;
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
      height: 300px;
    }
    svg {
      transform: rotate(180deg);
      transition: all 0.5s ease-in-out;
    }
  }
`;

const SelectTag = ({ pathPrefix, tagsList }) => {
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
        View by Topic <FiChevronDown />
      </button>
      <ul>
        {tagsList.map(tagName => (
          <li key={tagName}>
            <Link
              to={`${pathPrefix}${tagName.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {tagName}
            </Link>
          </li>
        ))}
      </ul>
    </SelectWrapper>
  );
};

SelectTag.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
  tagsList: PropTypes.array.isRequired,
};

export default SelectTag;
