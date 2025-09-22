# Order

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

Adjusts the order of elements in a grid or flex layout, by breakpoint if
specified.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BOrder%5D)**

**[SCSS SOURCE](/src/order/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/order/"
        width="100%" height="400" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/order/)

## Features

-   Adjust ordering of float or grid elements
-   Adjust ordering based on viewport size

## Setup

### SCSS

This is a layout overrides component, and should be imported after Glue core
layout components and UI components.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components

// Import Glue layout overrides
@use '@google/glue/dist/order';
```


### HTML

This can only be applied to elements in a `display: grid` or `display: flex`
container.

```html
<div class="my-flex-container">
  <div class="my-flex-cell glue-order-3">
    This element will appear third visually on all viewports.
  </div>

  <div class="my-flex-cell glue-order-1 glue-order-2-md">
    This element will appear first visually on small viewports
    but second visually on larger viewports.
  </div>

  <div class="my-flex-cell glue-order-2 glue-order-1-md">
    This element will appear second visually on small viewports
    but first visually on larger viewports.
  </div>
</div>
```

Glue grid example:

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-4
        glue-order-3">
      This column will appear third visually on all viewports.
    </div>
    <div class="glue-grid__col glue-grid__col--span-4
        glue-order-1 glue-order-2-md">
      This column will appear first visually on small viewports
      but second visually on larger viewports.
    </div>
    <div class="glue-grid__col glue-grid__col--span-4
        glue-order-2 glue-order-1-md">
      This element will appear second visually on small
      viewports but first visually on larger viewports.
    </div>
  </div>
</section>
```

## Accessibility

Screen readers and focusable content will still be accessed in DOM order. Make
sure this order is logical and not distracting when contrasted with the visual
ordering of content.
