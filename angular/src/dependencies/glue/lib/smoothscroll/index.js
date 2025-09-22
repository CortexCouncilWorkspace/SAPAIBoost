/**
 * @fileoverview The SmoothScroll module allows an animated smooth scroll from
 * one location within the document to another. It broadcasts events when
 * scrolling starts and ends. Configurable parameters include duration of the
 * scroll, offset of the target element, the easing function and URL hash.
 *
 * For documentation and demo see
 * https://glue-docs.appspot.com/docs/components/raw/smoothscroll
 */
import {defaultOptions} from './constants';
import {ScrollManager} from './scrollmanager';
class SmoothScroll {
  constructor(config) {
    this.currentScrollElementId = '';
    this.scrollManager = new ScrollManager();
    this.globalConfig = Object.assign({}, defaultOptions, config);
  }
  /**
   * Allows an animated smooth scroll from one location within the
   * document to another.
   * @param id Element id.
   * @param elementConfig The config object to use for the scroll.
   */
  scrollToId(id = '', elementConfig) {
    let element;
    // If asked to scroll to a non-fragment, just scroll to the first page
    // element, which is typically the top of the page. Otherwise, scroll to
    // a real element in the page.
    if (id === '' || id === '#') {
      element = document.body.firstElementChild;
    } else {
      element = document.getElementById(id);
      if (!element) {
        throw new Error(`The target element for id "${id}" does not exist.`);
      }
    }
    this.currentScrollElementId = id;
    this.currentScrollElement = element;
    // Build the config out of the element config and global config.
    elementConfig = Object.assign({}, this.globalConfig, elementConfig);
    // Ask the scroll manager to start the scroll.
    this.scrollManager.startScroll(this.currentScrollElement, elementConfig);
    const temp = window.scrollY;
    if (elementConfig['hash'] &&
        window.location.hash !== `#${this.currentScrollElementId}`) {
      window.location.hash = `#${this.currentScrollElementId}`;
    }
    document.documentElement.scrollTop = temp;
  }
  /**
   * Destroy the component. Removes listeners.
   */
  destroy() {
    this.scrollManager.destroy();
  }
}
export {defaultOptions, SmoothScroll};
