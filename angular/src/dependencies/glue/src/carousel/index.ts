import {Component} from '../base';
import {Attribute, Role, TabIndex} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import * as focusUtil from '../focus/';
import {Observer, ObserverDataObj} from '../observer';

import {CssClasses, Numbers, Strings} from './constants';

declare interface CarouselOptions {
  currentSlide: number;
  peekOut: boolean;
  navigation: boolean;
  animation: boolean;
  cyclical: boolean;
  cardsPerPage: number;
  dragging: boolean;
}

declare interface CarouselObserverData extends ObserverDataObj {
  currentSlide: number;
}

type TouchEvents = TouchEvent | PointerEvent | MouseEvent;

// Add class methods here to prevent deletion in the CDN.
declare interface CarouselDef {
  reset: () => void;
  next: () => void;
  previous: () => void;
  setCurrentSlide: (current: number) => void;
  getCurrentSlide: () => number;
}

interface TouchPosition {
  x: number;
  y: number;
}

/** The Glue Carousel component. */
class Carousel extends Component implements CarouselDef {
  /** The user defined options for the carousel. */
  readonly options: CarouselOptions;

  /** Parent element of slides, used to move content within the viewport. */
  private readonly slidesContainer: HTMLDivElement;

  /** Viewport element, parent of slidesContainer */
  private readonly viewport: HTMLElement;

  /** Every slide element (including dummies if required). */
  private slides: HTMLElement[];

  /** A reference to the original slides property (without dummies). */
  private readonly slidesRef: HTMLElement[];

  /** Button that when clicked navigates to the previous slide. */
  private readonly prevBtn: HTMLButtonElement;

  /** Button that when clicked navigates to the next slide. */
  private readonly nextBtn: HTMLButtonElement;

  /** Parent element for navigation dots. */
  private readonly navigation: HTMLDivElement;

  /** Every navigation dot. */
  private readonly dots: HTMLButtonElement[] = [];

  /** Total number of pages. */
  private totalPages = 1;

  /** The number of visible slides within the viewport. */
  private slidesPerPage = 1;

  /**
   * A flag to turn on/off animation when the component loads.
   * It has been used to jump from the dummy slide to the first/last actual
   * slide.
   */
  private animateOnInitialLoad = false;

  /**
   * Observable instance storing the currently visible slide.
   */
  readonly observer: Observer<CarouselObserverData>;

  /** The container width. */
  private containerWidth = 0;

  /** The slide width. */
  private slideWidth = 0;

  /** Flag to determine whether this is a carousel of cards. */
  private readonly isCards: boolean;

  /** True if this is an RTL page. */
  private readonly isRtl = document.documentElement.dir === Strings.RTL;

  /**
   * Flag to determine whether we're using a tab panel navigation model.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
   */
  private isTabModel = true;

  /** Flag to determine whether the carousel should show the navigation dots. */
  private isShowingNavigation = true;

  /** A collection of scroll value for each page */
  private pagesX: number[] = [];

  /** Initial touch position */
  private initialTouchPos: TouchPosition | null = null;

  /** Flag to determine if the carousel is currently being dragged. */
  private isDragging = false;

  /** Last touch poistion */
  private lastTouchPos: TouchPosition | null = null;

  /** True when it is ready to call request animatino frame */
  private rafPending = false;

  /** Current horizontal position */
  private currentXPosition = 0;

  /**
   * Set this value to false when dragging option is false and it is on desktop
   */
  private enableDragging: boolean | null = null;

  constructor(root: HTMLElement, options?: Partial<CarouselOptions>) {
    super(root);

    this.isCards = this.root.classList.contains(CssClasses.CARDS);

    this.viewport = this.root.querySelector<HTMLElement>(
      `.${CssClasses.VIEWPORT}`,
    )!;

    this.slidesContainer = this.root.querySelector<HTMLDivElement>(
      `.${CssClasses.LIST}`,
    )!;
    this.slides = Array.from(
      this.slidesContainer.querySelectorAll<HTMLElement>(`.${CssClasses.ITEM}`),
    );
    this.slidesRef = Array.from(this.slides);

    this.navigation = this.root.querySelector<HTMLDivElement>(
      `.${CssClasses.NAVIGATION}`,
    )!;
    this.prevBtn = this.root.querySelector<HTMLButtonElement>(
      `.${CssClasses.BUTTON_PREV}`,
    )!;
    this.nextBtn = this.root.querySelector<HTMLButtonElement>(
      `.${CssClasses.BUTTON_NEXT}`,
    )!;

    this.options = {...Carousel.defaults, ...options, ...this.getDataAttrs()};
    this.observer = new Observer({currentSlide: this.options.currentSlide});

    this.setup();
    this.registerEvents();
  }

