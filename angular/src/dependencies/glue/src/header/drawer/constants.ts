/**
 * @fileoverview Constants used by the Header component.
 */

interface DrawerOptions {
  toggleBtn: HTMLElement;
}

enum CssClasses {
  ROOT = 'glue-header__drawer',
  DRAWER_IS_OPEN = 'glue-header__drawer--is-open',
  TOGGLE_BTN = `glue-header__drawer-toggle-btn`,
  IS_ANIMATING = 'glue-is-animating',
  GLUE_BUTTON = 'glue-button',
  NO_SCROLL = 'glue-no-scroll',
  BACKDROP = 'glue-header__drawer-backdrop',
}

enum Strings {
  MISSING_DRAWER_ELEMENT = 'No element with "glue-header__drawer" class was found. Drawer component needs a root element.',
  MISSING_BACKDROP_ELEMENT = 'No element with "glue-header__drawer-backdrop" class was found.',
  OPEN = 'glueHeaderDrawerOpen',
  CLOSE = 'glueHeaderDrawerClose',
  TOGGLE_BTN = 'toggleBtn',
}

export {CssClasses, Strings, type DrawerOptions};
