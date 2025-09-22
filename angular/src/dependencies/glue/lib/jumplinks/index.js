import {Component} from '../base/index';
import {Attribute, TabIndex} from '../constants/attribute';
import {easeInOutQuart} from '../easing/';
import {EventType} from '../events/eventtype';
import * as focusUtil from '../focus/';
import {Observer} from '../observer';
import {ScrollEventType} from '../smoothscroll/constants';
import {ScrollManager} from '../smoothscroll/scrollmanager';

import {CssClasses, DataAttr, Numbers, Strings} from './constants';

class Jumplinks extends Component {
  constructor(root, options) {
    super(root);
    this.linkTargets = [];
    this.lastScrollPosition = 0;
    this.isScrolling = false;
    this.handleClick = (e) => {
      this.clickHandler(e);
    };
    this.handleActiveLinkChange = () => {
      this.activeLinkChangeHandler();
    };
    this.handleScroll = () => {
      this.scrollHandler();
    };
    this.handleResize = () => {
      this.resizeHandler();
    };
    this.handleLinkFocus = (e) => {
      this.focusLinkHandler(e);
    };
    this.handleHorizontalScroll = () => {
      this.updateButtons();
    };
    let element = this.root.querySelector(`.${CssClasses.LIST}`);
    if (!element) {
      throw new Error('Jumplinks List element is missing.');
    } else {
      this.list = element;
    }
    element = this.root.querySelector(`.${CssClasses.BUTTON_LEFT}`);
    if (!element) {
      throw new Error('Jumplinks left button element is missing.');
    } else {
      this.prevButton = element;
    }
    element = this.root.querySelector(`.${CssClasses.BUTTON_RIGHT}`);
    if (!element) {
      throw new Error('Jumplinks right button element is missing.');
    } else {
      this.nextButton = element;
    }
    this.listItems =
        Array.from(this.root.querySelectorAll(`.${CssClasses.ITEMS}`));
    if (this.listItems.length === 0) {
      throw new Error('Jumplinks list item is missing.');
    }
    this.links = Array.from(this.root.querySelectorAll(`.${CssClasses.LINK}`));
    if (this.links.length === 0) {
      throw new Error('Jumplinks link item is missing.');
    }
    this.options = Object.assign(
        {}, {
          offset: Numbers.DEFAULT_OFFSET,
          belowHeader: false,
        },
        options);
    this.smoothScroll = new ScrollManager();
    this.observer = new Observer({
      activeLink: '',
    });
    this.leftWatchPoint =
        this.root.getBoundingClientRect().x + this.prevButton.offsetWidth;
    this.rightWatchPoint = this.leftWatchPoint + this.list.offsetWidth;
    this.initialize();
  }
  initialize() {
    this.setAttributes();
    this.updateButtons();
    this.getLinkTargets();
    this.registerListeners();
    this.createIntersectionObserver();
  }
  createIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: `-${Math.floor(window.innerHeight / 2)}px 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.setActiveLink(entry.target.id);
        } else {
          if (entry.target.id === this.getActiveLink()) {
            this.reset();
          }
        }
      }
    }, options);
    for (const element of this.linkTargets) {
      observer.observe(element);
    }
  }
  /**
   */
  destroy() {
    this.deregisterListeners();
  }
  setAttributes() {
    /**
     * Gets localized text to be appended to jump links 'aria label'
     * if it exists or else uses default string.
     */
    const jumplinkList = this.root.querySelector(`.${CssClasses.LIST}`);
    const labelText = jumplinkList.dataset[DataAttr.JUMPLINK_LABEL] ||
        Strings.JUMPLINK_DEFAULT_LABEL;
    this.root.setAttribute(Attribute.ROLE, 'navigation');
    for (const link of this.links) {
      link.setAttribute(Attribute.ARIA_LABEL, `${link.text} - ${labelText}`);
    }
    for (const button of [this.prevButton, this.nextButton]) {
      button.tabIndex = TabIndex.NOT_TABBABLE;
      button.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    }
  }
  setActiveLink(id) {
    this.observer.data['activeLink'] = id;
  }
  getActiveLink() {
    return this.observer.data['activeLink'];
  }
  getLinkTargets() {
    for (const link of this.links) {
      const hash = link.hash.substring(1);
      const target = document.querySelector(`#${hash}`);
      if (!target) {
        throw new Error(`Element with id "${hash}" does not exist.`);
      }
      this.linkTargets.push(target);
    }
  }
  registerListeners() {
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    const throttle = (func, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };
    this.list.addEventListener(EventType.SCROLL, this.handleHorizontalScroll);
    document.addEventListener(
        EventType.SCROLL, throttle(this.handleScroll, 16));
    window.addEventListener(EventType.RESIZE, this.handleResize);
    this.observer.listen(Strings.ACTIVE_LINK, this.handleActiveLinkChange);
    document.addEventListener(ScrollEventType.ENDSCROLL, () => {
      this.isScrolling = false;
      this.updateTopOffset();
    });
    for (const link of this.links) {
      link.addEventListener(EventType.FOCUS, this.handleLinkFocus);
    }
  }
  deregisterListeners() {
    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.list.removeEventListener(
        EventType.SCROLL, this.handleHorizontalScroll);
    window.removeEventListener(EventType.SCROLL, this.handleScroll);
    window.removeEventListener(EventType.RESIZE, this.handleResize);
    this.observer.unlisten(Strings.ACTIVE_LINK, this.handleActiveLinkChange);
    for (const link of this.links) {
      link.removeEventListener(EventType.FOCUS, this.handleLinkFocus);
    }
  }
  focusLinkHandler(e) {
    if (e.target && e.target instanceof Element) {
      this.updateButtons();
    }
  }
  /**
   * Click handler for all component buttons, via event delegation
   */
  clickHandler(e) {
    e.preventDefault();
    const clickTarget = e.target;
    let target;
    if (clickTarget === this.prevButton) {
      target = this.isRTL() ? this.getPartialLink('next') :
                              this.getPartialLink('prev');
      target.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'end',
      });
    } else if (clickTarget === this.nextButton) {
      target = this.isRTL() ? this.getPartialLink('prev') :
                              this.getPartialLink('next');
      target.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      });
    } else if (
        clickTarget instanceof HTMLAnchorElement &&
        this.links.includes(clickTarget)) {
      target = clickTarget;
      const hash = target.hash.substring(1);
      const defaultScrollY = this.options.offset + Numbers.JUMPLINKS_HEIGHT +
          Numbers.JUMPLINKS_MARGIN;
      const midHeight = Math.floor(window.innerHeight / 2);
      const scrollY = defaultScrollY > midHeight ? midHeight : defaultScrollY;
      const targetElement = document.querySelector(`#${hash}`);
      this.smoothScroll.startScroll(targetElement, {
        'duration': 600,
        'easing': easeInOutQuart,
        'direction': 'both',
        'hash': true,
        'offset': {
          'x': 0,
          'y': scrollY,
        },
      });
      this.isScrolling = true;
      const isFocusable = focusUtil.isElementFocusable(targetElement);
      // Set tabindex = -1 to non-focusable element, so focus() is able to
      // move focus to the element.
      if (!isFocusable) {
        targetElement.tabIndex = TabIndex.NOT_TABBABLE;
      }
      targetElement.focus();
    }
    this.updateButtons();
  }
  /*
   * Return the link element that is partially visible.
   */
  getPartialLink(direction) {
    let watchPoint;
    direction === 'prev' ? (watchPoint = this.leftWatchPoint) :
                           (watchPoint = this.rightWatchPoint);
    for (const link of this.links) {
      const bounding = link.getBoundingClientRect();
      if (bounding.x < watchPoint && bounding.x + bounding.width > watchPoint) {
        return link;
      }
    }
    return this.links[0];
  }
  reset() {
    this.setActiveLink('');
  }
  activeLinkChangeHandler() {
    this.renderActiveLink();
    const hash = this.getActiveLink();
    if (hash !== '') {
      const activeEl = this.links.find((link) => link.hash === `#${hash}`);
      // Scroll the link element into view
      activeEl === null || activeEl === void 0 ? void 0 :
                                                 activeEl.scrollIntoView({
                                                   behavior: 'auto',
                                                   block: 'nearest',
                                                   inline: 'center',
                                                 });
    }
    this.updateButtons();
  }
  scrollHandler() {
    if (this.isScrolling === true) {
      return;
    }
    this.updateTopOffset();
  }
  resizeHandler() {
    /**
     * TODO: add test case to verify whether the active class is applied to the
     * prev or next button on resize.
     */
    this.leftWatchPoint =
        this.root.getBoundingClientRect().x + this.prevButton.offsetWidth;
    this.rightWatchPoint = this.leftWatchPoint + this.list.offsetWidth;
    this.updateButtons();
  }
  // Show and hide prev/next buttons
  updateButtons() {
    this.prevButton.classList.remove(CssClasses.BUTTON_ACTIVE);
    this.nextButton.classList.remove(CssClasses.BUTTON_ACTIVE);
    if (this.isRTL()) {
      if (this.list.scrollLeft < 0) {
        this.prevButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
      if (this.list.scrollWidth + this.list.scrollLeft - this.list.clientWidth >
          10) {
        this.nextButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
    } else {
      if (this.list.scrollLeft > 0) {
        this.prevButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
      if (this.list.scrollWidth - this.list.scrollLeft - this.list.clientWidth >
          10) {
        this.nextButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
    }
  }
  /**
   * Set active link via hash
   */
  renderActiveLink() {
    const id = this.getActiveLink();
    const currentActiveLink = document.querySelector(`a[href$="${id}"]`);
    const prevActiveLink =
        this.root.querySelector(`.${CssClasses.LINK_ACTIVE}`);
    prevActiveLink === null || prevActiveLink === void 0 ?
        void 0 :
        prevActiveLink.classList.remove(CssClasses.LINK_ACTIVE);
    prevActiveLink === null || prevActiveLink === void 0 ?
        void 0 :
        prevActiveLink.removeAttribute(Attribute.ARIA_CURRENT);
    currentActiveLink === null || currentActiveLink === void 0 ?
        void 0 :
        currentActiveLink.classList.add(CssClasses.LINK_ACTIVE);
    currentActiveLink === null || currentActiveLink === void 0 ?
        void 0 :
        currentActiveLink.setAttribute(Attribute.ARIA_CURRENT, 'true');
  }
  /**
   * Updates vertical offset of the Jumplinks.
   */
  updateTopOffset() {
    if (this.lastScrollPosition === window.scrollY) {
      return;
    }
    // Remove rewind if it is near the page buttom, resolves the bouncing issue
    // on mobile.
    const nearBottom =
        document.body.clientHeight - window.scrollY - window.innerHeight <=
        Numbers.SCROLL_THRESHOLD;
    if (nearBottom) {
      this.root.classList.remove(CssClasses.REWIND);
      this.unsetOffset();
      return;
    }
    // It is 128px by default
    const headerHeight = this.options.offset - Numbers.JUMPLINKS_MARGIN;
    // Remove rewind if it scrolls to top
    if (window.scrollY <= headerHeight) {
      this.root.classList.remove(CssClasses.REWIND);
      this.unsetOffset();
      return;
    }
    // Rewind if it scrolls up
    if (window.scrollY > headerHeight) {
      if (window.scrollY < this.lastScrollPosition) {
        this.root.classList.add(CssClasses.REWIND);
        if (this.options.belowHeader) {
          const header = document.querySelector('header');
          this.setOffset(
              ((header === null || header === void 0 ? void 0 :
                                                       header.clientHeight) ||
               0) +
              Numbers.JUMPLINKS_MARGIN);
        } else {
          this.setOffset(this.options.offset);
        }
      } else {
        this.root.classList.remove(CssClasses.REWIND);
        this.unsetOffset();
      }
    }
    this.lastScrollPosition = window.scrollY;
  }
  setOffset(top) {
    this.root.style.top = `${top}px`;
  }
  unsetOffset() {
    this.root.style.top = '';
  }
  isRTL() {
    return document.documentElement.dir === Strings.RTL;
  }
}
export {Jumplinks};
