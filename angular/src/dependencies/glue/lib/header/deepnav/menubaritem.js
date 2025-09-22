import {Component} from '../../base';
import {Attribute, Role} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {PopupMenu} from '../popupmenu';
/**
 * This class creates a menu item instance, which may control a dropdown menu.
 */
class MenubarItem extends Component {
  /** The menu argument is the menu bar element that contains this menu item. */
  constructor(root, parentMenu) {
    super(root);
    this.parentMenu = parentMenu;
    /** A popup menu component, controlled by the menu item. */
    this.popupMenu = null;
    /** A flag to show menu bar item's focus status. */
    this.hasFocus = false;
    /** A flag to show menu bar item's hover status. */
    this.hasHover = false;
    /**
     * This flag is used to determine if this controller is a menu bar item.
     * This flag is set to false in other controllers such as site switcher and
     * popup menu item.
     */
    this.isMenubarItem = true;
    /**
     * Handles keydown events.
     * - When press the Space, Enter or Down keys, open the menu if able and
     * focus to the first item.
     * - When press the Up key, open the popup menu if able and focus to the
     * last item.
     * - When press the left key, move focus to the previous menu item.
     * - When press the right key, move focus to the next menu item.
     * - When press the Home or PageUp key, move focus to the first item.
     * - When press the End or PageDown key, move focus to the last item.
     * - When press the Tab key, close the popup menu, and move focus to the
     * next focusable element.
     * - When press the ESC key, close the popup menu, move focus to the
     * controller.
     */
    this.handleKeydown = (event) => {
      var _a, _b;
      const char = event.key;
      let preventDefault = false;
      function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      }
      switch (event.key) {
        case Key.SPACE:
        case Key.ENTER:
        case Key.DOWN:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
            preventDefault = true;
          }
          break;
        case Key.LEFT:
          this.parentMenu.setFocusToPreviousItem(this);
          preventDefault = true;
          break;
        case Key.RIGHT:
          this.parentMenu.setFocusToNextItem(this);
          preventDefault = true;
          break;
        case Key.UP:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToLastItem();
            preventDefault = true;
          }
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
        case Key.TAB:
          (_a = this.popupMenu) === null || _a === void 0 ? void 0 :
                                                            _a.close(true);
          break;
        case Key.ESC:
          (_b = this.popupMenu) === null || _b === void 0 ? void 0 :
                                                            _b.close(true);
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
    /** Sets expanded attribute. */
    this.setExpanded = (flag) => {
      if (flag) {
        this.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
      } else {
        this.root.setAttribute(Attribute.ARIA_EXPANDED, 'false');
      }
    };
    /** Sets hasFocus to true when the menu item is in focus. */
    this.handleFocus = () => {
      this.parentMenu.hasFocus = true;
    };
    /** Sets hasFocus to false when the menu item is blurred. */
    this.handleBlur = () => {
      this.parentMenu.hasFocus = false;
    };
    /**
     * When the menu item in hovered, set hasHover to true and open the
     * popupmenu if able.
     */
    this.handleMouseenter = () => {
      var _a;
      this.hasHover = true;
      (_a = this.popupMenu) === null || _a === void 0 ? void 0 : _a.open();
    };
    /**
     * When the mouse is moved away from the menu item, set hasHover to false
     * and close the popupmenu after 300 mills.
     */
    this.handleMouseleave = () => {
      this.hasHover = false;
      setTimeout(() => {
        var _a;
        (_a = this.popupMenu) === null || _a === void 0 ? void 0 :
                                                          _a.close(false);
      }, 300);
    };
    this.init();
  }
  /**
   * Initializes the menu item and the associated popup menu.
   */
  init() {
    this.root.tabIndex = -1;
    this.root.setAttribute(Attribute.ROLE, Role.MENUITEM);
    const nextElement = this.root.nextElementSibling;
    if (nextElement instanceof HTMLUListElement) {
      this.popupMenu = new PopupMenu(nextElement, this);
      this.root.setAttribute(Attribute.ARIA_HASPOPUP, 'true');
      this.root.addEventListener(EventType.FOCUS, this.handleFocus);
      this.root.addEventListener(EventType.BLUR, this.handleBlur);
      this.root.addEventListener(EventType.MOUSEENTER, this.handleMouseenter);
      this.root.addEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
    }
    this.root.addEventListener(EventType.KEYDOWN, this.handleKeydown);
  }
  destroy() {
    var _a;
    (_a = this.popupMenu) === null || _a === void 0 ? void 0 : _a.destroy();
    this.root.removeAttribute(Attribute.TAB_INDEX);
    this.root.removeAttribute(Attribute.ARIA_HASPOPUP);
    this.root.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.removeEventListener(EventType.FOCUS, this.handleFocus);
    this.root.removeEventListener(EventType.BLUR, this.handleBlur);
    this.root.removeEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.removeEventListener(EventType.MOUSELEAVE, this.handleMouseleave);
  }
}
export {MenubarItem};
