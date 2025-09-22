import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
/**
 * This class creates a child menu item component in a menu.
 * This menu item may/not control a popup menu.
 */
class MenuItem extends Component {
  constructor(root, parentMenu) {
    super(root);
    this.parentMenu = parentMenu;
    this.isMenubarItem = false;
    /** The  popopMenu is the menu controlled by the menu item. */
    this.popupMenu = null;
    /**
     * Handles keydown event on the menu item.
     *
     */
    this.handleKeydown = (event) => {
      let preventDefault = false;
      const char = event.key;
      function isPrintableCharacter(str) {
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
    this.handleClick = () => {
      this.parentMenu.setFocusToController();
      this.parentMenu.close(true);
    };
    this.handleFocus = () => {
      this.parentMenu.hasFocus = true;
    };
    this.handleBlur = () => {
      this.parentMenu.hasFocus = false;
      setTimeout(() => {
        this.parentMenu.close(false);
      }, 300);
    };
    this.handleMouseenter = () => {
      var _a;
      this.parentMenu.hasHover = true;
      this.parentMenu.open();
      if (this.popupMenu) {
        this.popupMenu.hasHover = true;
      }
      (_a = this.popupMenu) === null || _a === void 0 ? void 0 : _a.open();
    };
    this.handleMouseleave = () => {
      var _a;
      if (this.popupMenu) {
        this.popupMenu.hasHover = false;
      }
      (_a = this.popupMenu) === null || _a === void 0 ? void 0 : _a.close(true);
    };
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
  destroy() {
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
  controllerWithoutParentMenu(controller) {
    return controller.parentMenu === null;
  }
  setExpanded(flag) {
    if (flag) {
      this.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
    } else {
      this.root.setAttribute(Attribute.ARIA_EXPANDED, 'false');
    }
  }
}
export {MenuItem};
