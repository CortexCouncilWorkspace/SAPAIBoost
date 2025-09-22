# Forms

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-04-12' }
*-->



-   **Category**: SCSS
-   **Category**: Material

**Synonyms:** Data collection, Input

Layouts for data collection forms.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BForm%5D)**

**[SCSS SOURCE](/src/forms/_index.scss)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/form"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/form)

## References

Glue Form provides general layouting for forms, such as spacing. Individual form
components need to be imported individually.

*   [Checkboxes](/docs/components/checkbox.md)
*   [Radios](/docs/components/radio.md)
*   [Select](/docs/components/select.md)
*   [Switches](/docs/components/switch.md)
*   [Textfield](/docs/components/textfield.md)

## Setup

This component includes Material 3 components. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### Dependencies

-   SCSS
    -   [Buttons](/docs/components/buttons.md)
    -   [Grid layout](/docs/components/grid-layout.md)
        -   [Page](/docs/components/page.md)
    -   [Spacers](/docs/components/spacers.md)
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core' as glue-core;
@use '@google/glue/dist/buttons' as glue-buttons;
@use '@google/glue/dist/grids' as glue-grids;
@use '@google/glue/dist/page' as glue-page;
@use '@google/glue/dist/typography' as glue-typography;

// Import Glue UI components
@use '@google/glue/dist/forms' as glue-forms;

// Import Glue MWC3 form elements as needed
@use '@google/glue/dist/mwc3/theme' as glue-mwc3-theme;
@use '@google/glue/dist/mwc3/checkbox' as glue-mwc3-checkbox;
@use '@google/glue/dist/mwc3/radio' as glue-mwc3-radio;

// Imoprt Glue layout overrides
@use '@google/glue/dist/spacers' as glue-spacers;
```


### HTML

A Glue form can either have the `glue-mwc3` class, or be placed in a `glue-mwc3`
[container element](/docs/getting-started/material.md),
depending on your project needs.

A grid is placed inside the form for column layouting. On large and xlarge
viewports the form spans 6 columns (centered), otherwise it is full-width. Some
grid columns are added for additional spacing (both horizontal and vertical).

Break a form into sections for easier parsing. Adjust heading levels to match
your page's DOM structure.

```html
<section class="glue-page">
  <form class="glue-form glue-mwc3" method="get" action="./form-post">
    <div class="glue-grid">
      <div class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-0-md"></div>

      <div class="glue-grid__col glue-grid__col--span-12-md glue-grid__col--span-6">
        <h1 class="glue-headline glue-headline--headline-3">
          Form title
        </h1>
        <p class="glue-spacer-2-top">
          Form description.
        </p>
      </div>

      <div class="glue-grid__col glue-grid__col--span-12 glue-spacer-5-top"></div>

      <div class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-0-md"></div>

      <div class="glue-grid__col glue-grid__col--span-2 glue-grid__col--span-4-md">
        <h2 class="glue-headline glue-headline--headline-5 glue-spacer-1-bottom">
          Form section 1 title
        </h2>
      </div>

      <div class="glue-grid__col glue-grid__col--span-4 glue-grid__col--span-8-md">
        <ul class="glue-form__group">
          <li class="glue-form__element">
            <!-- Form section 1, element 1 -->
          </li>
          <!-- Additional form elements -->
        </ul>
      </div>

      <div class="glue-grid__col glue-grid__col--span-12 glue-spacer-6-top"></div>

      <div class="glue-grid__col glue-grid__col--span-3 glue-grid__col--span-0-md"></div>

      <div class="glue-grid__col glue-grid__col--span-2 glue-grid__col--span-4-md">
        <h2 class="glue-headline glue-headline--headline-5 glue-spacer-1-bottom">
          Form section 2 title
        </h2>
      </div>

      <div class="glue-grid__col glue-grid__col--span-4 glue-grid__col--span-8-md">
        <ul class="glue-form__group">
          <li class="glue-form__element">
            <!-- Form section 2, element 1 -->
          </li>
          <!-- Additional form elements -->
        </ul>
      </div>

      <!-- Additional form sections as needed -->

      <div class="glue-grid__col glue-grid__col--span-9 glue-grid__col--span-12-md">
        <div class="glue-form__submission">
          <button type="submit" class="glue-button glue-button--high-emphasis"
              aria-label="Submit the form">
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</section>
```

## Variations

### "Required" hint text

If any form elements are required, their form labels will have a `*` to denote
this. Include text at the start of the form that explains to the user what the
symbol means.

Adjust the form section title by adding this text:

```html
<div class="glue-grid__col glue-grid__col--span-2 glue-grid__col--span-4-md">
  <div class="glue-grid">
    <div class="glue-grid__col glue-grid__col--span-2 glue-grid__col--span-2-sm glue-grid__col--span-4-md">
      <h2 class="glue-headline glue-headline--headline-5 glue-spacer-1-bottom">
        Form section title
      </h2>
    </div>
    <div class="glue-grid__col glue-grid__col--span-2 glue-grid__col--span-2-sm glue-grid__col--span-4-md glue-grid__col--align-bottom">
      <p class="glue-form__required-note glue-spacer-1-bottom">
        * Required
      </p>
    </div>
  </div>
