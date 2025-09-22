import {PopupMenu} from './index';

enum CssClasses {
  MENU_OPEN = 'glue-header__menu--open',
}

enum Strings {
  NO_CHILDREN = 'PopupMenu constructor argument el has no element children.',
}

export {CssClasses, Strings};

/**
 * Interface for MenuBar component.
 */
export interface Menu {
  hasFocus: boolean;
  hasHover: boolean;
  root: HTMLElement;
  init(): void;
  setFocusToFirstItem(): void;
  setFocusToLastItem(): void;
  setFocusToPreviousItem(currentItem: MenuController): void;
  setFocusToNextItem(currentItem: MenuController): void;
  setFocusByFirstCharacter(currentItem: MenuController, char: string): void;
}

/**
 * Interface for the menu controller.
 */
export interface MenuController {
  root: HTMLElement;
  hasFocus?: boolean;
  hasHover?: boolean;
  isMenubarItem: boolean;
  parentMenu: Menu | null;
  popupMenu: PopupMenu | null;
  init(): void;
  destroy(): void;
  setExpanded(flag: boolean): void;
}
