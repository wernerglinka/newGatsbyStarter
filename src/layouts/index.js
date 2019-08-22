/* global document */
import React from "react";
import PropTypes from "prop-types";
// theming
import { ThemeProvider } from "emotion-theming";
import PageTransition from "../components/transition";
import theme from "./theme";
// components
import useSiteMetadata from "../hooks/useSiteMetadata";
import Head from "../components/head";
import Header from "../components/header";
import Breadcrumbs from "../components/breadcrumbs";
import { MenuContextProvider } from "../components/menu-context";
// global reset etc...
import "./global.scss";

const Layout = ({ children, location }) => {
  const siteMetadata = useSiteMetadata();

  const {
    pageContext: { breadcrumbs },
  } = children.props;

  return (
    <MenuContextProvider>
      <ThemeProvider theme={theme}>
        <Head metaData={siteMetadata} location={location} />
        <Header />
        <PageTransition location={location}>
          {breadcrumbs && <Breadcrumbs pathData={breadcrumbs} />}
          {children}
        </PageTransition>
      </ThemeProvider>
    </MenuContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
