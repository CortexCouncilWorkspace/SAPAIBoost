import {Component} from '../base';
import {EventType} from '../events/eventtype';

import {CssClasses, Numbers} from './constants';

/**
 * A class that displays an important message or helps user perform action
 * through links or button.
 */
class Banner extends Component {
  constructor(root) {
    var _a;
    super(root);
    this.handleClick = () => {
      this.close();
    };
    this.closeButton =
        this.root.querySelector(`.${CssClasses.BANNER_CLOSE_BUTTON}`);
    (_a = this.closeButton) === null || _a === void 0 ?
        void 0 :
        _a.addEventListener(EventType.CLICK, this.handleClick);
  }
  /**
   * Hides the banner component when close button is clicked or is a
   * public method that can directly be called.
   */
  close() {
    this.root.classList.add(CssClasses.BANNER_HIDDEN);
    setTimeout(() => {
      this.root.style.display = 'none';
    }, Numbers.BANNER_CLOSE_DELAY);
  }
  /**
   * Removes event listeners.
   */
  destroy() {
    var _a;
    (_a = this.closeButton) === null || _a === void 0 ?
        void 0 :
        _a.removeEventListener(EventType.CLICK, this.handleClick);
  }
}
export {Banner};
