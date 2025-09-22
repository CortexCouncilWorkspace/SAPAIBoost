# Buttons

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Call to Action (CTA)

Draws the eye to a user interaction on the page, such as signing in, submitting
a form, learning more about a product, and so on.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BButtons%5D)**

**[SCSS SOURCE](/src/buttons/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/buttons-links.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/buttons/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/buttons/)

## Features

-   Styles can be applied to either a `button` or `a` element
-   Multiple variations depending on element importance and context
-   Reversed style for use on dark backgrounds

## Setup

### Dependencies

-   SCSS
    -   [Icons](/docs/components/icons.md) (if using icon
        buttons)
    -   [Typography](/docs/components/typography.md)

### Icons

If you are using icon buttons, import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a core layout component, and should be imported before Glue UI
components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/buttons';
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI components

// Import Glue layout overrides
```


### HTML

The button classes work on `a` or `button` elements. All buttons use a base
`glue-button` class with additional `glue-button--X` modifiers.

```html
<button class="glue-button glue-button--high-emphasis">
  High emphasis button
</button>

<a class="glue-button glue-button--medium-emphasis" href="#">
  Medium emphasis link styled as a button
</a>
```

## Variations

### High emphasis (HEB)

```html
<button class="glue-button glue-button--high-emphasis">
  High emphasis
</button>
```

### Medium emphasis (MEB)

```html
<button class="glue-button glue-button--medium-emphasis">
  Medium Emphasis
</button>
```

### Low emphasis (LEB)

```html
<button class="glue-button glue-button--low-emphasis">
  Low Emphasis
</button>
```

### Tonal

```html
<button class="glue-button glue-button--tonal">
  Tonal
</button>
```

### Reversed

When medium or low emphasis buttons are set on a dark background, they should be
reversed so they remain readable. High emphasis and tonal buttons are not
reversible.

```html
<button class="glue-button glue-button--medium-emphasis glue-button--reversed">
  Medium Emphasis - Reversed
</button>
```

### Reversed Alternate

This is an alternative reversed style for low-emphasis buttons only.

```html
<button class="glue-button glue-button--low-emphasis glue-button--reversed-alternate">
  Low Emphasis - Reversed
</button>
```

### Icon button (left side)

Include an icon in the left side of the button by adding `glue-button--icon` to
any button. The SVG icon should go before the button text. Can be applied to any
type of button.

On RTL layouts, the icon will appear to the right of the text (before text
content) to preserve reading order.

```html
<button class="glue-button glue-button--medium-emphasis glue-button--icon">
  <svg role="presentation" aria-hidden="true" class="glue-icon">
    <use href="/path/to/glue-icons.svg#video-youtube"></use>
  </svg>
  Medium Emphasis - Icon Left
</button>
```

### Icon button (right side)

Include an icon in the right side of the button by adding
`glue-button--icon-right` to any button. The SVG icon should go after the button
text.

On RTL layouts, the icon will appear to the left of the text (after text
content) to preserve reading order.

```html
<button class="glue-button glue-button--high-emphasis glue-button--icon-right">
  High Emphasis - Icon Right
  <svg role="presentation" aria-hidden="true" class="glue-icon glue-icon--arrow-forward">
    <use href="/path/to/glue-icons.svg#chevron-right"></use>
  </svg>
</button>
```

## Accessibility

-   Use descriptive text in the button content. Avoid ambiguous or repetitious
    content like "learn more" or "click here" as screen readers read directly
    from button content and they will lack context.
-   If you must use ambiguous text content, include an `aria-label` to provide
    additional context for screen readers, such as:

    ```html
    <a class="glue-button glue-button--medium-emphasis"
        href="https://about.google/stories/lifebank/"
        aria-label="Read more about how LifeBank is saving lives in Nigeria">
      Read more
    </a>
    ```
