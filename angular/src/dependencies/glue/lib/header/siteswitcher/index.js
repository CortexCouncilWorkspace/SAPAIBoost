import {Component} from '../../base/';
import {Attribute, Role} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {CssClasses as HeaderCssClasses} from '../constants';
import {CssClasses as DraweCssClasses, Strings as DrawerStrings,} from '../drawer/constants';
import {PopupMenu} from '../popupmenu';

import {Strings} from './constants';

/**
 * This class creates a Site Switcher instance, it is triggered to show
 * a list of micro sites options.
 */
class SiteSwitcher extends Component {
  constructor(root) {
    super(root);
    this.parentMenu = null;
    /** A flag to show the switcher's focus status. */
    this.hasFocus = false;
    /** A flag to show switcher's hover status. */
    this.hasHover = false;
    /**
     * A flag to indicate whether this element is a menubar item. Both the
     * menubar item and site switcher can be dropdown trigger.
     */
    this.isMenubarItem = false;
    /**
     * Handles keydown events.
     * When press the Space, Enter or Down keys, open the popup menu and focus
     * to the first item. When press the Up key, open the popup menu and focus
     * to the last item.
     */
    this.handleKeydown = (event) => {
      let flag = false;
      switch (event.key) {
        case Key.SPACE:
        case Key.ENTER:
        case Key.DOWN:
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
          flag = true;
          break;
        case Key.UP:
          this.popupMenu.open();
          this.popupMenu.setFocusToLastItem();
          flag = true;
          break;
        default:
          break;
      }
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };
    /**
     * Handles the click event.
     * Toggles the menu when users click the site switcher.
     */
    this.handleClick = () => {
      if (this.root.getAttribute(Attribute.ARIA_EXPANDED) === 'true') {
        this.popupMenu.close(true);
      } else {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
    };
    /**
     * Sets hasFocus to true when the switcher is focused.
     */
    this.handleFocus = () => {
      this.popupMenu.hasFocus = true;
    };
    /**
     * Sets hasFocus to false when the switcher is blurred.
     */
    this.handleBlur = () => {
      this.popupMenu.hasFocus = false;
    };
    /**
     * Opens the menu and set hasHover to true when it is hovered.
     */
    this.handleMouseenter = (e) => {
      this.hasHover = true;
      this.popupMenu.open();
    };
    /**
     * Waits for 300 mills to close the menu after moving mouse out of the
     * switcher.
     */
    this.handleMouseLeave = () => {
      this.hasHover = false;
      setTimeout(() => {
        this.popupMenu.close(false);
      }, 300);
    };
    if (!this.root.getAttribute(Attribute.ARIA_CONTROLS)) {
      throw new Error(Strings.NO_ARIA_CONTROL);
    }
    const menu = this.root.closest(`.${HeaderCssClasses.BAR_DESKTOP}`)
                     .querySelector(
                         '#' + this.root.getAttribute(Attribute.ARIA_CONTROLS));
    if (!menu) {
      throw new Error(Strings.NO_MENU);
    }
    this.popupMenu = new PopupMenu(menu, this);
    this.init();
  }
  init() {
    this.root.setAttribute(Attribute.ARIA_HASPOPUP, 'true');
    this.root.addEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    this.root.addEventListener(EventType.FOCUS, this.handleFocus);
    this.root.addEventListener(EventType.BLUR, this.handleBlur);
    this.root.addEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.addEventListener(EventType.MOUSELEAVE, this.handleMouseLeave);
    this.root.setAttribute(Attribute.ROLE, Role.BUTTON);
    this.root.tabIndex = 0;
    const drawer = this.root.closest(`.${DraweCssClasses.ROOT}`);
    drawer === null || drawer === void 0 ?
        void 0 :
        drawer.addEventListener(DrawerStrings.OPEN, () => {
          for (const link of this.popupMenu.menuItemCollection) {
            link.destroy();
          }
        });
    drawer === null || drawer === void 0 ?
        void 0 :
        drawer.addEventListener(DrawerStrings.CLOSE, () => {
          for (const link of this.popupMenu.menuItemCollection) {
            link.init();
          }
        });
  }
  destroy() {
    this.root.removeAttribute(Attribute.ARIA_HASPOPUP);
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.TAB_INDEX);
    this.root.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.root.removeEventListener(EventType.FOCUS, this.handleFocus);
    this.root.removeEventListener(EventType.BLUR, this.handleBlur);
    this.root.removeEventListener(EventType.MOUSEENTER, this.handleMouseenter);
    this.root.removeEventListener(EventType.MOUSELEAVE, this.handleMouseLeave);
  }
  /** Sets the expanded attribute when the menu is open. */
  setExpanded(flag) {
    this.root.setAttribute(Attribute.ARIA_EXPANDED, flag.toString());
  }
}
export {SiteSwitcher};