</div>
```

### Side-by-side inputs

If you have a small collection of inputs, you can arrange them side-by-side to
save on space and to emphasize grouping. You may also want to wrap related
controls in a `fieldset`.

This should only be used with checkboxes, radios, or switches.

```html
<ul class="glue-form__group">
  <li>
    <div class="glue-form__element glue-form__element--sidebyside">
      <!-- code for a form input -->
    </div>
    <div class="glue-form__element glue-form__element--sidebyside">
      <!-- code for a form input -->
    </div>
  </li>
</ul>
```

### Stacked inputs

Alternatively, you might want to stack a collection of inputs to emphasize their
grouping. This is preferred over side-by-side if the labels are too long or if
there are too many inputs to fit comfortably on a single line.

This should only be used with checkboxes, radios, or switches.

```html
<ul class="glue-form__group">
  <li>
    <div class="glue-form__element glue-form__element--stacked">
      <!-- code for a form input -->
    </div>
    <div class="glue-form__element glue-form__element--stacked">
      <!-- code for a form input -->
    </div>
  </li>
</ul>
```

### Fieldset grouping

When displaying a group of related inputs, such as a collection of checkboxes,
place them inside of a `fieldset` with a descriptive `legend`. This provides
extra cues for assistive technologies.

If you are already using a container with `role="radiogroup"`, you do not need
to use `fieldset`.

```html
<fieldset class="glue-form__fieldset">
  <legend>
    <p>Description of this input grouping</p>
  </legend>

  <ul class="glue-form__group">
    <li class="glue-form__element">
      <!-- code for a form input -->
    </li>
    <li class="glue-form__element">
      <!-- code for a form input -->
    </li>
  </ul>
</fieldset>
```

## Validation

Forms can use browser built-in validation (constraint validation) and/or custom
manual validation (either on the front end or back end).

### Checking validity

You can test validity of an individual element with `inputEl.reportValidity()`
or on all the elements in the form at once with `formEl.reportValidity()`, which
uses the browser's built-in error checking and response. At a minimum, run
`formEl.reportValidity()` when the submit button is toggled, as this will clear
any error styling for inputs which are now valid. You can also listen to other
events, such as `focusOut`, to update the input validity immediately after the
user finishes interacting with it. Review the individual components under
[Material 3](https://material-web.dev/about/intro/) for
additional details on their validation methods.

```ts
const myForm = document.querySelector<HTMLFormElement>('#myForm');
const myFormSubmit = myForm.querySelector<HTMLElement>('[type=submit]');
myFormSubmit.onclick = () => {
  myForm.reportValidity();
};
```

### Constraint validation

Constraint validation is the preferred method. It uses built-in
[browser APIs](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
based on the type of input along with any custom cues, such as `pattern`
matching. This validation is done automatically when the user attempts to submit
the form, or manually when you run `reportValidity()`. The form will not allow
submission until all inputs are marked as valid.

### Manual validation

You can manually validate fields on the front end by checking their validity and
toggling their `error` state. On the back end, you can review the `GET` or
`POST` data and send a response back to the form that toggles the appropriate
input `error` states. This allows for precise control over what can be
submitted, as well as how to you show error messages to users, but may be extra
work compared to using the built-in standardized browser APIs.

### Custom error messages

You can set a custom error message for a field to provide a user with more
information about why that field was marked as invalid. This is especially
useful to explain expected formats for inputs using pattern validation.

Set an `error-text` parameter on the element's root, such as:

```html
<md-outlined-text-field label="Zipcode" id="address-zipcode-label" name="address-zipcode-label" pattern="\d{5}(-\d{4})?"
    error-text='Please enter a valid Zipcode (i.e. "12345" or "12345-6789").'></md-outlined-text-field>
