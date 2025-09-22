import {Component} from '../base/';
import {getOverlayAutoPosition, Placement} from '../base/utils';
import {Attribute, Role, TabIndex} from '../constants/attribute';
import {Debounce} from '../debounce';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';

import {
  CssClasses,
  CustomEvent,
  PlacementOptions,
  RESIZE_DEBOUNCE_TIMING,
  Strings,
} from './constants';

declare interface PopoverOptions {
  placement: Placement;
  takeFocus: boolean;
}

type KeyEventHandler = (evt: KeyboardEvent) => void;
type MouseEventHandler = (evt: MouseEvent) => void;
type EventHandler = (evt: Event) => void;

// Add class methods here to prevent deletion in the CDN.
declare interface PopoverDef {
  open: () => void;
  close: () => void;
}

/**
 * A components that shows a popover component by toggling a button.
 *
 * Responsibilities:
 *  - Attach component instance to root element
 *  - Initialize options object
 *  - Provide public methods for open, close and destroy
 *  - Set attributes and aria tags to elements.
 *  - Access all DOM api needs directly
 *  - Set and remove all event listeners
 *  - Controls and sets focus to elements
 *
 * Design doc: https://goto.google.com/glue-popover-mdc-dd
 *
 */
class Popover extends Component implements PopoverDef {
  private closeEl?: HTMLElement;
  private buttonEl!: HTMLElement;
  private dialogEl!: HTMLElement;
  private buttonClickHandler!: KeyEventHandler;
  private readonly clickOutsideDialogHandler!: MouseEventHandler;
  private keyDownHandler!: KeyEventHandler;
  private readonly mouseLeaveHandler?: MouseEventHandler;
  private readonly blurHandler?: EventHandler;
  private readonly options: PopoverOptions;
  private readonly resizeDebounce: Debounce;

  /**
   * @param rootElement The element that contains the popover.
   * @param options Popover options object.
   * @param buttonEl The element that opens the popover.
   * @param dialogEl The element for the popover dialog.
   */
  constructor(
    rootElement: HTMLElement,
    options: Partial<PopoverOptions> = {},
    buttonEl?: HTMLElement,
    dialogEl?: HTMLElement,
  ) {
    super(rootElement);

    // Compile the final set of options.
    this.options = Object.assign(
      {},
      Popover.defaults,
      options,
      this.getAttributeOptions(),
    );

    if (!['top', 'bottom', 'left', 'right'].includes(this.options.placement)) {
      throw new Error(Strings.INCORRECT_PLACEMENT);
    }

    this.clickOutsideDialogHandler = (evt) => {
      this.handleClickOutsideDialog(evt);
    };
    this.initInteractiveElements(buttonEl, dialogEl);

    this.resizeDebounce = new Debounce(
      this.handleResize,
      RESIZE_DEBOUNCE_TIMING,
    );
  }

  /**
   * Set up the button interactive elements.
   */
  private initInteractiveElements(
    buttonEl?: HTMLElement,
    dialogEl?: HTMLElement,
  ) {
    // Get Button and Dialog elements if not already provided.
    if (buttonEl) {
      this.buttonEl = buttonEl;
    } else {
      this.buttonEl = this.root.querySelector<HTMLElement>(
        `.${CssClasses.TRIGGER}`,
      )!;
    }
    if (!this.buttonEl) {
      throw new Error(Strings.MISSING_TRIGGER);
    }

    if (dialogEl) {
      this.dialogEl = dialogEl;
    } else {
      this.dialogEl = this.root.querySelector<HTMLElement>(
        `.${CssClasses.DIALOG}`,
      )!;
      if (!this.dialogEl) {
        throw new Error(Strings.MISSING_DIALOG);
      }
    }

    this.closeEl = this.dialogEl.querySelector<HTMLElement>(
      `.${CssClasses.CLOSE_BTN}`,
    )!;

    // Bind to event handlers.
    this.buttonClickHandler = (evt) => {
      this.handleButtonClick(evt);
    };
    this.keyDownHandler = (evt) => {
      this.handleKeyDown(evt);
    };

    // Add events to trigger element for key and trigger events (set in opts).
    this.buttonEl.addEventListener(
      EventType.CLICK,
      this.buttonClickHandler as EventListener,
    );
    this.buttonEl.addEventListener(EventType.KEYDOWN, this.keyDownHandler);

    // Set listeners to handle an ESC key press or close btn when dialog open.
    this.dialogEl.addEventListener(EventType.KEYDOWN, this.keyDownHandler);
    this.dialogEl.addEventListener(
      EventType.CLICK,
      this.buttonClickHandler as EventListener,
    );

    // Automatically resize the Popover when the window resizes.
    window.addEventListener(EventType.RESIZE, this.handleResizeDebounce);

    // Sets element attrs mainly for a11y.
    this.setDefaultElAttr();
  }

