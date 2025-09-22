import {Component} from '../base/index';
import {Attribute, TabIndex} from '../constants/attribute';
import {easeInOutQuart} from '../easing/';
import {EventType} from '../events/eventtype';
import * as focusUtil from '../focus/';
import {Observer, ObserverDataObj} from '../observer';
import {ScrollEventType} from '../smoothscroll/constants';
import {ScrollManager} from '../smoothscroll/scrollmanager';

import {CssClasses, DataAttr, Numbers, Strings} from './constants';

declare interface JumplinksOptions {
  offset: number;
  belowHeader: boolean;
}

declare interface JumplinksObserverData extends ObserverDataObj {
  activeLink: string;
}

// Add class methods here to prevent deletion in the CDN.
declare interface JumplinksDef {
  reset: () => void;
  setActiveLink: (id: string) => void;
  getActiveLink: () => string;
  observer: Observer<JumplinksObserverData>;
}

class Jumplinks extends Component implements JumplinksDef {
  private readonly list: HTMLElement;
  private readonly listItems: HTMLElement[];
  private readonly links: HTMLAnchorElement[];
  private readonly prevButton: HTMLElement;
  private readonly nextButton: HTMLElement;
  options: JumplinksOptions;
  private leftWatchPoint: number;
  private rightWatchPoint: number;

  private readonly smoothScroll: ScrollManager;
  private readonly linkTargets: HTMLElement[] = [];
  private lastScrollPosition = 0;
  private isScrolling = false;

  private readonly handleClick: (e: Event) => void = (e) => {
    this.clickHandler(e);
  };
  private readonly handleActiveLinkChange: () => void = () => {
    this.activeLinkChangeHandler();
  };
  private readonly handleScroll: () => void = () => {
    this.scrollHandler();
  };
  private readonly handleResize: () => void = () => {
    this.resizeHandler();
  };
  private readonly handleLinkFocus: (e: Event) => void = (e) => {
    this.focusLinkHandler(e);
  };
  private readonly handleHorizontalScroll: () => void = () => {
    this.updateButtons();
  };

  observer: Observer<JumplinksObserverData>;

  constructor(root: HTMLElement, options?: Partial<JumplinksOptions>) {
    super(root);

    let element = this.root.querySelector<HTMLElement>(`.${CssClasses.LIST}`);
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

    this.listItems = Array.from(
      this.root.querySelectorAll(`.${CssClasses.ITEMS}`),
    );
    if (this.listItems.length === 0) {
      throw new Error('Jumplinks list item is missing.');
    }
    this.links = Array.from(this.root.querySelectorAll(`.${CssClasses.LINK}`));
    if (this.links.length === 0) {
      throw new Error('Jumplinks link item is missing.');
    }

    this.options = Object.assign(
      {},
      {
        offset: Numbers.DEFAULT_OFFSET,
        belowHeader: false,
      },
      options,
    );

    this.smoothScroll = new ScrollManager();
    this.observer = new Observer({
      activeLink: '',
    });
    this.leftWatchPoint =
      this.root.getBoundingClientRect().x + this.prevButton.offsetWidth;
    this.rightWatchPoint = this.leftWatchPoint + this.list.offsetWidth;

    this.initialize();
  }

  private initialize() {
    this.setAttributes();
    this.updateButtons();
    this.getLinkTargets();
    this.registerListeners();
    this.createIntersectionObserver();
  }

