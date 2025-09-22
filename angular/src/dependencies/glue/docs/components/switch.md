# Switch

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-23' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript
-   **Category**: Material

**Synonyms:** Selection, Toggle

Switches are a specific variant of checkbox that are used to toggle a single
setting on or off.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BSwitch%5D)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/forms/)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/switch"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/switch)

## References

**Material**

-   [Material Web Catalog](https://material-web.dev/components/switch/)
-   [Material Web Implementation](https://github.com/material-components/material-web/blob/main/docs/components/switch.md)

**Related Components**

-   [Forms](/docs/components/forms.md)
-   [Checkboxes](/docs/components/checkbox.md)
-   [Radios](/docs/components/radio.md)

## Setup

This component is based off of Material 3. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### TS

Import from Material source.

```ts
import '@material/web/switch/switch';
```


### HTML

Glue switches should be placed in a `glue-mwc3`
[container element](/docs/getting-started/material.md).

```html
<body class="glue-body glue-mwc3">
  <!-- Default off -->
  <div class="glue-mwc3-switch">
    <md-switch id="switch-1" name="switch-1" touch-target="wrapper"
        aria-label="Switch 1 label" value="switch1Value"></md-switch>
    <label for="switch-1" aria-hidden="true">Switch 1 label</label>
  </div>

  <!-- Default on -->
  <div class="glue-mwc3-switch">
    <md-switch id="switch-2" name="switch-2" touch-target="wrapper"
        aria-label="Switch 2 label" value="switch2Value" selected></md-switch>
    <label for="switch-2" aria-hidden="true">Switch 2 label</label>
  </div>

  <!-- Disabled -->
  <div class="glue-mwc3-switch">
    <md-switch id="switch-3" name="switch-3" touch-target="wrapper"
        aria-label="Switch 3 label" value="switch3Value" disabled></md-switch>
    <label for="switch-3" aria-hidden="true">Switch 3 label</label>
  </div>
</body>
```

All switches require a descriptive `aria-label`. An additional visual `label`
can be placed either before or after the switch, depending on your content
setup.

Refer to [Glue Form](/docs/components/forms.md) for
information about adding switches to a data collection form layout, including
information on side-by-side and stacked group layouts.

### Accessibility

-   All switches need a descriptive label set with `aria-label`. You can also
    set a visible label with `label`, which provides an additional click/tap
    target for the switches. It is linked to the switches with the `for`
    attribute. This label should have `aria-hidden` set so that screen readers
    do not read the labels twice.
-   The `aria-label` can be more descriptive than the visual `label`, but be
    aware this may cause confusion for users who rely on both.

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
-   [Radios](/docs/components/radio.md)

### Setup (deprecated) {.no-toc}

#### Material (deprecated) {.no-toc}

This component is based off of Material Components for the web, using Material
v9. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

#### HTML (deprecated) {.no-toc}

```html
<div class="mdc-form-field">
  <div class="mdc-switch glue-switch">
    <div class="mdc-switch__track"></div>
    <div class="mdc-switch__thumb-underlay">
      <div class="mdc-switch__thumb"></div>
      <input type="checkbox" id="myswitch" name="myswitch"
          class="mdc-switch__native-control" role="switch"
          aria-checked="false">
    </div>
  </div>
  <label for="myswitch">Label for switch</label>
</div>
```

See [Glue Form](/docs/components/forms.md) for information
about adding switches to a data collection form layout, including information on
side-by-side and stacked group layouts.

#### TS initialization (deprecated) {.no-toc}

```ts
const materialSwitches = [].map.call(
    document.querySelectorAll<HTMLElement>('.mdc-switch'),
    (el: HTMLElement) => {
      const materialSwitch = new mdc.switchControl.MDCSwitch(el);
    });
```

### Variations (deprecated) {.no-toc}

#### Default checked (deprecated) {.no-toc}

If you want the switch to initially render as selected, set the `checked` and
`aria-checked` properties on the input, and add the `mdc-switch--checked` class
to the root element.

```html
<div class="mdc-form-field">
  <div class="mdc-switch mdc-switch--checked glue-switch">
    <div class="mdc-switch__track"></div>
    <div class="mdc-switch__thumb-underlay">
      <div class="mdc-switch__thumb"></div>
      <input type="checkbox" id="myswitch" name="myswitch"
          class="mdc-switch__native-control" role="switch"
          aria-checked="true" checked="checked">
    </div>
  </div>
  <label for="myswitch">Label for switch</label>
</div>
```

#### Input after label (deprecated) {.no-toc}

Usually the input is displayed before the label (horizontally), but you can set
the input to display after the label by adding class
`mdc-form-field--align-end`.

```html
<div class="mdc-form-field mdc-form-field--align-end">
  <div class="mdc-switch glue-switch">
    <div class="mdc-switch__track"></div>
    <div class="mdc-switch__thumb-underlay">
      <div class="mdc-switch__thumb"></div>
      <input type="checkbox" id="myswitch" name="myswitch"
          class="mdc-switch__native-control" role="switch"
          aria-checked="false">
    </div>
  </div>
  <label for="myswitch">Label for switch</label>
</div>
```

#### Disabled (deprecated) {.no-toc}

To disable a switch, set the `disabled` property on the input and add class
`mdc-switch--disabled` to the root element.

```html
<div class="mdc-form-field">
  <div class="mdc-switch mdc-switch--disabled glue-switch">
    <div class="mdc-switch__track"></div>
    <div class="mdc-switch__thumb-underlay">
      <div class="mdc-switch__thumb"></div>
      <input type="checkbox" id="myswitch" name="myswitch"
          class="mdc-switch__native-control" role="switch"
          aria-checked="false" disabled="disabled">
    </div>
  </div>
  <label for="myswitch">Label for switch</label>
</div>
```

### Accessibility (deprecated) {.no-toc}

-   Switch's Material v9.0.0 implementation is an older model following the
    checkbox pattern. As such it is not fully compliant with the latest WAI-ARIA
    guidelines.
-   All switches should have a descriptive label associated with it. This label
    also functions as a click/tap target for the switch. The label may be hidden
    visually with a modifier class but should remain accessible to screen
    readers.
-   All switches should have a unique id and name. The label associated with
    that switch should be linked to it via the label's `for` attribute.
-   All switches should include an `aria-checked` property that matches the
    initial state of the switch.
-   Use the native `disabled` property if a switch should be visible but unable
    to be interacted with, along with the class `mdc-switch--disabled` for
    styling when JS is disabled
-   All switches should be wrapped by the `mdc-touch-target-wrapper` class,
    which provides a larger tap target area for touch-enabled devices

### no-JS (deprecated) {.no-toc}

Switch requires JS to be enabled in order to function properly. We provide no-js
styles that make the component look like it is disabled (greyed out, no obvious
interaction cues).

If you have concerns about no-JS users interacting with the component, you may
wish to use a
[checkbox component](/docs/components/checkbox.md) instead,
which uses a different UI pattern but submits the same information through the
form, and which remains functional and styled when JS is not enabled.