  /** Returns the default carousel options. */
  static get defaults(): CarouselOptions {
    return {
      currentSlide: 1,
      peekOut: true,
      navigation: true,
      animation: true,
      cyclical: false,
      cardsPerPage: 3,
      dragging: true,
    };
  }

  /** Sets up the component to prepare for the initial rendering. */
  private setup() {
    // Add peek out feature class
    if (this.options.peekOut) {
      this.root.classList.add(CssClasses.PEEK_OUT);
    }

    // Copy dummyslides if it is cyclical
    if (this.options.cyclical) {
      this.copyDummySlides();
    }

    // Add a11y attributes (note dynamic values are set in render functions)
    this.slidesContainer.setAttribute(Attribute.ARIA_LIVE, 'polite');
    this.nextBtn.setAttribute(Attribute.ARIA_CONTROLS, this.root.id);
    this.prevBtn.setAttribute(Attribute.ARIA_CONTROLS, this.root.id);

    // Calculate and render
    this.calculate();
    this.currentXPosition = -1 * this.pagesX[this.getCurrentPage()];
    this.render();
  }

  /** Registers event listeners. */
  private registerEvents() {
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    this.root.addEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.slidesContainer.addEventListener(
      EventType.TRANSITIONEND,
      this.handleTransitionEnd,
    );
    window.addEventListener(EventType.RESIZE, this.handleResize);
    this.updateTouchEvents();
    this.observer.listen('currentSlide', this.handleCurrentSlideChange);
  }

  /** Unregisters event listeners on removal of component. */
  override destroy() {
    for (const slide of this.slides) {
      slide.removeAttribute(Attribute.TAB_INDEX);
      slide.removeAttribute(Attribute.ROLE);
      slide.removeAttribute(Attribute.ARIA_HIDDEN);
    }
    for (const dot of this.dots) {
      dot.removeAttribute(Attribute.TAB_INDEX);
      dot.removeAttribute(Attribute.ROLE);
      dot.removeAttribute(Attribute.ARIA_SELECTED);
    }
    this.slidesContainer.style.removeProperty('transform');
    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.root.removeEventListener(EventType.KEYDOWN, this.handleKeydown);
    this.slidesContainer.removeEventListener(
      EventType.TRANSITIONEND,
      this.handleTransitionEnd,
    );
    window.removeEventListener(EventType.RESIZE, this.handleResize);
    if (this.enableDragging) {
      this.deregisterTouchEvents();
    }
    this.observer.unlisten('currentSlide', this.handleCurrentSlideChange);
  }

  /** Resets the component to the initial values. */
  reset() {
    this.setCurrentSlide(this.options.currentSlide);
  }

  /** Calculates carousel properties and scroll values. */
  private calculate() {
    this.isCards ? this.calculateCardsProperties() : this.calculateProperties();
    this.calcScrollValue();
  }

  /** Calculates and sets properies for non-card carousels. */
  private calculateProperties() {
    this.containerWidth = toNumber(
      getComputedStyle(this.slidesContainer).width,
    );
    this.slideWidth = toNumber(getComputedStyle(this.slides[0]).width);

    const slidesPerPage = this.containerWidth / this.slideWidth;
    this.slidesPerPage =
      1 - (slidesPerPage % 1) < Numbers.ROUNDING_THRESHOLD
        ? Math.ceil(slidesPerPage)
        : Math.floor(slidesPerPage);
    this.totalPages = Math.ceil(this.slidesRef.length / this.slidesPerPage);

    this.isShowingNavigation = this.options.navigation;
    // Only use tabs if there's a 1:1 relationship between slide and dot
    this.isTabModel = this.isShowingNavigation && this.slidesPerPage === 1;
  }

