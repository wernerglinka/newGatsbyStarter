import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const StyledButton = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-color: ${props => (props.type === "primary" ? "#000" : "#ccc")};
  font-size: 16px;

  a {
    text-decoration: none;
  }
`;

const Button = ({ to, type, external, text }) => (
  <StyledButton type={type}>
    {external ? (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ) : (
      <Link to={to}>{text}</Link>
    )}
  </StyledButton>
);

Button.propTypes = {
  to: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  external: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
