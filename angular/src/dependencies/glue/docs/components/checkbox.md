# Checkbox

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-23' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript
-   **Category**: Material

**Synonyms:** Selection, Toggle

Checkboxes are form inputs with two states — on or off. They are typically used
in a group which allow a user to select one or more items.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BCheckbox%5D)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/forms/)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/checkbox"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/checkbox)

## References

**Material**

-   [Material Web Catalog](https://material-web.dev/components/checkbox/)
-   [Material Web Implementation](https://github.com/material-components/material-web/blob/main/docs/components/checkbox.md)

**Related Components**

-   [Forms](/docs/components/forms.md)
-   [Radio](/docs/components/radio.md)
-   [Switch](/docs/components/switch.md)

## Setup

This component is based off of Material 3. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### TS

Import from Material source.

```ts
import '@material/web/checkbox/checkbox';
```


### HTML

Glue checkboxes should be placed in a `glue-mwc3`
[container element](/docs/getting-started/material.md).

```html
<body class="glue-body glue-mwc3">
  <!-- Default unchecked -->
  <div class="glue-mwc3-checkbox">
    <md-checkbox id="checkbox-1" name="checkbox-1" touch-target="wrapper"
      aria-label="Checkbox 1 label" value="checkboxValue"></md-checkbox>
    <label for="checkbox-1" aria-hidden="true">Checkbox 1 label</label>
  </div>

  <!-- Default checked -->
  <div class="glue-mwc3-checkbox">
    <md-checkbox id="checkbox-2" name="checkbox-2" touch-target="wrapper"
        aria-label="Checkbox 3 label" value="checkboxValue" checked></md-checkbox>
    <label for="checkbox-2" aria-hidden="true">Checkbox 2 label</label>
  </div>

  <!-- Disabled -->
  <div class="glue-mwc3-checkbox">
    <md-checkbox id="checkbox-3" name="checkbox-3" touch-target="wrapper"
        aria-label="Checkbox 3 label" value="checkboxValue" disabled></md-checkbox>
    <label for="checkbox-3" aria-hidden="true">Checkbox 3 label</label>
  </div>
</body>
```

All checkboxes require a descriptive `aria-label`. An additional visual `label`
can be placed either before or after the checkbox, depending on your content
setup.

Refer to [Glue Form](/docs/components/forms.md) for
information about adding checkboxes to a data collection form layout, including
information on side-by-side and stacked group layouts.

### Accessibility

-   All checkboxes need a descriptive label set with `aria-label`. You can also
    set a visible label with `label`, which provides an additional click/tap
    target for the checkbox. It is linked to the checkbox with the `for`
    attribute. This label should have `aria-hidden` set so that screen readers
    do not read the labels twice.
-   The `aria-label` can be more descriptive than the visual `label`, but be
    aware this may cause confusion for users who rely on both.
-   A group of related checkboxes can be placed inside of a `fieldset` with a
    descriptive `legend`; alternatively, they can be placed in a list so that
    users understand the number of checkboxes are in the group.

## Material 2 setup (deprecated)

Warning: Material 2 components are deprecated and will be removed in a future
version of Glue. Please migrate this component to the Material 3 implementation
at your earliest convenience. This documentation is provided as reference.

### References (deprecated) {.no-toc}

**Material**

-   [Material Design guidelines](https://material.io/develop/web/components/input-controls/checkboxes/)
-   [Material Web Implementation](https://github.com/material-components/material-components-web/tree/v9.0.0/packages/mdc-checkbox)

**Related Components**

-   [Forms](/docs/components/forms.md)
-   [Radio](/docs/components/radio.md)
-   [Switch](/docs/components/switch.md)

### Setup (deprecated) {.no-toc}

#### Material (deprecated) {.no-toc}

This component is based off of Material Components for the web, using Material
v9. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

#### HTML (deprecated) {.no-toc}

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field">
    <div class="mdc-checkbox mdc-checkbox--touch glue-checkbox">
      <input type="checkbox" class="mdc-checkbox__native-control"
          id="mycheckbox" name="mycheckbox">
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
    <label for="mycheckbox">Label for checkbox</label>
  </div>
</div>
```

See [Glue Form](/docs/components/forms.md) for information
about adding checkboxes to a data collection form layout, including information
on side-by-side and stacked group layouts.

#### JS/TS initialization (deprecated) {.no-toc}

This part is optional, but provides a ripple animation on the input when it is
selected or unselected.

Checkboxes are linked to its parent, Material Form Field. Since a Material Form
Field component can be associated with either a checkbox or a radio button, if
your site includes both, you'll want to do a check before initializing.

```ts
// Use this setup if you only have checkboxes in your form
const materialFormFields = [].map.call(
    document.querySelectorAll<HTMLElement>('.mdc-form-field'),
    (el: HTMLElement) => {
      const materialFormField = new mdc.formField.MDCFormField(el);
      const materialInput = el.querySelector<HTMLElement>('.mdc-checkbox');
      const materialCheckbox = new mdc.checkbox.MDCCheckbox(materialInput);
      materialFormField.input = materialCheckbox;
    });

// Use this setup if you have both checkboxes and radios in your form
const materialFormFields = [].map.call(
    document.querySelectorAll<HTMLElement>('.mdc-form-field'),
    (el: HTMLElement) => {
      const materialFormField = new mdc.formField.MDCFormField(el);
      const materialInput = el.children[0];
      if (materialInput.classList.contains('mdc-checkbox')) {
        const materialCheckbox =
            new mdc.checkbox.MDCCheckbox(materialInput);
        materialFormField.input = materialCheckbox;
      } else if (materialInput.classList.contains('mdc-radio')) {
        const materialRadio = new mdc.radio.MDCRadio(materialInput);
        materialFormField.input = materialRadio;
      }
    });
```

### Variations (deprecated) {.no-toc}

#### Default checked (deprecated) {.no-toc}

If you want the checkbox to initially render as checked, set the `checked`
property on the input.

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field">
    <div class="mdc-checkbox mdc-checkbox--touch glue-checkbox">
      <input type="checkbox" class="mdc-checkbox__native-control"
          id="mycheckbox" name="mycheckbox"
          checked="checked">
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
    <label for="mycheckbox">Label for checkbox</label>
  </div>
</div>
```

#### Input after label (deprecated) {.no-toc}

Usually the input is displayed before the label (horizontally), but you can set
the input to display after the label by adding class
`mdc-form-field--align-end`.

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field mdc-form-field--align-end">
    <div class="mdc-checkbox mdc-checkbox--touch glue-checkbox">
      <input type="checkbox" class="mdc-checkbox__native-control"
          id="mycheckbox" name="mycheckbox">
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
    <label for="mycheckbox">Label for checkbox</label>
  </div>
</div>
```

#### Disabled (deprecated) {.no-toc}

To disable a checkbox, set the `disabled` property on the input and add class
`mdc-checkbox--disabled` to the root element.

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field">
    <div class="mdc-checkbox mdc-checkbox--touch mdc-checkbox--disabled glue-checkbox">
      <input type="checkbox" class="mdc-checkbox__native-control"
          id="mycheckbox" name="mycheckbox" disabled="disabled">
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
    <label for="mycheckbox">Label for checkbox</label>
  </div>
```

### Accessibility (deprecated) {.no-toc}

-   All checkboxes should have a descriptive label associated with it. This
    label also functions as a click/tap target for the checkbox. The label may
    be hidden visually with a modifier class but should remain accessible to
    screen readers.
-   All checkboxes should have a unique id and name. The label associated with
    that checkbox should be linked to it via the label's `for` attribute.
-   A group of related checkboxes should be placed inside of a `fieldset` with a
    descriptive `legend`.
-   All checkboxes should be wrapped by the `mdc-touch-target-wrapper` class,
    which provides a larger tap target area for touch-enabled devices
-   Use the native `disabled` property if a checkbox should be visible but
    unable to be interacted with, along with the class `mdc-checkbox--disabled`
    for styling when JS is disabled

### no-JS (deprecated) {.no-toc}

Checkboxes are functional and styled even when JS is disabled. If you are
concerned with no-JS users, you should consider checkbox over other, more
complex form inputs (like Material Switch).
