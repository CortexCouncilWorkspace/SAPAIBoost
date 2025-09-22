# Spacers

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

SCSS utilities that add vertical margin to the top or bottom of an element.

**Synonyms:** Vertical margin

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BSpacers%5D)**

**[SCSS SOURCE](/src/spacers/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/spacers/"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/spacers/)

## Features

-   Vertical spacing between elements
-   Via class, provided as margin
-   Via mixin, can be provided as margin or as padding

## Setup

### SCSS

This is a layout overrides component, and should be imported after Glue core
layout components and UI components.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components

// Import Glue layout overrides
@use '@google/glue/dist/spacers';
```


### HTML

Spacers 1-4 are fixed height. Spacers 5-8 adjust between the MD and LG
breakpoint.

```html
<div class="glue-spacer-2-top">
  This has a top margin of 16 px.
</div>

<div class="glue-spacer-3-top glue-spacer-6-bottom">
  This has a top margin of 24px and a bottom margin of 60px/80px.
</div>
```

## Variations

### Spacers via mixin

If you want to use spacer values in your SCSS, use the mixin and pass in the
spacer you want to use, which property to adjust (`margin` or `padding`) and
which location it should be (`top` or `bottom`). You will need to import the
Glue mixin file first.

```scss
@use '@google/glue/dist/spacers/mixins' as glue-spacers-mixins;

.foo {
  // adds padding-bottom, matching spacer-2 values
  @include glue-spacers-mixins.spacer(2, padding, bottom);
}
```


## Spacer values

Name     | Height on SM/MD breakpoint | Height on LG/XL breakpoint
-------- | -------------------------- | --------------------------
spacer-1 | 8px                        | Same as SM/MD
spacer-2 | 16px                       | Same as SM/MD
spacer-3 | 24px                       | Same as SM/MD
spacer-4 | 36px                       | Same as SM/MD
spacer-5 | 48px                       | 60px
spacer-6 | 60px                       | 80px
spacer-7 | 92px                       | 120px
spacer-8 | 136px                      | 180px