  private createIntersectionObserver() {
    const options: IntersectionObserverInit = {
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
  override destroy() {
    this.deregisterListeners();
  }

  private setAttributes() {
    /**
     * Gets localized text to be appended to jump links 'aria label'
     * if it exists or else uses default string.
     */
    const jumplinkList = this.root.querySelector(
      `.${CssClasses.LIST}`,
    ) as HTMLElement;
    const labelText =
      jumplinkList.dataset[DataAttr.JUMPLINK_LABEL] ||
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

  setActiveLink(id: string) {
    this.observer.data['activeLink'] = id;
  }

  getActiveLink(): string {
    return this.observer.data['activeLink'];
  }

  private getLinkTargets() {
    for (const link of this.links) {
      const hash = link.hash.substring(1);
      const target = document.querySelector<HTMLElement>(`#${hash}`);
      if (!target) {
        throw new Error(`Element with id "${hash}" does not exist.`);
      }
      this.linkTargets.push(target);
    }
  }

  private registerListeners() {
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    const throttle = (func: (...args: unknown[]) => void, limit: number) => {
      let inThrottle: boolean;
      return (...args: unknown[]) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };
    this.list.addEventListener(EventType.SCROLL, this.handleHorizontalScroll);
    document.addEventListener(
      EventType.SCROLL,
      throttle(this.handleScroll, 16),
    );
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

  private deregisterListeners() {
    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.list.removeEventListener(
      EventType.SCROLL,
      this.handleHorizontalScroll,
    );
    window.removeEventListener(EventType.SCROLL, this.handleScroll);
    window.removeEventListener(EventType.RESIZE, this.handleResize);
    this.observer.unlisten(Strings.ACTIVE_LINK, this.handleActiveLinkChange);
    for (const link of this.links) {
      link.removeEventListener(EventType.FOCUS, this.handleLinkFocus);
    }
  }

  private focusLinkHandler(e: Event) {
    if (e.target && e.target instanceof Element) {
      this.updateButtons();
    }
  }

  /**
   * Click handler for all component buttons, via event delegation
   */
  private clickHandler(e: Event) {
    e.preventDefault();

    const clickTarget = e.target;
    let target: HTMLAnchorElement;

    if (clickTarget === this.prevButton) {
      target = this.isRTL()
        ? this.getPartialLink('next')
        : this.getPartialLink('prev');
      target.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'end',
      });
    } else if (clickTarget === this.nextButton) {
      target = this.isRTL()
        ? this.getPartialLink('prev')
        : this.getPartialLink('next');
      target.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      });
    } else if (
      clickTarget instanceof HTMLAnchorElement &&
      this.links.includes(clickTarget)
    ) {
      target = clickTarget;
      const hash = target.hash.substring(1);
      const defaultScrollY =
        this.options.offset +
        Numbers.JUMPLINKS_HEIGHT +
        Numbers.JUMPLINKS_MARGIN;
      const midHeight = Math.floor(window.innerHeight / 2);
      const scrollY = defaultScrollY > midHeight ? midHeight : defaultScrollY;
      const targetElement = document.querySelector<HTMLElement>(`#${hash}`)!;
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
  private getPartialLink(direction: string): HTMLAnchorElement {
    let watchPoint;
    direction === 'prev'
      ? (watchPoint = this.leftWatchPoint)
      : (watchPoint = this.rightWatchPoint);
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

  private activeLinkChangeHandler() {
    this.renderActiveLink();
    const hash = this.getActiveLink();
    if (hash !== '') {
      const activeEl = this.links.find((link) => link.hash === `#${hash}`);
      // Scroll the link element into view
      activeEl?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'center',
      });
    }
    this.updateButtons();
  }

  private scrollHandler() {
    if (this.isScrolling === true) {
      return;
    }
    this.updateTopOffset();
  }

  private resizeHandler() {
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
  private updateButtons() {
    this.prevButton.classList.remove(CssClasses.BUTTON_ACTIVE);
    this.nextButton.classList.remove(CssClasses.BUTTON_ACTIVE);
    if (this.isRTL()) {
      if (this.list.scrollLeft < 0) {
        this.prevButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
      if (
        this.list.scrollWidth + this.list.scrollLeft - this.list.clientWidth >
        10
      ) {
        this.nextButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
    } else {
      if (this.list.scrollLeft > 0) {
        this.prevButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
      if (
        this.list.scrollWidth - this.list.scrollLeft - this.list.clientWidth >
        10
      ) {
        this.nextButton.classList.add(CssClasses.BUTTON_ACTIVE);
      }
    }
  }

  /**
   * Set active link via hash
   */
  private renderActiveLink() {
    const id = this.getActiveLink();
    const currentActiveLink = document.querySelector<HTMLAnchorElement>(
      `a[href$="${id}"]`,
    )!;
    const prevActiveLink = this.root.querySelector(
      `.${CssClasses.LINK_ACTIVE}`,
    );
    prevActiveLink?.classList.remove(CssClasses.LINK_ACTIVE);
    prevActiveLink?.removeAttribute(Attribute.ARIA_CURRENT);
    currentActiveLink?.classList.add(CssClasses.LINK_ACTIVE);
    currentActiveLink?.setAttribute(Attribute.ARIA_CURRENT, 'true');
  }

  /**
   * Updates vertical offset of the Jumplinks.
   */
  private updateTopOffset() {
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
            (header?.clientHeight || 0) + Numbers.JUMPLINKS_MARGIN,
          );
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

  private setOffset(top: number) {
    this.root.style.top = `${top}px`;
  }

  private unsetOffset() {
    this.root.style.top = '';
  }

  private isRTL() {
    return document.documentElement.dir === Strings.RTL;
  }
}

export {Jumplinks, type JumplinksOptions};
