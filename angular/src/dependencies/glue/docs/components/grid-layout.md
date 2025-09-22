# Grid layout

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Layout, Columns

CSS for laying out site content horizontally in a grid.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BGrid%20Layout%5D)**

**[SCSS SOURCE](/src/grids/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/grids/basic"
        width="100%" height="300" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/grids/basic)

## Features

-   12-column grid on MD — XL viewports
-   Stacked layout (1 column) on SM viewport
-   Optional 4-column grid can be specified for SM viewport
-   Responsive layout allows for column adjustment based on viewport size
-   IE11 is partially supported. All content is visible, accessible, and simply
    stacked (like a mobile view).

## Setup

### Dependencies

-   SCSS
    -   [Page](/docs/components/page.md)

### SCSS

This is a core layout component, and should be imported before Glue UI
components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/grids';
@use '@google/glue/dist/page';

// Import Glue UI components

// Import Glue layout overrides
```


### HTML

A grid is placed inside of a `glue-page` container, and then any number of grid
columns (`glue-grid__col`) are placed inside the grid. Columns can span between
1-12 grid base columns. These columns will collapse into a stacked (1-column)
layout in the small viewport.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-4">
      <p>
        A content column that spans 4 grid base columns.
        It will be full-width in the small viewport.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-8">
      <p>
        A content column that spans 8 grid base columns.
        It will be full-width in the small viewport.
      </p>
    </div>
  </div>
</section>
```

## Variations

### Alignment (Vertical)

By default, columns in a row will span the full height of the row. You can
adjust this behavior by adding a class to the column.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-3">
      <p>
        This column has no alignment setting configured so it will span the full
        height of the row.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-3
        glue-grid__col--align-top">
      <p>
        This column will be vertically aligned to the top of the row.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-3
        glue-grid__col--align-middle">
      <p>
        This column will be vertically aligned to the middle of the row.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-3
        glue-grid__col--align-bottom">
      <p>
        This column will be vertically aligned to the bottom of the row.
      </p>
    </div>
  </div>
</section>
```

### Responsive layout

You can add classes to a column so that it spans a different number of base
columns based on breakpoint. The SM viewport supports a 4-column grid if you
specify column spanning for that breakpoint.

See the
[breakpoints documentation](/docs/components/breakpoints.md)
for the list of breakpoint values and naming.

Note that each breakpoint above mobile (md, lg, and xl) will use the default
spanning value, unless a breakpoint-specific class is added.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-6
        glue-grid__col--span-2-sm">
      <p>
        This column spans 6 grid base columns by default and will render this
        way for MD – XL viewports.
        Spanning is set at 2 grid base columns at the SM breakpoint, meaning it
        will be half the width of the grid in all viewports.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-4
        glue-grid__col--span-3-lg glue-grid__col--span-3-xl">
      <p>
        This column spans 4 grid base columns by default and will render this
        way for the MD viewport.
        Classes are set on the LG and XL breakpoints so that it will span 3
        grid base columns at both viewports.
        No spanning is specified for SM viewport, so it will be full width.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-6
        glue-grid__col--span-4-md">
      <p>
        This column spans 6 grid base columns by default and will render this
        way for the LG and XL viewports.
        A class is set on the MD breakpoint so that it will span 4 grid base
        columns at that viewport.
        No spanning is specified for SM viewport, so it will be full width.
      </p>
    </div>
  </div>
</section>
```

### Offsets

To include offsets (column spacing), you will need to introduce empty columns.
These empty columns can use responsive layouting so the offset adjusts based on
viewport.

The following example includes a 1-column spacer between content columns. Since
no responsive classes are added, the layout becomes stacked with no visible
spacing in the small viewport.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-3">
      <p>A content column that spans 3 base columns.</p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-1"></div>
    <div class="glue-grid__col glue-grid__col--span-3">
      <p>
        A content column that spans 3 grid base columns. There is an empty
        column that function as a spacer before it.
      </p>
    </div>
    <div class="glue-grid__col glue-grid__col--span-1"></div>
    <div class="glue-grid__col glue-grid__col--span-3">
      <p>
        A content column that spans 3 grid base columns. There is an empty
        column that function as a spacer before it.
      </p>
    </div>
  </div>
