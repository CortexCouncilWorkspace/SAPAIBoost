/**
 * @fileoverview Constants used by the Header component.
 */

enum CssClasses {
  ROOT = 'glue-header',
  BAR = 'glue-header__bar',
  TOGGLE_BTN = 'glue-header__drawer-toggle-btn',
  DRAWER_EL = 'glue-header__drawer',
  DRAWER_IS_SHOWN = 'glue-is-showing-drawer',
  DOUBLE = 'glue-header--double',
  WHOLLY_SCROLLED = 'glue-header-is-wholly-scrolled',
  LOCK_UP = 'glue-header-lock-up',
  LINK_BAR = 'glue-header__link-bar',
  LIST = 'glue-header__list',
  LIST_ITEM = 'glue-header__item',
  NESTED_LIST = 'glue-header__list--nested',
  LINK_ITEM = 'glue-header__link',
  LOGO_SVG = 'glue-header__logo-svg',
  NO_DRAWER = 'glue-header-no-drawer',
  STEPPED_NAV_ENABLE = 'glue-header-stepped-nav-enabled',
  ACTIVE_MENU = 'glue-header--is-active',
  ACTIVE_LINK = 'glue-header__item--active',
  IS_ANIMATING = 'glue-is-animating',
  BAR_DESKTOP = 'glue-header__bar--desktop',
  BAR_MOBILE = 'glue-header__bar--mobile',
  REWIND_SHADOW = 'glue-header--rewind-box-shadow',
  HEADER_CONTAINER = 'glue-header__container',
  SKIP_BTN = 'glue-header__skip-content',
  DEEP_NAV = 'glue-header__deep-nav',
  TRANSPARENT = 'glue-header--transparent',
  HOVERED = 'glue-header--hovered',
  FOCUSED = 'glue-header--focused',
  ACTIVE = 'glue-header--active',
}

enum Strings {
  MISSING_ROOT_ELEMENT = 'No element with "glue-header class" was found. Header component needs a root element.',
  MISSING_HEADER_BAR_ELEMENT = 'No element with "glue-header__bar" class was found. This is required by Header component.',
  MISSING_DRAWER_ELEMENT = 'No element with "glue-header__drawer" class was found. This is required by Header component.',
  MISSING_TOGGLE_BTN_ELEMENT = 'No element with "glue-header__drawer-toggle-btn" class was found. This is required by Header component.',
  MISSING_LINK_BAR_ELEMENT = 'No element with "glue-header__link-bar" class was found. This is required by Header component.',
  UNKNOWN_CUSTOM_BREAKPOINT = 'Unknown custom breakpoint. Valid values are "md", "lg", or "xl".',
  SCROLL_UP = 'up',
  SCROLL_DOWN = 'down',
  INCORRECT_TYPE = 'Incorrect data type',
  SHOW_EVENT = 'glueheadershow',
  HIDE_EVENT = 'glueheaderhide',
}

enum Numbers {
  MAX_PAGE_OFFSET = 500,
  ANIMATING_STATE_BUFFER = 20,
  SCROLL_THRESHOLD = 50,
  POSITION_CHANGE_BUFFER = 300,
}

export {CssClasses, Numbers, Strings};
