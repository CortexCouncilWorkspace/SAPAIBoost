# Material Radio

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-23' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript
-   **Category**: Material

**Synonyms:** Selection, Toggle

Radios are form inputs with two states — on or off. They are typically used in a
group which allow a user to select only one of the items.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BRadio%5D)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/forms/)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/radio"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/radio)

## References

**Material**

-   [Material Web Catalog](https://material-web.dev/components/radio/)
-   [Material Web Implementation](https://github.com/material-components/material-web/blob/main/docs/components/radio.md)

**Related Components**

-   [Forms](/docs/components/forms.md)
-   [Checkboxes](/docs/components/checkbox.md)
-   [Switches](/docs/components/switch.md)

## Setup

This component is based off of Material 3. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### TS

Import from Material source.

```ts
import '@material/web/radio/radio';
```


### HTML

Glue radios should be placed in a `glue-mwc3`
[container element](/docs/getting-started/material.md).

```html
<body class="glue-body glue-mwc3">
  <!-- Default unchecked -->
  <div class="glue-mwc3-radio">
    <md-radio id="radio-group1-1" name="radio-group1" touch-target="wrapper" value="radio1-1Value"
        aria-label="Radio 1-1"></md-radio>
    <label for="radio-group1-1" aria-hidden="true">Radio 1-1</label>
  </div>

  <!-- Default checked -->
  <div class="glue-mwc3-radio">
    <md-radio id="radio-group1-2" name="radio-group1" touch-target="wrapper" value="radio1-2Value"
        aria-label="Radio 1-2" checked></md-radio>
    <label for="radio-group1-2" aria-hidden="true">Radio 1-2</label>
  </div>

  <!-- Disabled -->
  <div class="glue-mwc3-radio">
    <md-radio id="radio-group2-1" name="radio-group2" touch-target="wrapper" value="radio2-1Value"
        aria-label="Radio 2-1 disabled"></md-radio>
    <label for="radio-group2-1" aria-hidden="true">Radio 2-1</label>
  </div>
</body>
```

All radios require a descriptive `aria-label`. An additional visual `label` can
be placed either before or after the radio, depending on your content setup.

Refer to [Glue Form](/docs/components/forms.md) for
information about adding radios to a data collection form layout, including
information on side-by-side and stacked group layouts.

#### Grouped radios

Radios can be grouped by having each radio share the same `name`. They should be
placed within a container with `role="radiogroup"` and have a label explaining
the grouping.

```html
<div role="radiogroup" aria-labelledby="speakercolor-title">
  <p id="speakercolor-title">Choose a speaker color:</p>
  <ul>
    <li class="glue-mwc3-radio">
      <md-radio id="speakercolor-chalk" name="speakercolor" touch-target="wrapper"
          value="chalk" aria-label="Chalk"></md-radio>
      <label for="speakercolor-chalk" aria-hidden="true">Chalk</label>
    </li>
    <li class="glue-mwc3-radio glue-form__element">
      <md-radio id="speakercolor-charcoal" name="speakercolor" touch-target="wrapper"
          value="charcoal" aria-label="Charcoal"></md-radio>
      <label for="speakercolor-charcoal" aria-hidden="true">Charcoal</label>
    </li>
  </ul>
</div>
```

### Accessibility

-   All radios need a descriptive label set with `aria-label`. You can also set
    a visible label with `label`, which provides an additional click/tap target
    for the radio. It is linked to the radio with the `for` attribute. This
    label should have `aria-hidden` set so that screen readers do not read the
    labels twice.
-   The `aria-label` can be more descriptive than the visual `label`, but be
    aware this may cause confusion for users who rely on both.
-   A group of radio buttons should be placed inside of a container with
    `role="radiogroup"` with a descriptive title set with either `aria-label` or
    by linking to another text element with `aria-labelledby`.

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
-   [Checkboxes](/docs/components/checkbox.md)
-   [Switches](/docs/components/switch.md)

### Setup (deprecated) {.no-toc}

#### Material (deprecated) {.no-toc}

This component is based off of Material Components for the web, using Material
v9. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

#### HTML (deprecated) {.no-toc}

Be sure to associate the radio with its group via the `name` attribute.

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field">
    <div class="mdc-radio mdc-radio--touch glue-radio">
      <input class="mdc-radio__native-control" type="radio"
          id="myradio" name="radiogroup-1">
      <div class="mdc-radio__background">
        <div class="mdc-radio__outer-circle"></div>
        <div class="mdc-radio__inner-circle"></div>
      </div>
      <div class="mdc-radio__ripple"></div>
    </div>
    <label for="myradio">Label for radio</label>
  </div>
</div>
```

See [Glue Form](/docs/components/forms.md) for information
about adding radios to a data collection form layout, including information on
side-by-side and stacked group layouts.

#### JS/TS initialization (deprecated) {.no-toc}

This part is optional, but provides a ripple animation on the input when it is
selected or unselected.

Radios are linked to its parent, Material Form Field. Since a Material Form
Field component can be associated with either a checkbox or a radio button, if
your site includes both, you'll want to do a check before initializing.

```ts
// Use this setup if you only have radios in your form
const materialFormFields = [].map.call(
    document.querySelectorAll<HTMLElement>('.mdc-form-field'),
    (el: HTMLElement) => {
      const materialFormField = new mdc.formField.MDCFormField(el);
      const materialInput = el.querySelector<HTMLElement>('.mdc-radio');
      const materialRadio = new mdc.radio.MDCRadio(materialInput);
      materialFormField.input = materialRadio;
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

If you want the radio to initially render as selected, set the `checked`
property on the input.

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field">
    <div class="mdc-radio mdc-radio--touch glue-radio">
      <input class="mdc-radio__native-control" type="radio"
          id="myradio" name="radiogroup-1"
          checked="checked">
      <div class="mdc-radio__background">
        <div class="mdc-radio__outer-circle"></div>
        <div class="mdc-radio__inner-circle"></div>
      </div>
      <div class="mdc-radio__ripple"></div>
    </div>
    <label for="myradio">Label for radio</label>
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
    <div class="mdc-radio mdc-radio--touch glue-radio">
      <input class="mdc-radio__native-control" type="radio"
          id="myradio" name="radiogroup-1">
      <div class="mdc-radio__background">
        <div class="mdc-radio__outer-circle"></div>
        <div class="mdc-radio__inner-circle"></div>
      </div>
      <div class="mdc-radio__ripple"></div>
    </div>
    <label for="myradio">Label for radio</label>
  </div>
</div>
```

#### Disabled (deprecated) {.no-toc}

To disable a radio, set the `disabled` property on the input and add class
`mdc-radio--disabled` to the root element.

```html
<div class="mdc-touch-target-wrapper">
  <div class="mdc-form-field">
    <div class="mdc-radio mdc-radio--touch mdc-radio--disabled glue-radio">
      <input class="mdc-radio__native-control" type="radio"
          id="myradio" name="radiogroup-1"
          disabled="disabled">
      <div class="mdc-radio__background">
        <div class="mdc-radio__outer-circle"></div>
        <div class="mdc-radio__inner-circle"></div>
      </div>
      <div class="mdc-radio__ripple"></div>
    </div>
    <label for="myradio">Label for radio</label>
  </div>
</div>
```

#### Fieldset (grouping) (deprecated) {.no-toc}

When displaying a series of radios as a group, it is useful to place them inside
of a `fieldset` with a descriptive `legend` explaining what the group is. This
provides extra cues for assistive technologies.

```html
<fieldset class="glue-form__fieldset">
  <legend>
    <p>Choose a Nest Audio speaker color:</p>
  </legend>

  <ul class="glue-form__group">
    <li class="glue-form__element">
      <div class="mdc-touch-target-wrapper">
        <div class="mdc-form-field">
          <div class="mdc-radio mdc-radio--touch glue-radio">
            <input class="mdc-radio__native-control" type="radio"
                id="speaker-color-chalk" name="speaker-color">
            <div class="mdc-radio__background">
              <div class="mdc-radio__outer-circle"></div>
              <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
          </div>
          <label for="speaker-color-chalk">Chalk</label>
        </div>
      </div>
    </li>
    <li class="glue-form__element">
      <div class="mdc-touch-target-wrapper">
        <div class="mdc-form-field">
          <div class="mdc-radio mdc-radio--touch glue-radio">
            <input class="mdc-radio__native-control" type="radio"
                id="speaker-color-charcoal" name="speaker-color">
            <div class="mdc-radio__background">
              <div class="mdc-radio__outer-circle"></div>
              <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
          </div>
          <label for="speaker-color-charcoal">Charcoal</label>
        </div>
      </div>
    </li>
  </ul>
</fieldset>
```

### Accessibility (deprecated) {.no-toc}

-   All radios should have a descriptive label associated with it. This label
    also functions as a click/tap target for the radio. The label may be hidden
    visually with a modifier class but should remain accessible to screen
    readers.
-   All radios should have a unique id. The label associated with that radio
    should be linked to it via the label's `for` attribute.
-   All radios should be wrapped by the `mdc-touch-target-wrapper` class, which
    provides a larger tap target area for touch-enabled devices.
-   Use the native `disabled` property if a radio should be visible but unable
    to be interacted with, along with the class `mdc-radio--disabled` for
    styling when JS is disabled.
-   A group of linked radio buttons should be placed inside of a `fieldset` with
    a descriptive `legend`.
    -   If an option in the group is required to be selected before submitting
        the form, include `required="true"` on each radio button in the group,
        and include a "required" text indicator in the legend.

### no-JS (deprecated) {.no-toc}

Radios are functional and styled even when JS is disabled. If you are concerned
with no-JS users, you should consider radio over other, more complex form inputs
(like Material Switch).
