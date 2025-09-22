import {Component} from '../../base/';
import {Attribute, TabIndex} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {getFocusableElements} from '../../focus';
import {Coordinate} from '../../math/coordinate';

import {CssClasses, Strings} from './constants';

class Drawer extends Component {
  /**
   * @param root The element that contains options object.
   * @param toggleEl The element that toggles the drawer open and closed.
   */
  constructor(root, toggleEl) {
    var _a;
    super(root);
    this.toggleEl = toggleEl;
    this.closed = true;
    this.isAnimating = false;
    this.ariaHiddenElements = [];
    this.focusableElements = [];
    /** Start time of the drag movement */
    this.startTime = 0;
    /** Initial touch position */
    this.initialTouchPos = null;
    /** Last touch poistion */
    this.lastTouchPos = null;
    /** True when it is ready to call request animatino frame */
    this.rafPending = false;
    this.handleGestureStart = (event) => {
      // Returns if there are multi touch points.
      if (this.isTouchEvent(event) && event.touches.length > 1) {
        return;
      }
      // Add the move and end listeners if PointerEvent is supported.
      // Otherwise add mouse listeners.
      if (this.isPointerEvent(event) && event.target instanceof Element) {
        event.target.setPointerCapture(event.pointerId);
      } else {
        document.addEventListener(
            EventType.MOUSEMOVE, this.handleGestureMove, true);
        document.addEventListener(
            EventType.MOUSEUP, this.handleGestureEnd, true);
      }
      this.initialTouchPos = this.getGesturePointFromEvent(event);
      this.startTime = new Date().getTime();
      // Overwrites the transition value set up in CSS
      this.root.style.transition = 'initial';
    };
    this.handleGestureMove = (event) => {
      event.preventDefault();
      if (!this.initialTouchPos) {
        return;
      }
      // Prevent small taps/etc triggering a dragging interaction
      const currentTouchPos = this.getGesturePointFromEvent(event);
      const distanceDragged = Math.abs(
          Coordinate.difference(currentTouchPos, this.initialTouchPos).x);
      if (distanceDragged < 10) {
        return;
      }
      this.lastTouchPos = currentTouchPos;
      // Returns if it is waiting for request animation frame callback.
      if (this.rafPending) {
        return;
      }
      this.rafPending = true;
      window.requestAnimationFrame(() => {
        this.onAnimFrame();
      });
    };
    this.handleGestureEnd = (event) => {
      var _a;
      event.preventDefault();
      if (this.isTouchEvent(event) &&
          ((_a = event.touches) === null || _a === void 0 ? void 0 :
                                                            _a.length) > 0) {
        return;
      }
      this.rafPending = false;
      // Remove Event Listeners
      if (this.isPointerEvent(event) && event.target instanceof Element) {
        event.target.releasePointerCapture(event.pointerId);
      } else {
        // Remove Mouse Listeners
        document.removeEventListener(
            EventType.MOUSEMOVE, this.handleGestureMove, true);
        document.removeEventListener(
            EventType.MOUSEUP, this.handleGestureEnd, true);
      }
      this.updateDrawerPosition();
      // Resets drag status
      this.startTime = 0;
      this.initialTouchPos = null;
      this.lastTouchPos = null;
    };
    // Check class names
    if (!this.root.classList.contains(CssClasses.ROOT)) {
      throw new Error(Strings.MISSING_DRAWER_ELEMENT);
    }
    this.setAttributes();
    const element = (_a = this.root.parentElement) === null || _a === void 0 ?
        void 0 :
        _a.querySelector(`.${CssClasses.BACKDROP}`);
    if (!element) {
      throw new Error(Strings.MISSING_BACKDROP_ELEMENT);
    }
    this.backdrop = element;
    this.transitionEndHandler = () => {
      this.handleTransitionEndEvent();
    };
    this.handleKeydown = (event) => {
      if (event.code === Key.TAB) {
        // Move focus back to the root.
        this.root.focus();
        return;
      }
      event.preventDefault();
      if (event.code === Key.ENTER) {
        this.close();
      }
    };
    this.handleOpen = () => {
      document.body.classList.add(CssClasses.NO_SCROLL);
      document.documentElement.classList.add(CssClasses.NO_SCROLL);
      this.backdrop.addEventListener(EventType.KEYDOWN, this.handleKeydown);
    };
    this.handleClose = () => {
      document.body.classList.remove(CssClasses.NO_SCROLL);
      document.documentElement.classList.remove(CssClasses.NO_SCROLL);
      this.backdrop.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    };
    // CSS Animation event handlers
    this.root.addEventListener(
        EventType.TRANSITIONEND, this.transitionEndHandler);
    // Adding and removing body no scroll class
    document.body.addEventListener(Strings.OPEN, this.handleOpen);
    document.body.addEventListener(Strings.CLOSE, this.handleClose);
  }
  registerTouchEvents() {
    if (window.PointerEvent) {
      this.root.addEventListener(
          EventType.POINTERDOWN, this.handleGestureStart, true);
      this.root.addEventListener(
          EventType.POINTERMOVE, this.handleGestureMove, true);
      this.root.addEventListener(
          EventType.POINTERUP, this.handleGestureEnd, true);
      this.root.addEventListener(
          EventType.POINTERCANCEL, this.handleGestureEnd, true);
    } else {
      // Add Touch Listener
      this.root.addEventListener(
          EventType.TOUCHSTART, this.handleGestureStart, true);
      this.root.addEventListener(
          EventType.TOUCHMOVE, this.handleGestureMove, true);
      this.root.addEventListener(
          EventType.TOUCHEND, this.handleGestureEnd, true);
      this.root.addEventListener(
          EventType.TOUCHCANCEL, this.handleGestureEnd, true);
      // Add Mouse Listener
      this.root.addEventListener(
          EventType.MOUSEDOWN, this.handleGestureStart, true);
    }
  }
  deregisterTouchEvents() {
    if (window.PointerEvent) {
      this.root.removeEventListener(
          EventType.POINTERDOWN, this.handleGestureStart, true);
      this.root.removeEventListener(
          EventType.POINTERMOVE, this.handleGestureMove, true);
      this.root.removeEventListener(
          EventType.POINTERUP, this.handleGestureEnd, true);
      this.root.removeEventListener(
          EventType.POINTERCANCEL, this.handleGestureEnd, true);
    } else {
      this.root.removeEventListener(
          EventType.TOUCHSTART, this.handleGestureStart, true);
      this.root.removeEventListener(
          EventType.TOUCHMOVE, this.handleGestureMove, true);
      this.root.removeEventListener(
          EventType.TOUCHEND, this.handleGestureEnd, true);
      this.root.removeEventListener(
          EventType.TOUCHCANCEL, this.handleGestureEnd, true);
      this.root.removeEventListener(
          EventType.MOUSEDOWN, this.handleGestureStart, true);
    }
  }
  destroy() {
    this.deregisterTouchEvents();
    this.root.removeEventListener(
        EventType.TRANSITIONEND, this.transitionEndHandler);
    document.body.removeEventListener(Strings.OPEN, this.handleOpen);
    document.body.removeEventListener(Strings.CLOSE, this.handleClose);
  }
  /** Determines whether the event is a TouchEvent. */
  isTouchEvent(event) {
    return window.TouchEvent && event instanceof TouchEvent;
  }
  /** Determines whether the event is a PointerEvent. */
  isPointerEvent(event) {
    return window.PointerEvent && event instanceof PointerEvent;
  }
  // Transits the drawer based on the last touch position.
  // Drag to right should do nothing.
  onAnimFrame() {
    if (!this.rafPending || !this.initialTouchPos || !this.lastTouchPos) {
      return;
    }
    const differenceInX =
        Coordinate.difference(this.lastTouchPos, this.initialTouchPos).x;
    // Do thing if move to right
    if (differenceInX > 0) {
      this.root.style.transform = '';
    } else {
      const transformStyle = `translate3d(${differenceInX}px, 0, 0)`;
      this.root.style.transform = transformStyle;
    }
    this.rafPending = false;
  }
  getGesturePointFromEvent(event) {
    const point = new Coordinate(0, 0);
    if (this.isTouchEvent(event)) {
      if (event.targetTouches) {
        point.x = event.targetTouches[0].clientX;
        point.y = event.targetTouches[0].clientY;
      }
    } else {
      point.x = event.clientX;
      point.y = event.clientY;
    }
    return point;
  }
  updateDrawerPosition() {
    // Resets the inline styles so the CSS transition style takes in charge
    // During the drag phase, inline transition style overwrites the CSS
    // transition.
    this.root.style.transition = '';
    this.root.style.transform = '';
    if (!this.lastTouchPos || !this.initialTouchPos) return;
    const differenceInX =
        Coordinate.difference(this.lastTouchPos, this.initialTouchPos).x;
    const validDrag = Math.abs(differenceInX) >= this.root.clientWidth * 0.5;
    const currentTime = new Date().getTime();
    const duration = currentTime - this.startTime;
    const validSwipe = duration < 300 && Math.abs(differenceInX) > 10;
    if (validDrag || validSwipe) {
      this.close();
    }
  }
  /**
   * Opens the drawer
   */
  open() {
    if (this.closed && !this.isAnimating) {
      this.isAnimating = true;
      this.emit(Strings.OPEN, {}, true);
      this.root.classList.add(CssClasses.DRAWER_IS_OPEN);
      this.root.classList.add(CssClasses.IS_ANIMATING);
      this.setDefaultAttrs();
      // set aria-expanded property of button to true while opening drawer
      this.toggleEl.setAttribute(Attribute.ARIA_EXPANDED, 'true');
      this.backdrop.setAttribute(Attribute.ROLE, 'button');
      this.backdrop.tabIndex = TabIndex.TABBABLE;
      this.removeAriaHidden();
      this.ariaHideElements();
      this.root.focus();
      this.removeKeyboardFocus();
      this.registerTouchEvents();
    }
  }
  /**
   * Removes keyboard focus from all the focusable elements outside the drawer.
   */
  removeKeyboardFocus() {
    const focusable = getFocusableElements(window.document.body);
    this.focusableElements = [];
    for (const el of focusable) {
      if (!this.root.contains(el) && !this.backdrop.contains(el) &&
          el.tabIndex !== -1) {
        this.focusableElements.push(el);
        el.tabIndex = -1;
      }
    }
  }
  /**
   * Adds keyboard focus for all the focusable elements outside the drawer.
   */
  addKeyboardFocus() {
    for (const el of this.focusableElements) {
      el.removeAttribute('tabindex');
    }
  }
  /**
   * Closes the drawer and sets the focus to the toggle btn.
   */
  close() {
    if (!this.closed && !this.isAnimating) {
      this.isAnimating = true;
      this.emit(Strings.CLOSE, {}, true);
      this.root.classList.add(CssClasses.IS_ANIMATING);
      this.removeDefaultAttrs();
      // set aria-expanded property of button  to false while closing drawer
      this.toggleEl.setAttribute(Attribute.ARIA_EXPANDED, 'false');
      this.toggleEl.focus();
      this.setAriaHidden();
      this.ariaUnhideElements();
      this.addKeyboardFocus();
      if (this.backdrop) {
        this.backdrop.removeAttribute(Attribute.TAB_INDEX);
        this.backdrop.removeAttribute(Attribute.ROLE);
      }
      this.deregisterTouchEvents();
    }
  }
  setAttributes() {
    if (!this.root.id) {
      const randomId = Math.round(Math.random() * 99999999).toString(16);
      this.root.id = `glue-drawer-${randomId}`;
    }
    this.toggleEl.setAttribute(Attribute.ARIA_CONTROLS, this.root.id);
    this.toggleEl.setAttribute(Attribute.ARIA_EXPANDED, 'false');
    this.toggleEl.setAttribute(Attribute.ARIA_HASPOPUP, 'true');
  }
  /**
   * Check to see if drawer is open
   */
  isOpen() {
    return this.root.classList.contains(CssClasses.DRAWER_IS_OPEN);
  }
  /**
   * Check to see if the event target is a child element of the drawer component
   */
  containsElement(event) {
    return event.target instanceof Node && this.root.contains(event.target);
  }
  /**
   * Check to see if the event target is a child element of the drawer component
   */
  isCtaElement(event) {
    return (
        event.target instanceof Element &&
        event.target.classList.contains(CssClasses.GLUE_BUTTON));
  }
  /**
   * This method will take care of any logic that needs to run after the CSS
   * transition has ended.
   */
  handleTransitionEndEvent() {
    if (this.isAnimating) {
      this.root.classList.remove(CssClasses.IS_ANIMATING);
      if (this.closed) {
        this.closed = false;
      } else {
        this.root.classList.remove(CssClasses.DRAWER_IS_OPEN);
        this.closed = true;
      }
      this.isAnimating = false;
    }
  }
  /**
   * This method will remove applied aria attributes
   */
  removeAriaHidden() {
    this.root.removeAttribute(Attribute.ARIA_HIDDEN);
  }
  /**
   * This method will set aria attributes
   */
  setAriaHidden() {
    this.root.setAttribute(Attribute.ARIA_HIDDEN, 'true');
  }
  /**
   * This method sets default attributes when the drawer is opened
   */
  setDefaultAttrs() {
    this.root.setAttribute(Attribute.ARIA_LABEL, 'Navigation drawer');
    this.root.tabIndex = TabIndex.TABBABLE;
  }
  /**
   * This method removes default attributes when the drawer is closed
   */
  removeDefaultAttrs() {
    this.root.removeAttribute(Attribute.ARIA_LABEL);
    this.root.removeAttribute(Attribute.TAB_INDEX);
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
      for (const child of Array.from(current.parentNode.children)) {
        if (child !== current && child !== this.backdrop &&
            child.getAttribute(Attribute.ARIA_HIDDEN) !== 'true') {
          this.ariaHiddenElements.push(child);
          child.setAttribute(Attribute.ARIA_HIDDEN, 'true');
        }
      }
      current = current.parentNode;
    }
  }
  /**
   * Remove aria hidden to false for all other elements.
   */
  ariaUnhideElements() {
    this.ariaHiddenElements.forEach((el) => {
      el.removeAttribute(Attribute.ARIA_HIDDEN);
    });
    this.ariaHiddenElements = [];
  }
}
export {Drawer};
