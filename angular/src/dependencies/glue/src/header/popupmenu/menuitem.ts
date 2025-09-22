import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';

import {MenuController} from './constants';
import {PopupMenu} from './index';

/**
 * This class creates a child menu item component in a menu.
 * This menu item may/not control a popup menu.
 */
class MenuItem extends Component implements MenuController {
  isMenubarItem = false;

  /** The  popopMenu is the menu controlled by the menu item. */
  popupMenu: PopupMenu | null = null;

  constructor(
    root: HTMLLinkElement,
    readonly parentMenu: PopupMenu,
  ) {
    super(root);
    this.init();
  }

  init() {
    this.root.tabIndex = -1;

    if (!this.root.getAttribute(Attribute.ROLE)) {
      this.root.setAttribute(Attribute.ROLE, Role.MENUITEM);
    }

    this.root.addEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    this.root.addEventListener(EventType.FOCUS, this.handleFocus);
    this.root.addEventListener(EventType.BLUR, this.handleBlur);
    this.root.addEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.addEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
  }

  override destroy() {
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.TAB_INDEX);
    this.root.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.root.removeEventListener(EventType.FOCUS, this.handleFocus);
    this.root.removeEventListener(EventType.BLUR, this.handleBlur);
    this.root.removeEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.removeEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
  }

  /** Assert this is a MenuItem */
  private controllerWithoutParentMenu(controller: MenuController): boolean {
    return controller.parentMenu === null;
  }

  /**
   * Handles keydown event on the menu item.
   *
   */
  private readonly handleKeydown = (event: KeyboardEvent) => {
    let preventDefault = false;
    const char = event.key;

    function isPrintableCharacter(str: string) {
      return str.length === 1 && str.match(/\S/);
    }

    switch (event.key) {
      case Key.SPACE:
      case Key.ENTER:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        }
        // Allows default behavior so it can trigger links.
        preventDefault = false;
        break;

      case Key.UP:
        this.parentMenu.setFocusToPreviousItem(this);
        preventDefault = true;
        break;

      case Key.DOWN:
        this.parentMenu.setFocusToNextItem(this);
        preventDefault = true;
        break;

      case Key.LEFT:
        // Returns if the controller does not have a parent menu
        if (this.controllerWithoutParentMenu(this.parentMenu.controller)) {
          return;
        }
        this.parentMenu.setFocusToController('previous');
        this.parentMenu.close(true);
        preventDefault = true;
        break;

      case Key.RIGHT:
        // Returns if the controller does not have a parent menu
        if (this.controllerWithoutParentMenu(this.parentMenu.controller)) {
          return;
        }
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          this.parentMenu.setFocusToController('next');
          this.parentMenu.close(true);
        }
        preventDefault = true;
        break;

      case Key.HOME:
      case Key.PAGEUP:
        this.parentMenu.setFocusToFirstItem();
        preventDefault = true;
        break;

      case Key.END:
      case Key.PAGEDOWN:
        this.parentMenu.setFocusToLastItem();
        preventDefault = true;
        break;

      case Key.ESC:
        this.parentMenu.setFocusToController();
        this.parentMenu.close(true);
        preventDefault = true;
        break;

      case Key.TAB:
        this.parentMenu.setFocusToController();
        this.parentMenu.close(true);
        break;

      default:
        if (isPrintableCharacter(char)) {
          this.parentMenu.setFocusByFirstCharacter(this, char);
          preventDefault = true;
        }
        break;
    }

    if (preventDefault) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  setExpanded(flag: boolean) {
    if (flag) {
      this.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
    } else {
      this.root.setAttribute(Attribute.ARIA_EXPANDED, 'false');
    }
  }

  private readonly handleClick = () => {
    this.parentMenu.setFocusToController();
    this.parentMenu.close(true);
  };

  private readonly handleFocus = () => {
    this.parentMenu.hasFocus = true;
  };

  private readonly handleBlur = () => {
    this.parentMenu.hasFocus = false;
    setTimeout(() => {
      this.parentMenu.close(false);
    }, 300);
  };

  private readonly handleMouseenter = () => {
    this.parentMenu.hasHover = true;
    this.parentMenu.open();

    if (this.popupMenu) {
      this.popupMenu.hasHover = true;
    }
    this.popupMenu?.open();
  };

  private readonly handleMouseleave = () => {
    if (this.popupMenu) {
      this.popupMenu.hasHover = false;
    }
    this.popupMenu?.close(true);
  };
}

export {MenuItem};
