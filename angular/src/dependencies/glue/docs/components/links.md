# Links

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Inline link

Styles for inline links.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BLinks%5D)**

**[SCSS SOURCE](/src/links/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/buttons-links.html)**

</section>

## Features

-   Styles applied to link elements
-   Styles for reversed (dark) backgrounds
-   Styles for link elements on different backgrounds

## Setup

### Dependencies

-   SCSS
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a core layout component, and should be imported before Glue UI
components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/links';
@use '@google/glue/dist/typography';

// Import Glue UI components

// Import Glue layout overrides
```


To style CTAs/buttons, use the
[buttons component](/docs/components/buttons.md).

### HTML

Inline links are styled automatically. You do not need to add additional classes
to a link to get MWS base styling.

```html
Read more in the <a href="https://blog.google">Google Blog</a>.
```

## Variations

### On dark backgrounds

If your link is on a dark background, add `glue-font-reversed` to the parent
element. This will change the font color of the `<a>` tag to white.

```html
<p class="glue-font-reversed">
  This is a <a href="/link-destination">link on a dark background</a>.
</p>
```

### On various color backgrounds

If link exists on background, add class `glue-inline-tonal-link` to the link.
This will darken the font color of the `<a>` tag slightly to help maintain
contrast ratio. You should still check the new colors to confirm a minimum of
4.5:1 ratio.

```html
  This is a <a class="glue-inline-tonal-link" href="/link-destination">link on a different background</a>.
```

## Accessibility

-   Use descriptive text in the link content. Avoid ambiguous or repetitious
    content like "learn more" or "click here" as screen readers read directly
    from link content and they will lack context.
-   If you must use ambiguous text content, include an `aria-label` in the link
    to provide additional context for screen readers, such as:

    ```html
    <a href="https://about.google/stories/lifebank/"
       aria-label="Read more about how LifeBank is saving lives in Nigeria">
      Read more
    </a>
    ```
