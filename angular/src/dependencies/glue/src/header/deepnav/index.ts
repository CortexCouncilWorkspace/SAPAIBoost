import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {CssClasses} from '../constants';
import {Menu, MenuController} from '../popupmenu/constants';

import {Strings} from './constants';
import {MenubarItem} from './menubaritem';

/**
 * This class creates a navigation menu bar instance, each menu item may control
 * a dropdown sub menu.
 */
class Menubar extends Component implements Menu {
  /** A collection of the menu items */
  readonly menubarItems: MenuController[] = [];

  /** A collection of the first characters of each menu item label */
  private readonly firstChars: string[] = [];

  /** The first  menu item. */
  private firstItem: MenuController | null = null;

  /** The last  menu item. */
  private lastItem: MenuController | null = null;

  /** A flag to show menubar's focus status. */
  hasFocus: boolean = false;

  /** A flag to show menubar's hover status. */
  hasHover: boolean = false;

  constructor(root: HTMLElement) {
    super(root);

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
    const listItems = this.root.querySelectorAll<HTMLElement>(
      `:scope > .${CssClasses.LIST_ITEM}`,
    );
    this.root.setAttribute(Attribute.ROLE, Role.MENUBAR);
    for (const listItem of listItems) {
      listItem.setAttribute(Attribute.ROLE, Role.NONE);
    }

    // Traverse the children elements and store reference in menuitems array.
    let elem = this.root.firstElementChild;
    let menubarItem: MenubarItem;
    let menuElement: Element | null;
    let textContent: string | undefined;

    while (elem) {
      menuElement = elem.firstElementChild;

      if (elem && menuElement instanceof HTMLAnchorElement) {
        menubarItem = new MenubarItem(menuElement, this);
        this.menubarItems.push(menubarItem);
        textContent = menuElement.textContent?.trim();
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

  override destroy() {
    for (const item of this.menubarItems) {
      item.destroy();
    }
  }

  /**
   * Sets focus to the specified menu item.
   */
  private setFocusToItem(newItem: MenuController) {
    let isExpanded = false;

    for (const menubarItem of this.menubarItems) {
      if (menubarItem.root.tabIndex === 0) {
        isExpanded =
          menubarItem.root.getAttribute(Attribute.ARIA_EXPANDED) === 'true';
      }
      menubarItem.root.tabIndex = -1;
      menubarItem.popupMenu?.close();
    }

    newItem.root.focus();
    newItem.root.tabIndex = 0;

    if (isExpanded && newItem.popupMenu) {
      newItem.popupMenu.open();
    }
  }

  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem!);
  }

  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem!);
  }

  /**
   * Sets focus to the previous menu item.
   * If the current item is the first menu item, move focus to the last
   * menu item.
   */
  setFocusToPreviousItem(currentItem: MenuController) {
    let index;
    let newItem;

    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      index = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index - 1];
    }
    this.setFocusToItem(newItem!);
  }

  /**
   * Sets focus to the next menu item.
   * If the current item is the last menu item, move focus to the first
   * menu item.
   */
  setFocusToNextItem(currentItem: MenuController) {
    let index;
    let newItem;

    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      index = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index + 1];
    }
    this.setFocusToItem(newItem!);
  }

  /**
   * Sets focus to the menu item based on the first Character.
   * Search matching label from the current item, if it hits the end,
   * start from the first item, vice versa.
   */
  setFocusByFirstCharacter(currentItem: MenuController, char: string) {
    let start: number;
    let index: number;

    char = char.toLowerCase();
    start = this.menubarItems.indexOf(currentItem) + 1;
    if (start === this.menubarItems.length) {
      start = 0;
    }

    const findIndexFunc = (item: string, index: number) => {
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
