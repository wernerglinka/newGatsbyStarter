import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { motion, AnimatePresence } from "framer-motion";

const MegaMenuPane = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: flex-start;
  background-color: #f8f8f8;
  padding: 50px;

  ul {
    list-style: none;
    padding-left: 50px;
  }
`;

const PaintMenuPane = ({ megaMenu, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        key="child"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MegaMenuPane key={uuid()}>
          {megaMenu.map(list => (
            <div key={uuid()}>{list}</div>
          ))}
        </MegaMenuPane>
      </motion.div>
    )}
  </AnimatePresence>
);

PaintMenuPane.propTypes = {
  megaMenu: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default PaintMenuPane;
