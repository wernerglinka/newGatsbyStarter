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
import useQuicklinks from "../hooks/useQuickLinks";

const QuicklinksList = styled.ul`
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  list-style: none;

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

const Quicklinks = () => {
  const {
    allQuicklinksJson: { edges: quicklinks },
  } = useQuicklinks();

  console.log(quicklinks);

  return (
    <QuicklinksList>
      {quicklinks.map(({ node }) => (
        <li>
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

export default Quicklinks;
