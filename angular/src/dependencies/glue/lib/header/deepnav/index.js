import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {CssClasses} from '../constants';

import {Strings} from './constants';
import {MenubarItem} from './menubaritem';

/**
 * This class creates a navigation menu bar instance, each menu item may control
 * a dropdown sub menu.
 */
class Menubar extends Component {
  constructor(root) {
    super(root);
    /** A collection of the menu items */
    this.menubarItems = [];
    /** A collection of the first characters of each menu item label */
    this.firstChars = [];
    /** The first  menu item. */
    this.firstItem = null;
    /** The last  menu item. */
    this.lastItem = null;
    /** A flag to show menubar's focus status. */
    this.hasFocus = false;
    /** A flag to show menubar's hover status. */
    this.hasHover = false;
    if (root.childElementCount === 0) {
      throw new Error(Strings.ERROR_PREFIX + Strings.ERROR_MSG_NO_CHILDREN);
    }
    this.init();
  }
  /**
   * Initializes the menubar component.
   * Throws an error if the menubar is empty.
   */
  init() {
    var _a;
    const listItems =
        this.root.querySelectorAll(`:scope > .${CssClasses.LIST_ITEM}`);
    this.root.setAttribute(Attribute.ROLE, Role.MENUBAR);
    for (const listItem of listItems) {
      listItem.setAttribute(Attribute.ROLE, Role.NONE);
    }
    // Traverse the children elements and store reference in menuitems array.
    let elem = this.root.firstElementChild;
    let menubarItem;
    let menuElement;
    let textContent;
    while (elem) {
      menuElement = elem.firstElementChild;
      if (elem && menuElement instanceof HTMLAnchorElement) {
        menubarItem = new MenubarItem(menuElement, this);
        this.menubarItems.push(menubarItem);
        textContent = (_a = menuElement.textContent) === null || _a === void 0 ?
            void 0 :
            _a.trim();
        if (textContent) {
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
        }
      }
      elem = elem.nextElementSibling;
    }
    const numItems = this.menubarItems.length;
    if (numItems > 0) {
      this.firstItem = this.menubarItems[0];
      this.lastItem = this.menubarItems[numItems - 1];
      this.firstItem.root.tabIndex = 0;
    }
  }
  destroy() {
    for (const item of this.menubarItems) {
      item.destroy();
    }
  }
  /**
   * Sets focus to the specified menu item.
   */
  setFocusToItem(newItem) {
    var _a;
    let isExpanded = false;
    for (const menubarItem of this.menubarItems) {
      if (menubarItem.root.tabIndex === 0) {
        isExpanded =
            menubarItem.root.getAttribute(Attribute.ARIA_EXPANDED) === 'true';
      }
      menubarItem.root.tabIndex = -1;
      (_a = menubarItem.popupMenu) === null || _a === void 0 ? void 0 :
                                                               _a.close();
    }
    newItem.root.focus();
    newItem.root.tabIndex = 0;
    if (isExpanded && newItem.popupMenu) {
      newItem.popupMenu.open();
    }
  }
  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem);
  }
  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem);
  }
  /**
   * Sets focus to the previous menu item.
   * If the current item is the first menu item, move focus to the last
   * menu item.
   */
  setFocusToPreviousItem(currentItem) {
    let index;
    let newItem;
    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      index = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index - 1];
    }
    this.setFocusToItem(newItem);
  }
  /**
   * Sets focus to the next menu item.
   * If the current item is the last menu item, move focus to the first
   * menu item.
   */
  setFocusToNextItem(currentItem) {
    let index;
    let newItem;
    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      index = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index + 1];
    }
    this.setFocusToItem(newItem);
  }
  /**
   * Sets focus to the menu item based on the first Character.
   * Search matching label from the current item, if it hits the end,
   * start from the first item, vice versa.
   */
  setFocusByFirstCharacter(currentItem, char) {
    let start;
    let index;
    char = char.toLowerCase();
    start = this.menubarItems.indexOf(currentItem) + 1;
    if (start === this.menubarItems.length) {
      start = 0;
    }
    const findIndexFunc = (item, index) => {
      return item === char && index >= start;
    };
    index = this.firstChars.findIndex(findIndexFunc);
    if (index === -1) {
      start = 0;
      index = this.firstChars.findIndex(findIndexFunc);
    }
    if (index > -1) {
      this.setFocusToItem(this.menubarItems[index]);
    }
  }
}
export {Menubar};