  /**
   * Calculates items per page and total pages attributes (for card carousels)
   * and updates the CSS grid styles accordingly.
   */
  private calculateCardsProperties() {
    // Determine number of cards to show on the page
    const breakpoint = this.getCurrentBreakpoint();
    let cardsPerPage: number;
    switch (breakpoint) {
      case 'sm':
        // Always show one card at a time on mobile
        cardsPerPage = 1;
        break;
      case 'md':
        // Tablet shows one less card per page than desktop (minimum one)
        cardsPerPage = Math.max(1, this.options.cardsPerPage - 1);
        break;
      default:
        // Desktop uses the number of cards set in options
        cardsPerPage = this.options.cardsPerPage;
    }

    // Calculate card & container widths
    const viewportStyles = getComputedStyle(this.viewport);
    let viewportWidth =
      toNumber(viewportStyles.width) -
      toNumber(viewportStyles.paddingLeft) -
      toNumber(viewportStyles.paddingRight);
    if (this.options.peekOut && breakpoint === 'sm') {
      // Adjust how much of next slide peeks out on small viewport
      viewportWidth = viewportWidth - Numbers.PEEK_DISTANCE;
    }
    const gutter = toNumber(
      getComputedStyle(this.slidesContainer)['columnGap'],
    );

    const totalPages = this.slides.length / cardsPerPage;
    const containerWidth = Math.floor(
      viewportWidth * totalPages + (totalPages - 1) * gutter,
    );

    // Update element styles
    this.slidesContainer.style.width = `${containerWidth}px`;
    this.slidesContainer.style['gridTemplateColumns'] =
      `repeat(${this.slides.length}, 1fr)`;

    // Set properties
    this.containerWidth = viewportWidth + gutter;
    this.slidesPerPage = cardsPerPage;
    this.slideWidth = this.containerWidth / cardsPerPage;
    this.totalPages = Math.ceil(totalPages);

    // Never show navigation dots on mobile
    this.isShowingNavigation = this.options.navigation && breakpoint !== 'sm';
    // Never use tab model as items are anchors
    this.isTabModel = false;
  }

  /** Renders all the UI components in Carousel. */
  private render() {
    this.renderSlides();
    this.renderButtons();
    this.renderNavigation();
  }

  /** Returns the currently active slide (1-indexed). */
  getCurrentSlide() {
    return this.observer.data['currentSlide'];
  }

  /** Returns the currently visible page (1-indexed). */
  private getCurrentPage() {
    return Math.ceil(this.getCurrentSlide() / this.slidesPerPage);
  }

  /** Sets the currently active slide in the state (1-indexed). */
  setCurrentSlide(slide: number) {
    // Allow setting value to dummies (+/-1) if an animated cyclical carousel
    const buffer = this.options.cyclical && this.options.animation ? 1 : 0;
    const min = 1 - buffer;
    const max = this.slidesRef.length + buffer;

    // Wrap value if cyclical, behaving like a carousel does visually
    // eg. Slide 4 of a 3 slide cylical carousel is 1
    this.observer.data['currentSlide'] = this.options.cyclical
      ? wrap(slide, min, max)
      : clamp(slide, min, max);
  }

  /** Sets the current slide value to the first slide of the requested page. */
  private setCurrentPage(page: number) {
    const slide = (page - 1) * this.slidesPerPage + 1;
    this.setCurrentSlide(slide);
  }

  /** Sets the current slide value to the previous page. */
  previous() {
    const previousPage = this.getCurrentPage() - 1;
    this.setCurrentPage(previousPage);
  }

  /** Sets the current slide value to the next page. */
  next() {
    const nextPage = this.getCurrentPage() + 1;
    this.setCurrentPage(nextPage);
  }

