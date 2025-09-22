# Select

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-23' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript
-   **Category**: Material

**Synonyms:** Selection, Drop-down

Select/drop-downs allow the user to choose a single item from a provided list.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BSelect%5D)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/forms/)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/select"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/select)

## References

**Material**

-   [Material Web Catalog](https://material-web.dev/components/select/)
-   [Material Web Implementation](https://github.com/material-components/material-web/blob/main/docs/components/select.md)

**Related Components**

-   [Forms](/docs/components/forms.md)

## Setup

This component is based off of Material 3. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### TS

Import from Material source. You only need to import the type of select you are
using (`filled` or `outlined`) but both versions need to import `select-option`.
You can also import `divider` if using a divider within the select to create
groupings of options.

```ts
import '@material/web/select/filled-select';
import '@material/web/select/outlined-select';
import '@material/web/select/select-option';
// Optional: Import divider to allow option grouping
import '@material/web/divider/divider';
```


### HTML

Glue selects should be placed in a `glue-mwc3`
[container element](/docs/getting-started/material.md).


```html
<body class="glue-body glue-mwc3">
  <!-- Outlined Select -->
  <div class="glue-mwc3-select">
    <md-outlined-select menu-positioning="absolute" label="Outlined select label" id="select-1" name="select-1">
      <md-select-option aria-label="blank"></md-select-option>
      <md-select-option value="option-1">
        <div slot="headline">Option 1</div>
      </md-select-option>
      <md-select-option value="option-2">
        <div slot="headline">Option 2</div>
      </md-select-option>
      <md-select-option value="option-3">
        <div slot="headline">Option 3</div>
      </md-select-option>
    </md-outlined-select>
  </div>

  <!-- Filled Select -->
  <div class="glue-mwc3-select">
    <md-filled-select menu-positioning="absolute" label="Filled select label" id="select-2" name="select-2">
      <md-select-option aria-label="blank"></md-select-option>
      <md-select-option value="option-1">
        <div slot="headline">Option 1</div>
      </md-select-option>
      <md-select-option value="option-2">
        <div slot="headline">Option 2</div>
      </md-select-option>
      <md-select-option value="option-3">
        <div slot="headline">Option 3</div>
      </md-select-option>
    </md-filled-select>
  </div>
</body>
```

Note: `menu-positioning` is set explicitly as `absolute` so that the width of
the menu popup (a relative value) matches that of the parent select container.

Refer to [Glue Form](/docs/components/forms.md) for
information about adding selects to a data collection form layout.

#### Variations

Selects can be customized in numerous different ways.

**Default option**

To set an option as the default value, mark its `md-select-option` as
`selected`.

```html
<div class="glue-mwc3-select">
  <md-outlined-select menu-positioning="absolute" label="Select label" id="select-3" name="select-3">
    <md-select-option value="default-option" selected>
      <div slot="headline">Default option</div>
    </md-select-option>
    ...
  </md-outlined-select>
</div>
```

**Disabled**

To disable a select, set it as `disabled`.

```html
<div class="glue-mwc3-select">
  <md-outlined-select menu-positioning="absolute" label="Select label"
      id="select-4" name="select-4" disabled>
    ...
  </md-outlined-select>
</div>
```

**Persistent Helper Text**

Persistent helper text can be added with `supporting-text` on the parent, to
provide extra context or information.

```html
<div class="glue-mwc3-select">
  <md-outlined-select menu-positioning="absolute" label="Select label"
      id="select-5" name="select-5"
      supporting-text="This helper text will always display below the select.">
    ...
  </md-outlined-select>
</div>
```

**Required**

To mark a select as required, set it as `required`. Note that if the select is
marked as invalid, the error text will display over any persistent helper text.

```html
<div class="glue-mwc3-select">
  <md-outlined-select menu-positioning="absolute" label="Select label"
      id="select-6" name="select-6" required>
    ...
  </md-outlined-select>
</div>
```

Refer to [Glue Form](/docs/components/forms.md)
for more information about validating selects and setting custom error messages.

### Accessibility

-   Selects have a max-width of 320px to aid in usability.
-   If no option is currently selected, the select's label will appear in it.
    Make sure this label is sufficiently descriptive, but not too long that it
    would overflow. If additional context is needed, use persistent helper text.
-   Required selects will automatically have a `*` appended to their label.
    Elsewhere on the page, you should note that `*` fields are required.

## Material 2 setup (deprecated)

Warning: Material 2 components are deprecated and will be removed in a future
version of Glue. Please migrate this component to the Material 3
implementation at your earliest convenience. This documentation is provided as
reference.

### References (deprecated) {.no-toc}

**Material**

-   [Material Design guidelines](https://material.io/develop/web/components/input-controls/checkboxes/)
-   [Material Web Implementation](https://github.com/material-components/material-components-web/tree/v9.0.0/packages/mdc-checkbox)

**Related Components**

-   [Forms](/docs/components/forms.md)

### Setup (deprecated) {.no-toc}

#### Material (deprecated) {.no-toc}

This component is based off of Material Components for the web, using Material
v9. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

#### HTML (deprecated) {.no-toc}

A select includes several parts: a label, a box that displays the current
selection, and an MDC menu element (with an MDC list inside of it) with all the
possible options. We also include a hidden input to capture the value of the
select when a user changes it.

```html
<div class="mdc-select mdc-select--outlined glue-select">
  <input type="hidden" name="myselect">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
      aria-labelledby="label-myselect selectedtext-myselect">
    <span id="selectedtext-myselect" class="mdc-select__selected-text"></span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch">
        <span id="label-myselect" class="mdc-floating-label">
          Label for select
        </span>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected" aria-selected="true"
          data-value="" role="option" aria-setsize="3" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item" data-value="option1" role="option"
          aria-setsize="3" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 1</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="3" aria-posinset="3">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
```

See [Glue Form](/docs/components/forms.md) for information
about adding select to a data collection form layout.

##### aria-setsize and aria-posinset (deprecated) {.no-toc}

Adjust the `aria-setsize` and `aria-posinset` values for each option.

-   `aria-setsize` is the total size of the set, including blank options but not
    separators. It should be the same value for all options.
-   `aria-posinset` is the position of that option in the set. Each option
    should have a different value, incrementing by 1 for each option.

#### TS initialization (deprecated) {.no-toc}

```ts
const materialSelects = [].map.call(
    document.querySelectorAll<HTMLElement>('.mdc-select'),
    (el: HTMLElement) => {
      const materialSelect = new mdc.select.MDCSelect(el);
    });
```

### Variations (deprecated) {.no-toc}

#### Pre-selected option (deprecated) {.no-toc}

If you want one of the options in the list to be preselected, remove the empty
list item and set one of the options as selected instead. You will also need to
set the content of the `mdc-select__selected-text` span to match the text of the
preselected option, and the value of the hidden input to match the `data-value`
of the preselected option.

```html
<div class="mdc-select mdc-select--outlined glue-select">
  <input type="hidden" name="myselect" value="option1">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
      aria-labelledby="label-myselect selectedtext-myselect">
    <span id="selectedtext-myselect" class="mdc-select__selected-text">
      Preselected option
    </span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch">
        <span id="label-myselect" class="mdc-floating-label">
          Label for select
        </span>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected"
          aria-selected="true" data-value="option1" role="option"
          aria-setsize="2" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Preselected option</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="2" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
```

#### Required (deprecated) {.no-toc}

If a select is required, add the `mdc-select--required` class to the root
element and set `required` on the anchor. You will also need to include
validation text to provide a hint to the user in case they try to submit the
form without choosing an option.

The label of a required field will get an asterisk (`*`) appended to it via CSS.

NOTE: This will not prevent a form from submitting if the select value is blank.
You will need to do additional error checking if you want to ensure a value is
set in the select before submitting the form.

```html
<div class="mdc-select mdc-select--outlined mdc-select--required glue-select">
  <input type="hidden" name="myselect">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
      aria-labelledby="label-myselect selectedtext-myselect"
      aria-required="true"
      aria-controls="helpertext-myselect"
      aria-describedby="helpertext-myselect">
    <span id="selectedtext-myselect" class="mdc-select__selected-text"></span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch">
        <span id="label-myselect" class="mdc-floating-label">
          Label for select
        </span>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected" aria-selected="true"
          data-value="" role="option" aria-setsize="3" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item" data-value="option1" role="option"
          aria-setsize="3" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 1</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="3" aria-posinset="3">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
<p class="mdc-select-helper-text mdc-select-helper-text--validation-msg glue-select-helper-text"
    id="helpertext-myselect">
  Please choose an option from the list
</p>
```

#### Helper text / validation text (deprecated) {.no-toc}

You can add helper text that displays below the select to provide supplemental
information. There are two varieties, one that is persistent (always showing)
and one that only appears if the field is considered invalid.

The helper text should be placed after the select container.

##### HTML (deprecated) {.no-toc}

```html
<div class="mdc-select mdc-select--outlined glue-select">
  <input type="hidden" name="myselect">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
      aria-labelledby="label-myselect selectedtext-myselect"
      aria-controls="helpertext-myselect"
      aria-describedby="helpertext-myselect">
    <span id="selectedtext-myselect" class="mdc-select__selected-text"></span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch">
        <span id="label-myselect" class="mdc-floating-label">
          Label for select
        </span>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected" aria-selected="true"
          data-value="" role="option" aria-setsize="3" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item" data-value="option1" role="option"
          aria-setsize="3" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 1</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="3" aria-posinset="3">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
<p class="mdc-select-helper-text mdc-select-helper-text--persistent glue-select-helper-text"
    id="helpertext-myselect">
  Persistent helper text message.
</p>
```

Change the helper-text class `mdc-select-helper-text--persistent` to
`mdc-select-helper-text--validation-msg` if you only want it to show when the
select is considered invalid.

For accessibility support, the `aria-controls` and `aria-describedby` properties
on the selected-text element should match the ID set on the helper-text element.

#### Disabled (deprecated) {.no-toc}

To disable a select, add the `mdc-select--disabled` class to the root element,
set `aria-disabled` on the anchor, and set `disabled="true"` on the hidden
input.

```html
<div class="mdc-select mdc-select--outlined mdc-select--disabled glue-select">
  <input type="hidden" name="myselect" disabled="disabled">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
      aria-labelledby="label-myselect selectedtext-myselect"
      aria-disabled="true">
    <span id="selectedtext-myselect" class="mdc-select__selected-text"></span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch">
        <span id="label-myselect" class="mdc-floating-label">
          Label for select
        </span>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected" aria-selected="true"
          data-value="" role="option" aria-setsize="3" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item" data-value="option1" role="option"
          aria-setsize="3" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 1</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="3" aria-posinset="3">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
```

#### Floating label (deprecated) {.no-toc}

This variant has a label displayed permanently above the input box. If it is
being used within a `.glue-form`, it should be placed inside of a
`.glue-form__element.glue-form__element--label-float` container to ensure proper
spacing. See
[Glue Form](/docs/components/forms.md) for
more details.

If you are using this as a stand-alone element, you will want to put it inside a
container and make any spacing adjustments yourself.

```html
<div class="mdc-select mdc-select--outlined mdc-select--nolabel glue-select"
    id="select-myselect">
  <input type="hidden" name="myselect">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
       aria-expanded="false" aria-labelledby="label-myselect selectedtext-myselect">
    <span class="glue-form__floating-label" id="label-myselect">Label for select</span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <span class="mdc-select__selected-text-container">
      <span id="selectedtext-myselect" class="mdc-select__selected-text"></span>
    </span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected" aria-selected="true"
          data-value="" role="option" aria-setsize="3" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item" data-value="option1" role="option"
          aria-setsize="3" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 1</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="3" aria-posinset="3">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
```

#### Filled style (deprecated) {.no-toc}

The filled style includes a light grey background and a bottom border. It is
more compact than the floating label style, but an overly long label can
overflow the container and wrap, causing it to overlap with the select container
content.

This style can only be applied to text fields and selects, not to textareas. If
you are using both selects and textareas in a form, it is not recommended to use
this style.

```html
<div class="mdc-select mdc-select--filled glue-select">
  <input type="hidden" name="myselect">
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
      aria-labelledby="label-myselect selectedtext-myselect">
    <span class="mdc-select__ripple"></span>
    <span id="selectedtext-myselect" class="mdc-select__selected-text"></span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
      </svg>
    </span>
    <span id="label-myselect" class="mdc-floating-label mdc-floating-label--float-above">
      Label for select
    </span>
    <span class="mdc-line-ripple"></span>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface">
    <ul class="mdc-list" role="listbox">
      <li class="mdc-list-item mdc-list-item--selected" aria-selected="true"
          data-value="" role="option" aria-setsize="3" aria-posinset="1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item" data-value="option1" role="option"
          aria-setsize="3" aria-posinset="2">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 1</span>
      </li>
      <li class="mdc-list-item" data-value="option2" role="option"
          aria-setsize="3" aria-posinset="3">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Option 2</span>
      </li>
    </ul>
  </div>
</div>
```

### Accessibility (deprecated) {.no-toc}

-   Set `role="listbox"` on the `mdc-list` element
-   Set `aria-selected="true"` on whichever list item is initially selected
-   If helper text is included, the `aria-controls` and `aria-describedby`
    properties on the selected-text element should match the ID set on the
    helper-text element.
-   If the select is a required form element, include validation helper text to
    provide an explanation if the select is invalidated (user interacts with the
    select but doesn't chose an option).
    -   Set `aria-required="true"` so screen readers recognize this is required.
-   Set the `mdc-select--disabled` class if a select should be visible but
    unable to be interacted with.

### no-JS (deprecated) {.no-toc}

Select requires JS to be enabled in order to function properly.

If you have concerns about no-JS users interacting with the component, you may
wish to use a more basic `<select>` element instead, although it will not have
Material styles applied.
