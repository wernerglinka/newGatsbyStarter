/* global previousPath */
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import styled from "@emotion/styled";

import logo from "../images/logo.png";
import DesktopMainMenu from "./navigation/main-menu-desktop";
import DesktopTopMenu from "./navigation/top-menu-desktop";

const PageHeader = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  background-color: ${props => props.theme.headerBackground};
  margin-bottom: 50px;
`;

const HeaderTop = styled.div`
  position: relative;
  z-index: 2;
  height: ${props => props.theme.headerTopMenuHeight};
  max-width: ${props => props.theme.maxContentWidth};
  margin: 0 auto;
`;

const HeaderInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  max-width: ${props => props.theme.maxContentWidth};
  height: ${props => props.theme.headerNavHeight};
  margin: 0 auto;
  align-items: center;

  .mainLogo {
    display: block;
  }
`;

const Header = () => {
  return (
    <PageHeader>
      <HeaderTop>
        <DesktopTopMenu />
      </HeaderTop>
      <HeaderInner>
        <Link to="/">
          <img className="mainLogo" src={logo} alt="Logo" />
        </Link>
        <DesktopMainMenu />
      </HeaderInner>
    </PageHeader>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
