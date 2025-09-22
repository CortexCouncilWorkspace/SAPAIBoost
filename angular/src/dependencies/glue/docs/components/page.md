# Page

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Wrapper, Full bleed, Max-width

Wrappers that set max width for text/page content and full-bleed content.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BPage%5D)**

**[SCSS SOURCE](/src/page/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/page/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/page/)

## Features

-   Sets margin and padding for site content
-   `glue-page` wrapper is used for all grid/text/component content
-   `glue-fullbleed` wrapper is used for content that expands beyond the grid
    (background images/colors)

## Setup

### SCSS

This is a core layout component, and should be imported before Glue UI
components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/page';

// Import Glue UI components

// Import Glue layout overrides
```


### HTML

There are two different wrappers available: `glue-page` and `glue-fullbleed`.

#### glue-page

`glue-page` is the wrapper used most often. It sets the max-width and margins
for grids and text content. You will often see this class wrapping other
components. Consolidate `glue-page` usage when possible.

```html
<section class="glue-page">
  <p>This content will use the content max-width and margin settings.</p>

  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-6">
      <p>
        This is a grid that is set inside of a glue-page
        element.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-6">
      <p>
        Grid itself does not set a max width; it is always
        placed inside of glue-page instead.
      </p>
    </div>
  </div>
</section>
```

#### glue-fullbleed

`glue-fullbleed` is the wrapper used for full-bleed background content which
extends beyond the grid layout. Place a `glue-page` wrapper inside of the
fullbleed section to set the max-width/margins for text/component elements.

SCSS:

```scss
.my-fullbleed-section {
  background: #ddd;
}
```

HTML:

```html
<section class="glue-fullbleed my-fullbleed-section">
  <div class="glue-page">
    <p>
      This text is inside of a section with a light grey
      background. Because it is set inside of glue-page, it
      will follow standard content max-width/margin settings.
    </p>
  </div>
</section>
```
