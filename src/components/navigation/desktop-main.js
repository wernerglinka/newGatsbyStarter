import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useGetMainNavLinks from "../../hooks/useGetMainNavLinks";
import styled from "@emotion/styled";
import processLists from './process-lists';

const MainMenu = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    padding: 0 20px;

    a {
      text-decoration: none;

      &.active {
        color: #ff0000;
      }
    }
  }
`;

const MegaMenuPane = styled.div`
  display: relative;
`;



const DesktopMain = props => {
  const [solutionsMenuIsActive, setSolutionsMenuIsActive] = useState(false);
  const [productsMenuIsActive, setProductsMenuIsActive] = useState(false);
  const [resourcesMenuIsActive, setResourcesMenuIsActive] = useState(false);
  
  // get all nav links from the data layer
  const allLinks = useGetMainNavLinks();
  // create the top level menu
  const topLevelMenu = [];
  topLevelMenu.push(allLinks.allSolutionsJson.edges[0].node.label);
  topLevelMenu.push(allLinks.allProductsJson.edges[0].node.label);
  topLevelMenu.push(allLinks.allResourcesJson.edges[0].node.label);
  // get the megamenu content
  const solutionsMegaMenu = processLists(allLinks.allSolutionsJson.edges);
  const productsMegaMenu = processLists(allLinks.allProductsJson.edges);
  const resourcesMegaMenu = processLists(allLinks.allResourcesJson.edges);

  useEffect(() => {
    () => handleMenuSelection(e);
  }), [solutionsMenuIsActive, productsMenuIsActive, resourcesMenuIsActive];

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {document.removeEventListener("click", handleOutsideClick);}
  }, []);

  const buttonRef = useRef(null);

  function handleOutsideClick(e) {
    console.log(buttonRef.current);
    setSolutionsMenuIsActive(false);
    setProductsMenuIsActive(false);
    setResourcesMenuIsActive(false);
  }

  function handleMenuSelection(e) {
    const target = e.target.innerHTML.toLowerCase();
    switch (target) {
      case 'solutions': 
        setSolutionsMenuIsActive(true);
        setProductsMenuIsActive(false);
        setResourcesMenuIsActive(false);
        break;
      case 'products':
        setProductsMenuIsActive(true);
        setSolutionsMenuIsActive(false);
        setResourcesMenuIsActive(false);
        break;
      case 'resources':
        setResourcesMenuIsActive(true);
        setProductsMenuIsActive(false);
        setSolutionsMenuIsActive(false);
        break;
      default:
    }
  }
  

  return (
    <nav>
      <MainMenu>
        {topLevelMenu.map((mainMenuItem) => (
            <li key={mainMenuItem} onClick={handleMenuSelection} ref={buttonRef}>
              {mainMenuItem}
            </li>
          )
        )}
      </MainMenu>

      {solutionsMenuIsActive && <MegaMenuPane>
          {solutionsMegaMenu.map(list => list)}
      </MegaMenuPane>}
      {productsMenuIsActive && <MegaMenuPane>
          {productsMegaMenu.map(list => list)}
      </MegaMenuPane>}
      {resourcesMenuIsActive && <MegaMenuPane>
          {resourcesMegaMenu.map(list => list)}
      </MegaMenuPane>}
    </nav>
  );
};

DesktopMain.propTypes = {
  
};

export default DesktopMain;