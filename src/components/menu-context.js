import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export const MenuContext = createContext();

export const MenuContextProvider = ({ reducer, initialState, children }) => {
  return (
    <MenuContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </MenuContext.Provider>
  );
};

MenuContextProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.shape().isRequired,
};

export const getMenuState = () => useContext(MenuContext);