</section>
```

If you want an offset at one breakpoint, but not another, use a
`span-0-BREAKPOINT` class.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-2
        glue-grid__col--span-1-lg
        glue-grid__col--span-0-md"></div>
    <div class="glue-grid__col glue-grid__col--span-3">
      <p>
        A content column that spans 3 grid base columns. There is an empty
        column that function as a spacer before it. It spans 2 grid base columns
        in the XL breakpoint, 1 base grid column in the LG breakpoint, and no
        columns (is hidden) in the MD breakpoint. In the SM breakpoint the
        column will stack and as it is empty, will not display visually.
      </p>
    </div>
  </div>
</section>
```

### Nested grids

You can nest grids one layer deep by placing a `glue-grid` container inside of a
grid column.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-8">
      <p>
        This column that spans 8 grid base columns includes a nested grid inside
        of it.
      </p>
      <div class="glue-grid">
        <div class="glue-grid__col glue-grid__col--span-2">
          <p>
            This nested grid column spans 2 grid base columns.
          </p>
        </div>
        <div class="glue-grid__col glue-grid__col--span-6">
          <p>
            This nested grid column spans 6 grid base columns.
          </p>
        </div>
      </div>
    </div>
    <div class="glue-grid__col glue-grid__col--span-4">
      <p>This column spans 4 grid base columns.</p>
    </div>
  </div>
</section>
```

Nested grids introduce a lot of complexity to a layout, so be sparing when using
them. Grids cannot be nested deeper than 1 level.

### Mixins (width, offset)

Glue provides two mixins that will mimic column width and column offsets without
actually using a grid. For example, you may want an intro headline that's the
same width as a centered column spanning 6 grid base columns, without needing
the full grid DOM. To use them, you'll need to import the Glue grids mixins
file.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/page';

// Import Glue UI components

// Import Glue layout overrides

// Import Glue mixins/variables
@use '@google/glue/dist/grids/mixins' as glue-grids-mixins;
```


Make sure that you place the elements inside of a `glue-page` container so it
has the same horizontal spacing as grids.

```html
<div class="glue-page">
  <div class="my-element-1">
    <!-- content -->
  </div>
</div>
```

Column width: `col-width(NUM_COLS)`

```scss
// Sets my-element-1 to the width of 6 grid base columns
.my-element-1 {
  @include glue-grids-mixins.col-width(6);
}
```

In the SM viewport, if `NUM_COLS` is greater than 4, the width will be set to
100%.

For MD – XL viewports, if `NUM_COLS` is greater than 12, the width will be set
to 100%.

Column offset: `col-offset(NUM_COLS, IS_CENTERED)`

```scss
// Offsets my-element-2 by 2 grid base columns
.my-element-2 {
  @include glue-grids-mixins.col-offset(2);
}

// Offsets my-element-3 by 3 grid base columns and centers it
.my-element-3 {
  @include glue-grids-mixins.col-offset(3, true);
}
```

`IS_CENTERED` is an optional boolean flag. When set, it sets the offset margin
on both sides of the element so the element will be centered on the page.

In the SM viewport, if `NUM_COLS` is 4 or greater, there will be no offset set.
If `IS_CENTERED` is true, if `NUM_COLS` is 2 or 3, the offset will be set but
the content will not be centered.

For MD – XL viewports, if `NUM_COLS` is 12 or greater, there will be no offset
set. If `IS_CENTERED` is true, when `NUM_COLS` is between 6 and 11 the offset
will be set but the content will not be centered.

### Ordering

Starting in Glue v22, ordering is no longer built into grids. It has been moved
to its own set of modifier classes, which can be applied to both grid and flex
layout elements. Read more in the
[order documentation](/docs/components/order.md).

## Accessibility

There are no accessibility concerns with the basic grid. If you are using
ordering, note that screen readers will still read content in DOM order, so make
sure your content still makes sense when read in that order.

## Variation demos

-   [Basic](https://28-0-dot-glue-demo.appspot.com/components/grids/basic)
-   [Alignment](https://28-0-dot-glue-demo.appspot.com/components/grids/alignment)
-   [Responsive](https://28-0-dot-glue-demo.appspot.com/components/grids/responsive)
-   [Offset](https://28-0-dot-glue-demo.appspot.com/components/grids/offset)
-   [Nested](https://28-0-dot-glue-demo.appspot.com/components/grids/nested)
-   [Mixins](https://28-0-dot-glue-demo.appspot.com/components/grids/mixins)
-   [Ordering](https://28-0-dot-glue-demo.appspot.com/components/grids/order)
