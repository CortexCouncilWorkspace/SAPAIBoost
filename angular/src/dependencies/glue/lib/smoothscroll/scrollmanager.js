/**
 * @fileoverview Manages the scrolling animation operations for SmoothScroll.
 * Can be used independently of the SmoothScroll component to actuate scrolling.
 */
import {easingFunctions} from '../easing/';
import {EventType} from '../events/eventtype';

import {defaultOptions, ScrollEventType, Strings,} from './constants';

class ScrollManager {
  constructor() {
    this.elapsedTime = 0;
    this.startTime = 0;
    this.animationFrame = 0;
    this.position = {'x': 0, 'y': 0};
    this.distance = this.position;
    this.startPosition = this.position;
    this.endPosition = this.position;
    this.config = defaultOptions;
    this.mousewheelHandlerFunc = () => {
      this.mousewheelHandler();
    };
  }
  /**
   * Starts scroll, broadcasts 'start scroll' event and attaches mousewheel
   * event listener to window object.
   * @param element The element to scroll to.
   * @param config The config object for this scroll.
   */
  startScroll(element, config) {
    var _a;
    // Bail out if the scroll is in progress.
    if (this.animationFrame !== 0) return;
    if (!(element instanceof Element)) {
      throw new Error(Strings.MISSING_PAGE_ELEMENT);
    }
    // Broadcasts start scroll event globally.
    document.dispatchEvent(new Event(ScrollEventType.STARTSCROLL, {
      bubbles: true,
      cancelable: false,
    }));
    if (config) this.config = config;
    this.scrollElement = element;
    // Figure out the animation settings.
    this.startPosition = this.getScrollPosition();
    this.endPosition = this.getEndPosition(this.scrollElement);
    this.distance = {
      'x': this.endPosition.x - this.startPosition.x - this.config.offset.x,
      'y': this.endPosition.y - this.startPosition.y - this.config.offset.y,
    };
    this.easingFunction = typeof this.config.easing === 'string' ?
        easingFunctions[this.config.easing] :
        (_a = this.config.easing) !== null && _a !== void 0 ?
        _a :
        easingFunctions.linear;
    this.elapsedTime = 0;
    this.position = {'x': 0, 'y': 0};
    window.addEventListener(EventType.MOUSEWHEEL, this.mousewheelHandlerFunc);
    this.animateScroll();
  }
  /**
   * Stops smooth scroll.
   */
  stopScroll() {
    // Broadcasts ENDSCROLL event globally.
    document.dispatchEvent(new Event(ScrollEventType.ENDSCROLL, {
      bubbles: true,
      cancelable: false,
    }));
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    this.startTime = 0;
    this.removeMousewheelListener();
    this.config = defaultOptions;
  }
  /**
   * Recursively scrolls the page until it reaches the element.
   */
  animateScroll() {
    // If there is no config, then quit. Fixes an issue where this
    // would be called one last time when cancelling mid-scroll.
    if (!this.startTime) {
      this.startTime = Date.now();
    }
    const now = Date.now();
    this.elapsedTime = now - this.startTime;
    this.calculatePosition();
    this.updatePosition();
    // Continues the animation until the timer reaches the end.
    if (this.elapsedTime < this.config.duration) {
      this.animationFrame = window.requestAnimationFrame(() => {
        this.animateScroll();
      });
    } else {
      this.stopScroll();
    }
  }
  /**
   * Calculates the position based on elapsed time.
   */
  calculatePosition() {
    var _a, _b;
    if (this.config.duration > 0) {
      const percentage = Math.min(this.elapsedTime / this.config.duration, 1);
      const value = this.easingFunction(percentage);
      this.position.x = this.startPosition.x +
          ((_a = this.distance) === null || _a === void 0 ? void 0 : _a.x) *
              value;
      this.position.y = this.startPosition.y +
          ((_b = this.distance) === null || _b === void 0 ? void 0 : _b.y) *
              value;
    } else {
      this.position = this.endPosition;
    }
  }
  /**
   * Gets the page scroll position.
   * @return Page scroll position.
   */
  getScrollPosition() {
    if (window.pageYOffset) {
      return {
        'x': window.pageXOffset,
        'y': window.pageYOffset,
      };
    } else {
      return {
        'x': document.documentElement.scrollLeft,
        'y': document.documentElement.scrollTop,
      };
    }
  }
  /**
   * Gets the scroll position of the element.
   * @return The scroll position of the element.
   */
  getEndPosition(el) {
    let rect = {left: 0, top: 0};
    if (el && 'getBoundingClientRect' in el) {
      rect = el.getBoundingClientRect();
    }
    return {
      'x': rect.left + this.getScrollPosition().x,
      'y': rect.top + this.getScrollPosition().y,
    };
  }
  /**
   * Updates scroll position.
   */
  updatePosition() {
    switch (this.config.direction) {
      case 'x':
        this.updateScrollLeft();
        break;
      case 'y':
        this.updateScrollTop();
        break;
      case 'both':
        this.updateScrollLeft();
        this.updateScrollTop();
        break;
      default:
        throw new Error();
    }
  }
  /**
   * Updates scroll left position.
   */
  updateScrollLeft() {
    // Scrolls to the element if requestAnimationFrame is not supported.
    const position = this.position.x;
    document.body.scrollLeft = position;
    document.documentElement.scrollLeft = position;
  }
  /**
   * Updates scroll top position.
   */
  updateScrollTop() {
    // Scrolls to the element if requestAnimationFrame is not supported.
    const position = this.position.y;
    document.body.scrollTop = position;
    document.documentElement.scrollTop = position;
  }
  /**
   * Handler function for mousewheel event.
   */
  mousewheelHandler() {
    if (this.animationFrame) {
      this.stopScroll();
    }
  }
  /**
   * Remove the moisewheel event listener.
   */
  removeMousewheelListener() {
    window.removeEventListener(
        EventType.MOUSEWHEEL, this.mousewheelHandlerFunc);
  }
  /**
   * Stopp the scrolling action and Destroy the component.
   */
  destroy() {
    this.stopScroll();
  }
}
export {ScrollManager};
