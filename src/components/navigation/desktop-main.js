import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby";
import useGetMainNavLinks from "../../hooks/useGetMainNavLinks";
import styled from "@emotion/styled";

const LinkList = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    padding: 0 20px;

    a {
      text-decoration: none;

      &.active {
        color: #ff0000;
      }
    }
  }
`;

const DesktopMain = props => {
  const allLinks = useGetMainNavLinks();
  return (
    <div>
        <LinkList>
            {allLinks.map(({ node }) => (
              <li key={node.name}>
                <Link to={node.link} activeClassName="active">
                  {node.name}
                </Link>
              </li>
            ))}
          </LinkList>
    </div>
  );
};

DesktopMain.propTypes = {
  
};

export default DesktopMain;