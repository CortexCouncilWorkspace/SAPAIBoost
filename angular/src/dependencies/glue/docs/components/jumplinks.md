# Jumplinks

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-04-12' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Quick links, In-page navigation

A bar that appears below the header but sticks to the top of the page when
scrolling; contains links to sections within the page that allows for fast
navigation.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BJumplinks%5D)**

**[SCSS SOURCE](/src/jumplinks/_index.scss)**

**[TS SOURCE](/src/jumplinks/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/jump-links.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/jumplinks/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/jumplinks/)

## Features

-   Displays below the header when visible.
-   Sticky to top of viewport when the page scrolls down and rewinds when
    scrolls up.
-   Active link adjusts as page scrolls to match the section you have scrolled
    to.
-   If jumplinks overflow horizontally, use chevrons (desktop) or drag linkbar
    (mobile) to access additional links.

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
@use '@google/glue/dist/jumplinks';

// Import Glue layout overrides
```


### HTML

```html
<div class="glue-jumplinks">
  <button class="glue-jumplinks__button glue-jumplinks__button--prev">
    <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--18px">
      <use href="/assets/img/glue-icons.svg#chevron-left"></use>
    </svg>
  </button>
  <ul class="glue-jumplinks__list" data-glue-jumplink-label="Jump to section within page">
    <li class="glue-jumplinks__list-item">
      <a class="glue-jumplinks__link"  href="#Search-Explore">Search & explore</a>
    </li>
    <li class="glue-jumplinks__list-item">
      <a class="glue-jumplinks__link" href="#Watch-Play">Watch & play</a>
    </li>
    <li class="glue-jumplinks__list-item">
      <a class="glue-jumplinks__link" href="#DevicesbyGoogle">Devices by Google</a>
    </li>
  </ul>
  <button class="glue-jumplinks__button glue-jumplinks__button--next">
    <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--18px">
      <use href="/assets/img/glue-icons.svg#chevron-right"></use>
    </svg>
  </button>
</div>
```

### TS initialization

```ts
import {Jumplinks, JumplinksOptions} from '@google/glue';
if (element) new Jumplinks(element);
```



## Public Methods and properties

Method          | Params | Description                       | Return
--------------- | ------ | --------------------------------- | ------
`setActiveLink` | string | Set the active link.              | void
`getActiveLink` |        | Get the value of the active link. | string
`reset`         |        | Reset the active link.            | void
`destroy`       |        | Deregister all event listeners.   | void

### Customize jumplinks with config options

```ts

// The jumplinks is positioned at 16px below the header element
new Jumplinks(element, {belowHeader: true});

// The jumplinks has top offset 100px, regardless of Header position
new Jumplinks(element, {offset: 100});

```

| Name          | Type      | Default Value | Description                      |
| ------------- | --------- | ------------- | -------------------------------- |
| `belowHeader` | `boolean` | `false`       | True if the jumplinks is positioned 16px below the header when page scrolls up. |
| `offset`      | `number`  | `144`         | The top offset value when page scrolls up. Set this property when the location of jumplinks has nothing to do with the header element. If belowHeader is set to true, this offset value will be ignored. |

## Accessibility

-   Use `Tab` key to navigate to jumplinks and press `Enter` to jump to the
    section.
-   Set `data-glue-jumplink-label` on jump links list element to append an aria
    label for link elements; make sure to include this in translation requests.
    By default it will use 'Jump to section within page'.
