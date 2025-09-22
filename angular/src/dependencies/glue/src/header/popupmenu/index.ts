import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Coordinate} from '../../math/coordinate';
import {CssClasses as HeaderCssClasses} from '../constants';
import {Menu, MenuController} from '../popupmenu/constants';

import {CssClasses, Strings} from './constants';
import {MenuItem} from './menuitem';

/**
 * This class creates a PopupMenu instance, which uses a controller to
 * show and hide the menu.
 */
class PopupMenu extends Component implements Menu {
  readonly controller: MenuController;
  readonly menuItemCollection: MenuController[] = [];
  private readonly firstChars: string[] = [];
  private firstItem: MenuController | null = null;
  private lastItem: MenuController | null = null;
  private readonly menuItems: HTMLElement[];
  hasFocus: boolean = false;
  hasHover: boolean = false;

  constructor(root: HTMLElement, controller: MenuController) {
    super(root);

    if (this.root.childElementCount === 0) {
      throw new Error(`${Strings.NO_CHILDREN}`);
    }

    this.menuItems = Array.from(
      this.root.querySelectorAll(`.${HeaderCssClasses.LIST_ITEM}`),
    );
    this.controller = controller;
    this.init();
  }

  init() {
    let menuItem: MenuItem;
    this.root.tabIndex = -1;
    this.root.setAttribute(Attribute.ROLE, Role.MENU);
    this.root.addEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.addEventListener(EventType.MOUSELEAVE, this.handleMouseleave);

    for (const item of this.menuItems) {
      item.setAttribute(Attribute.ROLE, Role.NONE);
    }

    const menuLinks: HTMLLinkElement[] = Array.from(
      this.root.querySelectorAll(
        `:scope > .glue-header__item > .glue-header__link`,
      ),
    );

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

  override destroy() {
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.TAB_INDEX);
    for (const item of this.menuItems) {
      item.removeAttribute(Attribute.ROLE);
    }
    for (const menuItem of this.menuItemCollection) {
      menuItem.popupMenu?.destroy();
      menuItem.destroy();
    }
    this.root.removeEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.removeEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
  }

  /**
   * Add first charector of each link text to the collection.
   */
  private addFirstChar(link: HTMLElement) {
    const textContent = link.textContent?.trim().charAt(0).toLowerCase();
    this.firstChars.push(textContent ?? '');
  }

  /**
   * Sets hasHover to true when the menu is hovered.
   */
  private readonly handleMouseenter = () => {
    this.hasHover = true;
  };

  /**
   * Waits for 300 mills to close the menu after moving mouse out of the menu.
   */
  private readonly handleMouseleave = (event: MouseEvent) => {
    this.hasHover = false;

    const mousePos = new Coordinate(event.clientX, event.clientY);
    if (this.isInController(mousePos)) return;

    setTimeout(() => {
      this.close(false);
    }, 300);
  };

  /**
   * Checks whether the cursor is in the controller area,
   */
  private isInController(mousePos: Coordinate): boolean {
    const rect = this.controller.root.getBoundingClientRect();
    return (
      mousePos.x >= rect.left &&
      mousePos.x <= rect.right &&
      mousePos.y >= rect.top &&
      mousePos.y <= rect.bottom
    );
  }

  /** Assert this is a MenuItem */
  private isMenuItem(controller: MenuController): controller is MenuItem {
    return controller.parentMenu !== null && controller.isMenubarItem === false;
  }

  /**
   * Sets focus to the menubar item.
   * Looks for the parent node if the current node is a menu item.
   */
  private setFocusToMenubarItem(
    controller: MenuController,
  ): MenuController | null {
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
  setFocusToController(command?: undefined | 'previous' | 'next') {
    if (command === undefined) {
      this.controller?.root?.focus();
      return;
    }

    // If the controller is a menuBar item, set focus to the previous
    // or next menuBar item.
    if (this.controller.isMenubarItem) {
      if (command === 'previous') {
        this.controller.parentMenu?.setFocusToPreviousItem(this.controller);
      } else if (command === 'next') {
        this.controller.parentMenu?.setFocusToNextItem(this.controller);
      }
      // If the controller is a popup menu item, set the focus to its
      // controller. If the command is next, set the focus to the next menubar
      // item.
    } else {
      this.controller.root.focus();
      this.close();

      if (command === 'next') {
        const menubarItem = this.setFocusToMenubarItem(this.controller);
        menubarItem?.parentMenu?.setFocusToNextItem(menubarItem);
      }
    }
  }

  setFocusToFirstItem() {
    this.firstItem?.root.focus();
  }

  setFocusToLastItem() {
    this.lastItem?.root.focus();
  }

  setFocusToPreviousItem(currentItem: MenuController) {
    if (currentItem === this.firstItem) {
      this.lastItem?.root.focus();
    } else {
      const index = this.menuItemCollection.indexOf(currentItem);
      this.menuItemCollection[index - 1].root.focus();
    }
  }

  setFocusToNextItem(currentItem: MenuController) {
    if (currentItem === this.lastItem) {
      this.firstItem?.root.focus();
    } else {
      const index = this.menuItemCollection.indexOf(currentItem);
      this.menuItemCollection[index + 1].root.focus();
    }
  }

  /**
   * Sets focus to the item based on the first key that users press.
   */
  setFocusByFirstCharacter = (currentItem: MenuController, char: string) => {
    char = char.toLowerCase();

    // Gets the search start point.
    let start = this.menuItemCollection.indexOf(currentItem) + 1;
    if (start === this.menuItemCollection.length) {
      start = 0;
    }

    const findIndexFunc = (item: string, index: number) => {
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

  open = () => {
    this.root.classList.add(CssClasses.MENU_OPEN);
    this.controller.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
    this.controller.setExpanded(true);
  };

  /**
   * Closes the menu only when:
   *  - A true force flag is passed in.
   *  - The menu or its chlid menus do not have focus, and the menu does not
   *    have hover, and when its controller is a menubar item, it is not
   *    hovered.
   */
  close(force = false) {
    // True if the controller is a menubar item and it is hovered.
    let controllerHasHover = false;

    // True when this popup menu or any child popup menu is focused.
    let hasFocus = this.hasFocus;

    // Updates controllerHasHover flag for the menubar item.
    if (this.controller.isMenubarItem) {
      controllerHasHover = this.controller.hasHover!;
    }

    if (!hasFocus) {
      for (const item of this.menuItemCollection) {
        hasFocus = hasFocus || !!item.popupMenu?.hasFocus;
      }
    }

    if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
      this.root.classList.remove(CssClasses.MENU_OPEN);
      this.controller.setExpanded(false);
    }
  }
}

export {PopupMenu};
