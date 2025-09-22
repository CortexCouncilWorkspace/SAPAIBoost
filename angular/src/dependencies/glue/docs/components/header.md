# Header

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-10-30' }
*-->

<!--* toc_depth: 4 *-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Heading, Page links, Header navigation

Displays Google logo, product name, initiative name lockup, and site navigation.
The header component has many variants available to accommodate a variety of
site designs and intents.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BHeader%5D)**

**[SCSS SOURCE](/src/header/_index.scss)**

**[TS SOURCE](/src/header/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/fundamentals/header.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/header/single-flagship"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/header/single-flagship)

## Features

-   Single Tier and Double Tier navigation
-   Products and sub-products lockup support
-   Primary and secondary CTA support
-   Custom breakpoints (not available on CDN)
-   Accessibility support for keyboard users
-   Site Switcher to navigate to sub sites.
-   Deep Navigation
-   Transparent header

## Accessibility

-   Navigate the menu links by pressing Tab key.
-   Navigate to the main page content by using the skip element -
    `.glue-header__skip-content`. The href attribute needs to be set to point to
    the main page content.
-   Indicate the current page when menu item receives focus.
-   Set `data-glue-steppednav-label` data
    attribute on stepped nav `glue-header__stepped-nav-controls` element, to
    add the mentioned localized string as the aria label for control
    elements, by default it will add `[link text], Navigate back to parent menu,
    [link text] opened`.

## Setup

### Dependencies

-   SCSS
    -   [Breakpoints](/docs/components/breakpoints.md)
    -   [Buttons](/docs/components/buttons.md)
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
@use '@google/glue/dist/breakpoints';
@use '@google/glue/dist/buttons';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/header';

// Import Glue layout overrides
```


### HTML

#### Single Tier

The Header component includes 2 parts, the mobile header bar
`glue-header__bar--mobile` and desktop header bar `glue-header__bar--desktop`.
On mobile devices, the mobile header bar serves as the header and the desktop
header bar serves as the drawer. Both header bars require a lockup and CTA
component.

To build a Single Tier Header, you need `Skip to Content`, `Lockup on mobile`,
`CTA on mobile`, `Lockup on desktop`, `CTA on desktop` and `Linkbar` components.

```html
<header class="glue-header glue-header--single">
  <!-- skip to content component -->
  <div class="glue-header__bar glue-header__bar--mobile">
    <div class="glue-header__tier">
      <!-- mobile lockup component -->
      <!-- mobile CTA component -->
    </div>
  </div>
  <div class="glue-header__bar glue-header__bar--desktop glue-header__drawer">
    <div class="glue-header__tier">
      <!-- desktop lockup component -->
      <!-- linkbar component -->
      <!-- desktop CTA component -->
    </div>
  </div>
  <div  class="glue-header__drawer-backdrop"></div>
</header>
```

#### Skip to Content

The anchor link should point to the main page content.

```html
<a href="#content" class="glue-header__link glue-header__skip-content">
  Jump to Content
</a>
```

#### Hamburger Button

```html
<div class="glue-header__hamburger">
  <button class="glue-header__drawer-toggle-btn" aria-label="Open the navigation drawer">
    <svg class="glue-icon glue-icon--24px" role="presentation" aria-hidden="true">
      <use href="/public/icons/glue-icons.svg#menu"></use>
    </svg>
  </button>
</div>
```

#### Logo

```html
<div class="glue-header__logo-container">
  <svg class="glue-header__logo-svg" role="presentation" aria-hidden="true">
    <use href="/public/icons/glue-icons.svg#google-color-logo"></use>
  </svg>
</div>
```

#### Lockup on mobile

Use the `Hamburger Button` and `Logo` components to build this lockup.

```html
<div class="glue-header__container">
  <div class="glue-header__lock-up">
    <!-- Hamburger button component -->
    <div class="glue-header__logo">
      <a class="glue-header__logo-link" href="#" title="Google">
        <!-- Logo component -->
        <span class="glue-header__logo--product">Product</span>
      </a>
    </div>
  </div>
</div>
```

#### Lockup on desktop

The desktop lockup does not include the hamburger menu. Use the `Logo` component
to build the lockup.

```html
<div class="glue-header__container">
  <div class="glue-header__lock-up">
    <div class="glue-header__logo">
      <a class="glue-header__logo-link" href="#" title="Google">
        <!-- Logo component -->
        <span class="glue-header__logo--product">Product</span>
      </a>
    </div>
  </div>
</div>
```

#### CTA on mobile

```html
<div class="glue-header__container">
  <div class="glue-header__cta">
    <button class="glue-button glue-button--medium-emphasis">
      Secondary
    </button>
    <button class="glue-button glue-button--high-emphasis">
      Primary
    </button>
  </div>
</div>
```

#### CTA on desktop

The CTA on desktop adds class `glue-header__container--cta` to the root element.

```html
<div class="glue-header__container glue-header__container--cta">
  <div class="glue-header__cta">
    <button class="glue-button glue-button--medium-emphasis">
      Secondary
    </button>
    <button class="glue-button glue-button--high-emphasis">
      Primary
    </button>
  </div>
</div>
```

#### Linkbar

Add class `glue-header__item--active` to the active list element. Add
`aria-current="page"` to the link element to indicate the current page.

```html
<div class="glue-header__container glue-header__container--linkbar">
  <nav class="glue-header__link-bar">
    <ul class="glue-header__list">
      <li class="glue-header__item glue-header__item--active">
        <a class="glue-header__link" href="#" aria-current="page">Main link</a>
      </li>
      <li class="glue-header__item">
        <a class="glue-header__link" href="#">Main link</a>
      </li>
      <li class="glue-header__item">
        <a class="glue-header__link" href="#">Main link</a>
      </li>
    </ul>
  </nav>
</div>
```

#### Double Tier

To make a Double Tier Header, add a child `<ul>` element after the main link
item. Add class `glue-header__item--active` to the active link element, then
add class `glue-header--is-active` to all parent `<li>` elements.

```html
<div class="glue-header__container glue-header__container--linkbar">
  <nav class="glue-header__link-bar">
    <ul class="glue-header__list">
      <li class="glue-header__item glue-header--is-active">
        <a class="glue-header__link" href="#">Main link</a>
        <ul class="glue-header__list glue-header__list--nested">
          <li class="glue-header__item glue-header__item--active">
            <a class="glue-header__link" href="#" aria-current="page">Secondary link</a>
          </li>
          <li class="glue-header__item">
            <a class="glue-header__link" href="#">Secondary link</a>
          </li>
          <li class="glue-header__item">
            <a class="glue-header__link" href="#">Secondary link</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</div>
```

Then use class `glue-header--double` to replace `glue-header--single` in the
root element.

```html
<header class="glue-header glue-header--double">...</header>
```

#### Campaign

```html
<a href="#" class="glue-header__logo--product glue-header__logo--product-campaign">Campaign</a>
```

Simply add the `Campaign link` after the `glue-header__logo-link` element in
both mobile lockup and desktop lockup.

```html
<div class="glue-header__container">
  <div class="glue-header__lock-up">
    <div class="glue-header__logo">
      <a class="glue-header__logo-link" href="#" title="Google">
        <!-- Logo component -->
      </a>
      <!-- Campaign link -->
    </div>
  </div>
</div>
```

#### Stacked Campaign on Mobile

When the campaign name is long, it will not fit in the mobile devices so it is
recommended to move the hamburger menu and the campaign link below the logo
lockup. The mobile lockup component should be updated with the following
snippet.

```html
<div class="glue-header__container">
  <div class="glue-header__lock-up">
    <div class="glue-header__logo">
      <a class="glue-header__logo-link" href="https://www.google.com" title="Google">
        <!-- Logo component -->
        <span class="glue-header__logo--product">Product</span>
      </a>
    </div>
  </div>
  <div class="glue-header__lock-up">
    <!-- Hamburger button component -->
    <div class="glue-header__logo">
      <!-- Campaign link -->
    </div>
  </div>
</div>
```

#### Logo Only

You can build a header with logo only, no linkbar, no CTA. The lockup is
simplified.

##### Lockup for logo only

```html
<div class="glue-header__container">
  <div class="glue-header__lock-up">
    <div class="glue-header__logo">
      <a class="glue-header__logo-link" href="#" title="Google">
        <!-- Logo component -->
      </a>
    </div>
  </div>
</div>
```

Use the above `lockup` component to build the Logo only header. Add class
`glue-header--simple glue-header--no-cta glue-header-no-drawer` to the root and
turn off drawer option through the `data-glue-header-drawer` attribute.

```html
<header class="glue-header glue-header--single glue-header--simple
glue-header--no-cta glue-header-no-drawer" data-glue-header-drawer="false">
  <!-- skip to content component -->
  <div class="glue-header__bar glue-header__bar--mobile">
    <div class="glue-header__tier">
      <!-- Lockup component -->
    </div>
  </div>
  <div class="glue-header__bar glue-header__bar--desktop glue-header__drawer">
    <div class="glue-header__tier">
      <!-- Lockup component -->
    </div>
  </div>
</header>
```

#### Custom Icon/Logo lockup

This variation is no longer supported by MWS, and will be removed in a future
update.

#### Deep Navigation

Header Deep Navigation adds the ability to attach fly-out sub-menus to the
navigation. To build it, add class `glue-header__deep-nav` to the top level
`<ul>` element, then add classes `glue-header--is-active` and
`glue-header__item--active` to the `<li>` elements based on the current page.

```html
<ul class="glue-header__list glue-header__list--nested glue-header__deep-nav">
  <li class="glue-header__item glue-header--is-active">
    <a class="glue-header__link" href="#">
      Main link
      <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--18px">
        <use href="/public/icons/glue-icons.svg#expand-more"></use>
      </svg>
    </a>
    <ul class="glue-header__list">
      <li class="glue-header__item">
        <a class="glue-header__link" href="#">Nested link 1</a>
      </li>
      <li class="glue-header__item glue-header--is-active">
        <a class="glue-header__link" href="#">
          Nested link 2
          <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--18px">
            <use href="/public/icons/glue-icons.svg#chevron-right"></use>
          </svg>
        </a>
        <ul class="glue-header__list">
          <li class="glue-header__item glue-header__item--active">
            <a class="glue-header__link" href="#" aria-current="page">Nested link 3</a>
          </li>
          <li class="glue-header__item">
            <a class="glue-header__link" href="#">Nested link 4</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
<ul>
```

#### Stepped Deep Navigation

The Header Stepped Nav add-on puts an alternate style of sliding Navigation into
the header drawer. It duplicates the exact structure of the link structure in
the nav bar and inserts it into the drawer as this component. The Stepped Nav
option only makes sense to use when Deep Navigation is also present.

```html
<div class="glue-header__container glue-header__stepped-nav">
  <div class="glue-header__stepped-nav-controls-container">
    <div class="glue-header__stepped-nav-controls"
        data-glue-steppednav-label="$glue_steppednav_label$, Navigate back to parent menu, $glue_steppednav_label$ opened">
      <div class="glue-header__stepped-nav-controls-arrow">
        <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--18px">
          <use href="/public/icons/glue-icons.svg#chevron-left"></use>
        </svg>
        <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--18px glue-header__stepped-nav-subnav-icon">
          <use href="/public/icons/glue-icons.svg#chevron-right"></use>
        </svg>
      </div>
      <div class="glue-header__stepped-nav-controls-title glue-header__link"></div>
    </div>
  </div>
  <div class="glue-header__stepped-nav-menus"></div>
</div>
```

Inject the above stepped navigation component before the linkbar component. Turn
SteppedNav option on through the `data-glue-header-stepped-nav` attribute.

```html
<header class="glue-header glue-header--double" data-glue-header-stepped-nav="true">
  ...
  <div class="glue-header__bar glue-header__bar--desktop glue-header__drawer">
    <div class="glue-header__tier">
      <!-- Lockup component -->
      <!-- Stepped Navigation component -->
      <!-- Linkbar component -->
      <!-- CTA component -->
    </div>
  </div>
  ...
</header>
```

#### Site Switcher

The Site Switcher option adds a drop-down menu to the Header lockup that
displays a list of sub sites. It has 2 parts, a trigger and a menu component.

##### Lockup with site switcher trigger

```html
<div class="glue-header__container">
  <div class="glue-header__lock-up">
    <div id="site-switcher" class="glue-header__logo glue-header__site-switcher" aria-controls="site-switcher-menu">
      <div class="glue-header__logo-link" title="Google">
        <!-- Logo component -->
        <span class="glue-header__logo--product">Product</span>
      </div>
      <div class="glue-header__logo--product glue-header__logo--product-campaign" aria-label="Subproduct">
        Subproduct
        <svg class="glue-icon glue-icon--18px" role="presentation" aria-hidden="true">
          <use href="/public/icons/glue-icons.svg#expand-more"></use>
        </svg>
      </div>
    </div>
  </div>
</div>
```

##### Menu

```html
<ul id="site-switcher-menu" class="glue-header__site-switcher-menu" aria-labelledby="site-switcher">
  <li class="glue-header__item">
    <a href="#" class="glue-header__link">
      Google Product
      <p class="glue-header__site-switcher-item-description">Explore the new Google Product</p>
    </a>
    <p class="glue-header__site-switcher-item-description glue-header__site-switcher-more-products">More from Google Product</p>
  </li>
  <li class="glue-header__item selected">
    <a href="#" class="glue-header__link">
      Subproduct 1
      <p class="glue-header__site-switcher-item-description">Earn rewards by contributing to Maps</p>
    </a>
  </li>
  <li class="glue-header__item">
    <a href="#" class="glue-header__link">
      Subproduct 2
      <p class="glue-header__site-switcher-item-description">See the world from every angle</p>
    </a>
  </li>
</ul>
```

Use the above `Lockup` and `Menu` to build the header.

```html
<header class="glue-header glue-header--double">
  ...
  <div class="glue-header__bar glue-header__bar--desktop glue-header__drawer">
    <div class="glue-header__tier">
      <!-- Lockup component -->
      <!-- Linkbar component -->
      <!-- Menu component -->
      <!-- CTA component -->
    </div>
  </div>

  <div  class="glue-header__drawer-backdrop"></div>
</header>
```

#### Transparent Header

To use a transparent variant of the header, add class `glue-header--transparent`
to the root element. This header variant positioning is slightly different, so
it can sit on the top of the background image.

```html
<header class="glue-header glue-header--double glue-header--transparent">
  ...
  <div class="glue-header__bar glue-header__bar--desktop glue-header__drawer">
    <div class="glue-header__tier">
      <!-- Lockup component -->
      <!-- Linkbar component -->
      <!-- CTA component -->
    </div>
  </div>
</header>
```

##### Logo

The transparent header variant requires this logo to be used. If the user
interacts with the header, the logo will be colored. When the header is
transparent then it's solid.

```html
<div class="glue-header__logo-container">
  <svg class="glue-header__logo-svg" role="presentation" aria-hidden="true">
    <use href="/public/icons/glue-icons.svg#google-logo-adjustable"></use>
  </svg>
</div>
```

### TS initialization

Initialize the header component.

```ts
// Only include HeaderOptions if you are customizing the header
// by passing configuration options through the constructor
import {Header, HeaderOptions} from '@google/glue';

const headerEl = document.querySelector<HTMLElement>('.glue-header');
if (headerEl) new Header(headerEl);
```

Pass in config options to the Header constructor.

```ts
new Header(headerEl, {hideOnScroll: false});
```



## Constructor Options

Header options can be set in a config object or through `data-glue-header-X`
parameters on the `<div class="glue-header">` element.

Name                     | Type                                   | Default Value | Description
------------------------ | -------------------------------------- | ------------- | -----------
`breakpoint`             | HeaderBreakpoints (`md`, `lg` or `xl`) | `'lg'`        | The breakpoint where the nav switches between mobile and desktop style.
`drawer`                 | `boolean`                              | `true`        | Whether or not to let the user open drawer menu.
`hideOnScroll`           | `boolean`                              | `true`        | Whether to hide the header while scrolling the page.
`steppedNav`             | `boolean`                              | `false`       | Whether to enable Stepped Navigation.

Review [set a custom breakpoint](#set-a-custom-breakpoint) before changing the
breakpoint option as you also need to adjust your SCSS import.

## Events

Name             | Description
---------------- |------------
`glueheadershow` | Shows the header
`glueheaderhide` | Hides the header

These events are fired when the user is scrolling but is not just using the
traditional `DOM` scroll event. These are helpful if you need to extend header
functionality. There is also a `400ms` transform animation once this event is
emitted. If you opt for the traditional scroll event, there can be jitter and
jumping, as the timings are not the same.

## Public Methods

Method    | Params  | Description                                           | Return
--------- | ------  | ----------------------------------------------------- |-------
`show`    |         | Shows the header                                      | void
`hide`    |         | Hides the header                                      | void
`destroy` |         | Removes all the event listeners from Header component | void

## Classes

Name                                           | Required | Description
---------------------------------------------- | ---------| -----------
`glue-header`                                  | Required | Base class
`glue-header--single` OR `glue-header--double` | Required | Modifer class for distinguishing single or double tiered headers
`glue-header--simple`                          | Optional | Modifer class for simple logo only headers
`glue-header--complex-stacked`                 | Optional | Modifer class for a double tiered header with campaign and drawer toggle on secodnd tier
`glue-header--transparent`                     | Optional | Modifer class to use a tranparnet header
`glue-header--no-drawer`                       | Optional | Modifer class that will hide the drawer toggle
`glue-header--no-cta`                          | Optional | Modifer class to be used if no CTA buttons are present

## Variations

### Reverse logo lock up

Apply the class `glue-header--reverse` to the Header root element to reverse the
logo lock up.

### Remove CTA buttons from Header

Remove CTA buttons from Glue Header by adding the `.glue-header--no-cta` class
in the `<header>` tag.

```html
<header class="glue-header glue-header--single glue-header--no-cta">
```

### Set a custom breakpoint

You can change at which breakpoint the navigation switches from hamburger menu
display (drawer) to horizontal display (all top tier links and CTAs visible).
You will need to use an override when importing header styles, and set a config
option when initializing the header.

The available breakpoints are

-   `md`: Hamburger menu only occurs on small viewports only. This can be useful
    if you have only one or two links and want them visible more often.
-   `lg`: This is the default setting.
-   `xl`: Hamburger menu occurs on small through large viewports. This can be
    useful if there are many navigation links or translations cause the links to
    become too wide horizontally.

**SCSS:** Use an override when importing header styles.

```scss
@use '@google/glue/dist/header' with (
  $breakpoint: 'xl'
);
```

**TS:** Pass config option `breakpoint` or set the `data-glue-header-breakpoint`
property.

```ts
new Header(headerEl, {breakpoint: 'xl'});
```

```html
<div class="glue-header glue-header--single" data-glue-header-breakpoint="xl">
```

### Sticky Header

Pass config option `hideOnScroll: false` to make the header sticky, then use
class `glue-spacer-8-top` to add some top margins to the main content.

## Variation demos

-   [Single Tier Flagship](https://28-0-dot-glue-demo.appspot.com/components/header/single-flagship)
-   [Double Tier Flagship](https://28-0-dot-glue-demo.appspot.com/components/header/double-flagship)
-   [Campaign Stacked](https://28-0-dot-glue-demo.appspot.com/components/header/header-complex)
-   [Logo-Only (Simple)](https://28-0-dot-glue-demo.appspot.com/components/header/logo-only)
-   [Deep Navigation](https://28-0-dot-glue-demo.appspot.com/components/header/deep-nav)
-   [Stepped Deep Navigation](https://28-0-dot-glue-demo.appspot.com/components/header/deep-nav-stepped)
-   [Site Switcher](https://28-0-dot-glue-demo.appspot.com/components/header/site-switcher)
-   [Single Tier Transparent](https://28-0-dot-glue-demo.appspot.com/components/header/single-transparent)
-   [Double Tier Transparent](https://28-0-dot-glue-demo.appspot.com/components/header/double-transparent)
