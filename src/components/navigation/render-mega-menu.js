import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { motion } from "framer-motion";
import Container from "../styles/container";

const MegaMenuPane = styled(motion.div)`
  position: absolute;
  top: 99%;
  left: 0;
  width: 100%;
  z-index: 1000;

  background-color: #f8f8f8;
  padding: 50px;
  display: none;

  > div {
    display: flex;
    justify-content: flex-start;

    > div {
      flex: 0 0 20%;

      &:last-child {
        flex: 0 0 30%;
        margin-left: auto;
      }
    }
  }
  .promoContainer {
    display: flex;
  }
  .promoImage,
  .promoProse {
    flex: 0 0 50%;
  }
  .promoImage {
    padding: 0 30px;
  }
  .promoProse {
    h3 {
      margin-top: 0;
    }
  }
  ul {
    list-style: none;
  }
  li {
    padding: 5px 0;

    &.categoryTitle {
      font-weight: bold;
    }
    &.subCategoryTitle {
      font-weight: bold;
      padding-top: 15px;
    }
  }
`;

/**
 * RenderMenuPane()
 * Component to render a mega menu. Menu panes are animated into/from view
 * with framer-motion and stuled with emotion
 *
 */
const RenderMenuPane = ({ megaMenu, isVisible }) => {
  const variants = {
    visible: {
      opacity: 1,
      display: "flex",
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <MegaMenuPane
      key="child"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      <Container>
        {megaMenu.map(list => (
          <div key={uuid()}>{list}</div>
        ))}
      </Container>
    </MegaMenuPane>
  );
};

RenderMenuPane.propTypes = {
  megaMenu: PropTypes.array.isRequired,
  isVisible: PropTypes.bool,
};

RenderMenuPane.defaultProps = {
  isVisible: false,
};

export default RenderMenuPane;