import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import useGetMainNavLinks from "../../hooks/useGetMainNavLinks";
import DesktopMainNav from "./desktop-main";

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

const MainNav = ({largeScreen}) => {
  const allLinks = useGetMainNavLinks();
  
  return (
    <>
      {largeScreen ? 
        <DesktopMainNav /> : <>
        <span>Small Screen: </span>
          <LinkList>
            {allLinks.map(({ node }) => (
              <li key={node.name}>
                <Link to={node.link} activeClassName="active">
                  {node.name}
                </Link>
              </li>
            ))}
          </LinkList>
        </>
      }
    </>
  );
};

export default MainNav;
