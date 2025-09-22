import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Coordinate} from '../../math/coordinate';
import {CssClasses as HeaderCssClasses} from '../constants';

import {CssClasses, Strings} from './constants';
import {MenuItem} from './menuitem';

/**
 * This class creates a PopupMenu instance, which uses a controller to
 * show and hide the menu.
 */
class PopupMenu extends Component {
  constructor(root, controller) {
    super(root);
    this.menuItemCollection = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasFocus = false;
    this.hasHover = false;
    /**
     * Sets hasHover to true when the menu is hovered.
     */
    this.handleMouseenter = () => {
      this.hasHover = true;
    };
    /**
     * Waits for 300 mills to close the menu after moving mouse out of the menu.
     */
    this.handleMouseleave = (event) => {
      this.hasHover = false;
      const mousePos = new Coordinate(event.clientX, event.clientY);
      if (this.isInController(mousePos)) return;
      setTimeout(() => {
        this.close(false);
      }, 300);
    };
    /**
     * Sets focus to the item based on the first key that users press.
     */
    this.setFocusByFirstCharacter = (currentItem, char) => {
      char = char.toLowerCase();
      // Gets the search start point.
      let start = this.menuItemCollection.indexOf(currentItem) + 1;
      if (start === this.menuItemCollection.length) {
        start = 0;
      }
      const findIndexFunc = (item, index) => {
        return item === char && index >= start;
      };
      let index = this.firstChars.findIndex(findIndexFunc);
      if (index === -1) {
        start = 0;
        index = this.firstChars.findIndex(findIndexFunc);
      }
      if (index > -1) {
        this.menuItemCollection[index].root.focus();
      }
    };
    this.open = () => {
      this.root.classList.add(CssClasses.MENU_OPEN);
      this.controller.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
      this.controller.setExpanded(true);
    };
    if (this.root.childElementCount === 0) {
      throw new Error(`${Strings.NO_CHILDREN}`);
    }
    this.menuItems = Array.from(
        this.root.querySelectorAll(`.${HeaderCssClasses.LIST_ITEM}`));
    this.controller = controller;
    this.init();
  }
  init() {
    let menuItem;
    this.root.tabIndex = -1;
    this.root.setAttribute(Attribute.ROLE, Role.MENU);
    this.root.addEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.addEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
    for (const item of this.menuItems) {
      item.setAttribute(Attribute.ROLE, Role.NONE);
    }
    const menuLinks = Array.from(this.root.querySelectorAll(
        `:scope > .glue-header__item > .glue-header__link`));
    // Initiates the popup menu attached to the menu item
    for (const link of menuLinks) {
      menuItem = new MenuItem(link, this);
      const nextElement = menuItem.root.nextElementSibling;
      if (nextElement instanceof HTMLUListElement) {
        menuItem.popupMenu = new PopupMenu(nextElement, menuItem);
      }
      this.menuItemCollection.push(menuItem);
      this.addFirstChar(link);
    }
    // Sets the first and last item in the menu.
    const numItems = this.menuItemCollection.length;
    if (numItems > 0) {
      this.firstItem = this.menuItemCollection[0];
      this.lastItem = this.menuItemCollection[numItems - 1];
    }
  }
  destroy() {
    var _a;
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.TAB_INDEX);
    for (const item of this.menuItems) {
      item.removeAttribute(Attribute.ROLE);
    }
    for (const menuItem of this.menuItemCollection) {
      (_a = menuItem.popupMenu) === null || _a === void 0 ? void 0 :
                                                            _a.destroy();
      menuItem.destroy();
    }
    this.root.removeEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.removeEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
  }
  /**
   * Add first charector of each link text to the collection.
   */
  addFirstChar(link) {
    var _a;
    const textContent = (_a = link.textContent) === null || _a === void 0 ?
        void 0 :
        _a.trim().charAt(0).toLowerCase();
    this.firstChars.push(
        textContent !== null && textContent !== void 0 ? textContent : '');
  }
  /**
   * Checks whether the cursor is in the controller area,
   */
  isInController(mousePos) {
    const rect = this.controller.root.getBoundingClientRect();
    return (
        mousePos.x >= rect.left && mousePos.x <= rect.right &&
        mousePos.y >= rect.top && mousePos.y <= rect.bottom);
  }
  /** Assert this is a MenuItem */
  isMenuItem(controller) {
    return controller.parentMenu !== null && controller.isMenubarItem === false;
  }
  /**
   * Sets focus to the menubar item.
   * Looks for the parent node if the current node is a menu item.
   */
  setFocusToMenubarItem(controller) {
    while (controller) {
      if (controller.isMenubarItem) {
        controller.root.focus();
        return controller;
      } else if (this.isMenuItem(controller)) {
        controller.parentMenu.hasFocus = false;
        controller = controller.parentMenu.controller;
      }
    }
    return null;
  }
  /**
   * Sets focus to the controller depending on the keys.
   * Sets focus to the controller element if no argument is passed.
   * Sets focus to the next or previous menubar item when command is passed.
   */
  setFocusToController(command) {
    var _a, _b, _c, _d, _e;
    if (command === undefined) {
      (_b = (_a = this.controller) === null || _a === void 0 ?
           void 0 :
           _a.root) === null ||
              _b === void 0 ?
          void 0 :
          _b.focus();
      return;
    }
    // If the controller is a menuBar item, set focus to the previous
    // or next menuBar item.
    if (this.controller.isMenubarItem) {
      if (command === 'previous') {
        (_c = this.controller.parentMenu) === null || _c === void 0 ?
            void 0 :
            _c.setFocusToPreviousItem(this.controller);
      } else if (command === 'next') {
        (_d = this.controller.parentMenu) === null || _d === void 0 ?
            void 0 :
            _d.setFocusToNextItem(this.controller);
      }
      // If the controller is a popup menu item, set the focus to its
      // controller. If the command is next, set the focus to the next menubar
      // item.
    } else {
      this.controller.root.focus();
      this.close();
      if (command === 'next') {
        const menubarItem = this.setFocusToMenubarItem(this.controller);
        (_e = menubarItem === null || menubarItem === void 0 ?
             void 0 :
             menubarItem.parentMenu) === null ||
                _e === void 0 ?
            void 0 :
            _e.setFocusToNextItem(menubarItem);
      }
    }
  }
  setFocusToFirstItem() {
    var _a;
    (_a = this.firstItem) === null || _a === void 0 ? void 0 : _a.root.focus();
  }
  setFocusToLastItem() {
    var _a;
    (_a = this.lastItem) === null || _a === void 0 ? void 0 : _a.root.focus();
  }
  setFocusToPreviousItem(currentItem) {
    var _a;
    if (currentItem === this.firstItem) {
      (_a = this.lastItem) === null || _a === void 0 ? void 0 : _a.root.focus();
    } else {
      const index = this.menuItemCollection.indexOf(currentItem);
      this.menuItemCollection[index - 1].root.focus();
    }
  }
  setFocusToNextItem(currentItem) {
    var _a;
    if (currentItem === this.lastItem) {
      (_a = this.firstItem) === null || _a === void 0 ? void 0 :
                                                        _a.root.focus();
    } else {
      const index = this.menuItemCollection.indexOf(currentItem);
      this.menuItemCollection[index + 1].root.focus();
    }
  }
  /**
   * Closes the menu only when:
   *  - A true force flag is passed in.
   *  - The menu or its chlid menus do not have focus, and the menu does not
   *    have hover, and when its controller is a menubar item, it is not
   *    hovered.
   */
  close(force = false) {
    var _a;
    // True if the controller is a menubar item and it is hovered.
    let controllerHasHover = false;
    // True when this popup menu or any child popup menu is focused.
    let hasFocus = this.hasFocus;
    // Updates controllerHasHover flag for the menubar item.
    if (this.controller.isMenubarItem) {
      controllerHasHover = this.controller.hasHover;
    }
    if (!hasFocus) {
      for (const item of this.menuItemCollection) {
        hasFocus = hasFocus ||
            !!((_a = item.popupMenu) === null || _a === void 0 ? void 0 :
                                                                 _a.hasFocus);
      }
    }
    if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
      this.root.classList.remove(CssClasses.MENU_OPEN);
      this.controller.setExpanded(false);
    }
  }
}
export {PopupMenu};
