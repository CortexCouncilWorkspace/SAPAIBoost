# Typography

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-10' }
*-->



-   **Category**: SCSS

**Synonyms:** Typography, Fonts

Styles for typography such as headings, paragraphs, lists, eyebrows, and so on.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BTypography%5D)**

**[SCSS SOURCE](/src/typography/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/fundamentals/typography.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/typography/styles"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/typography/styles)

## Features

-   Styles for all levels of Glue typography
-   Modifier classes for quick style adjustments (font weight, smoothing, etc.)
-   Language-specific fonts for Arabic, Chinese, Japanese, and Korean

## Setup

### Dependencies

#### Fonts

Import the fonts from the Google Fonts API. Use `preconnect` and `preload` to
optimize loading and first render.

```html
<head>
  ...
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Product+Sans&family=Google+Sans+Display:ital@0;1&family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Google+Sans+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" as="style">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Product+Sans&family=Google+Sans+Display:ital@0;1&family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Google+Sans+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap">
  ...
</head>
```

For Arabic, Chinese, Japanese, and Korean languages, include the appropriate
Google Sans font variant along with the base Google Sans and Google Sans Text
fonts. To reduce page load times, only include the variant that matches the
language of the content.

##### Arabic

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Google+Sans+Arabic:wght@400;500;700&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Arabic:wght@400;500;700&display=swap">
```

##### Chinese/Simplified

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Google+Sans+Simplified+Chinese:wght@400;500;700&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Simplified+Chinese:wght@400;500;700&display=swap">
```

##### Chinese/Traditional

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Google+Sans+Traditional+Chinese:wght@400;500;700&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Traditional+Chinese:wght@400;500;700&display=swap">
```

##### Japanese

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Google+Sans+Japanese:wght@400;500;700&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Japanese:wght@400;500;700&display=swap">
```

##### Korean

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Google+Sans+Korean:wght@400;500;700&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Korean:wght@400;500;700&display=swap">
```

### SCSS

This is a core layout component, and should be imported before Glue UI
components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/typography';

// Import Glue UI components

// Import Glue layout overrides
```


### HTML

#### Body Copy

The `glue-body` class is applied to `body` to set default type styles for the
page.

```html
<body class="glue-body">
  [Page content]
</body>
```

You can use the `glue-body--large` class on an individual text element to set a
larger paragraph style.

```html
<p class="glue-body--large">
  Paragraph with a larger font size.
</p>
```

#### Headlines

All headlines use the `glue-headline` class along with a modifier class.
Headline classes are not explicitly tied to header level, and can be applied to
paragraph tags as well. Use the right header level for your content schema, and
then apply the headline class to give the proper sizing.

```html
<h1 class="glue-headline glue-headline--fluid-1">
  Variable headline 1
</h1>

<h1 class="glue-headline glue-headline--fluid-2">
  Variable headline 2
</h1>

<h1 class="glue-headline glue-headline--headline-1">
  Headline 1
</h1>

<h1 class="glue-headline glue-headline--headline-2">
  Headline 2
</h1>

<h1 class="glue-headline glue-headline--headline-3">
  Headline 3
</h1>

<h1 class="glue-headline glue-headline--headline-4">
  Headline 4
</h1>

<h1 class="glue-headline glue-headline--headline-5">
  Headline 5
</h1>

<h1 class="glue-headline glue-headline--headline-6">
  Headline 6
</h1>
```

#### Eyebrow

An eyebrow is a small piece of stand-alone text that is often used to identify a
section area.

```html
<p class="glue-eyebrow">
  A line of eyebrow text
</p>
```

#### Callouts

There are several classes for callouts, depending on the text usage.

```html
<p class="glue-label">
  A label for an area
</p>

<p class="glue-caption">
  An image or chart caption
</p>

<p class="glue-small-text">
  Small text for a footnote
</p>
```

## Variations

### Modifier classes

By including a type modifier class, you can make certain adjustments to an
element.

#### Font weight

These change the weight of the text. For emphasized text, MWS tends to use the
medium/500 weight, not the bold/700 weight.

Class name                 | Weight
-------------------------- | ------
`glue-font-weight-light`   | 300
`glue-font-weight-regular` | 400
`glue-font-weight-medium`  | 500
`glue-font-weight-bold`    | 700

Not all fonts support all weights; unsupported weights will be
browser-synthesized and may not match design specs.

#### Font rendering

Change font properties to alter the appearance of your typography.

```html
<p class="glue-font-smoothing">
  This text has font-smoothing applied to it.
</p>
```

WARNING: `font-smoothing` should only be applied to text elements robust enough
to be smoothed. Text at/below 18px and 300 (light) weight should not have
smoothing applied to preserve contrast on non-retina displays.

#### Reversed text

Text on dark backgrounds can be set to reversed. The text and links will be
rendered as white.

```html
<p class="glue-font-reversed">
  This text is white, for use on dark backgrounds.
</p>
```

#### Margin

You can add top and/or bottom margins by adding class `glue-has-X-margin`.

-   `glue-has-bottom-margin`
-   `glue-has-top-margin`
-   `glue-has-top-bottom-margin`

Successive paragraphs will automatically include margin between paragraphs, but
will not include margins between other text elements (headers, lists, etc).

If you require more nuanced spacing, use a
[vertical spacer](/docs/components/spacers.md).

#### Lists: no bullet

Add `glue-no-bullet` class to a `ul` or `ol` to remove bullets. If the component
should still be read as a list by screen readers, include `role="list"` to
ensure Safari will flag the element as a list.

```html
<ul class="glue-no-bullet" role="list">
  <li>An unordered list.</li>
  <li>Without bullets.</li>
</ul>
```

### Variables and mixins

Glue has a number of useful variables and mixins that you can utilize to ensure
your site's typography matches Glue's internal setup.

#### Font name and font stack variables

Glue has variables for its most commonly used fonts (both individual fonts and
partial font stacks) which you can use when referring to them.

Variable name                  | Font(s)                                       | Usage
------------------------------ | --------------------------------------------- | -----
~~$font-face-roboto~~          | ~~Roboto~~                                    | Deprecated; use Google Sans Text
`$font-face-productsans`       | Product Sans                                  | Header (Product/Campaign logo lockups)
`$font-face-googlesans`        | Google Sans                                   | Headline and title font, CTAs
`$font-face-googlesansdisplay` | Google Sans Display                           | Extra-large headlines
`$font-face-googlesanstext`    | Google Sans Text                              | Body copy, small text
`$font-stack-ar`               | Google Sans Arabic                            | Partial font stack for Arabic
`$font-stack-ja`               | Google Sans Japanese, Noto Sans JP            | Partial font stack for Japanese
`$font-stack-ko`               | Google Sans Korean, Noto Sans KR              | Partial font stack for Korean
`$font-stack-zhcn`             | Google Sans Simplified Chinese, Noto Sans SC  | Partial font stack for Simplified Chinese
`$font-stack-zhtw`             | Google Sans Traditional Chinese, Noto Sans TC | Partial font stack for Traditional Chinese
`$font-stack-latinfallback`    | Arial, Helvetica, sans-serif                  | Default fallback for all font stacks

#### Custom font stack mixin

You can set up your own font stack by combining your font of choice with Glue's
default font stack. This mixin will also include your font choice over the
language-specific font stacks for Arabic, Chinese, Japanese, and Korean.

```scss
// Import Glue typography mixins
@use '@google/glue/dist/typography/mixins' as glue-typography-mixins;

$my-cool-font: 'Roboto Slab';

.my-title {
  @include glue-typography-mixins.language-font-stacks($my-cool-font);
}
```

## Variation demos

-   [Styles](https://28-0-dot-glue-demo.appspot.com/components/typography/styles)
-   [Utilities](https://28-0-dot-glue-demo.appspot.com/components/typography/utilities)
