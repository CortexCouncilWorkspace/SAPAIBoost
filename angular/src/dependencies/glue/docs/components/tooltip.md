# Tooltip

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-08-04' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Tooltip

A tooltip pops up when a user hovers or moves their cursor to an interactive
object (typically a button, icon, or link) providing a snippet of additional
information or context. It disappears when the user moves the mouse or cursor
away from the trigger or hits the escape key.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BTooltip%5D)**

**[SCSS SOURCE](/src/tooltip/_index.scss)**

**[TS SOURCE](/src/tooltip/index.ts)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tooltip/combo"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tooltip/combo)

## Features

-   Display the tooltip when its trigger has mouse-hover, keyboard-focus or is
    tapped on.
-   Close the tooltip when hover or focus leaves the element, the outside area
    is tapped, or user hits the escape key.
-   Keyboard focus can move into rich tooltips that have a link inside of them,
    allowing keyboard selection of the link.
-   The tooltip placement can be auto-adjusted to keep it inside the viewport.
-   The tooltip has a show delay of 500ms, and hide delay of 600ms. The
    transition duration in both cases is 350ms.

## Setup

### Dependencies

-   SCSS
    -   [Icons](/docs/components/icons.md)
    -   [Links](/docs/components/links.md)
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core' as glue-core;
@use '@google/glue/dist/icons'; // If using icon trigger
@use '@google/glue/dist/links'; // If using link trigger or rich tooltip with interactive element
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/tooltip' as glue-tooltip;
```


## Tooltip variations

### Simple tooltip

#### 1. As button

```html
<div class="glue-tooltip">
  <button class="glue-tooltip__trigger" aria-describedby="tooltip-content">
    Text for interaction
  </button>
  <span id="tooltip-content" class="glue-tooltip__content" role="tooltip">
    Lorem ipsum dolor sit amet
  </span>
</div>
```

#### 2. As inline link

```html
<span class="glue-tooltip">
  <a class="glue-tooltip__trigger glue-tooltip__trigger--link glue-inline-tonal-link"
      href="#" aria-describedby="tooltip-content">
    Text for interaction
  </a>
  <span id="tooltip-content" class="glue-tooltip__content" role="tooltip">
    Lorem ipsum dolor sit amet
  </span>
</span>
```

### Rich tooltip

#### 1. As button, without interactive elements (role='tooltip')

```html
<div class="glue-tooltip glue-tooltip--rich">
  <button class="glue-tooltip__trigger" aria-describedby="tooltip-content">
    Text for interaction
  </button>
  <span id="tooltip-content" class="glue-tooltip__content" role="tooltip">
    <span class="glue-tooltip__header">Lorem ipsum</span>
    <span class="glue-tooltip__body">Lorem ipsum dolor sit amet</span>
  </span>
</div>
```

#### 2. As button, with interactive elements (role='dialog')

```html
<div class="glue-tooltip glue-tooltip--rich">
  <button class="glue-tooltip__trigger" aria-describedby="tooltip-content">
    Text for interaction
  </button>
  <span id="tooltip-content" class="glue-tooltip__content" role="dialog">
    <span class="glue-tooltip__header">Lorem ipsum</span>
    <span class="glue-tooltip__body">Lorem ipsum dolor sit amet</span>
    <a href="#" class="glue-tooltip__link">Lorem</a>
  </span>
</div>
```

#### 3. As inline link with icon, without interactive elements (role='tooltip')

```html
<span class="glue-tooltip glue-tooltip--rich">
  <a class="glue-tooltip__trigger glue-tooltip__trigger--link glue-inline-tonal-link"
      href="#" aria-describedby="tooltip-content">
    <svg role="presentation" aria-hidden="true" class="glue-icon">
      <use href="/public/icons/glue-icons.svg#info"></use>
    </svg>
    Text for interaction
  </a>
  <span id="tooltip-content" class="glue-tooltip__content" role="tooltip">
    <span class="glue-tooltip__header">Lorem ipsum</span>
    <span class="glue-tooltip__body">Lorem ipsum dolor sit amet</span>
  </span>
</span>
```

The icon can be placed after the text by adjusting the link HTML and adding
class `glue-tooltip__trigger--icon-after` to it:

```html
<a class="glue-tooltip__trigger glue-tooltip__trigger--link glue-tooltip__trigger--icon-after glue-inline-tonal-link"
    href="#" aria-describedby="tooltip-content">
  Text for interaction
  <svg role="presentation" aria-hidden="true" class="glue-icon">
    <use href="/public/icons/glue-icons.svg#info"></use>
  </svg>
