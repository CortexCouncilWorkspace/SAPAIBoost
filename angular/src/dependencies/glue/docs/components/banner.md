# Banner

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

Placed at the top of the pages to specify any critical information to the user.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BBanner%5D)**

**[SCSS SOURCE](/src/banner/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/banner/banner-high-emphasis"
        width="100%" height="400" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/banner/banner-high-emphasis)

## Features

-   Displays critical information to the users without congesting the page.
-   Allows user to hide the banner by clicking on close button.

## Setup

### Dependencies

-   SCSS
    -   [Colors](/docs/components/colors.md)
    -   [Breakpoints](/docs/components/breakpoints.md)
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/accessibility/mixins';
@use '@google/glue/dist/accessibility/variables';
@use '@google/glue/dist/breakpoints/mixins';
@use '@google/glue/dist/typography';
@use '@google/glue/dist/colors/variables';


// Import Glue UI components
@use '@google/glue/dist/banner';
```


### HTML

Note: This code should be added after the header section.

```html
<div class="glue-banner glue-banner--low-emphasis" role="banner">
  <p class="glue-banner__content">
    Lorem ipsum dolor sit <a class="glue-inline-tonal-link" href="#">learn more</a> amet
    consectetur adipiscing Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </p>
  <!-- The close button is optional in the banner component. -->
  <button class="glue-banner__close-btn" aria-label="Hide the banner"></button>
</div>
```

### TS initialization

Note: TS integration will only be required when the user has a close button in
the banner.

```ts
import {Banner} from '@google/glue';

const bannerEl = document.querySelector<HTMLElement>('.glue-banner');

// Initialize with default / HTML options
if (bannerEl) new Banner(bannerEl);
```


## Public Methods

Method      | Params | Description                             | Return
----------- | ------ | --------------------------------------- | ------
`destroy()` |        | Destroy instance and removes DOM events | void
`close()`   |        | Close the banner                        | void

## Variations

### Low emphasis banner

Apply the class `.glue-banner--low-emphasis` to the banner root element to
display low emphasis background.

```html
<div class="glue-banner glue-banner--low-emphasis">...</div>

```

### Medium emphasis banner

Apply the class `.glue-banner--medium-emphasis` to the banner root element to
display medium emphasis background.

```html
<div class="glue-banner glue-banner--medium-emphasis">...</div>

```

### High emphasis banner

Apply the class `.glue-banner--high-emphasis` to the banner root element to
display high emphasis background.

```html
<div class="glue-banner glue-banner--high-emphasis">...</div>

```

## Accessibility

-   Include `role` on `glue-banner` element that describes the div as the banner
    element.
-   Include an `aria-label` on the `<button>` element that describes it as
    banner close element.

## Variation Demos

-   [High Emphasis](https://28-0-dot-glue-demo.appspot.com/components/banner/banner-high-emphasis)
-   [Medium Emphasis](https://28-0-dot-glue-demo.appspot.com/components/banner/banner-medium-emphasis)
-   [Low Emphasis](https://28-0-dot-glue-demo.appspot.com/components/banner/banner-low-emphasis)
-   [Low Emphasis (no close button)](https://28-0-dot-glue-demo.appspot.com/components/banner/banner-default)
