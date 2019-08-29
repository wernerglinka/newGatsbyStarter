import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import uuid from "uuid/v4";
import { animateScroll } from "react-scroll";
import styled from "@emotion/styled";
import Container from "../../styles/container";
import useFooterLinks from "../../../hooks/useFooterLinks";
import SitemapPane from "./footer-sitemap";

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.footerBackground};
  padding: 10px 0;
`;

const LinkList = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    padding-left: 20px;

    &:first-of-type {
      padding: 0;
    }

    .closed::after {
      display: inline-block;
      content: "+";
      width: 10px;
      text-align: center;
    }
    .open::after {
      display: inline-block;
      content: "-";
      width: 10px;
      text-align: center;
    }

    small {
      color: ${props => props.theme.copyrightTextColor};
    }
  }
`;

const Footer = props => {
  const [sitemapVisible, setSitemapState] = useState(false);
  const {
    allFooterJson: { edges: allLinks },
  } = useFooterLinks();

  const copyrightYear = new Date().getFullYear();
  const copyrightNotice = `© ${copyrightYear} PerimeterX, Inc. PerimeterX and the PerimeterX logo are trademarks of PerimeterX`;

  function handleClick() {
    setSitemapState(!sitemapVisible);
    // just raise the footer so user can see that there is now more to see
    animateScroll.scrollMore(100);
  }

  return (
    <FooterContainer>
      <Container>
        <LinkList>
          {allLinks.map(({ node: footerItem }) => {
            return (
              <li key={uuid()}>
                {/* render a link */}
                {!footerItem.category && footerItem.link && (
                  <Link to={footerItem.link}>{footerItem.name}</Link>
                )}
                {footerItem.category === "sitemap" && (
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={handleClick}
                    onTouchStart={handleClick}
                    onKeyDown={handleClick}
                    className={sitemapVisible ? "open" : "closed"}
                  >
                    {footerItem.name}
                  </div>
                )}

                {footerItem.category === "copyright" && (
                  <small>{copyrightNotice}</small>
                )}
              </li>
            );
          })}
        </LinkList>
        <SitemapPane isVisible={sitemapVisible} />
      </Container>
    </FooterContainer>
  );
};

export default Footer;
