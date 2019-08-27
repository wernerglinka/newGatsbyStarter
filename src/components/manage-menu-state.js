export const initialState = {
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
    hover: false,
    id: "aboutMenu",
    where: "top",
  },
};

const reducer = (state, action) => {
  const newState = {};
  let keys;
  let key;
  let menuID;

  switch (action.type) {
    case "START_HOVER":
      menuID = state[action.id].id;
      if (menuID) {
        newState[menuID] = {
          active: state[menuID].active,
          hover: true,
          id: state[menuID].id,
          where: state[menuID].where,
        };
        return { ...state, ...initialState, ...newState };
      }
      return state;

    case "END_HOVER":
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
      menuID = state[action.id].id;
      if (menuID) {
        newState[menuID] = {
          active: !state[menuID].active,
          hover: false,
          id: state[menuID].id,
          where: state[menuID].where,
        };
        return { ...state, ...initialState, ...newState };
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

export default reducer;