  /** Renders the appropriate slide attributes. */
  private renderSlides() {
    this.transit();

    const currentIndex =
      wrap(this.getCurrentSlide(), 1, this.slidesRef.length) - 1;
    const currentPage = this.getCurrentPage();
    const currentPageIndex = currentPage - 1;

    const isFocused =
      document.activeElement instanceof HTMLElement &&
      this.slides.includes(document.activeElement);

    for (const [index, slide] of this.slidesRef.entries()) {
      const isCurrent = index === currentIndex;
      const isVisible =
        isCurrent ||
        // [or] slide is part of the current page
        Math.floor(index / this.slidesPerPage) === currentPageIndex ||
        // [or] it's visible on the last page due to edge alignment
        (currentPage === this.totalPages &&
          index >= this.slidesRef.length - this.slidesPerPage);

      if (
        isVisible ||
        (this.isCards && document.documentElement.clientWidth < 600)
      ) {
        slide.removeAttribute(Attribute.ARIA_HIDDEN);
      } else {
        slide.setAttribute(Attribute.ARIA_HIDDEN, 'true');
      }

      this.isTabModel
        ? slide.setAttribute(Attribute.ROLE, Role.TABPANEL)
        : slide.removeAttribute(Attribute.ROLE);

      if (this.isCards) {
        slide.tabIndex = isCurrent ? TabIndex.TABBABLE : TabIndex.NOT_TABBABLE;
      }

      // If any slide is in focus, move focus to current
      if (isCurrent && isFocused) {
        // Preventing scroll to ensure browser doesn't try and bring the
        // focussed element into view during transition.
        slide.focus({preventScroll: true});

        // To prevent Safari from scrolling.
        // https://caniuse.com/mdn-api_htmlelement_focus_preventscroll_option
        setTimeout(() => {
          this.viewport.scrollLeft = 0;
        }, 0);
      }
    }
    this.removeFocusOnHiddenElements();
  }

  /** Remove keyboard focus on focusable elements in the hidden slides. */
  private removeFocusOnHiddenElements() {
    const index = wrap(this.getCurrentSlide(), 1, this.slidesRef.length) - 1;
    const currentIndex = this.options.cyclical ? index + 1 : index;
    for (const [index, slide] of this.slides.entries()) {
      const focusableElements = focusUtil.getFocusableElements(slide);
      for (const focusableElement of focusableElements) {
        if (index === currentIndex) {
          focusableElement.removeAttribute(Attribute.TAB_INDEX);
        } else {
          focusableElement.tabIndex = TabIndex.NOT_TABBABLE;
        }
      }
    }
  }

  /**
   *  Turn on/off dragging based on settings and screen size.
   *  In small viewport, dragging is always enabled.
   *  In other viewport sizes, it depends on the component configurations.
   */
  private updateTouchEvents() {
    const breakpoint = this.getCurrentBreakpoint();
    if (!this.options.dragging && breakpoint !== 'sm') {
      if (this.enableDragging) this.deregisterTouchEvents();
      this.slidesContainer.classList.add(CssClasses.DISABLE_GRAB);
      this.enableDragging = false;
    } else {
      if (!this.enableDragging) this.registerTouchEvents();
      this.slidesContainer.classList.remove(CssClasses.DISABLE_GRAB);
      this.enableDragging = true;
    }
  }

  /** Updates the transform for the viewport. */
  private transit() {
    // Turn off animation in the initial loading and when it jumps from the
    // dummy slide to the real slide.
    if (!(this.animateOnInitialLoad && this.options.animation)) {
      this.slidesContainer.style.transition = 'initial';
    }

    // Retrieve the new translateX values
    const newTranslateX = this.pagesX[this.getCurrentPage()];

    this.slidesContainer.style.transform = `translate3d(${newTranslateX}px, 0, 0)`;
    this.currentXPosition = newTranslateX;
    // Turn on animation if it is temporarily turned off.
    if (this.options.animation && !this.animateOnInitialLoad) {
      this.turnOnAnimation();
    }
  }

  /** Turns on animation for slides (needs a slight buffer to avoid skips). */
  private turnOnAnimation() {
    this.animateOnInitialLoad = true;
    // Use setTimeout to prevent the animation on the initial loading.
    // There is probably a gap before CSS takes the transform value setup in JS.
    setTimeout(() => {
      this.slidesContainer.style.transition = '';
    }, 10);
  }

