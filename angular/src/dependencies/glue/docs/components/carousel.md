# Carousel

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-10-12' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Gallery, Slider, Slide Show

An interactive component that cycles between different content nodes.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BCarousel%5D)**

**[SCSS SOURCE](/src/carousel/_index.scss)**

**[TS SOURCE](/src/carousel/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/carousels.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/carousel/simple"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/carousel/simple)

## Features

-   Cyclical (infinite loop) option
-   Peek out, swipe controls on mobile
-   Arrow buttons, navigation dot controls on desktop

## Setup

### Dependencies

-   SCSS
    -   [Icons](/docs/components/icons.md)
    -   [Typography](/docs/components/typography.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/carousel';

// Import Glue layout overrides
```


#### Cards variation

If using a [cards carousel](#cards), you'll also need to add
[Breakpoints](/docs/components/breakpoints.md) and
[Cards](/docs/components/cards.md) as dependencies.

```scss
// Import Glue core layout components
@use '@google/glue/dist/breakpoints';

// Import Glue UI components
@use '@google/glue/dist/cards';
```


### HTML

```html
<div id="glue-carousel" class="glue-carousel" aria-label="Carousel description">
  <!-- Previous -->
  <button class="glue-carousel__button glue-carousel__button--prev"
      aria-label="Previous slide">
    <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--32px">
      <use href="/assets/img/glue-icons.svg#chevron-left"></use>
    </svg>
  </button>
  <!-- Next -->
  <button class="glue-carousel__button glue-carousel__button--next"
      aria-label="Next slide">
    <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--32px">
      <use href="/assets/img/glue-icons.svg#chevron-right"></use>
    </svg>
  </button>
  <!-- LIST -->
  <div class="glue-carousel__viewport">
    <div class="glue-carousel__list">
      <div class="glue-carousel__item" id="glue-carousel-1"
          aria-label="Slide 1">
        <img src="/assets/img/carousel/simple-1.jpg" alt="Image 1 description">
      </div>
      <div class="glue-carousel__item" id="glue-carousel-2"
          aria-label="Slide 2">
        <img src="/assets/img/carousel/simple-2.jpg" alt="Image 2 description">
      </div>
      <div class="glue-carousel__item" id="glue-carousel-3"
          aria-label="Slide 3">
        <img src="/assets/img/carousel/simple-3.jpg" alt="Image 3 description">
      </div>
    </div>
  </div>
  <!-- Navigation dots -->
  <div class="glue-carousel__navigation" aria-label="Choose slide to display"></div>
</div>
```

### TS initialization

```ts
// Only include CarouselOptions if you are customizing the carousel
// by passing configuration options through the constructor
import {Carousel, CarouselOptions} from '@google/glue';

const carouselEl = document.querySelector<HTMLElement>('.glue-carousel');
if (carouselEl) new Carousel(carouselEl);
```



## Variations

### Cards

A carousel can also contain
[Card components](/docs/components/cards.md), to do this
you will need to:

-   Add the [cards SCSS dependencies](#cards-variation).
-   Add the `.glue-carousel--cards` modifier to `.glue-carousel` container.
-   Set the [`cardsPerPage`](#customize-carousel) option to the amount of cards
    to be shown on a desktop viewport, if wanting something other than the
    default (3).
-   Follow the
    [Card documentation](/docs/components/cards.md) for
    each card within the carousel, adding the `.glue-carousel__item` class to
    each `.glue-card`.
-   Add an `aria-label` attribute to each `.glue-card__inner` to ensure screen
    readers announce the contents on navigation - we recommend this being all
    the visible text within the card in a single string, see the
    [demos](#variation-demos) for an example.
-   Set `data-glue-carousel-navigation-label` on `.glue-carousel__navigation` to
    the label needed for each navigation dots (the string
    `$glue_carousel_page_number$` will be replaced with the correct page number,
    `$glue_carousel_page_total$` will be replaced with the total page number).
    If this data attribute is not set, it will load the default value. E.g.
    "selected tab 2 of 3".

```html
<div class="glue-carousel glue-carousel--cards" aria-label="Carousel description">
  <!-- Previous -->
  <button class="glue-carousel__button glue-carousel__button--prev"
      aria-label="Go to the previous slide">
    <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--32px">
      <use href="/assets/img/glue-icons.svg#chevron-left"></use>
    </svg>
  </button>
  <!-- Next -->
  <button class="glue-carousel__button glue-carousel__button--next"
      aria-label="Go to the next slide">
    <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--32px">
      <use href="/assets/img/glue-icons.svg#chevron-right"></use>
    </svg>
  </button>
  <!-- List -->
  <div class="glue-carousel__viewport">
    <div class="glue-carousel__list">
      <a class="glue-carousel__item glue-card" href="#">
        <div aria-label="Card description" class="glue-card__inner">...</div>
      </a>
      ...
    </div>
  </div>
  <!-- Navigation dots -->
  <div class="glue-carousel__navigation" aria-label="Choose a page"
       data-glue-carousel-navigation-label="Selected tab $glue_carousel_page_number$ of $glue_carousel_page_total$">
  </div>
</div>
```

### Youtube Video Cards

A carousel can also contain
[Video Card](/docs/components/youtube-video-player.md),
to do this you will need to:

-   Add an element to hold all modals with class `.glue-carousel__modals`
-   Each item should have `data-glue-yt-video-id` video id attribute and be in
    the same order.
-   The carousel items need to be in the same order as the modal

```html
  <div class="glue-carousel glue-carousel--cards" aria-label="Carousel description">
    <!-- Previous -->
    <button class="glue-carousel__button glue-carousel__button--prev"
        aria-label="Go to the previous slide">
      <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--32px">
        <use href="/assets/img/glue-icons.svg#chevron-left"></use>
      </svg>
    </button>
    <!-- Next -->
    <button class="glue-carousel__button glue-carousel__button--next"
        aria-label="Go to the next slide">
      <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--32px">
        <use href="/assets/img/glue-icons.svg#chevron-right"></use>
      </svg>
    </button>
    <!-- List -->
    <div class="glue-carousel__viewport">
      <div class="glue-carousel__list">
        <!-- #1 -->
        <a class="glue-card glue-carousel__item glue-video" aria-label="Card with white play icon" href="#">
          <div class="glue-card__inner glue-video__preview-container glue-video__preview-container--cards">
            ...
          </div>
        </a>
      </div>
    </div>
    <!-- Navigation dots -->
    <div class="glue-carousel__navigation" aria-label="Choose a page"
        data-glue-carousel-navigation-label="Selected tab $glue_carousel_page_number$ of $glue_carousel_page_total$">
    </div>

    <!-- MODALS -->
    <div class="glue-carousel__modals">
      <div class="glue-modal glue-modal--dark demo-ytvideo-cards-overlay-modal">
        <div class="glue-video__container glue-modal__content-wrapper"
          tabindex="0"
          data-glue-yt-video-vid="-ZNEzzDcllU"
          data-glue-yt-video-height="100%"
          data-glue-yt-video-width="100%"
          data-glue-yt-video-autoplay="true">
        </div>
        <button class="glue-modal__close-btn" tabindex="0" aria-label="Close this modal"></button>
      </div>
    </div>
  </div>
```

### Modals
A carousel can also contain
[Modal components](/docs/components/modal.md), to do this
you will need to:

-   Add the [modal dependencies](#/docs/components/modal.md).
-   Add an element to hold all modals with class `.glue-carousel__modals`
-   The carousel items need to be in the same order as the modals
-   [Instantiate](#/docs/components/modal.md)
all the modals

```html
  <div class="glue-carousel glue-carousel--cards" aria-label="Carousel description">
    <!-- Previous -->
    <button class="glue-carousel__button glue-carousel__button--prev"
        aria-label="Go to the previous slide">...</button>
    <!-- Next -->
    <button class="glue-carousel__button glue-carousel__button--next"
        aria-label="Go to the next slide">...</button>

    <!-- List -->
    <div class="glue-carousel__viewport">
      <div class="glue-carousel__list">...</div>
    </div>

    <!-- Navigation dots -->
    <div class="glue-carousel__navigation" aria-label="Choose a page"
        data-glue-carousel-navigation-label="Selected tab $glue_carousel_page_number$ of $glue_carousel_page_total$">
    </div>

    <!-- MODALS -->
    <div class="glue-carousel__modals">
      <div class="glue-modal" aria-labelledby="modal-label" aria-describedby="modal-content">
        <h2 id="modal-label" class="glue-headline glue-headline--headline-1">
          Modal title 1
        </h2>
        <p id="modal-content">
          Modal content.
        </p>
        <!-- This close button is optional -->
        <button class="glue-modal__close-btn" aria-label="Close the modal"></button>
      </div>
    </div>
  </div>
```

## Public Methods and properties

Method            | Params | Description                                | Return
----------------- | ------ | ------------------------------------------ | ------
`setCurrentSlide` | number | Set the current slide, index starts at 1   | void
`getCurrentSlide` |        | Get the current slide                      | number
`previous()`      |        | Go to the previous slide or page.          | void
`next()`          |        | Go to the next slide or page.              | void
`reset()`         |        | Reset the component to its original state. | void
`destroy()`       |        | Remove all event listeners.                | void

### Customize Carousel

You can pass options to constructor call or use data attribute to customize the
Carousel. If you do both, the data attributes take the precedence.

#### Configuration options

| Name           | Type      | Default Value | Description                    |
| -------------- | --------- | ------------- | ------------------------------ |
| `currentSlide` | `number`  | `1`           | The index of current slide,    |
:                :           :               : starting with 1.               :
| `peekOut`      | `boolean` | `true`        | See portion of next and        |
:                :           :               : previous slides.               :
| `navigation`   | `boolean` | `true`        | Turn on/off navigation dots.   |
| `animation`    | `boolean` | `true`        | Turn on/off animation.         |
| `cyclical`     | `boolean` | `false`       | Turn on/off the looping.       |
| `cardsPerPage` | `number`  | `3`           | The number of cards to show at |
:                :           :               : a time (for `md` viewports it  :
:                :           :               : is 1 less than this value, and :
:                :           :               : for `sm` it is always 1).      :
| `dragging`     | `boolean` | `true`        | Turn on/off dragging for large viewports.|

#### Using data attributes

```html
<div class="glue-carousel"
    data-glue-carousel-currentSlide="2"
    data-glue-carousel-peekOut="true"
    data-glue-carousel-navigation="false"
    data-glue-carousel-animation="false"
    data-glue-carousel-cyclical="true"
    data-glue-carousel-cardsPerPage="4"
    data-glue-carousel-dragging="true">
...
```

#### Using constructor

```ts
new Carousel(carouselEl, {
  currentSlide: 2,
  peekOut: true,
  navigation: false,
  animation: false,
  cyclical: true,
  cardsPerPage: 4,
  dragging: true,
});
```

### Track data changes

You can use the observer property to track Carousel data changes.

```ts
carousel = new Carousel(el);

// Retrieve the current slide index
carousel.observer.data.currentSlide

// Subscribe to the current slide change
carousel.observer.listen('currentSlide', ()=> {...});

// Unsubscribe to the current slide change
carousel.observer.unlisten('currentSlide', ()=> {...});
```

## Accessibility

-   Set an `aria-label` on the carousel parent to describe its contents
-   Set an `aria-label` on each slide that denotes its position in the group
    ("Slide N of TOTAL")
-   Set an `aria-label` on the next/previous buttons that describe their actions
-   If using a multi-item carousel (such as [Cards](#cards)), set a
    `data-glue-carousel-navigation-label` to create a dynamic `aria-label` that
    describes the action of each navigation dot
-   Reference:
    [WAI-ARIA best practices](https://www.w3.org/TR/wai-aria-practices-1.1/examples/carousel/carousel-1.html)

### Keyboard and touch interactions

-   Press `Tab` key to navigate between next/previous arrow icons and navigation
    dots.
-   Press left and right arrow keys to navigate between slides within the
    nagivation dots.
-   Swipe or drag the carousel to navigation to the next/previous slide.

## Variation demos

-   [Basic Carousel](https://28-0-dot-glue-demo.appspot.com/components/carousel/simple)
-   [Cyclical Carousel](https://28-0-dot-glue-demo.appspot.com/components/carousel/cyclical)
-   [Cards Carousel](https://28-0-dot-glue-demo.appspot.com/components/carousel/cards)
-   [Cards Carousel (Text Only)](https://28-0-dot-glue-demo.appspot.com/components/carousel/cards-text)
