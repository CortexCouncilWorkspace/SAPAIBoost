import {__awaiter} from 'tslib';

import {Component} from '../base';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {CustomEvent as PopoverEvents} from '../popover/constants';

import {CssClasses, Message, Strings} from './constants';

/**
 * A class to copy text input content to clipboard.
 */
class Copy extends Component {
  /** @param root root element for the Copy component. */
  constructor(root) {
    var _a;
    super(root);
    // Message to show if copy command succeeds.
    this.successMsg = Strings.SUCCESS_MESSAGE;
    // Message to show if copy command fails.
    this.failMsg = Strings.FAIL_MESSAGE;
    // Original label of the copy button.
    this.originalLabel = '';
    const copyValEl = this.root.querySelector(`.${CssClasses.VALUE}`);
    const copyButtonEl = this.root.querySelector(`.${CssClasses.BUTTON}`);
    this.popoverParentEl =
        (_a = this.root.closest(`.${CssClasses.POPOVER_ROOT}`)) !== null &&
            _a !== void 0 ?
        _a :
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
    this.clickHandler = (evt) => {
      this.copy();
      evt.preventDefault();
    };
    this.keyDownHandler = (evt) => {
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
  init() {
    var _a;
    const success = this.root.getAttribute(Message.SUCCESS);
    const fail = this.root.getAttribute(Message.FAIL);
    this.successMsg = success ? success : this.successMsg;
    this.failMsg = fail ? fail : this.failMsg;
    this.originalLabel =
        this.copyButtonEl.textContent ? this.copyButtonEl.textContent : '';
    this.copyButtonEl.addEventListener(EventType.CLICK, this.clickHandler);
    this.copyButtonEl.addEventListener(EventType.KEYDOWN, this.keyDownHandler);
    // Resets the copy button if its parent popover is closed
    (_a = this.popoverParentEl) === null || _a === void 0 ?
        void 0 :
        _a.addEventListener(PopoverEvents.CLOSE_EVENT, this.closeHandler);
  }
  /**
   * Resets component and removes all event listeners.
   */
  destroy() {
    var _a;
    this.reset();
    this.copyButtonEl.removeEventListener(EventType.CLICK, this.clickHandler);
    this.copyButtonEl.removeEventListener(
        EventType.KEYDOWN, this.keyDownHandler);
    (_a = this.popoverParentEl) === null || _a === void 0 ?
        void 0 :
        _a.removeEventListener(PopoverEvents.CLOSE_EVENT, this.closeHandler);
  }
  /** Copies text input string to clipboard. */
  copy() {
    return __awaiter(this, void 0, void 0, function*() {
      var _a, _b;
      if (this.copyValueEl && this.copyValueEl.select) {
        this.copyValueEl.select();
        const userAgentMatch = navigator.userAgent.match(/ipad|iphone/i);
        if (userAgentMatch) {
          const range = document.createRange();
          range.selectNodeContents(this.copyValueEl);
          (_a = this.selection) === null || _a === void 0 ?
              void 0 :
              _a.removeAllRanges();
          (_b = this.selection) === null || _b === void 0 ? void 0 :
                                                            _b.addRange(range);
          this.copyValueEl.setSelectionRange(0, 999999);
        }
      }
      yield navigator.clipboard.writeText(this.copyValueEl.value)
          .then(
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
              });
      this.copyValueEl.focus();
    });
  }
  /**
   * Resets input and copy button and re-enables copy button.
   */
  reset() {
    var _a;
    this.copyButtonEl.textContent = this.originalLabel;
    this.copyButtonEl.classList.remove(CssClasses.IS_COPIED);
    this.copyButtonEl.disabled = false;
    this.copyValueEl.setSelectionRange(0, 0);
    (_a = this.selection) === null || _a === void 0 ? void 0 :
                                                      _a.removeAllRanges();
  }
}
export {Copy};
