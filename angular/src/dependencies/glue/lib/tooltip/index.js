import {Component} from '../base';
import {getOverlayAutoPosition} from '../base/utils';
import {Attribute, Role, TabIndex} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';

import {CssClasses, CustomEvent, DataAttrs, ErrorMessage} from './constants';

/**
 * A component that pops up when you hover over an interactive object.
 *
 * Responsibilities:
 *  - Provide public methods for open, close and destroy
 *  - Add ARIA labels for a11y
 *  - Reposition tooltip when it is on the edge of the page
 *  - Customize Tooltip by turning on/off auto position
 *  - Expose Tooltip show and hide events
 */
class Tooltip extends Component {
  constructor(root, options) {
    super(root);
    /**
     * Checks target element and calls method for tooltip display.
     */
    this.handleOpen = (event) => {
      const targetEl = event.target;
      if (targetEl instanceof HTMLElement && this.isTooltipChild(targetEl)) {
        this.open();
      }
    };
    /**
     * Checks target element and calls method for tooltip hide.
     */
    this.handleClose = (event) => {
      const targetEl = event.target;
      if (targetEl instanceof HTMLElement && this.isTooltipChild(targetEl)) {
        this.close();
      }
    };
    /**
     * Event handler for Escape key.
     */
    this.handleKeyup = (event) => {
      const targetEl = event.target;
      if (event.key === Key.ESC) {
        if (targetEl instanceof HTMLElement &&
            this.content.contains(targetEl)) {
          this.trigger.focus();
        }
        this.close();
      }
    };
    /**
     * Checks click on document and calls method for tooltip display.
     */
    this.handleClick = (event) => {
      const targetEl = event.target;
      if (targetEl instanceof HTMLElement && !this.isTooltipChild(targetEl)) {
        this.close();
      }
    };
    /**
     * Adds animation class on tooltip transition start.
     */
    this.handleTransitionStart = () => {
      if (this.content.classList.contains(CssClasses.SHOW_TOOLTIP)) {
        this.content.classList.add(CssClasses.ANIMATION);
      }
    };
    /**
     * Removes animation class on tooltip transition end.
     */
    this.handleTransitionEnd = () => {
      if (this.content.classList.contains(CssClasses.SHOW_TOOLTIP)) return;
      this.content.classList.remove(CssClasses.ANIMATION);
    };
    /**
     * Recalculates the tooltip position and displays it properly as per updated
     * screen size.
     */
    this.handleResize = () => {
      this.setTooltipPosition();
    };
    let element = this.root.querySelector(`.${CssClasses.TRIGGER}`);
    if (!element) {
      throw new Error(ErrorMessage.MISSING_TRIGGER);
    } else {
      this.trigger = element;
    }
    element = this.root.querySelector(`.${CssClasses.CONTENT}`);
    if (!element) {
      throw new Error(ErrorMessage.MISSING_CONTENT);
    } else {
      this.content = element;
      this.content.setAttribute(Attribute.ARIA_HIDDEN, 'true');
      // Set aria-controls (extend value if it already exists)
      const ariaControlsElements = [
        this.content.id,
        this.trigger.getAttribute(Attribute.ARIA_CONTROLS),
      ];
      this.trigger.setAttribute(
          Attribute.ARIA_CONTROLS, ariaControlsElements.join(' ').trim());
      if (this.content.getAttribute(Attribute.ROLE) === Role.DIALOG) {
        this.content.tabIndex = TabIndex.TABBABLE;
      }
    }
    // Compile the final set of options.
    this.options = this.getAttributeOptions(options);
    this.registerEvents();
  }
  /**
   * Checks if the element is present inside the tooltip.
   * @param targetEl DOM node which is to be checked
   * @return true if DOM node is present in tooltip
   */
  isTooltipChild(targetEl) {
    return this.trigger.contains(targetEl) || this.content.contains(targetEl) ?
        true :
        false;
  }
  /**
   * Get attributes from target element and construct an options object.
   */
  getAttributeOptions(passedOptions) {
    const attrOptions = {};
    const attrData = this.root.dataset;
    if (DataAttrs.AUTO_POSITION in attrData) {
      let setPosition;
      if (attrData[DataAttrs.AUTO_POSITION] === 'false') {
        setPosition = false;
      } else if (attrData[DataAttrs.AUTO_POSITION] === 'true') {
        setPosition = true;
      } else {
        throw new Error(ErrorMessage.INCORRECT_POSITION);
      }
      attrOptions.autoPosition = setPosition;
    }
    const fullOptions =
        Object.assign({}, Tooltip.defaultOptions, passedOptions, attrOptions);
    return fullOptions;
  }
  /**
   * Default Tooltip options
   */
  static get defaultOptions() {
    return {
      autoPosition: true,
    };
  }
  /**
   * Adds events for the tooltip.
   */
  registerEvents() {
    this.root.addEventListener(EventType.MOUSEENTER, this.handleOpen, true);
    this.root.addEventListener(EventType.FOCUS, this.handleOpen, true);
    this.root.addEventListener(EventType.MOUSELEAVE, this.handleClose, true);
    this.root.addEventListener(EventType.BLUR, this.handleClose, true);
    document.addEventListener(EventType.KEYUP, this.handleKeyup);
    document.addEventListener(EventType.CLICK, this.handleClick);
    window.addEventListener(EventType.RESIZE, this.handleResize);
    this.content.addEventListener(
        EventType.TRANSITIONSTART, this.handleTransitionStart);
    this.content.addEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnd);
  }
  /**
   * Calculates the position of the Tooltip.
   */
  setTooltipPosition() {
    if (this.options.autoPosition === true) {
      const pos = getOverlayAutoPosition(
          this.root, this.content, this.trigger, this.options.placement);
      if (pos) {
        const [left, top] = pos;
        this.content.style.left = `${left}px`;
        this.content.style.top = `${top}px`;
      }
    }
  }
  /**
   * Displays the tooltip.
   */
  open() {
    if (this.content.classList.contains(CssClasses.SHOW_TOOLTIP)) return;
    this.setTooltipPosition();
    this.content.classList.add(CssClasses.SHOW_TOOLTIP);
    this.content.setAttribute(Attribute.ARIA_HIDDEN, 'false');
    this.emit(CustomEvent.SHOW_EVENT, {}, true);
  }
  /**
   * Hides the tooltip.
   */
  close() {
    if (!this.content.classList.contains(CssClasses.SHOW_TOOLTIP)) return;
    this.content.classList.remove(CssClasses.SHOW_TOOLTIP);
    this.content.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    this.emit(CustomEvent.CLOSE_EVENT, {}, true);
  }
  /** Resets component and removes event listeners. */
  destroy() {
    this.close();
    this.content.removeAttribute(Attribute.ARIA_HIDDEN);
    this.trigger.removeAttribute(Attribute.ARIA_CONTROLS);
    this.root.removeEventListener(EventType.MOUSEENTER, this.handleOpen, true);
    this.root.removeEventListener(EventType.FOCUS, this.handleOpen, true);
    this.root.removeEventListener(EventType.MOUSELEAVE, this.handleClose, true);
    this.root.removeEventListener(EventType.BLUR, this.handleClose, true);
    document.removeEventListener(EventType.KEYUP, this.handleKeyup);
    document.removeEventListener(EventType.CLICK, this.handleClick);
    window.removeEventListener(EventType.RESIZE, this.handleResize);
    this.content.removeEventListener(
        EventType.TRANSITIONSTART, this.handleTransitionStart);
    this.content.removeEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnd);
  }
}
/**
 * Initializes multiple tooltips with single call.
 */
function initMultiTooltip(tooltipElems) {
  [...tooltipElems].forEach((tooltipElem) => {
    // tslint:disable-next-line:no-unused-expression
    new Tooltip(tooltipElem);
  });
}
export {Tooltip, initMultiTooltip};
