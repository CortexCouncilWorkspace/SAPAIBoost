# Expansion Panels

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Accordion, Zippy

Expansion panels allow individual blocks of content to be expanded/hidden to
conserve vertical space or focus attention on specific blocks.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BExpansion%20Panels%5D)**

**[SCSS SOURCE](/src/expansionpanels/_index.scss)**

**[TS SOURCE](/src/expansionpanels/model.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/accordions.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/expansion-panels/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/expansion-panels/)

## Features

-   Individual panels can be expanded or collapsed by interacting with its
    toggle
-   Panels initially render as collapsed, but individual panels can be set to
    initially render as expanded
-   'Toggle All' will expand or collapse all panels in a group at once
-   Multiple groups of panels can be added to a page
-   Smooth animation can be adjusted or turned off entirely for the
    expand/collapse action

## Setup

### Dependencies

-   SCSS
    -   [Buttons](/docs/components/buttons.md)
    -   [Grid layout](/docs/components/grid-layout.md)
        -   [Page](/docs/components/page.md)
    -   [Icons](/docs/components/icons.md)
    -   [Typography](/docs/components/typography.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/buttons';
@use '@google/glue/dist/grids';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/page';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/expansionpanels';

// Import Glue layout overrides
```


### HTML

By default, expansion panels span the full width of its container. It is usually
placed in a glue-grid to achieve the MWS layout, where they are full width on
mobile viewports and span 8 grid columns (centered) on tablet and desktop
viewports.

**Notes:**

-   Update the usage of `h2` and `h3` titles (for the panel group and for
    individual panels, respectively) to match the heading structure of your
    page.
-   The `<div>` inside of the `glue-expansion-panel-content` div is used to
    handle spacing. Place all of the panel's content inside this child div.

```html
<section class="glue-page">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-2
        glue-grid__col--span-0-sm"></div>
    <div class="glue-grid__col glue-grid__col--span-8">

      <div class="glue-expansion-panels">
        <div class="glue-expansion-panels__header">
          <h2 class="glue-eyebrow">Panel Group title</h2>
          <button aria-label="Toggle all Panel Group panels"
                  id="mypanels-toggle-all"
                  class="glue-expansion-panels__toggle-all glue-button
                         glue-button--low-emphasis glue-button--icon-right">
            <span class="glue-expansion-panels__toggle-text
                         glue-expansion-panels__toggle-text--expanded">
              Expand all
            </span>
            <span class="glue-expansion-panels__toggle-text
                         glue-expansion-panels__toggle-text--collapsed">
              Collapse all
            </span>
            <svg role="presentation" aria-hidden="true" class="glue-icon">
              <use href="/public/icons/glue-icons.svg#expand-all"></use>
            </svg>
          </button>
        </div>

        <div class="glue-expansion-panel">
          <h3 class="glue-expansion-panel__toggle">
            <span class="glue-expansion-panel__button" id="mypanels-1-toggle"
                 data-glue-expansion-panel-toggle-for="mypanels-1-content">
              <span class="glue-expansion-panel__header-text">Panel 1 header</span>
              <svg role="presentation" aria-hidden="true"
                   class="glue-icon glue-expansion-panel__header-arrow">
                <use href="/public/icons/glue-icons.svg#expand-more"></use>
              </svg>
            </span>
          </h3>
          <div class="glue-expansion-panel__content" id="mypanels-1-content">
            <div>
              <p>Panel 1 content</p>
            </div>
          </div>
        </div>

        <!-- additional panels as needed -->
      </div>
    </div>
  </div>
</section>
```

### TS initialization

Initialize the panel group component(s). This is the parent component for a
panel group, and will in turn initialize its subcomponents (such as individual
panel toggles).

```ts
// Only include ExpansionPanelOptions if you are customizing the panel group
// by passing configuration options through the constructor
import {ExpansionPanels} from '@google/glue';
import {ExpansionPanelOptions} from '@google/glue';

const panelGroupEl = document.querySelector<HTMLElement>('.glue-expansion-panels');
if (panelGroupEl) new ExpansionPanels(panelGroupEl);
```


### JS initialization

```js
import {ExpansionPanels} from '@google/glue';
new ExpansionPanels(document.querySelector('.glue-expansion-panels'));
```

## Constructor Options

Name       | Type    | Default Value | Description
---------- | ------- | ------------- | -----------
isAnimated | Boolean | true          | Whether to animate expand/collapse. The animation itself is configured in SCSS.

## Public Methods

Method    | Default Parameters | Description
--------- | ------------------ | ----------------------------------------------
destroy() | none               | Destroys the panel group and its subcomponents

## Events

Event                                 | Triggered by       | Targeted to | Description
------------------------------------- | ------------------ | ----------- | -----------
glueExpansionPanelsStatusChanged      | Toggle, Toggle All | Panel Group | Indicates a change in the group status (a panel has been toggled, all panels have been toggled) so classes can be updated
glueExpansionPanelsToggleContent      | Toggle             | Content     | Tells the content linked to that toggle to expand or collapse
glueExpansionPanelsExpandAllContent   | Toggle All         | Content     | Tells all content in the group to expand
glueExpansionPanelsCollapseAllContent | Toggle All         | Content     | Tells all content in the group to collapse

## Variations

### Removing the Toggle All button

While the Toggle All button provides a way to easily see/hide all the panel
content at once, it is optional. It is highly recommended for any group that
includes 3 or more panels.

If you remove the Toggle All button, you can remove the button SCSS dependency.

### Multiple expansion panel groups per page

If you have multiple panel groups on the same HTML page, you will need to set a
named Expansion Panels model for each, using `data-glue-expansion-panels-key`.

```html
<div class="glue-expansion-panels"
     data-glue-expansion-panels-key="panelGroupOne">
  <!-- expansion panel group 1 content -->
</div>

<div class="glue-expansion-panels"
     data-glue-expansion-panels-key="panelGroupTwo">
  <!-- expansion panel group 2 content -->
</div>
```

Conversely, if you have multiple panel groups you wish to function as a singular
unit, you can pass in the same model name to each one.

### Individual panel initially expanded

Panels in a group are initially rendered as collapsed. You can override this and
have a panel initially render as expanded by setting a data-glue attribute on
that panel's content.

```html
<div class="glue-expansion-panel__content"
     data-glue-expansion-panel-initial="expanded"
     id="mypanels-1-content">
  <div>
    <!-- panel content -->
  </div>
</div>
```

### Changing panel expand/collapse animation

If you would like to change the panel animation you will need to update the SCSS
or TS.

#### Changing the timing (SCSS)

If you'd like to update the animation timing from the default value of 200ms,
you can override the default values in the SCSS when importing the expansion
panel styles.

```scss
@use '@google/glue/dist/expansionpanels' with (
  $animation-timing-content: 500ms
);
```

#### Removing animation completely

If you would like to remove animation from the expansion panel altogether, set
`isAnimated` to `false` and pass it in when initializing the panel group.

```ts
const panelOpts = ({
  isAnimated: false
});

new ExpansionPanels(document.querySelector('.glue-expansion-panels'),
    panelOpts);
```

It is not necessary to update the SCSS in this case.

### Placing outside of the grid

If you do not want to put the panels inside of a grid structure, but want to use
the same width/spacing, you can use a
[grid mixin](/docs/components/grid-layout.md).
You will still need to put it inside of a glue-page element to set page margins.

In the SCSS:

```scss
@use '@google/glue/dist/breakpoints/mixins' as glue-breakpoints-mixins;
@use '@google/glue/dist/grids/mixins' as glue-grids-mixins;

.my-panel-group {
  @include glue-breakpoints-mixins.bp(md) {
    @include glue-grids-mixins.glue-grid-col-offset(2, true);
  }
}
```


In the HTML:

```html
<section class="glue-page">
  <div class="glue-expansion-panels my-panel-group">
    <!-- expansion panel group content -->
  </div>
</section>
```

## Accessibility

-   Set an appropriate `aria-label` on the Toggle All element that describes the
    full action of the button (instead of relying on the visual text changing
    between 'Expand all' and 'Collapse all'.)
-   In order to show tooltips on each toggle, set the attributes
    `data-glue-expansion-panel-expand-tooltip` and
    `data-glue-expansion-panel-collapse-tooltip` on the panels root element.
-   Set an ID for each `glue-expansion-panel__button` element. This will set
    `aria-labelledby` on the content element.
-   Set an ID for each `glue-expansion-panel__content` element. This ID is
    passed to toggle with `data-glue-expansion-panel-toggle-for`. If the toggle
    is not properly linked to a panel content element, the panel group will
    throw an error.
