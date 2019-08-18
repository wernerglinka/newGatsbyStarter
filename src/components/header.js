import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import styled from "@emotion/styled";

import logo from "../images/logo.png";
import MainNav from "./navigation/main-nav";

const PageHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  background-color: #f0f0f0;
  margin-bottom: 50px;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${props => props.theme.maxContentWidth};
  height: 100%;
  margin: 0 auto;
  align-items: center;

  .mainLogo {
    display: block;
  }
`;

const Header = () => (
  <PageHeader>
    <HeaderInner>
      <img className="mainLogo" src={logo} alt="Logo" />
      <MainNav />
    </HeaderInner>
  </PageHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