```

Set or remove this custom text when testing form fields for their validity
before submitting a form by using `setCustomValidity()`:

```ts
import {MdOutlinedTextField} from '@material/web/textfield/outlined-text-field';

const formSubmitButton = document.getElementById<HTMLButtonElement>('form-submit');
const zipcodeInput = document.getElementById<MdOutlinedTextField>('address-zipcode-label');

formSubmitButton.addEventListener('click', (evt) => {
  // Reset custom text so validity can be re-checked on each submission attempt
  zipcodeInput.setCustomValidity('');
  if (!zipcodeInput.checkValidity()) {
    zipcodeInput.setCustomValidity(zipcodeInput.errorText);
  }
});
```

### Accessibility of error messaging

In cases where multiple fields are marked as invalid when a form submission is
attempted, multiple error messages will be displayed to the user. Screen readers
may have problems announcing this content properly; it may read error content
out-of-order from DOM order, interrupt itself when trying to read multiple error
messages (preventing some messages from being announced), or read a different
error compared to which field is actually focused. If this is a concern for your
site, you should implement a custom validation script. Using `checkValidity`
would allow you to respond to `invalid` events in a more appropriate manner than
the standard `reportValidity` which have a generic behavior. For example, you
could queue `invalid` events to match DOM order, or compile all the error
messages into a single `alert` element to announce to the user.

References:

-   https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
-   https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
-   https://github.com/material-components/material-web/blob/main/docs/components/checkbox.md#methods
-   https://github.com/material-components/material-web/blob/main/docs/components/select.md#methods
-   https://github.com/material-components/material-web/blob/main/docs/components/switch.md#methods
-   https://github.com/material-components/material-web/blob/main/docs/components/text-field.md#validation

## Accessibility

-   To ensure that all form elements have enough space for tap target area, all
    `glue-form__element` components have a min-height of 48px.
-   While you can apply `glue-form__group` and `glue-form__element` to divs
    instead of an unordered list, putting them in a list helps keep the elements
    associated with each other, and allows screen readers to list how many
    elements are in the group.
-   Alternatively, you can use an ordered list for `glue-form__group`. You may
    need to adjust the `start` value if you have multiple lists on a page and
    want elements to be consecutively numbered.
-   Group related elements together and separate them into sections to make it
    easier for a user to quickly parse the form.
-   Ensure that inputs are arranged in a logical DOM order and follow a logical
    tab order.
-   Reset buttons are
    [not recommended](https://webaim.org/techniques/forms/controls#button)
    as they offer little value, and it is easy for users to click on them by
    mistake.
-   Provide explicit text on what the submit button does. For example, on a
    pre-order page, use the text "Submit your pre-order" instead of just
    "Submit". You can also provide a more descriptive aria-label for screen
    readers.

## Material 2 details (deprecated)

Warning: Material 2 components are deprecated and will be removed in a future
version of Glue. Please migrate this component to the Material 3
implementation at your earliest convenience. This documentation is provided as
reference.

### Floating labels (deprecated) {.no-toc}

Warning: Material 3 no longer supports the floating label variant.

[Select](/docs/components/select.md) and
[Textfields](/docs/components/textfield.md) have a floating
label variant in which the label is permanently displayed over the input. For
this to work there needs to be extra spacing around the input to accommodate it.

```html
<ul class="glue-form__group">
  <li class="glue-form__element glue-form__element--label-float">
    <!-- code for a form input -->
  </li>
</ul>
```