</a>
```

### Icon tooltip

When the tooltip trigger includes only non-readable content, like an SVG icon,
use `aria-labelledby` instead of `aria-describedby` so the screen reader will
announce it properly. Alternatively, if you set the SVG to `role="img"` and
remove `aria-hidden`, you can set an `alt` tag on the SVG that serves as its
label and continue to use `aria-describedby` on the trigger.

```html
<div class="glue-tooltip">
  <button class="glue-tooltip__trigger glue-tooltip__trigger--icon"
      aria-labelledby="tooltip-content-1">
    <svg class="glue-icon glue-icon--24px" role="presentation" aria-hidden="true">
      <use href="/public/icons/glue-icons.svg#file-download"></use>
    </svg>
  </button>
  <span id="tooltip-content-1" class="glue-tooltip__content" role="tooltip">
    Lorem ipsum dolor sit amet
  </span>
</div>

<div class="glue-tooltip">
  <button class="glue-tooltip__trigger glue-tooltip__trigger--icon"
      aria-describedby="tooltip-content-2">
    <svg class="glue-icon glue-icon--24px" role="img" alt="Lorem ipsum">
      <use href="/public/icons/glue-icons.svg#file-download"></use>
    </svg>
  </button>
  <span id="tooltip-content-2" class="glue-tooltip__content" role="tooltip">
    Lorem ipsum dolor sit amet
  </span>
</div>
```

### TS initialization

You can initialize tooltips individually, which allows you to pass in options
and use public methods. You can also initialize all tooltips at once with
`initMultiTooltip`, if options are set with `data-glue` parameters and you don't
need to use public methods.

```ts
// Only include initMultiTooltip if you are initializing multiple tooltips
// using that option.
import {Tooltip, initMultiTooltip} from '@google/glue';

const tooltipEl = document.querySelector<HTMLElement>('.glue-tooltip');

// Initialize single tooltip with default / HTML options
if (tooltipEl) new Tooltip(tooltipEl);

// Initialize multiple tooltips with default / HTML options
const tooltipEls = document.querySelectorAll('.glue-tooltip') as NodeListOf<HTMLElement>;

tooltipEls.forEach((elem) => {
  new Tooltip(elem);
});

// Initialize multiple tooltips with initMultiTooltip option
const tooltipEls = document.querySelectorAll<HTMLElement>('.glue-tooltip');
initMultiTooltip(tooltipEls);
```


## Public Methods and properties

Method      | Description                              | Return
----------- | ---------------------------------------- | ------
`destroy()` | Destroys instance and removes DOM events | void
`open()`    | Opens the tooltip                        | void
`close()`   | Closes the tooltip                       | void

NOTE: Public methods cannot be used with initMultiTooltip option

## Events

Event              | Description
------------------ | -----------------------------
`gluetooltipshow`  | Fired after tooltip is opened
`gluetooltipclose` | Fired after tooltip is closed

## Options

The `Tooltip` constructor can accept one option. Options can be passed in via
data attribute or to the constructor directly.

Data attribute                    | Option name    | Type                             | Description                                             | Default
--------------------------------- | -------------- | -------------------------------- | ------------------------------------------------------- | -------
`data-glue-tooltip-auto-position` | `autoPosition` | boolean                          | Set tooltip position automatically or not               | true
`data-glue-tooltip-placement`     | `placement`    | 'top'\|'bottom'\|'left'\|'right' | Placement of the Tooltip relative to the trigger button | left

### Using data attributes

```html
<div class="glue-tooltip" data-glue-tooltip-auto-position="false">
  ...
</div>
```

### Passing in options to the constructor

```ts
new Tooltip(tooltipEl, {autoPosition: 'false'});
```

## Accessibility

-   The tooltip dialog should have the role `tooltip`.
    -   If the tooltip contains interactive elements, the tooltip dialog should
        instead have the role `dialog`.
        -   The tooltip dialog will receive focus and will remain open on user
            interaction only if it has the role `dialog`.
        -   Any links inside the tooltip the role `dialog` must have the
            classname `glue-tooltip__link` in order keep the tooltip open after
            receiving focus.
-   The element that triggers the tooltip references the tooltip element with
    `aria-describedby`, or `aria-labelledby` if the trigger has no text content.
-   If the element that triggers the tooltip is a link, make sure it has an
    `href` set (even if it is just `#`) so that users can navigate to it with
    the keyboard.
-   If the element that triggers the tooltip is neither a button nor a link, set
    `aria-role=button` and `tabindex=0` to indicate to screen readers that it is
    interactive and to allow users to use keyboard navigation to select it.
-   References:
    -   [ARIA Blueprint](https://static.corp.google.com/ariablueprints/tooltip/tooltip.html)
    -   [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
    -   [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

### Keyboard and touch interactions

-   Tooltips should display when the user keyboard navigates to a triggering
    element
-   Tooltips should hide when the user presses the `Escape` key

## Variation demos

-   [Buttons](https://28-0-dot-glue-demo.appspot.com/components/tooltip/buttons)
-   [Combo](https://28-0-dot-glue-demo.appspot.com/components/tooltip/combo)
-   [Icons](https://28-0-dot-glue-demo.appspot.com/components/tooltip/icons)
-   [Default Tooltip Placement](https://28-0-dot-glue-demo.appspot.com/components/tooltip/default-tooltip-placements)
