import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import uuid from "uuid/v4";

const BreadcrumbsList = styled.ul`
  list-style: none;
  padding-bottom: 30px;
  max-width: ${props => props.theme.maxContentWidth};
  margin: 0 auto;

  li {
    display: inline-block;

    &:after {
      content: ">";
      padding: 0 10px;
    }
    &:last-child:after {
      content: "";
      padding: 0;
    }

    a {
      text-decoration: none;
    }
  }
`;

/**
 * Breadcrumbs
 * Builds a list of breadcrumbs from page frontmatter breadcrumbs array
 */
const Breadcrumbs = ({ pathData }) => {
  return (
    <BreadcrumbsList>
      {pathData.map((partial, i) => (
        <li key={uuid()}>
          {partial.path ? (
            <Link to={partial.path}>{partial.name}</Link>
          ) : (
            <span>{partial.name}</span>
          )}
        </li>
      ))}
    </BreadcrumbsList>
  );
};

Breadcrumbs.propTypes = {
  pathData: PropTypes.array.isRequired,
};

export default Breadcrumbs;
