# Cards

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Tiles

Cards, formerly known as Tiles, represent links or doorways to more detail about
things like programs, products, articles, and videos for users to explore. Think
of it like window shopping, inviting users to take a closer look at things that
pique their interest. Collections of cards can be organized in a grid or
vertical list.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BCards%5D)**

**[SCSS SOURCE](/src/cards/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/cards.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/cards/matched-height"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/cards/matched-height)

## Features

-   Grid layout for grouping multiple cards
    -   Can follow standard Glue grid or use a more compact layout
-   Supports images, logos, icons, video, or just text content
-   List cards provide a richer interaction point without taking up much space
    or attention away from main page layout
-   Entire card is an interaction point
-   Cards can be placed in a
    [carousel](/docs/components/carousel.md)
-   Cards can link to a
    [YTVideo](/docs/components/youtube-video-player.md)
    modal player

## Setup

### Dependencies

-   SCSS
    -   [Icons](/docs/components/icons.md) (if using icon
        CTAs or video cards)
    -   [Grid layout](/docs/components/grid-layout.md)
        -   [Page](/docs/components/page.md)
    -   [Typography](/docs/components/typography.md)

### Icons

If using arrow CTAs or video cards, import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

Page/grid styles are highly recommended for layout but are technically optional.
You only need to import icon styles if you are using arrow CTAs or video cards.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/grids';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/page';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/cards';

// Import Glue layout overrides
```


### HTML

#### Collection

Cards have been designed to work seamlessly with Glue's own grid - see the
[Grid Layout docs](/docs/components/grid-layout.md)
for more information around responsive column sizing. This `glue-cards`
container controls the vertical and horizontal spacing - see the
[gutter variation](#gutter) for a more compact layout.

NOTE: If you are not using Glue's grid or spacing, you can still use the
[Card](#card) component by itself - it will fill any container it's placed in.

```html
<section class="glue-page">
  <ul class="glue-grid glue-cards">
    <li class="glue-grid__col glue-grid__col--span-4 glue-grid__col--span-6-md">
      <!-- [card here] -->
    </li>
    <!-- ... -->
  </ul>
</section>
```

#### Card

Any card can be based on the markup below. All content is optional - see the
[Variations](#variations) below for different styles (or even delete a section
if not required).

```html
<a class="glue-card" href="#">
  <div class="glue-card__inner">
    <picture class="glue-card__asset">
      <img alt="[placeholder alt]" src="https://...">
    </picture>
    <div class="glue-card__content">
      <p class="glue-label">Eyebrow</p>
      <p class="glue-headline glue-headline--headline-5">Title</p>
      <p class="glue-card__description">Description...</p>
    </div>
    <div class="glue-card__cta">
      <span class="glue-button glue-button--low-emphasis">
        Button text
      </span>
    </div>
  </div>
</a>
```

## Variations

### Arrow CTA

As well as a text CTA, an arrow icon can also be used - replace the
`.glue-card__cta` element with the markup below.

```html
<div class="glue-card__cta glue-card__cta--arrow">
  <span class="glue-button glue-button--low-emphasis">
    <svg aria-hidden="true" class="glue-icon glue-icon--arrow-forward" role="presentation">
      <use href="/assets/img/glue-icons.svg#arrow-forward"></use>
    </svg>
  </span>
</div>
```

### Border

By default, assets bleed to the edge of the card. For images that have a white
or light background, you can force a border to be rendered on top by adding the
`.glue-card--border` modifier to the `.glue-card` container.

```html
<a class="glue-card glue-card--border" href="#">
  <!-- ... -->
</a>
```

### Gutter

To render a smaller ('compact') gutter around each card, add the
`.glue-cards--compact` modifier to the `.glue-cards` container.

```html
<section class="glue-page">
  <ul class="glue-grid glue-cards glue-cards--compact">
    <!-- ... -->
  </ul>
</section>
```

### Icon/logo

For cards using an icon or logo rather than a full-bleed image, add the
`.glue-card__asset--logo` modifier to the `.glue-card__asset` container.

```html
<picture class="glue-card__asset glue-card__asset--logo">
  <img alt="[placeholder alt]" src="https://...">
</picture>
```

### List

To create a list card, add the `.glue-card--list` modifier to the `.glue-card`
container and update the typography styles (if being used) as per the example
below.

NOTE: If you are requiring a vertical list, there is no need to use the
`.glue-grid` integration - see the
[List demo](https://28-0-dot-glue-demo.appspot.com/components/cards/list) for an example
of how to structure the collection.

```html
<a class="glue-card glue-card--list" href="#">
  <!-- ... -->
  <div class="glue-card__content">
    <p class="glue-headline glue-headline--headline-6">Title</p>
    <p class="glue-caption">Description...</p>
  </div>
  <!-- ... -->
</a>
```

## Variation demos

-   [Assets](https://28-0-dot-glue-demo.appspot.com/components/cards/assets)
-   [Border](https://28-0-dot-glue-demo.appspot.com/components/cards/border)
-   [CTAs](https://28-0-dot-glue-demo.appspot.com/components/cards/ctas)
-   [List](https://28-0-dot-glue-demo.appspot.com/components/cards/list)
