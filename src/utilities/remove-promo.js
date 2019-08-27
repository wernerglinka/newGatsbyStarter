/**
 * removePromo()
 * Removes the promo data from a menu
 */
function removePromo(menu) {
  menu.forEach(menuItem => {
    const index = menu.indexOf(menuItem);
    if (menuItem.props.className === "promoContainer") {
      menu.splice(index, 1);
    }
  });
  return menu;
}

export default removePromo;
