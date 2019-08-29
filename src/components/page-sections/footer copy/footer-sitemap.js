import React from "react";
import propTypes from "prop-types";
import uuid from "uuid/v4";
import styled from "@emotion/styled";
import useMainNavLinks from "../../../hooks/useMainMenuLinks";
import processLists from "../../navigation/process-mega-menu-lists";
import removePromo from "../../../utilities/remove-promo";

const MenuPanesWrapper = styled.div`
  background-color: ${props => props.theme.footerBackground};
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  &.open {
    padding-top: 30px;
    max-height: 720px;
  }
`;

const MenuPane = styled.div`
  width: 100%;
  > div {
    padding: 0 0 30px 0;
    display: flex;
    justify-content: flex-start;

    ul {
      flex: 0 0 33%;
    }
    li {
      list-style: none;
    }
  }
`;

/**
 * FooterSitemap()
 * Component to render the sitemap
 * The sitemap is constructed using the same as the main menu in the header sans the promo section
 */
const FooterSitemap = ({ isVisible }) => {
  // get all nav links from the data layer
  const allLinks = useMainNavLinks();

  // create the menu headers
  const menuHeaders = [];
  const temp = Object.values(allLinks);
  temp.forEach((item, i) => {
    // extract the main menu items
    menuHeaders.push({
      name: temp[i].edges[0].node.label,
      class: temp[i].edges[0].node.class,
    });
  });

  // create the three sections and remove the promos
  // in one array so we can loop over the entire data
  // and insert a section header
  const menuContent = [];
  const solutionsMegaMenu = removePromo(
    processLists(allLinks.allSolutionsJson.edges)
  );
  menuContent.push(solutionsMegaMenu);

  const productsMegaMenu = removePromo(
    processLists(allLinks.allProductsJson.edges)
  );
  menuContent.push(productsMegaMenu);

  const resourcesMegaMenu = removePromo(
    processLists(allLinks.allResourcesJson.edges)
  );
  menuContent.push(resourcesMegaMenu);

  return (
    <MenuPanesWrapper className={isVisible ? "open" : null}>
      {menuContent.map((list, i) => (
        <MenuPane key={uuid()}>
          {/* section header, e.g. Solutions, Products... */}
          <h2>{menuHeaders[i].name}</h2>
          {/* link lists */}
          <div>{list}</div>
        </MenuPane>
      ))}
    </MenuPanesWrapper>
  );
};

FooterSitemap.propTypes = {
  isVisible: propTypes.bool.isRequired,
};

export default FooterSitemap;
