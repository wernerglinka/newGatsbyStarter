import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

/**
 * Initial menu context
 */
export const MenuContext = createContext([{}, () => {}]);

/**
 * Context provider for page menus
 *
 */
export const MenuContextProvider = ({ children }) => {
  const [menuState, setMenuState] = useState({
    aboutMenuIsActive: false,
    aboutMenuHover: false,
    solutionsMenuIsActive: false,
    productsMenuIsActive: false,
    resourcesMenuIsActive: false,
    getStartedMenuIsActive: false,
    solutionsMenuHover: false,
    productsMenuHover: false,
    resourcesMenuHover: false,
  });

  return (
    <MenuContext.Provider value={[menuState, setMenuState]}>
      {children}
    </MenuContext.Provider>
  );
};

MenuContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
