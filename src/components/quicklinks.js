import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import {
  FiMessageSquare,
  FiAlertTriangle,
  FiThumbsUp,
  FiClipboard,
} from "react-icons/fi";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useQuicklinks from "../hooks/useQuickLinks";

const QuicklinksList = styled.ul`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  list-style: none;
  transition: all 0.5s ease-in-out;

  &.moveLeft {
    right: 80px;
  }

  li {
    border: 1px solid #000;
    width: 60px;
    height: 60px;
    padding: 5px;
    margin-left: -1px;
    background-color: rgba(255, 255, 255, 0.9);

    a {
      display: block;
      height: 100%;
      text-align: center;
      text-decoration: none;
      color: #000;
    }

    span {
      display: block;
      font-size: 12px;
    }
  }
`;

const Quicklinks = ({ moveOver }) => {
  const {
    allQuicklinksJson: { edges: quicklinks },
  } = useQuicklinks();

  return (
    <QuicklinksList className={moveOver ? "moveLeft" : null}>
      {quicklinks.map(({ node }) => (
        <li key={uuid()}>
          <Link to={node.link}>
            {node.icon === "message-square" && <FiMessageSquare />}
            {node.icon === "alert-triangle" && <FiAlertTriangle />}
            {node.icon === "thumbs-up" && <FiThumbsUp />}
            {node.icon === "clipboard" && <FiClipboard />}
            <span>{node.name}</span>
          </Link>
        </li>
      ))}
    </QuicklinksList>
  );
};

Quicklinks.propTypes = {
  moveOver: PropTypes.bool.isRequired,
};

export default Quicklinks;
