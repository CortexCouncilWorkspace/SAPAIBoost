import {Component} from '../base';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {CustomEvent as PopoverEvents} from '../popover/constants';

import {CssClasses, Message, Strings} from './constants';

// Add class methods here to prevent deletion in the CDN.
declare interface CopyDef {
  reset: () => void;
}

/**
 * A class to copy text input content to clipboard.
 */
class Copy extends Component implements CopyDef {
  // Message to show if copy command succeeds.
  private successMsg: string = Strings.SUCCESS_MESSAGE;

  // Message to show if copy command fails.
  private failMsg: string = Strings.FAIL_MESSAGE;

  private readonly copyButtonEl: HTMLButtonElement;
  private readonly copyValueEl: HTMLInputElement;
  private readonly selection: Selection | null;
  private readonly popoverParentEl: HTMLElement | null;

  // Original label of the copy button.
  private originalLabel = '';
  private readonly clickHandler: (evt: Event) => void;
  private readonly keyDownHandler: (evt: KeyboardEvent) => void;
  private readonly closeHandler: (evt: Event) => void;

  /** @param root root element for the Copy component. */
  constructor(root: HTMLElement) {
    super(root);

    const copyValEl = this.root.querySelector<HTMLInputElement>(
      `.${CssClasses.VALUE}`,
    );
    const copyButtonEl = this.root.querySelector<HTMLButtonElement>(
      `.${CssClasses.BUTTON}`,
    );

    this.popoverParentEl =
      this.root.closest(`.${CssClasses.POPOVER_ROOT}`) ??
      this.root.closest(`.${CssClasses.SOCIAL_POPOVER_ROOT}`);

    if (!copyValEl) {
      throw new Error(Strings.MISSING_INPUT);
    }
    if (!copyButtonEl) {
      throw new Error(Strings.MISSING_COPY_BUTTON);
    }

    this.copyValueEl = copyValEl;
    this.copyButtonEl = copyButtonEl;

    this.selection = window.getSelection();

    this.clickHandler = (evt: Event) => {
      this.copy();
      evt.preventDefault();
    };

    this.keyDownHandler = (evt: KeyboardEvent) => {
      if (evt.key === Key.ENTER) {
        this.copy();
        evt.preventDefault();
      }
    };

    this.closeHandler = () => {
      this.reset();
    };

    this.init();
  }

  /** Initializes the copy component. */
  private init() {
    const success = this.root.getAttribute(Message.SUCCESS);
    const fail = this.root.getAttribute(Message.FAIL);
    this.successMsg = success ? success : this.successMsg;
    this.failMsg = fail ? fail : this.failMsg;
    this.originalLabel = this.copyButtonEl.textContent
      ? this.copyButtonEl.textContent
      : '';
    this.copyButtonEl.addEventListener(EventType.CLICK, this.clickHandler);
    this.copyButtonEl.addEventListener(EventType.KEYDOWN, this.keyDownHandler);
    // Resets the copy button if its parent popover is closed
    this.popoverParentEl?.addEventListener(
      PopoverEvents.CLOSE_EVENT,
      this.closeHandler,
    );
  }

  /**
   * Resets component and removes all event listeners.
   */
  override destroy() {
    this.reset();
    this.copyButtonEl.removeEventListener(EventType.CLICK, this.clickHandler);
    this.copyButtonEl.removeEventListener(
      EventType.KEYDOWN,
      this.keyDownHandler,
    );
    this.popoverParentEl?.removeEventListener(
      PopoverEvents.CLOSE_EVENT,
      this.closeHandler,
    );
  }

  /** Copies text input string to clipboard. */
  private async copy() {
    if (this.copyValueEl && this.copyValueEl.select) {
      this.copyValueEl.select();
      const userAgentMatch = navigator.userAgent.match(/ipad|iphone/i);
      if (userAgentMatch) {
        const range = document.createRange();
        range.selectNodeContents(this.copyValueEl);
        this.selection?.removeAllRanges();
        this.selection?.addRange(range);
        this.copyValueEl.setSelectionRange(0, 999999);
      }
    }

    await navigator.clipboard.writeText(this.copyValueEl.value).then(
      () => {
        // Shows success message and updates various elements
        this.copyButtonEl.textContent = this.successMsg;
        this.copyButtonEl.classList.add(CssClasses.IS_COPIED);
        this.copyButtonEl.disabled = true;
        this.copyValueEl.blur();
      },
      () => {
        // Render failure message
        this.copyButtonEl.textContent = this.failMsg;
      },
    );

    this.copyValueEl.focus();
  }

  /**
   * Resets input and copy button and re-enables copy button.
   */
  reset() {
    this.copyButtonEl.textContent = this.originalLabel;
    this.copyButtonEl.classList.remove(CssClasses.IS_COPIED);
    this.copyButtonEl.disabled = false;
    this.copyValueEl.setSelectionRange(0, 0);
    this.selection?.removeAllRanges();
  }
}

export {Copy};
