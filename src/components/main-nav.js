import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";

import useGetMainNavLinks from "../hooks/use-get-main-nav-links";

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

const MainNav = () => {
  const allLinks = useGetMainNavLinks();

  return (
    <LinkList>
      {allLinks.map(({ node }) => (
        <li key={node.name}>
          <Link to={node.link} activeClassName="active">
            {node.name}
          </Link>
        </li>
      ))}
    </LinkList>
  );
};

export default MainNav;
