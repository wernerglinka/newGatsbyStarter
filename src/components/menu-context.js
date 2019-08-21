import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Initial menu context
 */
export const MenuContext = React.createContext({
  menu: {
    solutionsMenuIsActive: false,
    productsMenuIsActive: false,
    resourcesMenuIsActive: false,
    getStartedMenuIsActive: false,
    solutionsMenuHover: false,
    productsMenuHover: false,
    resourcesMenuHover: false,
  },
  setMenu: () => {},
});

/**
 * Context provider for page menus
 *
 */
export const MenuContextProvider = ({ children }) => {
  const [menuState, setMenuState] = useState({
    menu: {
      solutionsMenuIsActive: false,
      productsMenuIsActive: false,
      resourcesMenuIsActive: false,
      getStartedMenuIsActive: false,
      solutionsMenuHover: false,
      productsMenuHover: false,
      resourcesMenuHover: false,
    },
    setMenu: menu => {
      setMenuState({ ...menuState, menu });
    },
  });

  return (
    <MenuContext.Provider value={menuState}>{children}</MenuContext.Provider>
  );
};

MenuContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
