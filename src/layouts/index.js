import React from "react";
import PropTypes from "prop-types";
// animation
import { motion, AnimatePresence } from "framer-motion";
// theming
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
// components
import useSiteMetadata from "../hooks/useSiteMetadata";
import Head from "../components/head";
import Header from "../components/header";
// global reset etc...
import "./global.css";

// page transition setup
const duration = 0.35;
const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration },
  },
};

const Layout = ({ children, location }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <ThemeProvider theme={theme}>
      <Head metaData={siteMetadata} />
      <Header />
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          id="main"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
