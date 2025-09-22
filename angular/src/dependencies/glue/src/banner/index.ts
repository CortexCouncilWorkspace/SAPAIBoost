import {Component} from '../base';
import {EventType} from '../events/eventtype';

import {CssClasses, Numbers} from './constants';

/**
 * Adds class methods here to prevent deletion in the CDN.
 */
declare interface BannerDef {
  close: () => void;
}

/**
 * A class that displays an important message or helps user perform action
 * through links or button.
 */
class Banner extends Component implements BannerDef {
  private readonly closeButton: HTMLButtonElement | null;

  constructor(root: HTMLElement) {
    super(root);

    this.closeButton = this.root.querySelector<HTMLButtonElement>(
      `.${CssClasses.BANNER_CLOSE_BUTTON}`,
    );

    this.closeButton?.addEventListener(EventType.CLICK, this.handleClick);
  }

  private readonly handleClick = () => {
    this.close();
  };

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
  override destroy() {
    this.closeButton?.removeEventListener(EventType.CLICK, this.handleClick);
  }
}

export {Banner};
