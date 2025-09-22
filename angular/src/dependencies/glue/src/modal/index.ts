import {Component} from '../base';
import {Attribute, Role} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {isElementFocusable} from '../focus/';

import {CssClasses, Strings} from './constants';

// Add class methods here to prevent deletion in the CDN.
declare interface ModalDef {
  open: () => void;
  close: () => void;
  setFocusAfterClosed: (el: HTMLElement) => void;
}

class Modal extends Component implements ModalDef {
  private readonly focusFirst: HTMLElement|null;
  private focusAfterClosed: HTMLElement;
  private lastFocus: HTMLElement|null = document.activeElement as HTMLElement;
  private readonly closeBtn: HTMLElement|null;
  private ignoreFocusChange = false;
  private ariaHiddenElements: HTMLElement[] = [];
  private readonly handleKeyDown: (e: KeyboardEvent) => void;
  private readonly handleCloseBtnClick: (e: Event) => void;
  private readonly handleFocus: (e: Event) => void;

  /** Handle modal transition ends. */
  private readonly handleTransitionEnds = () => {
    this.root.classList.remove(CssClasses.CLOSING);
    this.focusAfterClosed.focus();
    this.root.removeEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnds);
  };

  /**
   * Modal object providing focus management.
   * The element is present in the DOM and hidden.
   * The modal has role='dialog'.
   * @param el the element serving as the modal dialog.
   * @param focusAfterClosed The element to focus when the modal closes.
   * @param focusFirst The first element will receive focus after modal opens.
   */
  constructor(
      el: HTMLElement, focusAfterClosed: HTMLElement,
      focusFirst: HTMLElement|null = null) {
    super(el);
    this.closeBtn =
        this.root.querySelector<HTMLElement>(`.${CssClasses.CLOSE_BTN}`);
    this.focusAfterClosed = focusAfterClosed;
    this.focusFirst = focusFirst;

    this.handleCloseBtnClick = (e: Event) => {
      e.stopPropagation();
      this.close();
    };
    this.handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      const isEscape = e.code === Key.ESC;
      if (isEscape) {
        this.close();
      }
    };
    this.handleFocus = (e: Event) => {
      this.trapFocus(e);
    };
    this.init();
  }

  /**
   * Throw an error if close button does not exist.
   */
  private init() {
    this.root.setAttribute(Attribute.ROLE, Role.DIALOG);
    this.root.setAttribute(Attribute.ARIA_MODAL, 'true');
  }

  /**
   * Set focus on descendant nodes until the first focusable element is
   * found.
   * @param element DOM node for which to find the first focusable descendant.
   * @return true if a focusable element is found and focus is set.
   */
  private focusFirstDescendant(element: HTMLElement): boolean {
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children[i] as HTMLElement;
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
  private focusLastDescendant(element: HTMLElement): boolean {
    for (let i = element.children.length - 1; i >= 0; i--) {
      const child = element.children[i] as HTMLElement;
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
  private attemptFocus(element: HTMLElement): boolean {
    if (!isElementFocusable(element)) {
      return false;
    }
    this.ignoreFocusChange = true;

    try {
      element.focus();
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
    this.ignoreFocusChange = false;
    return element === document.activeElement;
  }

  /**
   * Trap focus inside the modal dialog.
   * @param e focus event.
   */
  private trapFocus(e: Event) {
    // Ignore the focus change so lastFocus does not get updated.
    if (this.ignoreFocusChange) {
      return;
    }

    // Move the focus to the element if it is inside of the Modal dialog,
    // otherwise, it moves to the first or last focusable element.
    if (this.root.contains(e.target as HTMLElement)) {
      this.lastFocus = e.target as HTMLElement;
    } else {
      this.focusFirstDescendant(this.root);
      if (this.lastFocus === document.activeElement) {
        this.focusLastDescendant(this.root);
      }
      this.lastFocus = document.activeElement as HTMLElement;
    }
  }

  /**
   * Open the modal dialog.
   */
  open() {
    this.root.classList.add(CssClasses.OPEN);
    this.emit(Strings.OPENED_EVENT, {});
    this.closeBtn?.addEventListener(EventType.CLICK, this.handleCloseBtnClick);

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
    this.root.classList.remove(CssClasses.OPEN);
    this.root.classList.add(CssClasses.CLOSING);
    this.emit(Strings.CLOSED_EVENT, {});

    // Deregister event listeners and add end modal
    document.body.classList.remove(CssClasses.NO_SCROLL);
    document.removeEventListener(EventType.FOCUS, this.handleFocus, true);
    this.closeBtn?.removeEventListener(
        EventType.CLICK, this.handleCloseBtnClick);
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
  private ariaHideElements() {
    let current = this.root;
    while (current && current.parentNode) {
      [...current.parentNode.children].forEach((child) => {
        if (child !== current && child.getAttribute('aria-hidden') !== 'true') {
          this.ariaHiddenElements.push(child as HTMLElement);
          child.setAttribute('aria-hidden', 'true');
        }
      });
      current = current.parentNode as HTMLElement;
    }
  }

  /**
   * Remove aria hidden to false for all other elements.
   */
  private ariaUnhideElements() {
    this.ariaHiddenElements.forEach((el) => {
      el.removeAttribute('aria-hidden');
    });
    this.ariaHiddenElements = [];
  }

  setFocusAfterClosed(el: HTMLElement) {
    this.focusAfterClosed = el;
  }

  override destroy() {
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.ARIA_MODAL);
  }
}

export {Modal};
