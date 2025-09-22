# Accessibility Classes

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS

**Synonyms:** A11y, Accessibility, High Contrast Mode, Visibility

SCSS classes, utilities, and variables that provide accessibility features to
elements.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BAccessibility%20Classes%5D)**

**[SCSS SOURCE](/src/accessibility/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/accessibility/"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/accessibility/)

## Features

-   Visually hide content while leaving it accessible to screen readers via
    class or mixin
-   Mixins and variables for Windows High Contrast Mode (HCM)
    -   Media query mixin to detect when HCM is active
    -   Focus state mixin
    -   Forced-color mixin to allow site styles to override user's theme
    -   CSS color keywords used by HCM themes

## Setup

### SCSS

This is a layout overrides component, and should be imported after Glue core
layout components and UI components.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components

// Import Glue layout overrides
@use '@google/glue/dist/accessibility';
```


## Available classes and mixins

### Visually hide content with classes

Add the `glue-visually-hidden` class to an element to visually hide it, but
leave its content available to screen readers and other assistive technologies.

```html
<div class="glue-visually-hidden">
  <p>
    This element is visually hidden, but accessible by screen readers.
  </p>
</div>
```

Add the `glue-visually-show` class to a visually-hidden element to make it
appear again. This is typically done when you need to hide/show an element
programmatically with TS. This class is not used by itself.

```html
<div class="glue-visually-hidden glue-visually-show">
  <p>
    This element was originally visually hidden, but is now showing again.
  </p>
</div>
```


### Visually hide content with mixins

You can use mixins directly in your styles to visually hide/show content.

#### SCSS

```scss
@use '@google/glue/dist/accessibility/mixins' as glue-accessibility-mixins;

.foo {
  color: red;

  &.hidden {
    @include glue-accessibility-mixins.element-invisible;
  }

  &.shown {
    @include glue-accessibility-mixins.element-invisible-off;
  }
}
```


#### HTML

```html
<div class="foo">
  A foo element with red text.
</div>

<div class="foo hidden">
  A foo element that is visually hidden.
</div>

<div class="foo hidden shown">
  A foo element that was visually hidden, but is now shown.
</div>
```

### Windows High Contrast Mode features

Several mixins and variables are provided to make it easier to style for Windows
High Contrast Mode. Import the mixins and/or variables files as needed.

#### Media query

Use the HCM media query mixin to set styles targeted only when the user has
forced-colors turned on, such as when they are in HCM.

##### SCSS

```scss
@use '@google/glue/dist/accessibility/mixins' as glue-accessibility-mixins;

.foo {
  // base styles

  @include glue-accessibility-mixins.hcm-mq {
    // special style overrides for high contrast mode
  }
}
```


#### Focus state mixin

Use the focus state mixin to set a `2px solid transparent` outline. In HCM, the
outline color will be automatically converted to the user's theme and made
visible. This is the preferred generic method for showing focus state.

##### SCSS

```scss
@use '@google/glue/dist/accessibility/mixins' as glue-accessibility-mixins;

.foo {
  // base styles

  &:focus {
    @include glue-accessibility-mixins.hcm-focus;  // Focus styles for HCM
    // base focus styles
  }
}
```


#### Turn off forced-colors

In certain circumstances, you may need your CSS to override the user's HCM
theme. Use this mixin to turn off forced-color-adjust. Note that this will let
your styles override all of the user's theme settings for that element. Please
use this sparingly, and use it in combination with CSS color keywords that map
to HCM color settings where possible to preserve the user's theme choice.

The most common use for this mixin is to remove the text backplate color that
some browsers add, which may make text unreadable in certain circumstances.

```scss
@use '@google/glue/dist/accessibility/mixins' as glue-accessibility-mixins;

.foo {
  // base styles

  @include glue-accessibility-mixins.hcm-mq {
    // Turn off forced-color-adjust so these styles override user's theme setting
    @include glue-accessibility-mixins.hcm-forced-color;
    // Additional style overrides for high contrast mode
  }
}
```


#### CSS Color Keywords

Some CSS color keywords are mapped to the user's HCM theme, and should be used
when possible to maintain a layout that follows the user's preferences.

##### Available keywords

Variable                       | Usage
------------------------------ | -------------------------------------
$hcm-color-background          | Background color
$hcm-color-text                | Text color
$hcm-color-button-background   | Button background color
$hcm-color-button-text         | Button text color
$hcm-color-selected-background | Selected/highlighted background color
$hcm-color-selected-text       | Selected/highlighted text color
$hcm-color-link-text           | Link text color
$hcm-color-disabled-text       | Disabled text color

##### SCSS

```scss
@use '@google/glue/dist/accessibility/mixins' as glue-accessibility-mixins;
@use '@google/glue/dist/accessibility/variables' as glue-accessibility-variables;

.foo {
  color: $foo-text-color;

  svg {
    fill: currentColor;

    @include glue-accessibility-mixins.hcm-mq {
      // Set SVG fill to theme text color in HCM
      fill: glue-accessibility-variables.$hcm-color-text;
    }
  }
}
```