  /** Renders the appropriate attributes in the dot navigation. */
  private renderNavigation() {
    // If no navigation is required, hide
    if (!this.isShowingNavigation) {
      this.root.classList.remove(CssClasses.HAS_NAVIGATION);
      return;
    }

    // Show navigation and set a11y attributes
    this.root.classList.add(CssClasses.HAS_NAVIGATION);
    this.isTabModel
      ? this.navigation.setAttribute(Attribute.ROLE, Role.TABLIST)
      : this.navigation.removeAttribute(Attribute.ROLE);

    // Build dots if number of pages has changed (or first render)
    if (this.dots.length !== this.totalPages) {
      this.buildNavigation();
    }

    const currentIndex = wrap(this.getCurrentPage(), 1, this.totalPages) - 1;
    const isFocused =
      document.activeElement instanceof HTMLButtonElement &&
      this.dots.includes(document.activeElement);

    for (const [index, dot] of this.dots.entries()) {
      const isCurrent = index === currentIndex;

      dot.classList.toggle(CssClasses.ACTIVE, isCurrent);
      dot.tabIndex = isCurrent ? TabIndex.TABBABLE : TabIndex.NOT_TABBABLE;

      if (this.isTabModel) {
        dot.setAttribute(Attribute.ARIA_SELECTED, `${isCurrent}`);
      } else {
        dot.setAttribute(Attribute.ARIA_CURRENT, `${isCurrent}`);
      }

      // If any dot is in focus, move focus to current
      if (isCurrent && isFocused) {
        dot.focus();
      }
    }
  }

  /** Shows or hides the next/previous buttons. */
  private renderButtons() {
    if (this.options.cyclical) {
      return;
    }

    const activeElement = document.activeElement;
    const currentPage = this.getCurrentPage();
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === this.totalPages;

    // Show/hide buttons
    this.prevBtn.classList.toggle(CssClasses.INACTIVE, isFirstPage);
    this.nextBtn.classList.toggle(CssClasses.INACTIVE, isLastPage);

    // If a button was in focus and now hidden, move to other
    if (isLastPage && activeElement === this.nextBtn) {
      this.prevBtn.focus();
    } else if (isFirstPage && activeElement === this.prevBtn) {
      this.nextBtn.focus();
    }
  }

  /** Builds the dot navigation. */
  private buildNavigation() {
    // Remove dots
    while (this.dots.length) {
      this.dots.pop()?.remove();
    }

    // Create a dot per page
    for (let i = 0; i < this.totalPages; i++) {
      const dot = document.createElement('button');
      dot.classList.add(CssClasses.NAVIGATION_DOT);
      dot.dataset[Strings.DATA_DOT] = `${i + 1}`;

      if (this.isTabModel) {
        const id = this.slidesRef[i * this.slidesPerPage]?.id;
        dot.setAttribute(Attribute.ARIA_CONTROLS, id);
        dot.setAttribute(Attribute.ARIA_LABELLEDBY, id);
        dot.setAttribute(Attribute.ROLE, Role.TAB);
      } else {
        const template =
          this.navigation.dataset[Strings.DATA_NAVIGATION_LABEL] ||
          Strings.NAVIGATION_LABEL_DEFAULT;
        const label = template
          .replace(Strings.NAVIGATION_LABEL_NUMBER_VAR_NAME, `${i + 1}`)
          .replace(
            Strings.NAVIGATION_LABEL_TOTAL_VAR_NAME,
            `${this.totalPages}`,
          );
        dot.setAttribute(Attribute.ARIA_CONTROLS, this.root.id);
        dot.setAttribute(Attribute.ARIA_LABEL, label);
      }

      this.navigation.appendChild(dot);
      this.dots.push(dot);
    }
  }

  /** Copies the first and last slides into the DOM (for cyclical carousels). */
  private copyDummySlides() {
    const firstSlide = this.cloneSlide(this.slides[0]);
    const lastSlide = this.cloneSlide(this.slides[this.slides.length - 1]);
    this.slidesContainer.append(firstSlide);
    this.slidesContainer.prepend(lastSlide);
    this.slides = [lastSlide, ...this.slides, firstSlide];
  }

  /** Clones a slide (for first/last dummies). */
  private cloneSlide<T extends HTMLElement>(slide: T): T {
    const clone = slide.cloneNode(true) as T;
    clone.id = `${slide.id}-copy`;
    clone.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    clone.tabIndex = TabIndex.NOT_TABBABLE;
    return clone;
  }

