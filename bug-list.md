# Bug List

- components/navigation/top-menu-desktop.js line 63
  When this line is uncommented then clicks in the megamenus will not work. This line resets the state of the About dropdown in the MenuContext. Same as in main-menu-desktop.

  In addition the About dropdown animation doesn't work. If I use the react tools and set isVisible in them, then the animation is executed.

  > > > > > Looks like the top menu is always re-rendered so the an imation doesn't work.
