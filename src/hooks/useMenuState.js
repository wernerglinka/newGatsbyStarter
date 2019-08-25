import { useContext } from "react";
import { MenuContext } from "../components/menu-context";

const useMenuState = () => {
  const [_, setMenuState] = useContext(MenuContext);

  function toggleMenuState(menuObj, menuItem) {
    switch (menuItem) {
      case "about":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          aboutMenuIsActive: !menuState.aboutMenuIsActive,
        }));
        break;
      case "solutions":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          solutionsMenuIsActive: !menuState.solutionsMenuIsActive,
        }));
        break;
      case "products":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          productsMenuIsActive: !menuState.productsMenuIsActive,
        }));
        break;
      case "resources":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          resourcesMenuIsActive: !menuState.resourcesMenuIsActive,
        }));
        break;
      case "getStarted":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          getStartedMenuIsActive: !menuState.getStartedMenuIsActive,
        }));
        break;
      default:
    }
  }

  function hoverMenuState(menuObj, menuItem) {
    switch (menuItem) {
      case "about":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          aboutMenuHover: true,
        }));
        break;
      case "solutions":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          solutionsMenuHover: true,
        }));
        break;
      case "products":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          productsMenuHover: true,
        }));
        break;
      case "resources":
        setMenuState(menuState => ({
          ...menuState,
          ...menuObj,
          resourcesMenuHover: true,
        }));
        break;
      default:
    }
  }

  function resetMenuState(menuObj) {
    setMenuState(menuState => ({ ...menuState, ...menuObj }));
  }

  return {
    toggleMenuState,
    hoverMenuState,
    resetMenuState,
  };
};

export default useMenuState;
