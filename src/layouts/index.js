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
import Footer from "../components/page-sections/footer";
import { MenuContextProvider } from "../components/menu-context";
// global reset etc...
import "./global.scss";

const initialState = {
  solutionsMenu: {
    active: false,
    hover: false,
    id: "solutionsMenu",
    where: "main",
  },
  productsMenu: {
    active: false,
    hover: false,
    id: "productsMenu",
    where: "main",
  },
  resourcesMenu: {
    active: false,
    hover: false,
    id: "resourcesMenu",
    where: "main",
  },
  getStartedMenu: {
    active: false,
    id: "getStartedMenu",
    where: "main",
  },
  aboutMenu: {
    active: false,
    hover: false,
    id: "aboutMenu",
    where: "top",
  },
};

const initialHoverState = {
  solutionsMenu: {
    hover: false,
    id: "solutionsMenu",
  },
  productsMenu: {
    hover: false,
    id: "productsMenu",
  },
  resourcesMenu: {
    hover: false,
    id: "resourcesMenu",
  },
  aboutMenu: {
    hover: false,
    id: "aboutMenu",
  },
};

const mainResetState = {
  solutionsMenu: {
    active: false,
    fixed: false,
    id: "solutionsMenu",
    where: "main",
  },
  productsMenu: {
    active: false,
    fixed: false,
    id: "productsMenu",
    where: "main",
  },
  resourcesMenu: {
    active: false,
    fixed: false,
    id: "resourcesMenu",
    where: "main",
  },
  getStartedMenu: {
    active: false,
    fixed: false,
    id: "getStartedMenu",
    where: "main",
  },
};

const topResetState = {
  aboutMenu: {
    active: false,
    fixed: false,
    id: "aboutMenu",
    where: "top",
  },
};

const reducer = (state, action) => {
  const newState = {};
  let keys;
  let key;

  switch (action.type) {
    case "START_HOVER":
      keys = Object.keys(state);
      for (key of keys) {
        if (state[key].id === action.id) {
          newState[key] = {
            active: state[key].active,
            hover: true,
            id: state[key].id,
            where: state[key].where,
          };
          return { ...state, ...initialState, ...newState };
        }
      }
      return state;

    case "END_HOVER":
      console.log("END_HOVER");
      keys = Object.keys(state);
      for (key of keys) {
        newState[key] = {
          active: state[key].active,
          hover: false,
          id: state[key].id,
          where: state[key].where,
        };
      }
      return { ...state, ...newState };

    case "TOGGLE":
      keys = Object.keys(state);
      for (key of keys) {
        if (state[key].id === action.id) {
          newState[key] = {
            active: !state[key].active,
            hover: false,
            id: state[key].id,
            where: state[key].where,
          };
          return { ...state, ...initialState, ...newState };
        }
      }
      return state;

    case "RESET":
      switch (action.where) {
        case "top":
          return { ...state, ...topResetState };
        case "main":
          return { ...state, ...mainResetState };
        case "all":
          return { ...state, ...initialState };
        default:
          return state;
      }

    case "RESET_ALL":
      return { ...state, ...initialState };

    default:
      return state;
  }
};

const Layout = ({ children, location }) => {
  const siteMetadata = useSiteMetadata();

  const {
    pageContext: { breadcrumbs },
  } = children.props;

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
      </ThemeProvider>
    </MenuContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
