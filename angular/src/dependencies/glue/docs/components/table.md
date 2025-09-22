# Table

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Tabular Array, Row, Column, Data table, Cells, Listing

A tabular representation of data for users to glance, analyze, and compare
easily.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BTable%5D)**

**[SCSS SOURCE](/src/tables/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/tables.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tables/basic"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tables/basic)

## Features

-   Data tables for numerical or other content
-   Comparison tables for horizontal comparisons of multiple options
-   Provides a gradient on the edge if table is cut off and scrolls horizontally
-   Variant for table content to appear as stacked on mobile viewport

## Setup

### Dependencies

-   SCSS
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/tables';

// Import Glue layout overrides
```


### HTML

A table should consist of a row of headers, followed by any number of rows of
content. The header row should be wrapped in `thead` but the `tbody` wrapper
around content cells is optional.

The base table class is `glue-table`. You can use additional classes to set
specific table styles as documented under modifiers. Alternatively, copy the
HTML from one of the demos above.

Put the table inside of an `glue-table__overflowcontainer`. This will let the
table scroll horizontally within the container if the table is wider than the
viewport. Alternatively, you can apply the `stacked` modifier to have your table
data convert to a stacked series of cards on the mobile viewport.

```html
<!-- Add modifiers to the `table` element. See Modifiers section. -->
<div class="glue-table__overflowcontainer">
  <table class="glue-table">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
      </tr>
    </thead>
    <tr>
      <td>Row 1 Col 1</td>
      <td>Row 1 Col 2</td>
    </tr>
    <tr>
      <td>Row 2 Col 1</td>
      <td>Row 2 Col 2</td>
    </tr>
  </table>
</div>
```

## Tips

### Table modifiers

The following modifier classes can be added to the `glue-table` root element.

Modifier                              | Description
------------------------------------- | -----------
`glue-table--datatable`               | For data grouped by columns, with each row representing a separate entity. See data table demo. **Style:** Horizontal line between rows.
`glue-table--datatable-altrows`       | A modifier on top of `glue-table--datatable`. **Style:** Alternate row coloring.
`glue-table--comparisontable`         | For data grouped by rows, with each column representing a separate entity, such as for comparing different tiers of a product. See comparison table demo. **IMPORTANT:** Must include empty th cell at the start so column headers are aligned properly. **Style:** Horizontal and vertical borders.
`glue-table--comparisontable-altrows` | A modifier on top of `glue-table--comparisontable`. **Style:** Alternate row coloring.
`glue-table--stacked`                 | Sets the table to stacked display for mobile viewport, where each entity becomes a single block of content. Table headers are repeated per content block. **IMPORTANT:** You will need to add extra a11y features on your DOM for this to function properly; see the *Accessibility* section, below.

### Cell modifiers

The following modifier classes can be added to `th` or `td` elements.

Modifier                      | Description
----------------------------- | -----------
`glue-table__cell--numerical` | Explicitly sets numerical alignment (right-aligned, regardless whether the page direction is LTR or RTL).

## Accessibility

### Summary and scope

Include a summary to your table to provide additional context for screen
readers.

```html
<table class="glue-table" summary="A short description of the table content.">
```

For data tables, include `scope=col` on your headers to denote their scope

```html
<th scope="col">
  Column header
</th>
```

### Stacked table variant

If you are using the stacked table variant, you will need to explicitly add a
`<tbody>` element and set explicit roles on this and its children. This is so
screen readers properly parse this content as tabular even when being visually
displayed as block-level content on mobile.

You will also need to add `data-colheader="COLUMN HEADER TEXT"` for each table
cell, as the header row will be hidden.

```html
<table class="glue-table glue-table--datatable glue-table--stacked"
    role="table" summary="A summary of this data table">
  <thead>
    <tr>
      <th scope="col">Column header 1</th>
      <th scope="col">Column header 2</th>
      <th scope="col">Column header 3</th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <td role="cell" data-colheader="Column header 1">Row 1 Col 1</td>
      <td role="cell" data-colheader="Column header 2">Row 1 Col 2</td>
      <td role="cell" data-colheader="Column header 3">Row 1 Col 3</td>
    </tr>
  </tbody>
</table>
```

## Variation demos

-   [Basic](https://28-0-dot-glue-demo.appspot.com/components/tables/basic)
-   [Overflow](https://28-0-dot-glue-demo.appspot.com/components/tables/overflow)
-   [Stacked](https://28-0-dot-glue-demo.appspot.com/components/tables/stacked)