  /**
   * Destroys the popover instance.
   */
  override destroy() {
    this.close();

    // Remove event listeners
    this.buttonEl.removeEventListener(
      EventType.CLICK,
      this.buttonClickHandler as EventListener,
    );
    document.removeEventListener(
      EventType.CLICK,
      this.clickOutsideDialogHandler,
    );
    this.dialogEl.removeEventListener(EventType.KEYDOWN, this.keyDownHandler);
    this.buttonEl.removeEventListener(EventType.KEYDOWN, this.keyDownHandler);
    this.dialogEl.removeEventListener(
      EventType.CLICK,
      this.buttonClickHandler as EventListener,
    );
    if (this.mouseLeaveHandler) {
      this.buttonEl.removeEventListener(
        EventType.MOUSELEAVE,
        this.mouseLeaveHandler,
      );
      this.dialogEl.removeEventListener(
        EventType.MOUSELEAVE,
        this.mouseLeaveHandler,
      );
    }
    if (this.blurHandler) {
      window.removeEventListener(EventType.BLUR, this.blurHandler);
    }
    window.removeEventListener(EventType.RESIZE, this.handleResizeDebounce);
  }

  /**
   * If an event is from the specified element.
   */
  private checkEventFromChild(element: HTMLElement, event: Event): boolean {
    return event.target instanceof Node && element.contains(event.target);
  }

  /**
   * Get attributes from target element and constructor an options object.
   */
  private getAttributeOptions(): {[key: string]: string | null} {
    const {PREFIX} = CssClasses;
    const {PLACEMENT, FOCUS} = Strings;
    const options: {[key: string]: string | null} = {};
    const placement = this.root.getAttribute(`${PREFIX}-${PLACEMENT}`);
    const focus = this.root.getAttribute(`${PREFIX}-${FOCUS}`);

    if (placement) options[PLACEMENT] = placement;
    if (focus) options[FOCUS] = placement;

    return options;
  }

  /**
   *  Adds default attributes to the corresponding elements
   */
  private setDefaultElAttr() {
    this.dialogEl.setAttribute(Attribute.ROLE, Role.DIALOG);
    this.dialogEl.tabIndex = TabIndex.NOT_TABBABLE;
    this.dialogEl.setAttribute(Attribute.ARIA_HIDDEN, 'true');

    this.buttonEl.setAttribute(Attribute.ROLE, Role.BUTTON);
    this.buttonEl.tabIndex = TabIndex.TABBABLE;
    this.buttonEl.setAttribute(Attribute.ARIA_EXPANDED, 'false');

    if (!this.dialogEl.id || this.dialogEl.id.length === 0) {
      this.dialogEl.id = `glue-popover-${Math.round(Math.random() * 99999999)}`;
    }

    // Set aria-controls (extend value if it already exists)
    const ariaControlsElements = [
      this.dialogEl.id,
      this.buttonEl.getAttribute(Attribute.ARIA_CONTROLS),
    ];
    this.buttonEl.setAttribute(
      Attribute.ARIA_CONTROLS,
      ariaControlsElements.join(' ').trim(),
    );

    if (this.closeEl) {
      this.closeEl.setAttribute(Attribute.ROLE, Role.BUTTON);
      this.closeEl.tabIndex = TabIndex.TABBABLE;
    }
  }

  /**
   * Set focus to element based on status
   */
  private setElementFocus() {
    if (!this.options.takeFocus) return;
    this.buttonEl?.focus();
  }

