# Breakpoints

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Media query

Sets up responsive layouting and components that adjust based on viewport size.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BBreakpoints%5D)**

**[SCSS SOURCE](/src/breakpoints/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/breakpoints/"
        width="100%" height="300" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/breakpoints/)

## Features

-   4 breakpoints for responsive layouts
-   Mixin to add styles to specific breakpoints
-   Named breakpoints that can be consumed by JS/TS components to adjust how
    components are rendered at different viewport sizes

## Setup

### SCSS

If you want to use named breakpoints (in
[responsive monitor](/docs/components/responsive-monitor.md)
components like Footer Sitelinks), import the main file. If you want to use
breakpoint mixins to set up your own media queries for responsive styling,
import the mixins file.

This is a core layout component, and should be imported before Glue UI
components and layout overrides. Mixins can be imported after all other Glue
files.

```scss
// Import Glue core layout components
@use '@google/glue/dist/breakpoints';
@use '@google/glue/dist/core';

// Import Glue UI components

// Import Glue layout overrides

// Import Glue mixins/variables
@use '@google/glue/dist/breakpoints/mixins' as glue-breakpoints-mixins;
```


## SCSS Media Queries

You can create responsive styles that match Glue's breakpoints by using the
breakpoints mixins. Generally, you should style for mobile layout as the
default, and use the breakpoint mixin to add overrides per breakpoint.

```scss
.foo-element {
  // Small breakpoint. Mobile styles here.

  @include glue-breakpoints-mixins.bp(md) {
    // Medium breakpoint. Tablet style overrides here.
  }

  @include glue-breakpoints-mixins.bp(lg) {
    // Large breakpoint. Laptop/small desktop style overrides here.
  }

  @include glue-breakpoints-mixins.bp(xl) {
    // Extra large breakpoint. Desktop style overrides here.
  }
}
```

Although we prefer styles be added/overridden as the viewport gets wider (as in
the above example) to preserve responsive behavior, there may be cases where you
want a style to appear very specifically for one breakpoint only. You can pass
in `BP-only` values to the mixin to achieve this.

```scss
.bar-element {
  // Some base styles

  @include glue-breakpoints-mixins.bp(sm-only) {
    // Styles for the SM breakpoint only
  }

  @include glue-breakpoints-mixins.bp(md-only) {
    // Styles for the MD breakpoint only
  }

  @include glue-breakpoints-mixins.bp(lg-only) {
    // Styles for the LG breakpoint only
  }

  @include glue-breakpoints-mixins.bp(xl) {
    // As there is no breakpoint after XL, all styles here
    // are for the XL breakpoint only
  }
}
```

## Responsive TS/JS components

If you are using named breakpoints for
[responsive monitor](/docs/components/responsive-monitor.md)
or other Glue components, they match the SCSS variable names. Note that you
should not use `BP-only` definitions for JS.

## Available breakpoints and values

Name      | Size          | Notes
--------- | ------------- | -----
`sm`      | Up to 599px   | Analogous to mobile; used by responsive monitor only
`md`      | Up to 1023px  | Analogous to tablet
`lg`      | Up to 1439px  | Analogous to laptop/small desktop
`xl`      | 1440px+       | Analogous to large desktop
`sm-only` | 1–599px       | SCSS only
`md-only` | 600–1023px    | SCSS only
`lg-only` | 1024px–1439px | SCSS only

## Accessibility

There are no immediate accessibility concerns with breakpoints. However, you
should make sure that all content remains accessible to screen readers and other
users with accessibility concerns no matter how it is rendered at different
breakpoints, or that content is appropriately hidden.
