import {Component} from '../base/';
import {Attribute} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {ResponsiveMonitor} from '../responsivemonitor/';

import {CssClasses, Numbers, Strings} from './constants';
import {Menubar} from './deepnav/';
import {Drawer} from './drawer/';
import {Strings as DrawerStrings} from './drawer/constants';
import {SiteSwitcher} from './siteswitcher/';
import {CssClasses as SiteSwitcherCssClasses} from './siteswitcher/constants';
import {SteppedNav} from './steppednav/';

/**
 * Glue Header Component
 */
class Header extends Component {
  constructor(root, headerOptions) {
    super(root);
    this.isAnimating = false;
    this.scrolling = false;
    this.lastPositionY = 0;
    this.atTopOfPage = true;
    this.allowTransitionEndEvent = false;
    this.isTransparent = false;
    /**
     * This flag needs to be set to true. This is needed to block a scroll event
     * on reload and adds box shadow to the header.
     */
    this.blockFalseScroll = true;
    /**
     * Handler for key down events
     */
    this.keydownHandler = (e) => {
      var _a, _b;
      const isEscape = e.key === Key.ESC;
      if (this.options.drawer) {
        if (((_a = this.drawer) === null || _a === void 0 ? void 0 :
                                                            _a.isOpen()) &&
            isEscape) {
          (_b = this.drawer) === null || _b === void 0 ? void 0 : _b.close();
        }
      }
    };
    /**
     * Handler for mouseover event. This will add an active class so we can put
     * the default header styles back for transparent header.
     */
    this.handleMouseOver = (e) => {
      if (this.root === e.target || this.containsElement(e)) {
        this.root.classList.add(CssClasses.ACTIVE);
      }
    };
    /**
     * Handler for mouseleave event. This will remove active class, this is used
     * only for the transparent header variation.
     */
    this.handleMouseLeave = (e) => {
      !this.root.matches(':focus-within') &&
          !this.activeBarElement.classList.contains(CssClasses.REWIND_SHADOW) &&
          this.root.classList.remove(CssClasses.ACTIVE);
    };
    /**
     * Handler for header focus event. This adds an acive class to the header
     * it's currently focused. We have to add a class due to the face that, the
     * peudo selector ':focus-within' doesn't work with :not(), this is a better
     * solution.
     */
    this.handleFocus = () => {
      if (this.root.matches(':focus-within')) {
        this.root.classList.add(CssClasses.ACTIVE);
      } else {
        !this.activeBarElement.classList.contains(CssClasses.REWIND_SHADOW) &&
            this.root.classList.remove(CssClasses.ACTIVE);
      }
    };
    /**
     * Handles focus within state. Used to reshow header for keyboard users are
     * trying to navigate back to the header
     */
    this.handleFocusWithin = () => {
      this.show();
    };
    if (!this.root.classList.contains(CssClasses.ROOT)) {
      throw new Error(Strings.MISSING_ROOT_ELEMENT);
    }
    this.options = Object.assign(
        {}, Header.defaultOptions, headerOptions, this.getOptions());
    // Set up breakpoints array for responsive monitor
    switch (this.options.breakpoint) {
      case 'md':
        this.breakpointsMobileNav = ['sm'];
        break;
      case 'lg':
        this.breakpointsMobileNav = ['sm', 'md'];
        break;
      case 'xl':
        this.breakpointsMobileNav = ['sm', 'md', 'lg'];
        break;
      default:  // unknown breakpoint value
        throw new Error(Strings.UNKNOWN_CUSTOM_BREAKPOINT);
    }
    this.initialize();
    this.initializeNavigationSubcomponents();
    this.responsiveMonitorInit();
  }
  /**
   * Default Header options.
   */
  static get defaultOptions() {
    return {
      breakpoint: 'lg',
      drawer: true,
      hideOnScroll: true,
      steppedNav: false,
    };
  }
  /**
   * Initialize Drawer and Bar
   */
  initialize() {
    var _a;
    this.headerBar = this.getHeaderBarElement();
    this.headerBarMobile = this.getHeaderBarElement(true);
    this.activeBarElement = this.getActiveBarElement();
    if (this.options.drawer) {
      const drawerEl = this.root.querySelector(`.${CssClasses.DRAWER_EL}`);
      const linkBarEl = this.headerBar.querySelector(`.${CssClasses.LINK_BAR}`);
      // Throw exception if element is missing
      if (drawerEl === null) {
        throw new Error(Strings.MISSING_DRAWER_ELEMENT);
      } else if (linkBarEl === null) {
        throw new Error(Strings.MISSING_LINK_BAR_ELEMENT);
      }
      this.toggleBtnEl = this.root.querySelector(`.${CssClasses.TOGGLE_BTN}`);
      // Throw exception if element is missing
      if (this.toggleBtnEl === null) {
        throw new Error(Strings.MISSING_TOGGLE_BTN_ELEMENT);
      }
      this.drawer = new Drawer(drawerEl, this.toggleBtnEl);
    } else {
      this.root.classList.add(CssClasses.NO_DRAWER);
    }
    this.setPositionStyle();
    this.setActiveBarPosition(this.headerBar.style.position);
    // Set required attributes
    // Add aria attrs
    this.root.setAttribute(Attribute.ARIA_EXPANDED, `false`);
    // Bind handlers
    this.handleClick = (e) => {
      this.clickHandler(e);
    };
    this.handleKeydown = (e) => {
      this.keydownHandler(e);
    };
    this.handleScroll = () => {
      this.scrollThrottlerHandler();
    };
    this.handleDrawOpen = () => {
      this.handleDrawerOpenEvent();
    };
    this.handleDrawClose = () => {
      this.handleDrawerCloseEvent();
    };
    this.handleTransitionEnd = () => {
      this.handleTransitionEndEvent();
    };
    // Event listeners
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    this.root.addEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.addEventListener(EventType.FOCUS_IN, this.handleFocusWithin);
    // DRAWER
    this.options.drawer &&
        this.root.addEventListener(DrawerStrings.OPEN, this.handleDrawOpen);
    this.options.drawer &&
        this.root.addEventListener(DrawerStrings.CLOSE, this.handleDrawClose);
    window.addEventListener(EventType.SCROLL, this.handleScroll);
    this.headerBar.addEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnd);
    this.headerBarMobile.addEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnd);
    if (this.root.classList.contains(CssClasses.TRANSPARENT)) {
      this.isTransparent = true;
      this.root.classList.contains(CssClasses.DOUBLE) &&
          ((_a = this.root.querySelector(`.${CssClasses.ACTIVE_MENU} > a`)) ===
                       null ||
                   _a === void 0 ?
               void 0 :
               _a.appendChild(document.createElement('div')));
      this.root.addEventListener(EventType.MOUSEOVER, this.handleMouseOver);
      this.root.addEventListener(EventType.MOUSELEAVE, this.handleMouseLeave);
      this.root.addEventListener(EventType.FOCUS_IN, this.handleFocus);
      this.root.addEventListener(EventType.FOCUS_OUT, this.handleFocus);
    }
    this.injectVersion();
  }
  injectVersion() {
    document.documentElement.dataset['glue'] = 'glue@28.0.0';
  }
  /**
   * Initialize SteppedNav, DeepNav and SiteSwitcher.
   */
  initializeNavigationSubcomponents() {
    // Init the popovers for deep nav and site switcher if present.
    const siteSwitcherElem =
        this.root.querySelector(`.${SiteSwitcherCssClasses.COMPONENT}`);
    if (siteSwitcherElem) {
      this.siteSwitcher = new SiteSwitcher(siteSwitcherElem);
    }
    const menuBar = document.querySelector(`.${CssClasses.DEEP_NAV}`);
    if (menuBar) {
      this.deepNav = new Menubar(menuBar);
    }
    // Init the Stepped Nav if the option is on and the element is present.
    if (this.options.steppedNav) {
      const steppedNavElem = SteppedNav.getSteppedNavElement(this.root);
      if (steppedNavElem) {
        this.root.classList.add(CssClasses.STEPPED_NAV_ENABLE);
        // If there is a failure to init the stepped nav, just fail back to
        // the standard nav.
        try {
          this.steppedNav = new SteppedNav(steppedNavElem);
        } catch (error) {
          this.root.classList.remove(CssClasses.STEPPED_NAV_ENABLE);
          throw error;
        }
      }
    }
  }
  destroy() {
    var _a, _b, _c;
    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.root.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.root.removeEventListener(EventType.FOCUS_IN, this.handleFocusWithin);
    this.headerBar.removeEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnd);
    this.headerBarMobile.removeEventListener(
        EventType.TRANSITIONEND, this.handleTransitionEnd);
    window.removeEventListener(EventType.SCROLL, this.handleScroll);
    // Cancel the animation frame
    window.cancelAnimationFrame(this.animationsFrameId);
    this.rm.unlisten((size) => {
      if (this.breakpointsMobileNav.includes(size)) {
        this.setActiveBarPosition();
      }
    });
    this.rm.destroy();
    if (this.options.drawer) {
      this.root.removeEventListener(DrawerStrings.OPEN, this.handleDrawOpen);
      this.root.removeEventListener(DrawerStrings.CLOSE, this.handleDrawClose);
      (_a = this.drawer) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    (_b = this.siteSwitcher) === null || _b === void 0 ? void 0 : _b.destroy();
    (_c = this.deepNav) === null || _c === void 0 ? void 0 : _c.destroy();
    if (this.steppedNav) this.steppedNav.destroy();
    if (this.root.classList.contains(CssClasses.TRANSPARENT)) {
      this.root.removeEventListener(EventType.MOUSEOVER, this.handleMouseOver);
      this.root.removeEventListener(
          EventType.MOUSELEAVE, this.handleMouseLeave);
      this.root.removeEventListener(EventType.FOCUS_IN, this.handleFocus);
      this.root.removeEventListener(EventType.FOCUS_OUT, this.handleFocus);
    }
  }
  /**
   * Get the options passed or returns the default options
   */
  getOptions() {
    const options = {};
    for (const option of Object.keys(Header.defaultOptions)) {
      const attr =
          `glueHeader${option.toUpperCase().slice(0, 1)}${option.slice(1)}`;
      if (this.root.dataset[attr] === 'true' ||
          this.root.dataset[attr] === 'false') {
        options[option] = this.root.dataset[attr] === 'true';
      } else {
        if (this.root.dataset[attr]) {
          options[option] = this.root.dataset[attr];
        }
      }
    }
    return options;
  }
  /**
   * Handles the event delegation for the click handlers on the root element.
   */
  clickHandler(e) {
    var _a, _b, _c, _d, _e, _f;
    if (this.options.drawer) {
      if ((_a = this.drawer) === null || _a === void 0 ? void 0 : _a.isOpen()) {
        if (!((_b = this.drawer) === null || _b === void 0 ?
                  void 0 :
                  _b.containsElement(e))) {
          (_c = this.drawer) === null || _c === void 0 ? void 0 : _c.close();
        } else if (
            (_d = this.drawer) === null || _d === void 0 ? void 0 :
                                                           _d.isCtaElement(e)) {
          (_e = this.drawer) === null || _e === void 0 ? void 0 : _e.close();
        }
      } else {
        if (this.toggleBtnEl.contains(e.target)) {
          (_f = this.drawer) === null || _f === void 0 ? void 0 : _f.open();
        }
      }
    }
  }
  /**
   * Checks to see if the event target is a child of the root element.
   */
  containsElement(event) {
    return event.target instanceof Node && this.root.contains(event.target);
  }
  /**
   * This is to throttle the scrolling logic with window.requestAnimationFrame.
   * this is also using a requestAnimationFrame to help with performance.
   */
  scrollThrottlerHandler() {
    if (!this.scrolling) {
      this.animationsFrameId = window.requestAnimationFrame(() => {
        this.scrollHandler();
        this.scrolling = false;
      });
      this.scrolling = true;
    }
  }
  /**
   * Called via window.requestAnimationFrame, this helps check state
   * in a more accurate way and helps avoid getting lock in an incorrect
   * position.
   */
  scrollHandler() {
    const hasScrolledClass =
        this.activeBarElement.classList.contains(CssClasses.WHOLLY_SCROLLED);
    // Get the direction
    const direction = this.getScrollDirection();
    // Need to set a threshold to avoid browser elastic scrolling triggering
    // nav hide
    const nearBottom =
        document.body.clientHeight - window.scrollY - window.innerHeight <=
        Numbers.SCROLL_THRESHOLD;
    const scrollingDown = direction === Strings.SCROLL_DOWN;
    const scrollingUp = direction === Strings.SCROLL_UP;
    // Will hide the nav once it haves the scroll class and scrolling down
    if (!this.atTopOfPage && scrollingDown && !hasScrolledClass &&
        !this.isAnimating) {
      // Hide the nav after scrolling down to pass the nav element.
      if (window.scrollY > this.activeBarElement.clientHeight) {
        this.hide();
      }
      // This is for scrolling up and not at the top of the page. We also block
      // the elastic recoil causing a scroll up to fire.
    } else if (
        !this.atTopOfPage && scrollingUp && hasScrolledClass &&
        !this.isAnimating && !nearBottom) {
      // This fix a bug in some mobile safari browsers. It randomly causes
      // this block to run while scrolling down
      if (this.lastPositionY - window.scrollY !== 0) {
        this.show();
      }
      // This is for preventing the nav from getting lock in a hidden state.
    } else if (this.atTopOfPage && !this.isAnimating && hasScrolledClass) {
      this.show();
    }
    this.atTopOfPage = window.scrollY <= 0;
    this.lastPositionY = window.scrollY;
    // There is still a bug where scroll events are incorrectly being fired. We
    // need to block this from causing rewind shadow being added
    this.blockFalseScroll = false;
    // Apply box shadow on header bar element.
    this.rewindBoxShadow();
    // This ensures that the position is correct when at the top of the page.
    // Because of fast resizing and scrolling the Nav gets stuck with the wrong
    // position.
    this.atTopOfPage && this.setActiveBarPosition();
    this.isTransparent && this.setTransparentActiveClass();
    // This is a fail-safe, last check to see if that state has changed whilst
    // animating. This is the main cause of header issues.
    if (this.isAnimating && window.scrollY <= Numbers.MAX_PAGE_OFFSET) {
      window.requestAnimationFrame(() => {
        this.scrollThrottlerHandler();
      });
    }
  }
  /**
   * Need to reset the position of the desktop header bar. This needs to be
   * reset to avoid issues with the drawer.
   */
  resetDesktopHeaderPosition() {
    const {display} = window.getComputedStyle(this.headerBarMobile);
    // Reset drawer
    if (display === 'block') {
      this.headerBar.style.top = '0';
      this.headerBar.style.position = 'fixed';
    } else {
      this.headerBar.style.position = 'static';
    }
  }
  /**
   * Set initial headerBar position style based on the scroll position.
   */
  setPositionStyle() {
    if (window.scrollY > this.activeBarElement.clientHeight) {
      this.headerBar.style.position = 'fixed';
    } else {
      this.headerBar.style.position = 'static';
    }
  }
  /**
   * The active class adds the normal styles back to the header, which is
   * anytime the header is not at the top of the page. So when the @root element
   * has position set to 'static' and atthe top of the page is the only time it
   * will be transparent.
   */
  setTransparentActiveClass() {
    if (window.scrollY > this.activeBarElement.clientHeight) {
      this.root.classList.add(CssClasses.ACTIVE);
    } else {
      !this.root.matches(':focus-within') &&
          this.root.classList.remove(CssClasses.ACTIVE);
    }
  }
  /**
   * Update the position of the active header element, needed for animation.
   * position should be 'static' at the top of the page and 'fixed' once
   * scrolled
   * @param pos position to be set on the active bar element
   */
  setActiveBarPosition(pos = 'static') {
    if (!this.options.hideOnScroll) {
      pos = 'fixed';
    }
    const activeEl = this.activeBarElement;
    const {display} = window.getComputedStyle(this.headerBarMobile);
    display === 'block' && this.resetDesktopHeaderPosition();
    if (pos === 'static') {
      activeEl.style.top = `-${activeEl.clientHeight}px`;
    } else {
      setTimeout(() => {
        activeEl.style.top = (0).toString();
      }, Numbers.POSITION_CHANGE_BUFFER);
    }
    activeEl.style.position = pos;
  }
  /**
   * Check if root has the correct child element, which is required for
   * animations. There are two bar elements for desktop and mobile
   */
  getHeaderBarElement(isMobile = false) {
    const filterByStr =
        isMobile ? CssClasses.BAR_MOBILE : CssClasses.BAR_DESKTOP;
    const headerBarEl =
        Array.from(this.root.querySelectorAll(`.${CssClasses.BAR}`))
            .filter((item) => item.classList.contains(filterByStr));
    if (!headerBarEl) {
      throw new Error(Strings.MISSING_HEADER_BAR_ELEMENT);
    }
    return headerBarEl[0];
  }
  /**
   * Some classes need to be removed form the DOM when the close event is
   * emitted from the Drawer component
   */
  handleDrawerCloseEvent() {
    this.root.classList.remove(CssClasses.DRAWER_IS_SHOWN);
    this.root.setAttribute(Attribute.ARIA_EXPANDED, 'false');
  }
  /**
   * Some classes need to be added to the DOM when the open event is emitted
   * from the drawer component
   */
  handleDrawerOpenEvent() {
    this.root.classList.add(CssClasses.DRAWER_IS_SHOWN);
    this.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
  }
  /**
   * This method will take care of any logic that needs to run after the CSS
   * transition has ended
   */
  handleTransitionEndEvent() {
    if (this.allowTransitionEndEvent) {
      this.isAnimating = false;
      this.allowTransitionEndEvent = false;
      this.activeBarElement.classList.remove(CssClasses.IS_ANIMATING);
    }
  }
  /**
   * The drawer needs to be closed if the window is resized to desktop and
   * drawer is left open
   */
  responsiveMonitorInit() {
    this.rm = new ResponsiveMonitor({
      breakpoint: this.breakpointsMobileNav,
      enter: () => {
        var _a, _b, _c;
        this.activeBarElement = this.getActiveBarElement();
        this.setActiveBarPosition();
        (_a = this.drawer) === null || _a === void 0 ? void 0 :
                                                       _a.setAriaHidden();
        (_b = this.siteSwitcher) === null || _b === void 0 ? void 0 :
                                                             _b.destroy();
        (_c = this.deepNav) === null || _c === void 0 ? void 0 : _c.destroy();
      },
      leave: () => {
        var _a, _b, _c, _d, _e;
        if (this.options.drawer &&
            ((_a = this.drawer) === null || _a === void 0 ? void 0 :
                                                            _a.isOpen())) {
          (_b = this.drawer) === null || _b === void 0 ? void 0 : _b.close();
        }
        (_c = this.drawer) === null || _c === void 0 ? void 0 :
                                                       _c.removeAriaHidden();
        this.activeBarElement = this.getActiveBarElement();
        this.setActiveBarPosition();
        (_d = this.siteSwitcher) === null || _d === void 0 ? void 0 : _d.init();
        (_e = this.deepNav) === null || _e === void 0 ? void 0 : _e.init();
      },
    });
    // RM needs to trigger on resize, not just on enter.
    this.rm.listen((size) => {
      if (this.breakpointsMobileNav.includes(size)) {
        this.setActiveBarPosition();
      }
    });
  }
  /**
   * Get scroll direction
   */
  getScrollDirection() {
    return this.lastPositionY >= window.scrollY ? Strings.SCROLL_UP :
                                                  Strings.SCROLL_DOWN;
  }
  /**
   * Will hide the nav and add the animation class.
   */
  hide() {
    if (!this.options.hideOnScroll) return;
    this.isAnimating = true;
    this.allowTransitionEndEvent = true;
    this.activeBarElement.classList.add(
        CssClasses.WHOLLY_SCROLLED, CssClasses.IS_ANIMATING);
    this.setActiveBarPosition('fixed');
    this.emit(Strings.HIDE_EVENT, {});
  }
  /**
   * Will show the nav and add the animation class. Will also remove the
   * scroll class
   */
  show() {
    if (!this.options.hideOnScroll) return;
    this.isAnimating = true;
    this.allowTransitionEndEvent = true;
    // Add animation class to header-bar elements
    this.activeBarElement.classList.add(CssClasses.IS_ANIMATING);
    // Remove Scrolled class to header-bar elements
    this.activeBarElement.classList.remove(CssClasses.WHOLLY_SCROLLED);
    this.emit(Strings.SHOW_EVENT, {});
  }
  /**
   * On rewind add the box shadow class but remove it once you reach the top of
   * the page
   */
  rewindBoxShadow() {
    if (this.atTopOfPage) {
      this.activeBarElement.classList.remove(CssClasses.REWIND_SHADOW);
    } else if (
        !this.atTopOfPage && !this.isAnimating && !this.blockFalseScroll) {
      // Header must but out of view before adding box shadow
      if (window.scrollY > this.activeBarElement.clientHeight) {
        this.activeBarElement.classList.add(CssClasses.REWIND_SHADOW);
      }
    }
  }
  /**
   * Checks to see if Mobile navbar is visible. This will be set in init method
   * and again with @type {ResponsiveMonitor}
   */
  getActiveBarElement() {
    const {display} = window.getComputedStyle(this.headerBarMobile);
    return display === 'block' ? this.headerBarMobile : this.headerBar;
  }
}
export {Header};
