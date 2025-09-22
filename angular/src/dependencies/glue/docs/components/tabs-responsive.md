# Tabs (Responsive)

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Tabpanels, Tabby, Tabset

A responsive component that displays grouped content as a set of tabs on large
viewports, and as expansion panels on small viewports.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BTabs%20%28Responsive%29%5D)**

**[SCSS SOURCE](/src/tabpanels/_index.scss)**

**[TS SOURCE](/src/tabpanels/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/tabs.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tabs/centered-icons"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tabs/centered-icons)

This component creates a grouped content interface. It uses responsive monitor
to switch between tabs (desktop) and expansion panels (mobile) UI models.

NOTE: This is a responsive component, built off of
[Tabs](/docs/components/tabs-static.md) and
[Expansion panels](/docs/components/expansion-panels.md).
Refer to those two documentation pages for details on the underlying components,
or the
[Responsive monitor](/docs/components/responsive-monitor.md)
documentation for more details on how the component swaps between modes.

## Features

-   Tabbed interface on desktop viewports to show/hide grouped content
    -   Use arrow keys to switch between tabs when tab bar is focused
-   Converts to expansion panels on mobile viewport
-   Can configure to always show tabs
-   Can configure to adjust which breakpoints show expansion panels vs tabs
-   Can configure whether to show expand/collapse animation in expansion panels

## Setup

### Dependencies

-   SCSS
    -   [Breakpoints](/docs/components/breakpoints.md)
    -   [Expansion panels](/docs/components/expansion-panels.md)
    -   [Icons](/docs/components/icons.md)
    -   [Tabs (static)](/docs/components/tabs-static.md)
    -   [Typography](/docs/components/typography.md)
-   TS
    -   [Expansion panels](/docs/components/expansion-panels.md)
    -   [Responsive monitor](/docs/components/responsive-monitor.md)
    -   [Tabs (static)](/docs/components/tabs-static.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/breakpoints';
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/expansionpanels';
@use '@google/glue/dist/tabs';
@use '@google/glue/dist/tabpanels';

// Import Glue layout overrides
```


### HTML

NOTE: Update the usage of `h2` titles to match the heading structure of your
page.

```html
<div class="glue-tabpanels">
  <div class="glue-tabpanels__page-list">
    <div>Tab 1 title</div>
    <div>Tab 2 title</div>
  </div>
  <div class="glue-tabpanels__panel-list">
    <div id="tab-1">
      <h2 class="glue-tabpanels__panel-toggle">
        <div class="glue-tabpanels__panel-button" id="tab-1-toggle">
          <span class="glue-tabpanels__panel-title">
            Tab 1 title
          </span>
          <svg role="presentation" aria-hidden="true"
               class="glue-icon glue-expansion-panel__header-arrow">
            <use href="/public/icons/glue-icons.svg#expand-more"></use>
          </svg>
        </div>
      </h2>
      <div id="tab-1-content" class="glue-tabpanels__panel-content">
        <div>
          <p>Tab 1 content</p>
        </div>
      </div>
    </div>
    <div id="tab-2">
      <h2 class="glue-tabpanels__panel-toggle">
        <div class="glue-tabpanels__panel-button" id="tab-2-toggle">
          <span class="glue-tabpanels__panel-title">
            Tab 2 title
          </span>
          <svg role="presentation" aria-hidden="true"
               class="glue-icon glue-expansion-panel__header-arrow">
            <use href="/public/icons/glue-icons.svg#expand-more"></use>
          </svg>
        </div>
      </h2>
      <div id="tab-2-content" class="glue-tabpanels__panel-content">
        <div>
          <p>Tab 2 content</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### TS initialization

Initialize the tabs component.

```ts
import {TabPanels, TabPanelsOptions} from '@google/glue';

const tabPanelsEl = document.querySelector<HTMLElement>('.glue-tabpanels');
const tabPanelsOpts: Partial<TabPanelsOptions> = {
  panelsCount: 2
};
if (tabPanelsEl) new TabPanels(tabPanelsEl, tabPanelsOpts);
```


## Constructor Options

Name              | Type    | Default Value | Description
----------------- | ------- | ------------- | -----------
panelsCount       | Number  | `2`           | The number of tabs/panels in the group.
panelsBreakpoints | Array   | `['sm']`      | A list of [named breakpoints](/docs/components/breakpoints.md) that should display expansion panels.
isResponsive      | Boolean | `true`        | Whether to swap to expansion panels at the mobile viewport.
isPanelsAnimated  | Boolean | `true`        | For expansion panels; whether to animate panel expand/collapse. The animation itself is set in SCSS.

## Public Methods

Method    | Default Parameters | Description
--------- | ------------------ | ---------------------------------------
destroy() | None               | Destroys the tabs and its subcomponents

## Variations

### Changing responsiveness

If you want expansion panels to display on more breakpoints than just sm, pass
in the additional
[named breakpoints](/docs/components/breakpoints/.md) when
initializing the component.

```ts
const tabPanelsOpts = ({
  panelsBreakpoints: ['sm', 'md']
});
if (tabPanelsEl) new TabPanels(tabPanelsEl, tabPanelsOpts);
```

### Removing responsiveness

If your tabs bar only has a few short links, you may not need it to swap to
expansion panels on mobile. In that case, pass `false` in the `isResponsive`
option when initializing your tabs. You can also reduce the HTML by removing
expansion panel-exclusive elements.

#### HTML

```html
<div class="glue-tabpanels">
  <div class="glue-tabpanels__page-list">
    <div>Tab 1 title</div>
    <div>Tab 2 title</div>
  </div>
  <div class="glue-tabpanels__panel-list">
    <div id="tab-1">
      <p>Tab 1 content</p>
    </div>
    <div id="tab-2">
      <p>Tab 2 content</p>
    </div>
  </div>
</div>
```

#### TS/JS

```ts
// TypeScript
const tabPanelsOpts: Partial<TabPanelsOptions> = {
  isResponsive: false
};

// JavaScript
const tabPanelsOpts = {
  isResponsive: false
};

if (tabPanelsEl) new TabPanels(tabPanelsEl, tabPanelsOpts);
```

### Center-aligned tabs

To use the larger, center-aligned tab titles, add the
`glue-tabpanels--centeredtabs` variant class.

```html
<div class="glue-tabpanels glue-tabpanels--centeredtabs">
  <!-- tab panel content -->
</div>
```

#### Icons in center-aligned tabs

If you're including icons in the center-aligned tab titles, they should be SVGs
from the Material library. Add them to the tab titles in both the page list and
panel list containers.

```html
<div class="glue-tabpanels glue-tabpanels--centeredtabs">
  <div class="glue-tabpanels__page-list">
    <div>
      <svg role="presentation" class="glue-icon glue-icon--24px
           glue-tabpanels__heading-icon" viewBox="0 0 24 24"
           aria-hidden="true">
        <path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.95v-4H21l-4-6zM6.79
              16l3.9-6H8.88l3.13-4.5 3.15 4.5h-1.9l4 6H6.79z"></path>
      </svg>
      Tab 1 title
    </div>
    <!-- additional tab titles in page list -->
  </div>

  <div class="glue-tabpanels__panel-list">
    <div id="tab-1">
      <div id="tab-1-toggle">
        <h2 class="glue-tabpanels__panel-toggle">
          <div class="glue-tabpanels__panel-button" id="tab-1-toggle">
            <span class="glue-tabpanels__panel-title">
              <svg role="presentation" aria-hidden="true"
                   class="glue-icon glue-icon--24px glue-tabpanels__heading-icon"
                   viewBox="0 0 24 24">
                <path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.95v-4H21l-4-6zM6.79
                         16l3.9-6H8.88l3.13-4.5 3.15 4.5h-1.9l4 6H6.79z"></path>
              </svg>
              Tab 1 title
            </span>
            <svg role="presentation" aria-hidden="true"
                 class="glue-icon glue-expansion-panel__header-arrow">
              <use href="/public/icons/glue-icons.svg#expand-more"></use>
            </svg>
          </div>
        </h2>
        <div id="tab-1-content" class="glue-tabpanels__panel-content">
          <div>
            <p>Tab 1 content</p>
          </div>
        </div>
      </div>
      <!-- Additional tabs in panel list -->
    </div>
  </div>
</div>
```

### Changing animation

If you want to adjust the timing for expansion panels expand/collapse animation,
you'll need to override the overall
[SCSS for expansion panels](/docs/components/expansion-panels/.md).

#### Changing the timing (SCSS)

If you'd like to update the animation timing from the default value of 200ms,
you can override the default values in the SCSS when importing the expansion
panel styles. Note that this will affect all usage of expansion panels in the
site, not just in tabs.

```scss
@use '@google/glue/dist/expansionpanels' with (
  $animation-timing-content: 500ms
);
```

#### Removing animation completely (TS/JS)

If you would like to remove animation from the expansion panel altogether, set
`isPanelsAnimated` to `false` and pass it in when initializing the tabs.

```ts
// TypeScript
const tabPanelsOpts: Partial<TabPanelsOptions> = {
  isPanelsAnimated: false
};

// JavaScript
const tabPanelsOpts = {
  isPanelsAnimated: false
};

if (tabPanelsEl) new TabPanels(tabPanelsEl, tabPanelsOpts);
```

You do not need to update any SCSS to remove the animation.

### Using the subcomponents' APIs

Responsive Tabs is a combination of
[Tabs](/docs/components/tabs-static.md) and
[Expansion panels](/docs/components/expansion-panels.md). You
can access the subcomponents and their APIs directly.

```ts
const myTabPanels = new TabPanels(tabPanelsEl);

// Change the current tab to 2 through Tabs observer, if tabs are active
if (myTabPanels.tabsComponent) {
  myTabPanels.tabsComponent.setActiveTab(2);
}

// Expansion Panels only exposes a destroy() method in its API at the moment
if (myTabPanels.panelsComponent) {
  // Expansion panel actions if the API is expanded
}
```

## Accessibility

-   Review the accessibility features from individual components
    [Tabs](/docs/components/tabs-static.md) and
    [Expansion Panels](/docs/components/expansion-panels.md)

## Variation demos

-   [Centered Tabs (icons)](https://28-0-dot-glue-demo.appspot.com/components/tabs/centered-icons)
-   [Centered Tabs (without icons)](https://28-0-dot-glue-demo.appspot.com/components/tabs/centered-noicons)
-   [Left aligned tabs (not responsive)](https://28-0-dot-glue-demo.appspot.com/components/tabs/leftaligned)
-   [Centered Tabs (not responsive)](https://28-0-dot-glue-demo.appspot.com/components/tabs/centered-notresponsive)
-   [Left aligned tabs (responsive)](https://28-0-dot-glue-demo.appspot.com/components/tabs/leftaligned-responsive)
