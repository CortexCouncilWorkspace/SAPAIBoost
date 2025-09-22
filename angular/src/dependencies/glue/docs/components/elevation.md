# Elevation

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Box shadow

SCSS utilities that provide elevation styles to elements.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BElevation%5D)**

**[SCSS SOURCE](/src/elevation/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/google-material/elevation/elevation-model.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/elevation/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/elevation/)

## Features

-   Apply elevation styles with a class or a mixin

## Setup

### SCSS

This is a layout overrides component, and should be imported after Glue core
layout components and UI components.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components

// Import Glue layout overrides
@use '@google/glue/dist/elevation';
```


### HTML

Add the class `glue-elevation-level-N` to any element, replacing `N` with the
elevation level between 0–5. Note that 0 elevation is a hairline border, not an
actual shadow.

```html
<div class="glue-elevation-level-1">
  This is at level 1 elevation.
</div>

<div class="glue-elevation-level-3">
  This is at level 3 elevation.
</div>
```

## Variations

## Via mixin

Alternatively, use the mixin `set-level($level)` directly in your styles, where
`$level` is the elevation level between 0–5. This is useful if you need to
change the elevation level due to interaction.

### SCSS

```scss
@use '@google/glue/dist/elevation/mixins' as glue-elevation-mixins;

.foo {
  // Resting state is at level 0 elevation
  @include glue-elevation-mixins.set-level(0);

  &:hover {
    // Changes to level 1 elevation on hover
    @include glue-elevation-mixins.set-level(1);
  }
}
```