  /** Calculates the scroll values for each page. */
  private calcScrollValue() {
    // Determine min/max pages (depending on dummy slides)
    const delta = this.options.cyclical ? 1 : 0;
    const min = 1 - delta;
    const max = this.totalPages + delta;

    // The direction we're moving the slide container in
    const direction = this.isRtl ? 1 : -1;

    this.pagesX = [];
    for (let page = min; page <= max; page++) {
      const pageX =
        page < max
          ? // Calculate the x position for the first slide within that page
            // (not using page - 1 * containerWidth as slides may not fit exactly)
            (page - 1 + delta) * this.slidesPerPage * this.slideWidth
          : // For final page, ensure end position is flush against container edge
            this.slides.length * this.slideWidth - this.containerWidth;

      this.pagesX[page] = pageX * direction;
    }
  }

  /** Re-renders the carousel when the current slide value changes. */
  private readonly handleCurrentSlideChange = () => {
    this.emit(Strings.SLIDE_CHANGE, this.getCurrentSlide());
    this.render();
  };

  /** Re-calculates and renders the carousel when the window resizes. */
  private readonly handleResize = () => {
    this.animateOnInitialLoad = false;
    this.calculate();
    this.render();
    this.updateTouchEvents();
  };

  /** Sets the current slide value to the appropriate slide on UI clicks. */
  private readonly handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (
      target instanceof HTMLElement ||
      // iOS VoiceOver triggers the event from the svg (b/192919688)
      target instanceof window['SVGElement']
    ) {
      if (
        target.closest<HTMLButtonElement>(`.${CssClasses.BUTTON_NEXT}`) ===
        this.nextBtn
      ) {
        this.next();
      } else if (
        target.closest<HTMLButtonElement>(`.${CssClasses.BUTTON_PREV}`) ===
        this.prevBtn
      ) {
        this.previous();
      } else if (
        target instanceof HTMLButtonElement &&
        this.dots.includes(target)
      ) {
        const page = Number(target.dataset[Strings.DATA_DOT]);
        this.setCurrentPage(page);
      } else if (this.isCards && this.isDragging) {
        // Do not trigger a card click if the carousel has been dragged.
        event.preventDefault();
      }
    }
  };

  /**
   * Sets the current slide value to the appropriate slide on left/right
   * keyboard press.
   */
  private readonly handleKeydown = (event: KeyboardEvent) => {
    const isLeft = event.code === Key.LEFT;
    const isRight = event.code === Key.RIGHT;

    if (isLeft || isRight) {
      const isNext = this.isRtl ? isLeft : isRight;

      if (
        event.target instanceof HTMLButtonElement &&
        this.dots.includes(event.target)
      ) {
        isNext ? this.next() : this.previous();
      } else if (
        event.target instanceof HTMLElement &&
        this.slides.includes(event.target)
      ) {
        const increment = isNext ? 1 : -1;
        this.setCurrentSlide(this.getCurrentSlide() + increment);
      }
    }
  };

  /** Jumps to the real slides (from a dummy) when the transition ends. */
  private readonly handleTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== this.slidesContainer) {
      return;
    }

    // Jump to the first or last page if it is cyclical.
    if (this.options.cyclical) {
      const currentSlide = this.getCurrentSlide();
      if (currentSlide > this.totalPages) {
        // Set the flag to false to prevent animation when it jumps from the
        // dummy slide to the real slide.
        this.animateOnInitialLoad = false;
        this.setCurrentSlide(1);
      } else if (currentSlide < 1) {
        this.animateOnInitialLoad = false;
        this.setCurrentSlide(this.totalPages);
      }
    }
  };

  private registerTouchEvents() {
    if (window.PointerEvent) {
      // Add Pointer Event Listener
      this.viewport.addEventListener(
        EventType.POINTERDOWN,
        this.handleGestureStart,
        true,
      );
      this.viewport.addEventListener(
        EventType.POINTERMOVE,
        this.handleGestureMove,
        true,
      );
      this.viewport.addEventListener(
        EventType.POINTERUP,
        this.handleGestureEnd,
        true,
      );
      this.viewport.addEventListener(
        EventType.POINTERCANCEL,
        this.handleGestureEnd,
        true,
      );
    } else {
      // Add Touch Listener
      this.viewport.addEventListener(
        EventType.TOUCHSTART,
        this.handleGestureStart,
        true,
      );
      this.viewport.addEventListener(
        EventType.TOUCHMOVE,
        this.handleGestureMove,
        true,
      );
      this.viewport.addEventListener(
        EventType.TOUCHEND,
        this.handleGestureEnd,
        true,
      );
      this.viewport.addEventListener(
        EventType.TOUCHCANCEL,
        this.handleGestureEnd,
        true,
      );

      // Add Mouse Listener
      this.viewport.addEventListener(
        EventType.MOUSEDOWN,
        this.handleGestureStart,
        true,
      );
    }
  }

  private deregisterTouchEvents() {
    if (window.PointerEvent) {
      // Add Pointer Event Listener
      this.viewport.removeEventListener(
        EventType.POINTERDOWN,
        this.handleGestureStart,
        true,
      );
      this.viewport.removeEventListener(
        EventType.POINTERMOVE,
        this.handleGestureMove,
        true,
      );
      this.viewport.removeEventListener(
        EventType.POINTERUP,
        this.handleGestureEnd,
        true,
      );
      this.viewport.removeEventListener(
        EventType.POINTERCANCEL,
        this.handleGestureEnd,
        true,
      );
    } else {
      // Add Touch Listener
      this.viewport.removeEventListener(
        EventType.TOUCHSTART,
        this.handleGestureStart,
        true,
      );
      this.viewport.removeEventListener(
        EventType.TOUCHMOVE,
        this.handleGestureMove,
        true,
      );
      this.viewport.removeEventListener(
        EventType.TOUCHEND,
        this.handleGestureEnd,
        true,
      );
      this.viewport.removeEventListener(
        EventType.TOUCHCANCEL,
        this.handleGestureEnd,
        true,
      );

      // Add Mouse Listener
      this.viewport.removeEventListener(
        EventType.MOUSEDOWN,
        this.handleGestureStart,
        true,
      );
    }
  }

  private readonly handleGestureStart = (event: TouchEvents) => {
    event.preventDefault();
    if (
      (this.isTouchEvent(event) && event.touches.length > 1) ||
      (event instanceof PointerEvent && event.button !== 0)
    ) {
      return;
    }

    // Add the move and end listeners
    if (
      window.PointerEvent &&
      event instanceof PointerEvent &&
      event.target instanceof Element
    ) {
      event.target.setPointerCapture(event.pointerId);
    } else {
      // Add Mouse Listeners
      document.addEventListener(
        EventType.MOUSEMOVE,
        this.handleGestureMove,
        true,
      );
      document.addEventListener(EventType.MOUSEUP, this.handleGestureEnd, true);
    }

    this.initialTouchPos = this.getGesturePointFromEvent(event);
    this.slidesContainer.style.transition = 'initial';
  };

  private readonly handleGestureMove = (event: TouchEvents) => {
    event.preventDefault();

    if (!this.initialTouchPos) {
      return;
    }

    // Prevent small taps/etc triggering a dragging interaction
    const currentTouchPos = this.getGesturePointFromEvent(event);
    if (!this.isDragging) {
      const distanceDragged = Math.abs(
        this.getXDistance(this.initialTouchPos, currentTouchPos),
      );
      if (distanceDragged < Numbers.DRAGSTART_THRESHOLD_PX) {
        return;
      }
    }

    this.isDragging = true;
    this.lastTouchPos = currentTouchPos;

    if (this.rafPending) {
      return;
    }
    this.rafPending = true;

    window.requestAnimationFrame(() => {
      this.onAnimFrame();
    });
  };

  private readonly handleGestureEnd = (event: TouchEvents) => {
    event.preventDefault();

    if (this.isTouchEvent(event) && event.touches?.length > 0) {
      return;
    }

    this.rafPending = false;

    // Remove Event Listeners
    if (
      window.PointerEvent &&
      event instanceof PointerEvent &&
      event.target instanceof Element
    ) {
      event.target.releasePointerCapture(event.pointerId);
    } else {
      // Remove Mouse Listeners
      document.removeEventListener(
        EventType.MOUSEMOVE,
        this.handleGestureMove,
        true,
      );
      document.removeEventListener(
        EventType.MOUSEUP,
        this.handleGestureEnd,
        true,
      );
    }

    this.updateSwipeRestPosition();
    this.initialTouchPos = null;
    this.lastTouchPos = null;

    // Resetting after to allow for click handler to be called first
    // (to determine actions based on if carousel has been dragged)
    setTimeout(() => {
      this.isDragging = false;
    }, 0);
  };

  private updateSwipeRestPosition() {
    const differenceInX = this.getXDistance(
      this.initialTouchPos,
      this.lastTouchPos,
    );

    // Let CSS transition to take charge it
    this.slidesContainer.style.transition = '';
    const validDrag =
      Math.abs(differenceInX) >= this.containerWidth * Numbers.DRAG_THRESHOLD;
    // If dragging distance is over 20% of the viewport width, transit to
    // the next/prev page, otherwise rewind to the original position.
    if (validDrag) {
      if (
        (differenceInX > 0 && !this.isRtl) ||
        (differenceInX < 0 && this.isRtl)
      ) {
        this.next();
      }
      if (
        (differenceInX < 0 && !this.isRtl) ||
        (differenceInX > 0 && this.isRtl)
      ) {
        this.previous();
      }
    }
    this.transit();
  }

  /** Calculates the x distance between 2 positions. */
  private getXDistance(
    startPosition: TouchPosition | null,
    endPosition: TouchPosition | null,
  ): number {
    return startPosition && endPosition ? startPosition.x - endPosition.x : 0;
  }

  private getGesturePointFromEvent(event: TouchEvents): TouchPosition {
    const point = {x: 0, y: 0};

    if (this.isTouchEvent(event)) {
      if (event.targetTouches) {
        // Prefer Touch Events
        point.x = event.targetTouches[0].clientX;
        point.y = event.targetTouches[0].clientY;
      }
    } else {
      // Either Mouse event or Pointer Event
      point.x = event.clientX;
      point.y = event.clientY;
    }
    return point;
  }

  private onAnimFrame() {
    if (!this.rafPending) {
      return;
    }

    const differenceInX = this.getXDistance(
      this.initialTouchPos,
      this.lastTouchPos,
    );
    const newXTransform = this.currentXPosition - differenceInX;
    const transformStyle = `translate3d(${newXTransform}px, 0, 0)`;
    this.slidesContainer.style.transform = transformStyle;

    this.rafPending = false;
  }

  /** Determines whether the event is a TouchEvent. */
  private isTouchEvent(event: TouchEvents): event is TouchEvent {
    return window.TouchEvent && event instanceof TouchEvent;
  }

  /** Returns the options set via data attributes. */
  private getDataAttrs(): Partial<CarouselOptions> {
    const options: Record<string, number | boolean> = {};
    for (const option of Object.keys(Carousel.defaults)) {
      const attr = `glueCarousel${option
        .toUpperCase()
        .slice(0, 1)}${option.slice(1)}`;
      if (this.root.dataset[attr]) {
        if (option === 'currentSlide' || option === 'cardsPerPage') {
          const value = Number(this.root.dataset[attr]);
          if (!isNaN(value)) options[option] = value;
        } else {
          options[option] = this.root.dataset[attr] === 'true';
        }
      }
    }
    return options;
  }

  /**
   * Retrieves the named breakpoint currently injected in DOM.
   */
  private getCurrentBreakpoint(): string {
    const styles = window.getComputedStyle(document.body, ':after');
    const content = styles.getPropertyValue('content');
    const breakpoint = content.replace(/["']/g, '');
    return breakpoint;
  }
}

/** Clamps a number between the min and max values. */
function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(max, num));
}

/** Converts a CSS property value (as a pixel string) to a number. */
function toNumber(propertyValue: string) {
  return Number(propertyValue.replace('px', ''));
}

/**
 * Wraps a number between the min and max values (different to clamp as will
 * loop around).
 */
function wrap(num: number, min: number, max: number) {
  const range = max + 1 - min;
  const wrapped = min + ((num - min) % range);
  return wrapped < min ? wrapped + range : wrapped;
}

export {Carousel, type CarouselOptions};
