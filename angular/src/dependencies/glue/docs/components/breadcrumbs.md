# Breadcrumbs

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Links, Hierarchy, Navigation path

Specifies a list of links that display the hierarchical path which points to the
current page that you are viewing.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BBreadcrumbs%5D)**

**[SCSS SOURCE](/src/breadcrumbs/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/breadcrumbs.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/breadcrumbs/"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/breadcrumbs/)

## Features

-   Page level navigation pointing to current level

## Setup

### Dependencies

-   SCSS
    -   [Icons](/docs/components/icons.md)
    -   [Typography](/docs/components/typography.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

The `chevron-right` icon is used as a visual separator between breadcrumb links.

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/breadcrumbs';

// Import Glue layout overrides
```


### HTML

```html
<nav class="glue-breadcrumbs" aria-label="Breadcrumbs">
  <ol class="glue-breadcrumbs__list">
    <li class="glue-breadcrumbs__item">
      <a class="glue-breadcrumbs__link" href="/docs/">Glue docs</a>
      <svg role="presentation" class="glue-icon glue-icon--breadcrumb" aria-hidden="true">
        <use href="/path/to/glue-icons.svg#chevron-right"></use>
      </svg>
    </li>
    <li class="glue-breadcrumbs__item">
      <a class="glue-breadcrumbs__link" href="/docs/users/">For users</a>
      <svg role="presentation" class="glue-icon glue-icon--breadcrumb" aria-hidden="true">
        <use href="/path/to/glue-icons.svg#chevron-right"></use>
      </svg>
    </li>
    <li class="glue-breadcrumbs__item">
      <a class="glue-breadcrumbs__link" href="/docs/users/components/">Components</a>
      <svg role="presentation" class="glue-icon glue-icon--breadcrumb" aria-hidden="true">
        <use href="/path/to/glue-icons.svg#chevron-right"></use>
      </svg>
    </li>
    <li class="glue-breadcrumbs__item glue-breadcrumbs__item--active">Breadcrumbs</li>
  </ol>
</nav>
```

## Accessibility

-   Include an `aria-label` on the `<nav>` element that describes the nav as
    specifically a Breadcrumbs navigation element.
-   The list element indicating the current page is not a link, just a text
    node.
