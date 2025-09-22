# Filter

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-24' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript
-   **Category**: Material

A component for filtering lists of content.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BFilter%5D)**

**[SCSS SOURCE](/src/filter/_index.scss)**

**[TS SOURCE](/src/filter/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/filters.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/filter/mwc3-vertical"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/filter/mwc3-vertical)

## Features

-   Multiple filter categories can be set at once
    -   Single-select categories with select/dropdown or radio pattern
    -   Multi-select categories with checkbox pattern
-   Styling
    -   Base Filter with basic styles that can be easily customized
    -   MWS styles using Material inputs/selects

## Dependencies

These vary based on which layout you are using.

-   Material
    -   [Checkboxes](/docs/components/checkbox.md)
    -   [Radios](/docs/components/radio.md)
    -   [Select](/docs/components/select.md)
-   SCSS
    -   [Accessibility Classes](/docs/components/accessibility-classes.md)
    -   [Breakpoints](/docs/components/breakpoints.md)
    -   [Buttons](/docs/components/buttons.md)
    -   [Cards](/docs/components/cards.md)
    -   [Expansion Panels](/docs/components/expansion-panels.md)
    -   [Grid layout](/docs/components/grid-layout.md)
        -   [Page](/docs/components/page.md)
    -   [Icons](/docs/components/icons.md)
    -   [Modal](/docs/components/modal.md)
    -   [Spacers](/docs/components/spacers.md)
    -   [Typography](/docs/components/typography.md)
-   TS
    -   [Expansion Panels](/docs/components/expansion-panels.md)
    -   [Modal](/docs/components/modal.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### Material 3

If using Material inputs/selects, follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### Material 2 (deprecated)

Warning: Material 2 components are deprecated and will be removed in a future
version of Glue. Please migrate to the Material 3 implementation at your
earliest convenience.

## Setup

### SCSS

Always include the base filter styles. Additional dependencies depend on which
layout you are using.

```scss
// Glue Filter dependencies
// All MWS layouts
@use '@google/glue/dist/accessibility' as glue-accessibility;
@use '@google/glue/dist/buttons' as glue-buttons;
@use '@google/glue/dist/cards' as glue-cards;
@use '@google/glue/dist/core' as glue-core;
@use '@google/glue/dist/grids' as glue-grids;
@use '@google/glue/dist/page' as glue-page;
@use '@google/glue/dist/typography' as glue-typography;

// Vertical/expansion panel layout
@use '@google/glue/dist/breakpoints' as glue-breakpoints;
@use '@google/glue/dist/expansionpanels' as glue-expansionpanels;
@use '@google/glue/dist/icons' as glue-icons;
@use '@google/glue/dist/modal' as glue-modal;
@use '@google/glue/dist/spacers' as glue-spacers;

// Material 3 theme and components
@use '@google/glue/dist/mwc3/theme' as glue-mwc3-theme;
@use '@google/glue/dist/mwc3/checkbox' as glue-mwc3-checkbox;
@use '@google/glue/dist/mwc3/radio' as glue-mwc3-radio;
@use '@google/glue/dist/mwc3/select' as glue-mwc3-select;

// Glue Filter styles
@use '@google/glue/dist/filter' as glue-filter;
```


### HTML

#### Basic Filter

If you are fully customizing Glue Filter, start with the basic Filter layout.
Each filter category can use a different pattern: checkboxes for multi-select,
radios for single-select, or dropdown/select for single-select. All three
patterns use native HTML elements.

Glue only provides basic styles for this layout for functionality purposes. You
will need to provide all other styling.

```html
<div class="glue-filter" id="my-filter">
  <div class="glue-filter__categories">
    <p id="category1-title">Checkboxes category</p>
    <ul class="glue-filter__category" data-glue-filter-category="category1"
        aria-controls="result-container" aria-labelledby="category1-title">
      <li>
        <input class="glue-filter__category-item" type="checkbox" id="category1-item1"
            value="item1">
        <label for="category1-item1">Item 1</label>
      </li>
      <li>
        <input class="glue-filter__category-item" type="checkbox" id="category1-item2"
            value="item2">
        <label for="category1-item2">Item 2</label>
      </li>
    </ul>

    <p id="category2-title">Radios category</p>
    <ul class="glue-filter__category" data-glue-filter-category="category2"
        aria-controls="filter-results" aria-labelledby="category2-title">
      <li>
        <input class="glue-filter__category-item" type="radio" id="category2-itemA"
            value="itemA" name="category2">
        <label for="category2-itemA">Item A</label>
      </li>
      <li>
        <input class="glue-filter__category-item" type="radio" id="category2-itemB"
            value="itemB" name="category2">
        <label for="category2-itemB">Item B</label>
      </li>
    </ul>

    <div class="glue-filter__category" data-glue-filter-category="category3">
      <label for="category3">Select/Dropdown category</label>
      <select id="category3" aria-controls="filter-results">
        <option class="glue-filter__category-item" value="">All</option>
        <option class="glue-filter__category-item" value="itemAlpha">Item α</option>
        <option class="glue-filter__category-item" value="itemBeta">Item β</option>
      </select>
    </div>

    <!-- additional filter categories as needed -->
  </div>

  <!-- Optional; content updated by Glue Filter when filters are toggled -->
  <div class="glue-filter__chips" role="grid" aria-label="Applied filters"
      data-glue-filter-chips-label-remove="Remove filter"></div>

  <div class="glue-filter__results" data-glue-filter-categories="category1 category2 category3"
       id="filter-results">
    <output class="glue-filter__results-status" aria-live="polite" aria-atomic="true">
      <span class="glue-filter__results-count"></span> results
    </output>
    <ul>
      <li class="glue-filter__result" data-glue-filter-category1="item1 item2"
          data-glue-filter-category2="itemA" data-glue-filter-category3="itemBeta">
        Result 1
      </li>
      <li class="glue-filter__result" data-glue-filter-category1="item2"
          data-glue-filter-category2="itemB" data-glue-filter-category3="itemAlpha">
        Result 2
      </li>
      <li class="glue-filter__result" data-glue-filter-category1="item1"
          data-glue-filter-category2="itemA" data-glue-filter-category3="itemAlpha">
        Result 3
      </li>
      <!-- Additional results as needed -->
    </ul>
  </div>
</div>
```

**Accessibility**

-   Ensure checked and radio inputs and labels are linked to each other with
    `for` pointed to the appropriate `id`.
-   Ensure checkbox and radios have a 48x48px minimum tap target size.
-   Update the chips container's `aria-label` and `data-glue-filter-chips-label`
    with appropriate labels.
-   The chips container uses a pill list UI pattern. You can tab to the chips
    container, and then use left/right arrow keys or the home/end keys to
    navigate between chips within the container. Using tab when the chips
    container or a chip is focused will move focus out of the chips container to
    the next focusable item.

#### MWS layouts

All MWS layouts use a grid layout to arrange both filter categories and results.
Categories use Glue-styled
[Material inputs](/docs/getting-started/material.md), while
results use [Glue Cards](/docs/components/cards.md).

All MWS layouts include the variant class `glue-filter--mws` on the root.

Consider using [Glue Spacers](/docs/components/spacers.md) if
you need to include vertical spacing above or below the filter section.

#### MWS layout/vertical

The vertical layout is the most flexible as it supports any number of filter
categories. All categories must use either the Material radio or Material
checkbox pattern. Categories are displayed inside of expansion panels so users
can see all categories at a glance and then drill down into individual
categories as needed. On mobile, the filters are inside of a modal; on desktop
they appear in a column on the left.

Chips are not used in vertical layouts.

Adjust heading level to match your content structure.

```html
<div class="glue-filter glue-filter--mws glue-grid glue-mwc3" id="my-filter">
  <!-- Filters column -->
  <div class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-12-md">
    <!-- Modal toggle (only visible on mobile/tablet) -->
    <button class="glue-button glue-button--tonal glue-button--icon glue-filter__modal-toggle">
      <svg role="presentation" aria-hidden="true" class="glue-icon">
        <use href="/path/to/glue-icons.svg#filter"></use>
      </svg>
      Filter
    </button>

    <!-- modal with filter category list -->
    <div class="glue-modal glue-filter__modal" aria-labelledby="modal-label">
      <div id="modal-content" class="glue-filter__modal-content">
        <output class="glue-filter__results-status glue-visually-hidden" aria-live="polite" aria-atomic="true">
          <span class="glue-filter__results-count"></span> results
        </output>
        <div class="glue-filter__categories glue-filter__panels glue-expansion-panels"
            data-glue-expansion-panels-key="filter-mws"
            data-glue-expansion-panel-expand-tooltip="Expand this filter category"
            data-glue-expansion-panel-collapse-tooltip="Collapse this filter category">

          <!-- Results header (large viewports) -->
          <div class="glue-expansion-panels__header">
            <h2 class="glue-headline glue-headline--headline-6" id="modal-label">
              Filter by:
            </h2>
          </div>

          <!-- Filter category with checkboxes -->
          <div class="glue-expansion-panel">
            <h3 class="glue-expansion-panel__toggle">
              <span class="glue-expansion-panel__button" id="filter-toggle-category1"
                  data-glue-expansion-panel-toggle-for="filter-panel-category1">
                <span class="glue-expansion-panel__header-text"
                    id="filter-category1-label">Category 1</span>
                <svg role="presentation" aria-hidden="true"
                    class="glue-icon glue-expansion-panel__header-arrow">
                  <use href="/path/to/glue-icons.svg#expand-more"></use>
                </svg>
              </span>
            </h3>
            <div class="glue-expansion-panel__content" id="filter-panel-category1">
              <div>
                <ul class="glue-filter__category glue-no-bullet"
                    data-glue-filter-category="category1" role="list"
                    aria-controls="filter-results" aria-labelledby="filter-category1-label">
                  <li class="glue-filter__category-item">
                    <div class="glue-mwc3-checkbox">
                      <md-checkbox id="filter-category1-item1" name="filter-category1-item1" touch-target="wrapper"
                          value="item1" aria-label="Item 1" tabindex="0"></md-checkbox>
                      <label for="filter-category1-item1" aria-hidden="true">Item 1</label>
                    </div>
                  </li>
                  <li class="glue-filter__category-item">
                    <div class="glue-mwc3-checkbox">
                      <md-checkbox id="filter-category1-item2" name="filter-category1-item2" touch-target="wrapper"
                          value="item2" aria-label="Item 2" tabindex="0"></md-checkbox>
                      <label for="filter-category1-item2" aria-hidden="true">Item 2</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Filter category with radios -->
          <div class="glue-expansion-panel">
            <h3 class="glue-expansion-panel__toggle">
              <span class="glue-expansion-panel__button" id="filter-toggle-category2"
                  data-glue-expansion-panel-toggle-for="filter-panel-category2">
                <span class="glue-expansion-panel__header-text"
                    id="filter-category2-label">Category 2</span>
                <svg role="presentation" aria-hidden="true"
                    class="glue-icon glue-expansion-panel__header-arrow">
                  <use href="/path/to/glue-icons.svg#expand-more"></use>
                </svg>
              </span>
            </h3>
            <div class="glue-expansion-panel__content" id="filter-panel-category2">
              <div>
                <ul class="glue-filter__category glue-no-bullet"
                    data-glue-filter-category="category2" role="list"
                    aria-controls="filter-results" aria-labelledby="filter-category2-label">
                  <li class="glue-filter__category-item">
                    <div class="glue-mwc3-radio">
                      <md-radio id="filter-category2-itemA" name="filter-category2" touch-target="wrapper"
                          value="itemA" aria-label="Item A"></md-radio>
                      <label for="filter-category2-itemA" aria-hidden="true">Item A</label>
                    </div>
                  </li>
                  <li class="glue-filter__category-item">
                    <div class="glue-mwc3-radio">
                      <md-radio id="filter-category2-itemB" name="filter-category2" touch-target="wrapper"
                          value="itemB" aria-label="Item B"></md-radio>
                      <label for="filter-category2-itemB" aria-hidden="true">Item B</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Additional filter categories as needed -->
        </div>

        <!-- Modal controls -->
        <div class="glue-filter__modal-controls">
          <button class="glue-button glue-button--low-emphasis glue-filter__reset-all">
            Clear filters
          </button>
          <button class="glue-button glue-button--high-emphasis glue-filter__show-results">
            Show <span class="glue-filter__results-count"></span> results
          </button>
        </div>

        <button class="glue-modal__close-btn" title="Close the modal"
            tabindex="0" aria-label="Close the modal"></button>
      </div>
    </div>
  </div>

  <!-- Results column -->
  <div class="glue-filter__results glue-grid__col glue-grid__col--span-9 glue-grid__col--span-12-md"
      data-glue-filter-categories="category1 category2">
    <output class="glue-filter__results-status" aria-live="polite" aria-atomic="true">
      <span class="glue-filter__results-count"></span> results
    </output>

    <!-- Cards appear in a nested grid; see Cards documentation for more layout options -->
    <ul class="glue-cards glue-grid">
      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item1 item2" data-glue-filter-category2="itemA">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 1 Title</p>
              <p class="glue-card__description">Card 1 content.</p>
            </div>
          </div>
        </a>
      </li>

      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item2" data-glue-filter-category2="itemB">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 2 Title</p>
              <p class="glue-card__description">Card 2 content.</p>
            </div>
          </div>
        </a>
      </li>

      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item1" data-glue-filter-category2="itemA">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 3 Title</p>
              <p class="glue-card__description">Card 3 content.</p>
            </div>
          </div>
        </a>
      </li>

      <!-- Additional results as needed -->
    </ul>
  </div>
</div>
```

**Accessibility**

-   See
    [Modal accessibility](/docs/components/modal.md)
    for more details on modal accessibility and labelling
-   See
    [Expansion Panels accessibility](/docs/components/expansion-panels.md)
    for more details on panels accessibility and labelling
-   See
    [Checkbox accessibility](/docs/components/checkbox.md)
    for more details on checkbox accessibility and labelling
-   See
    [Radio accessibility](/docs/components/radio.md)
    for more details on radio accessibility and labelling
-   Include an additional `<output>` element with `aria-live` in the modal so it
    will be announced when the modal is open.
-   Include `tabindex="0"` on `md-checkbox` elements so that they can be focused
    when their expansion panel is expanded.

#### MWS layout/horizontal dropdowns

The horizontal dropdowns layouts supports up to four filter categories using the
Material Select pattern and is more compact than the vertical layout. If more
categories are included or a category needs to be multi-select, the vertical
layout should be used instead.

Chips are not currently recommended for single-select dropdowns. Glue is looking
into adding multi-select dropdowns in the future with a possible Material update
and would support chips for that use case.

Adjust heading level to match your content structure.

```html
<div class="glue-filter glue-filter--mws glue-mwc3" id="my-filter">
  <h2 class="glue-headline glue-headline--headline-6 glue-filter__filter-title">Filter by:</h2>

  <!-- Filter categories (up to 4) -->
  <div class="glue-filter__categories glue-grid">
    <div class="glue-grid__col glue-grid__col--span-3">
      <!-- Filter category 1 -->
      <div class="glue-filter__category" data-glue-filter-category="category1">
        <div class="glue-mwc3-select">
          <md-outlined-select menu-positioning="absolute" label="Category 1" id="filter-category1"
              name="filter-category1" aria-controls="filter-results">
            <md-select-option aria-label="blank"></md-select-option>
            <md-select-option value="item1">
              <div slot="headline">Item 1</div>
            </md-select-option>
            <md-select-option value="item2">
              <div slot="headline">Item 2</div>
            </md-select-option>
          </md-outlined-select>
        </div>
      </div>
    </div>

    <div class="glue-grid__col glue-grid__col--span-3">
      <!-- Filter category 2 -->
      <div class="glue-filter__category" data-glue-filter-category="category2">

        <div class="glue-mwc3-select">
          <md-outlined-select menu-positioning="absolute" label="Category 2" id="filter-category2"
              name="filter-category2" aria-controls="filter-results">
            <md-select-option aria-label="blank"></md-select-option>
            <md-select-option value="itemA">
              <div slot="headline">Item A</div>
            </md-select-option>
            <md-select-option value="itemB">
              <div slot="headline">Item B</div>
            </md-select-option>
          </md-outlined-select>
        </div>
      </div>
    </div>

    <!-- Additional filter categories as needed, up to 4 total -->
  </div>

  <div class="glue-filter__filter-controls">
    <button class="glue-button glue-button--low-emphasis glue-filter__reset-all">
      Clear filters
    </button>
  </div>

  <!-- Results -->
  <div class="glue-filter__results" data-glue-filter-categories="category1 category2"
      id="filter-results">
    <output class="glue-filter__results-status" aria-live="polite" aria-atomic="true">
      <span class="glue-filter__results-count"></span> results
    </output>

    <!-- Cards appear in a grid; see Cards documentation for more layout options -->
    <ul class="glue-grid glue-cards">
      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item2" data-glue-filter-category2="itemA">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 1 Title</p>
              <p class="glue-card__description">Card 1 content.</p>
            </div>
          </div>
        </a>
      </li>

      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item2" data-glue-filter-category2="itemB">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 2 Title</p>
              <p class="glue-card__description">Card 2 content.</p>
            </div>
          </div>
        </a>
      </li>

      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item1" data-glue-filter-category2="itemA">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 3 Title</p>
              <p class="glue-card__description">Card 3 content.</p>
            </div>
          </div>
        </a>
      </li>

      <!-- Additional results as needed -->
    </ul>
  </div>
</div>
```

**Accessibility**

-   See
    [Select accessibility](/docs/components/select.md)
    for more details on select/dropdown accessibility and labelling

#### MWS layout/horizontal chips

The horizontal chips layout is the most compact layout and supports a single
multi-select filter category, which are displayed as chips. If more categories
are included or a category should be single-select, the dropdown or vertical
layouts should be used instead.

The category inputs are hidden (visually and from screen readers) so that the
chips bar serves as the primary method of interaction.

Adjust heading level to match your content structure.

```html
<div class="glue-filter glue-filter--mws" id="my-filter">
  <div class="glue-filter__categories glue-visually-hidden" aria-hidden="true">
    <!-- Only 1 category is allowed in this layout -->
    <ul class="glue-filter__category glue-no-bullet" data-glue-filter-category="category1" role="list">
      <li>
        <input class="glue-filter__category-item" type="checkbox" id="filter-item1"
            value="item1" tabindex="-1">
        <label for="filter-item1" tabindex="-1">Item 1</label>
      </li>
      <li>
        <input class="glue-filter__category-item" type="checkbox" id="filter-item2"
            value="item2" tabindex="-1">
        <label for="filter-item2" tabindex="-1">Item 2</label>
      </li>
    </ul>
  </div>

  <div class="glue-filter__chips-bar">
    <h2 class="glue-filter__chips-header glue-headline glue-headline--headline-6">
      Filter by CategoryName:
    </h2>
    <div class="glue-filter__chips glue-filter__chips--primary" role="grid"
        aria-label="Applied filters"
        data-glue-filter-chips-label-add="Add filter"
        data-glue-filter-chips-label-remove="Remove filter">
      <!-- Chip content is populated by Glue Filter on initialization -->
    </div>
    <button class="glue-button glue-button--low-emphasis glue-filter__reset-all glue-filter__chip">
      Clear filters
    </button>
  </div>

  <div class="glue-filter__results" data-glue-filter-categories="category1"
      id="filter-results">
    <output class="glue-filter__results-status" aria-live="polite" aria-atomic="true">
      <span class="glue-filter__results-count"></span> results
    </output>

    <!-- Cards appear in a grid -->
    <ul class="glue-grid glue-cards">
      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item1 item2">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 1 Title</p>
              <p class="glue-card__description">Card 1 content.</p>
            </div>
          </div>
        </a>
      </li>

      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item2">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 2 Title</p>
              <p class="glue-card__description">Card 2 content.</p>
            </div>
          </div>
        </a>
      </li>

      <li class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-6-md glue-filter__result"
          data-glue-filter-category1="item1">
        <a class="glue-card" href="#">
          <div class="glue-card__inner">
            <div class="glue-card__content">
              <p class="glue-label">Results</p>
              <p class="glue-headline glue-headline--headline-5">Card 3 Title</p>
              <p class="glue-card__description">Card 3 content.</p>
            </div>
          </div>
        </a>
      </li>

      <!-- Additional results as needed -->
    </ul>
  </div>
</div>
```

**Accessibility**

-   Hide the filter inputs from visual and screen reader view by adding class
    `glue-visually-hidden` and `aria-hidden="true"` to the categories container
    and setting `tabindex="-1"` on all inputs and their labels.
    -   The labels themselves are still required as they populate chips content.
-   Update the chips container `aria-label` and `data-glue-filter-chips-label`
    with appropriate values.

### TS initialization

Filter will initialize expansion panels, modal, and/or Material components
used within it, so you only need to initialize Filter itself.

```ts
import {Filter, FilterStateManager} from '@google/glue';

const filterEl = document.querySelector<HTMLElement>('.glue-filter');
if (filterEl) new Filter(filterEl);
```


## Public Methods

Method               | Description
-------------------- | -----------
`getFilteredItems()` | Returns a list items that matches all the filters.
`reset(filterId)`    | Resets all filters if no filterId is specified, or a single filter if it is.
`destroy()`          | Destroys the instance of the filter component.
`getStateManager()`  | Gets the StateManager for the filter data.

## Variations

### Reset button

If you include a button with class `glue-filter__reset-all` within the
`glue-filter` container, Filter will initialize it as a reset all button. Note
that all MWS layouts include a reset button in their standard template,
typically after the filter list, which should be followed to match design
placement.

These buttons do not display unless at least one filter option is active. This
is because toggling the reset button won't change results if no filters are
active, which may confuse users.

```html
<!-- Additional stand-alone reset button -->
<button class="glue-filter__reset-all my-reset-button">
  Clear filters
<button>
```

You can manually create your own reset buttons, and configure them to either
reset an individual category, or all categories at once, with the provided
`reset()` method.

Use [Glue button classes](/docs/components/buttons.md) for
additional styling as needed. Since clearing filters is usually a secondary
action, it should not use the high-emphasis style, but whether it uses
medium-emphasis, low-emphasis, or tonal style is up to your content
architecture.

If you want to hide the buttons when no filters are active, you'll need to
listen to filter changes and add/remove styles appropriately.

```html
<!-- Custom reset buttons -->
<button id="reset-category1">Reset category 1</button>
<button id="reset-all-categories">Reset all categories</button>
```

```ts
const filterEl = document.querySelector<HTMLElement>('.glue-filter');
const filter = new Filter(filterEl);

// Reset single category
document.querySelector<HTMLElement>('#reset-category1')
    ?.addEventListener('click', () => {
      filter.reset('category1');
    });

// Reset all categories
document.querySelector<HTMLElement>('#reset-all-categories')
    ?.addEventListener('click', () => {
      filter.reset();
    });
```

### Matching strategy

Multiple filter categories are supported. By default, filters are set to
`strict` (strict-match), meaning that results must match the active filters in
all categories to be displayed. On the opposite, you can set the filters to use
`loose` (loose-match), meaning that results can match ANY of the active filters
between categories. To do that, simply add following attribute to
`data-glue-filter-result` element.

```html
<div class="glue-filter__results" data-glue-filter-strategy="loose">
  ...
</div>
```

## Custom interactions

Use Filter's `stateManager` to update an individual filter's state, listen to,
or react to its changes.

```ts
// Import Filter StateManager and create an instance
const filter = new Filter(filterEl);
const stateManager = filter.getStateManager();

// Get a specific data model based on filter category, which you set in the HTML
const model = stateManager.getModel('category1');

// Set a new value to the filter, which will update the results automatically.
if (model) model.data['item1'] = true;

// Subscribe to a filter category item. Callback will be triggered when the value changes.
model?.listen('item1', () => {
  console.log('Item 1 value changed!');
});
```

## Accessibility

See individual layouts for specific accessibility notes. These notes apply to
all uses of Filter.

-   Add `role="list"` to lists whenever `glue-no-bullet` class is used so that
    screen readers correctly identify it as a list.
-   `aria-hidden` attribute is automatically added to result elements when they
    are not showing.
-   Filter results count is placed inside of an `output` with `aria-live` and
    `aria-atomic` properties, so that it is read whenever filter results are
    changed.

## Variation demos

-   [Basic / Unstyled](https://28-0-dot-glue-demo.appspot.com/components/filter/unstyled)
-   [MWS / vertical / expansion panels](https://28-0-dot-glue-demo.appspot.com/components/filter/mwc3-vertical)
-   [MWS / horizontal / dropdowns](https://28-0-dot-glue-demo.appspot.com/components/filter/mwc3-horizontal-dropdown)
-   [MWS / horizontal / chips](https://28-0-dot-glue-demo.appspot.com/components/filter/mws-horizontal-chips)
