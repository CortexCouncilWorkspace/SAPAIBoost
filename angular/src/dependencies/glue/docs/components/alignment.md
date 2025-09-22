# Alignment

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

SCSS utilities that provide alignment features to elements.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BAlignment%5D)**

**[SCSS SOURCE](/src/alignment/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/alignment/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/alignment/)

## Features

-   Horizontal alignment for text elements
-   Vertical alignment for block-level elements displayed next to each other

## Setup

### SCSS

This is a layout overrides component, and should be imported after Glue core
layout components and UI components.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components

// Import Glue layout overrides
@use '@google/glue/dist/alignment';
```


### HTML

#### Horizontal alignment

Horizontally align text-based elements within their containers.

```html
<p class="glue-text-start">
  Aligns text with the start of the language direction. For LTR languages, this
  is left; for RTL languages, this is right. Previously this class was
  "glue-text-left".
</p>

<p class="glue-text-end">
  Aligns text with the end of the language direction. For LTR languages, this is
  right; for RTL languages, this is left. Previously this class was
  "glue-text-right".
</p>

<p class="glue-text-center">
  Center aligns text. Not recommended for long blocks of text.
</p>

<p class="glue-text-justify">
  Sets text to justified. Not recommended for long blocks of text.
</p>
```

#### Vertical alignment

Vertically align elements based on the other elements adjacent to it. Note that
[grid layout](/docs/components/grid-layout.md) has its own
set of alignment utilities.

```html
<p class="glue-valign-top">
  Top-aligns the block.
</p>

<p class="glue-valign-middle">
  Vertically center-aligns the block.
</p>

<p class="glue-valign-bottom">
  Bottom-aligns the block.
</p>
```