  /**
   * Shows popover and sets the pending flag.
   */
  open() {
    if (this.isOpen()) return;

    this.setPopoverPosition();

    this.dialogEl.setAttribute(Attribute.ARIA_HIDDEN, 'false');
    this.buttonEl.setAttribute(Attribute.ARIA_EXPANDED, 'true');

    this.root.classList.add(CssClasses.IS_SHOWN);

    document.addEventListener(EventType.CLICK, this.clickOutsideDialogHandler);

    this.setElementFocus();
    this.emit(CustomEvent.OPEN_EVENT, {}, true);
  }

  /**
   * Close popover and sets the pending flag
   */
  close() {
    if (!this.isOpen()) return;

    this.dialogEl.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    this.buttonEl.setAttribute(Attribute.ARIA_EXPANDED, 'false');

    this.root.classList.remove(CssClasses.IS_SHOWN);
    if (this.closeEl) this.closeEl.classList.remove(CssClasses.IS_SHOWN);

    this.setElementFocus();
    this.emit(CustomEvent.CLOSE_EVENT, {}, true);
    document.removeEventListener(
      EventType.CLICK,
      this.clickOutsideDialogHandler,
    );
  }

  /**
   * If the Dialog is currently open.
   */
  private isOpen() {
    return this.root.classList.contains(CssClasses.IS_SHOWN);
  }

  /**
   * The handler is attached to the root element and handles a few cases
   * 1. Opens and closes the dialog via clicking trigger button.
   * 1. Closes the dialog via clicking close button.
   */
  private handleButtonClick(event: KeyboardEvent) {
    if (!this.isOpen()) {
      this.open();
    } else if (this.checkEventFromChild(this.buttonEl, event)) {
      this.close();
    } else if (
      this.closeEl &&
      this.checkEventFromChild(this.closeEl, event) &&
      (!event.key || event.key === Key.ENTER || event.key === Key.SPACE)
    ) {
      this.close();
    }
  }

  /**
   * Event handler for Escape key and Enter key.
   */
  private handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation();

    if (event.key === Key.ESC) {
      this.close();
    } else if (this.closeEl && this.checkEventFromChild(this.closeEl, event)) {
      // To prevent the mouseclick when pressing return key
      event.preventDefault();
      this.close();
    } else if (
      this.isOpen() &&
      this.checkEventFromChild(this.buttonEl, event) &&
      event.shiftKey &&
      event.key === Key.TAB
    ) {
      event.preventDefault();
      this.close();
    } else if (
      !this.isOpen() &&
      this.checkEventFromChild(this.buttonEl, event) &&
      (event.key === Key.ENTER || event.key === Key.SPACE)
    ) {
      event.preventDefault();
      this.closeEl?.classList.add(CssClasses.IS_SHOWN);
      this.open();
    }

    // Show close button when press TAB key.
    if (
      event.key === Key.TAB &&
      this.checkEventFromChild(this.dialogEl, event)
    ) {
      this.closeEl?.classList.add(CssClasses.IS_SHOWN);
    }
  }

  /**
   * Click handler for closing window if user clicks outside the open
   * dialog window.
   */
  private handleClickOutsideDialog(event: Event) {
    const containsTarget =
      event.target instanceof Node && this.root.contains(event.target);

    if (
      !this.checkEventFromChild(this.dialogEl, event) &&
      !this.checkEventFromChild(this.buttonEl, event) &&
      !containsTarget &&
      event.type === EventType.CLICK
    ) {
      this.close();
    }
  }

  /**
   * Calculate the position of the Popover.
   */
  private setPopoverPosition() {
    const pos = getOverlayAutoPosition(
      this.root,
      this.dialogEl,
      this.buttonEl,
      this.options.placement,
    );
    if (pos) {
      const [left, top] = pos;
      this.dialogEl.style.left = `${left}px`;
      this.dialogEl.style.top = `${top}px`;
    }
  }

  /**
   * Resize handler for the Popover.
   * Recalculate the position of the Popover when the window resizes.
   */
  private readonly handleResize = () => {
    this.setPopoverPosition();
  };

  /**
   * Resize debounce handler for the Popover.
   */
  private readonly handleResizeDebounce = () => {
    this.resizeDebounce.debounce();
  };

  /**
   * Default popover options
   */
  static get defaults(): PopoverOptions {
    return {
      placement: PlacementOptions.BOTTOM,
      takeFocus: true,
    };
  }
}

export {PlacementOptions, Popover, type PopoverOptions};
