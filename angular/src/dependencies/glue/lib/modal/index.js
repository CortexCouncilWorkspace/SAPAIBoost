import {Component} from '../base';
import {Attribute, Role} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {isElementFocusable} from '../focus/';

import {CssClasses, Strings} from './constants';

class Modal extends Component {
  /**
   * Modal object providing focus management.
   * The element is present in the DOM and hidden.
   * The modal has role='dialog'.
   * @param el the element serving as the modal dialog.
   * @param focusAfterClosed The element to focus when the modal closes.
   * @param focusFirst The first element will receive focus after modal opens.
   */
  constructor(el, focusAfterClosed, focusFirst = null) {
    super(el);
    this.lastFocus = document.activeElement;
    this.ignoreFocusChange = false;
    this.ariaHiddenElements = [];
    /** Handle modal transition ends. */
    this.handleTransitionEnds = () => {
      this.root.classList.remove(CssClasses.CLOSING);
      this.focusAfterClosed.focus();
      this.root.removeEventListener(
          EventType.TRANSITIONEND, this.handleTransitionEnds);
    };
    this.closeBtn = this.root.querySelector(`.${CssClasses.CLOSE_BTN}`);
    this.focusAfterClosed = focusAfterClosed;
    this.focusFirst = focusFirst;
    this.handleCloseBtnClick = (e) => {
      e.stopPropagation();
      this.close();
    };
    this.handleKeyDown = (e) => {
      e.stopPropagation();
      const isEscape = e.code === Key.ESC;
      if (isEscape) {
        this.close();
      }
    };
    this.handleFocus = (e) => {
      this.trapFocus(e);
    };
    this.init();
  }
  /**
   * Throw an error if close button does not exist.
   */
  init() {
    this.root.setAttribute(Attribute.ROLE, Role.DIALOG);
    this.root.setAttribute(Attribute.ARIA_MODAL, 'true');
  }
  /**
   * Set focus on descendant nodes until the first focusable element is
   * found.
   * @param element DOM node for which to find the first focusable descendant.
   * @return true if a focusable element is found and focus is set.
   */
  focusFirstDescendant(element) {
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children[i];
      if (this.attemptFocus(child) || this.focusFirstDescendant(child)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Find the last descendant node that is focusable.
   * @param element DOM node for which to find the last focusable descendant.
   * @return true if a focusable element is found and focus is set.
   */
  focusLastDescendant(element) {
    for (let i = element.children.length - 1; i >= 0; i--) {
      const child = element.children[i];
      if (this.attemptFocus(child) || this.focusLastDescendant(child)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Attempt to set focus on the current node.
   * @param element The node to attempt to focus on.
   * @return true if element is focused.
   */
  attemptFocus(element) {
    if (!isElementFocusable(element)) {
      return false;
    }
    this.ignoreFocusChange = true;
    try {
      element.focus();
    } catch (e) {
      throw new Error(`${e}`);
    }
    this.ignoreFocusChange = false;
    return element === document.activeElement;
  }
  /**
   * Trap focus inside the modal dialog.
   * @param e focus event.
   */
  trapFocus(e) {
    // Ignore the focus change so lastFocus does not get updated.
    if (this.ignoreFocusChange) {
      return;
    }
    // Move the focus to the element if it is inside of the Modal dialog,
    // otherwise, it moves to the first or last focusable element.
    if (this.root.contains(e.target)) {
      this.lastFocus = e.target;
    } else {
      this.focusFirstDescendant(this.root);
      if (this.lastFocus === document.activeElement) {
        this.focusLastDescendant(this.root);
      }
      this.lastFocus = document.activeElement;
    }
  }
  /**
   * Open the modal dialog.
   */
  open() {
    var _a;
    this.root.classList.add(CssClasses.OPEN);
    this.emit(Strings.OPENED_EVENT, {});
    (_a = this.closeBtn) === null || _a === void 0 ?
        void 0 :
        _a.addEventListener(EventType.CLICK, this.handleCloseBtnClick);
    // Disable background scrolling
    document.body.classList.add(CssClasses.NO_SCROLL);
    // Close modal on escape key
    document.addEventListener(EventType.KEYDOWN, this.handleKeyDown);
    // Trap focus in the modal when it catches a focus event.
    document.addEventListener(EventType.FOCUS, this.handleFocus, true);
    // Focus on the first focusable element if it is not specified.
    if (this.focusFirst) {
      this.focusFirst.focus();
    } else {
      this.focusFirstDescendant(this.root);
    }
    this.ariaHideElements();
  }
  /**
   * Close the modal dialog and deregister event listeners.
   */
  close() {
    var _a;
    this.root.classList.remove(CssClasses.OPEN);
    this.root.classList.add(CssClasses.CLOSING);
    this.emit(Strings.CLOSED_EVENT, {});
    // Deregister event listeners and add end modal
    document.body.classList.remove(CssClasses.NO_SCROLL);
    document.removeEventListener(EventType.FOCUS, this.handleFocus, true);
    (_a = this.closeBtn) === null || _a === void 0 ?
        void 0 :
        _a.removeEventListener(EventType.CLICK, this.handleCloseBtnClick);
    document.removeEventListener(EventType.KEYDOWN, this.handleKeyDown);
    this.root.addEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnds);
    this.ariaUnhideElements();
  }
  /**
   * Set aria hidden to true for all other elements.
   * This method provides complementary A11y support before aria-modal
   * The code is referenced from
   * https://source.corp.google.com/piper///depot/google3/googledata/html/external_content/scs_corp/ariablueprints/dialog/dialog-modal-1.0.html;l=81-101
   * gets broader browser support.
   */
  ariaHideElements() {
    let current = this.root;
    while (current && current.parentNode) {
      [...current.parentNode.children].forEach((child) => {
        if (child !== current && child.getAttribute('aria-hidden') !== 'true') {
          this.ariaHiddenElements.push(child);
          child.setAttribute('aria-hidden', 'true');
        }
      });
      current = current.parentNode;
    }
  }
  /**
   * Remove aria hidden to false for all other elements.
   */
  ariaUnhideElements() {
    this.ariaHiddenElements.forEach((el) => {
      el.removeAttribute('aria-hidden');
    });
    this.ariaHiddenElements = [];
  }
  setFocusAfterClosed(el) {
    this.focusAfterClosed = el;
  }
  destroy() {
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.ARIA_MODAL);
  }
}
export {Modal};
