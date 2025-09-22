# Colors

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Color Palette

Color variables available within Glue for easy reference to Google branded
colors.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BColors%5D)**

**[SCSS SOURCE](/src/colors/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/fundamentals/color/)**

</section>

## Live Demo

<iframe src="https://brand-tools.appspot.com/google-colors/all?surface=coated&type=hex"
        width="100%" height="520" style="border:1px solid #dadce0;max-width:760px;"></iframe>

[View demo](https://brand-tools.appspot.com/google-colors/all)

Glue includes variables that reference the primary Google branded colors (grey,
blue, green, red, and yellow). For additional Material colors, you can pull
values from Material's
[Color Tool](https://material.io/resources/color/).

## Features

-   Color variables that can be used in either CSS or SCSS code

## Setup

### SCSS

If you want to use Glue color variables as CSS custom variables, import the main
file. If you want to use them as SCSS variables, import the variables file.

This is a core layout component, and should be imported before Glue UI
components and layout overrides. Variables can be imported after all other Glue
files.

```scss
// Import Glue core layout components
@use '@google/glue/dist/colors' as glue-colors; // For CSS custon variables

// Import Glue UI components

// Import Glue layout overrides

// Import Glue mixins/variables
@use '@google/glue/dist/colors/variables' as glue-colors-variables; // For SCSS variables
```


## Using color variables

Note that the color CSS custom variables are namespaced with `glue` to prevent
any conflict with other CSS custom variables you may have in your project. SCSS
color variables are namespaced through the `@use` import syntax, so the base
variable name is not namespaced.

```scss
// As CSS variables
.foo {
  background: var(--glue-green-200);
}

// As SCSS variables (adjust namespace based on your @use import)
.bar {
  background: glue-colors-variables.$blue-200;
}
```

## Available color variables

CSS name          | SCSS name  | Hex value
----------------- | ---------- | ---------
--glue-grey-0     | grey-0     | #ffffff
--glue-grey-25    | grey-25    | #f1f1f1
--glue-grey-50    | grey-50    | #f8f9fa
--glue-grey-100   | grey-100   | #f1f3f4
--glue-grey-200   | grey-200   | #e8eaed
--glue-grey-300   | grey-300   | #dadce0
--glue-grey-400   | grey-400   | #bdc1c6
--glue-grey-500   | grey-500   | #9aa0a6
--glue-grey-600   | grey-600   | #80868b
--glue-grey-700   | grey-700   | #5f6368
--glue-grey-800   | grey-800   | #3c4043
--glue-grey-900   | grey-900   | #202124
--glue-blue-50    | blue-50    | #e8f0fe
--glue-blue-100   | blue-100   | #d2e3fc
--glue-blue-200   | blue-200   | #aecbfa
--glue-blue-300   | blue-300   | #8ab4f8
--glue-blue-400   | blue-400   | #669df6
--glue-blue-500   | blue-500   | #4285f4
--glue-blue-600   | blue-600   | #1a73e8
--glue-blue-700   | blue-700   | #1967d2
--glue-blue-800   | blue-800   | #185abc
--glue-blue-900   | blue-900   | #174ea6
--glue-green-50   | green-50   | #e6f4ea
--glue-green-100  | green-100  | #ceead6
--glue-green-200  | green-200  | #a8dab5
--glue-green-300  | green-300  | #81c995
--glue-green-400  | green-400  | #5bb974
--glue-green-500  | green-500  | #34a853
--glue-green-600  | green-600  | #1e8e3e
--glue-green-700  | green-700  | #188038
--glue-green-800  | green-800  | #137333
--glue-green-900  | green-900  | #0d652d
--glue-red-50     | red-50     | #fce8e6
--glue-red-100    | red-100    | #fad2cf
--glue-red-200    | red-200    | #f6aea9
--glue-red-300    | red-300    | #f28b82
--glue-red-400    | red-400    | #ee675c
--glue-red-500    | red-500    | #ea4335
--glue-red-600    | red-600    | #d93025
--glue-red-700    | red-700    | #c5221f
--glue-red-800    | red-800    | #b31412
--glue-red-900    | red-900    | #a50e0e
--glue-yellow-50  | yellow-50  | #fef7e0
--glue-yellow-100 | yellow-100 | #feefc3
--glue-yellow-200 | yellow-200 | #fde293
--glue-yellow-300 | yellow-300 | #fdd663
--glue-yellow-400 | yellow-400 | #fcc934
--glue-yellow-500 | yellow-500 | #fbbc04
--glue-yellow-600 | yellow-600 | #f9ab00
--glue-yellow-700 | yellow-700 | #f29900
--glue-yellow-800 | yellow-800 | #ea8600
--glue-yellow-900 | yellow-900 | #e37400
--glue-purple-900 | purple-900 | #681da8

## Accessibility

Ensure content is visually distinguished in a variety of circumstances for low
vision or color-blind users.

-   Guidelines for sufficient contrast between text and background
    -   WCAG AA rating: 4.5:1 (regular text), 3:1 (large text)
    -   WCAG AAA rating: 7:1 (regular text), 4.5:1 (large text)
    -   Multiple factors affect contrast, but we primarily focus on: font size,
        font weight, font color vs background color
-   Ensure layout makes sense in high-contrast modes
    -   Use Glue's
        [accessibility color variables](/docs/components/accessibility-classes.md)
        to set Windows High Contrast Mode-friendly colors for key elements
-   Do not rely on color alone to convey meaning
    -   Screen readers will not convey color information
    -   Colorblind users cannot distinguish between certain combinations, which
        varies by type of colorblindness
    -   Colors may have different inherent meanings in different cultures
    -   Consider text cues or patterns to provide secondary context for color
        information
