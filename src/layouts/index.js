/* global document */
import React from "react";
import PropTypes from "prop-types";
// theming
import { ThemeProvider } from "emotion-theming";
import { animateScroll } from "react-scroll";
import styled from "@emotion/styled";
import PageTransition from "../components/transition";
import theme from "./theme";
// components
import useSiteMetadata from "../hooks/useSiteMetadata";
import Head from "../components/head";
import Header from "../components/header";
import Breadcrumbs from "../components/breadcrumbs";
import Footer from "../components/page-sections/footer";
import Quicklinks from "../components/quicklinks";
import { MenuContextProvider } from "../components/menu-context";
import reducer, { initialState } from "../components/manage-menu-state";
// global reset etc...
import "./global.scss";

const ToTop = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  opacity: 0;
  transition: all 0.5s ease-in-out;

  &.isVisible {
    opacity: 1;
  }
`;

const Layout = ({ children, location }) => {
  const siteMetadata = useSiteMetadata();

  const {
    pageContext: { breadcrumbs },
  } = children.props;

  const toTopIsVisible = false;

  return (
    <MenuContextProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={theme}>
        <Head metaData={siteMetadata} location={location} />
        <Header />
        <PageTransition location={location}>
          {breadcrumbs && <Breadcrumbs pathData={breadcrumbs} />}
          {children}
        </PageTransition>
        <Footer />
        <Quicklinks moveOver={toTopIsVisible} />
        <ToTop type="button" onClick={() => animateScroll.scrollToTop()}>
          TO TOP
        </ToTop>
      </ThemeProvider>
    </MenuContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
