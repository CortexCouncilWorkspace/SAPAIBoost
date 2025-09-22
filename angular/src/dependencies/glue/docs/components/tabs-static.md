# Tabs (Static)

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

Displays grouped content as a set of tabs.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BTabs%20%28Static%29%5D)**

**[SCSS SOURCE](/src/tabs/_index.scss)**

**[TS SOURCE](/src/tabs/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/tabs.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tabs/tabset"
        width="100%" height="400" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/tabs/tabset)

NOTE: We recommend using
[responsive tabs](/docs/components/tabs-responsive.md) if you
want a fully-featured and styled tab UI. This documentation is for the base tabs
and how to utilize its state features.

## Features

-   Expose observer for users to track Tabs changes.
-   Follow
    [w3 Tabs](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html)
    pattern
-   Check [A11y features](#accessibility).

## Setup

### Dependencies

-   SCSS
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/tabs';

// Import Glue layout overrides
```


### HTML

```html
// Ids are required for better A11y support.
<div class="glue-tabs" data-glue-tabs-current='2'>
  <div class="glue-tabs__tablist">
    <div class="glue-tab" id="dimensions">Dimensions</div>
    <div class="glue-tab" id="sensors">Sensors</div>
    <div class="glue-tab" id="audio">Audio formats</div>
    <div class="glue-tab" id="wireless">Wireless</div>
  </div>

  <div class="glue-tabs__panelgroup">
    <div class="glue-tabs__panel" id="tab-dimensions">Panel 1</div>
    <div class="glue-tabs__panel" id="tab-sensors">Panel 2</div>
    <div class="glue-tabs__panel" id="tab-audio">Panel 3</div>
    <div class="glue-tabs__panel" id="tab-wireless">Panel 4</div>
  </div>
</div>
```

### TS initialization

```ts
import {Tabs} from '@google/glue';

const tabsEl = document.querySelector<HTMLElement>('.glue-tabs');
if (tabsEl) new Tabs(tabsEl);
```


## Public Methods

Method           | Params | Description                           | Return
---------------- | ------ | ------------------------------------- | ------
`setActiveTab`   | number | Set the active tab, index starts at 1 | void
`getActiveTab()` |        | Return the index of the active tab    | number
`destroy()`      |        | Destroy the instance                  | void

## Tips

### Set initial active tab

-   Option 1: add `data-glue-tabs-current` attribute

    ```html
    <div class="glue-tabs" data-glue-tabs-current="2">
       ...
    </div>
    ```

-   Option 2: use the constructor option

    ```ts
    new Tabs(element, {currentTab: 3});
    ```

### Track data changes

You can use the observer property to track Carousel data changes.

```ts
tabs = new Tabs(el);

// Retrieve the active tab index
tabs.observer.data.currentTab

// Subscribe to the active tab index change
tabs.observer.listen('currentTab', ()=> {...});

// Unsubscribe to the active tab index change
tabs.observer.unlisten('currentTab', ()=> {...});
```

## Accessibility

-   When focus moves into the tab list, places focus on the active tab element.
-   When the tab list contains the focus, moves focus to the next element in the
    tab sequence, which is the tabpanel element.
-   Use Right Arrow and Left Arrow key to navigate through tab elements.
-   Use Home key to move focus to the first tab and use End key to move focus to
    the last tab.
-   Screen reader reads the active tab element.
