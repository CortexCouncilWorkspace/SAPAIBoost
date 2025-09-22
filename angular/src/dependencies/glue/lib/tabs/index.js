import {Component} from '../base';
import {Attribute, Role, TabIndex} from '../constants/attribute';
import {CssClasses as GlueCssClasses} from '../constants/classes';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {Observer} from '../observer';

import {CssClasses, Strings, TabsAttrs} from './constants';

/**
 * Static Tabs creates tabs of content in a progressive, enhanced way and
 * is accessible through keyboard and screen reader.
 */
class Tabs extends Component {
  /**
   * @see {Compoment.constructor}
   */
  constructor(root, options = {currentTab: 1}) {
    super(root);
    /**
     * Handles a click.
     * @param e The event from the click.
     */
    this.handleClick = (e) => {
      // Ignore clicks on elements that aren't tabs.
      if (e.target instanceof Element) {
        const tabEl = e.target.closest(`.${CssClasses.TAB}`);
        if (tabEl === null) {
          return;
        }
        this.setActiveTab([...this.tabs].indexOf(tabEl) + 1);
      }
    };
    /**
     * Handles key press events to trigger changing the selected page. When the
     * user uses arrow left/right, it changes the active tab in the component.
     */
    this.handleKeydown = (e) => {
      if (e.code === Key.RIGHT || e.code === Key.LEFT) {
        if (e.code === Key.RIGHT) {
          this.setActiveTab(this.getActiveTab() + 1);
        } else if (e.code === Key.LEFT) {
          this.setActiveTab(this.getActiveTab() - 1);
        }
        if (this.getActiveTab() === 0) {
          this.setActiveTab(this.totalTabs);
        } else if (this.getActiveTab() === this.totalTabs + 1) {
          this.setActiveTab(1);
        }
      }
      if (e.code === Key.HOME) {
        this.setActiveTab(1);
      }
      if (e.code === Key.END) {
        this.setActiveTab(this.totalTabs);
      }
      if (e.code === Key.RIGHT || e.code === Key.LEFT || e.code === Key.HOME ||
          e.code === Key.END) {
        this.tabs[this.getActiveTab() - 1].focus();
      }
    };
    /** Tablist element */
    this.tablist = this.root.querySelector(`.${CssClasses.TABLIST}`);
    /** A list of tabs elements. */
    this.tabs = Array.from(this.tablist.querySelectorAll(`.${CssClasses.TAB}`));
    /** A list of tab panels elements. */
    this.tabPanels =
        Array.from(this.root.querySelectorAll(`.${CssClasses.PANEL}`));
    /** Total number of tabs. */
    this.totalTabs = this.tabs.length;
    this.currentTabChangeHandler = () => {
      this.render();
    };
    this.validateElements();
    this.setAriaRoles();
    // Add observer instance and attach listener to the currentTab data
    const val = this.getDataAttribute();
    let currentTab = 1;
    if (this.isValidTab(val)) {
      currentTab = val;
    } else if (this.isValidTab(options.currentTab)) {
      currentTab = options.currentTab;
    }
    this.observer = new Observer({
      'currentTab': currentTab,
    });
    this.observer.listen('currentTab', this.currentTabChangeHandler);
    this.tablist.addEventListener(EventType.CLICK, this.handleClick);
    this.tablist.addEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.render();
  }
  validateElements() {
    if (!this.tablist) throw new Error(`${Strings.MISSING_TABLIST}`);
    if (this.tabs.length === 0) {
      throw new Error(`${Strings.MISSING_TABS}`);
    }
    if (this.tabPanels.length === 0) {
      throw new Error(`${Strings.MISSING_TABPANELS}`);
    }
  }
  /** Get the current Tab value from data attributes. */
  getDataAttribute() {
    return Number(this.root.dataset[TabsAttrs.CURRENT]);
  }
  /** Render the Tabs component. */
  render() {
    const currentPage = this.getActiveTab();
    if (currentPage < 1 || currentPage > this.totalTabs) {
      return;
    }
    for (const [index, el] of this.tabs.entries()) {
      const isSelected = index === currentPage - 1;
      el.tabIndex = isSelected ? TabIndex.TABBABLE : TabIndex.NOT_TABBABLE;
      el.setAttribute(Attribute.ARIA_SELECTED, isSelected.toString());
    }
    for (const el of this.tabPanels) {
      el.classList.remove(GlueCssClasses.SHOW);
    }
    this.tabPanels[currentPage - 1].classList.add(GlueCssClasses.SHOW);
  }
  /**
   * Provide spoken feedback to describe this component as tabs. If you've
   * added new dom, you'll want to call this method.
   */
  setAriaRoles() {
    this.tablist.setAttribute(Attribute.ROLE, Role.TABLIST);
    this.tabs.forEach((el, index) => {
      el.setAttribute(Attribute.ROLE, Role.TAB);
      el.setAttribute(Attribute.ARIA_CONTROLS, this.tabPanels[index].id);
    });
    this.tabPanels.forEach((el, index) => {
      el.setAttribute(Attribute.ARIA_LABELLEDBY, this.tabs[index].id);
      el.setAttribute(Attribute.ROLE, Role.TABPANEL);
    });
  }
  /** Remove all aria roles. */
  removeAriaRoles() {
    this.tablist.removeAttribute(Attribute.ROLE);
    for (const el of this.tabs) {
      el.removeAttribute(Attribute.ROLE);
      el.removeAttribute(Attribute.ARIA_CONTROLS);
      el.removeAttribute(Attribute.TAB_INDEX);
      el.removeAttribute(Attribute.ARIA_SELECTED);
    }
    for (const el of this.tabPanels) {
      el.removeAttribute(Attribute.ARIA_LABELLEDBY);
      el.removeAttribute(Attribute.ROLE);
    }
  }
  setActiveTab(idx) {
    this.observer.data.currentTab = idx;
  }
  getActiveTab() {
    return this.observer.data.currentTab;
  }
  /**
   * Return true if the tab index value is between 1 and the total tabs count.
   */
  isValidTab(val) {
    return Number.isInteger(val) && val >= 1 && val <= this.totalTabs;
  }
  /** Restores DOM back to previous state and removes event listeners. */
  destroy() {
    this.observer.unlisten('currentTab', this.currentTabChangeHandler);
    this.tablist.removeEventListener(EventType.CLICK, this.handleClick);
    this.tablist.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.removeAriaRoles();
    this.observer = new Observer({
      'currentTab': 1,
    });
  }
}
export {Tabs};
