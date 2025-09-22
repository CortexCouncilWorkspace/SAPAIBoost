/**
 * @fileoverview A list of Glue attributes.
 */

enum Attribute {
  ARIA_CONTROLS = 'aria-controls',
  ARIA_CURRENT = 'aria-current',
  ARIA_DESCRIBEDBY = 'aria-describedby',
  ARIA_EXPANDED = 'aria-expanded',
  ARIA_HASPOPUP = 'aria-haspopup',
  ARIA_HIDDEN = 'aria-hidden',
  ARIA_LABELLEDBY = 'aria-labelledby',
  ARIA_LABEL = 'aria-label',
  ARIA_LIVE = 'aria-live',
  ARIA_MODAL = 'aria-modal',
  ARIA_SELECTED = 'aria-selected',
  INERT = 'inert',
  ROLE = 'role',
  TAB_INDEX = 'tabindex',
  TYPE = 'type',
}

enum Direction {
  LTR = 'ltr',
  RTL = 'rtl',
}

enum Role {
  BUTTON = 'button',
  DIALOG = 'dialog',
  REGION = 'region',
  TABPANEL = 'tabpanel',
  TABLIST = 'tablist',
  NAVIGATION = 'navigation',
  TAB = 'tab',
  MENU = 'menu',
  MENUITEM = 'menuitem',
  MENUBAR = 'menubar',
  TOOLTIP = 'tooltip',
  GRIDCELL = 'gridcell',
  ROW = 'row',
  PRESENTATION = 'presentation',
  NONE = 'none',
}

enum TabIndex {
  TABBABLE = 0,
  NOT_TABBABLE = -1,
}

export {Attribute, Direction, Role, TabIndex};
