# Text Fields

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-23' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript
-   **Category**: Material

**Synonyms:** Text input, Textarea

Text fields allow users to enter text into an input.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BTextfield%5D)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/forms/)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/textfield"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/mwc3/textfield)

## References

**Material**

-   [Material Web Catalog](https://material-web.dev/components/text-field/)
-   [Material Web Implementation](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md)

**Related Components**

-   [Forms](/docs/components/forms.md)

## Setup

This component is based off of Material 3. Follow the instructions on
[setting up Material](/docs/getting-started/material.md) in
your project if you have not already done so.

### TS

Import from Material source. You only need to import the type of text field you
are using (`filled` or `outlined`).

```ts
import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';
```


### HTML

Glue text fields should be placed in a `glue-mwc3`
[container element](/docs/getting-started/material.md).

```html
<body class="glue-body glue-mwc3">
  <!-- Outlined Text Field (single line) -->
  <div class="glue-mwc3-textfield">
    <md-outlined-text-field label="Text field label" id="textfield-1" name="textfield-1"></md-outlined-text-field>
  </div>

  <!-- Outlined Text Area (multi-line) -->
  <div class="glue-mwc3-textfield">
    <md-outlined-text-field label="Text field label" id="textfield-2" name="textfield-2" type="textarea"></md-outlined-text-field>
  </div>

  <!-- Filled Text Field (single line) -->
  <div class="glue-mwc3-textfield">
    <md-filled-text-field label="Text field label" id="textfield-3" name="textfield-3"></md-filled-text-field>
  </div>

  <!-- Filled Text Area (multi-line) -->
  <div class="glue-mwc3-textfield">
    <md-filled-text-field label="Text field label" id="textfield-4" name="textfield-4" type="textarea"></md-filled-text-field>
  </div>
</body>
```

Refer to [Glue Form](/docs/components/forms.md) for
information about adding text fields to a data collection form layout.

#### Variations

Text fields can be customized in numerous different ways. All of these can be
applied to both single and multi-line text fields.

**Default value**

To set a default value, set the `value` property.

```html
<div class="glue-mwc3-textfield">
  <md-outlined-text-field label="Text field label" id="textfield-1" name="textfield-1" value="Default value"></md-outlined-text-field>
</div>
```

**Disabled**

To disable a select, mark it as `disabled`.

```html
<div class="glue-mwc3-textfield">
  <md-outlined-text-field label="Text field label" id="textfield-1" name="textfield-1" disabled></md-outlined-text-field>
</div>
```

**Persistent helper text**

Persistent helper text can be added with `supporting-text`, to provide extra
context or information.

```html
<div class="glue-mwc3-textfield">
  <md-outlined-text-field label="Text field label" id="textfield-1" name="textfield-1"
      supporting-text="This helper text will always display below the select."></md-outlined-text-field>
</div>
```

**Custom error text**

You can customize the text that appears if a text field is flagged as invalid.
This can provide extra context about how to fill out the field, as the default
browser error message may not be sufficient in all cases. Note that this text
will override any persistent helper text while the field is flagged as invalid.

Refer to [Glue Form](/docs/components/forms.md)
for more information about validating text fields and setting custom error
messages.

**Required**

To mark a text field as required, set it as `required`. You can also include
custom error text.

```html
<div class="glue-mwc3-textfield">
  <md-outlined-text-field label="Text field label" id="textfield-1" name="textfield-1" required></md-outlined-text-field>
</div>
```

**Character limited length**

You can set a character limit, which adds a character count indicator below the
text field.

```html
<div class="glue-mwc3-textfield">
  <md-outlined-text-field label="Text field label" id="textfield-1" name="textfield-1" maxlength="50"></md-outlined-text-field>
</div>
```

### Accessibility

-   Text fields have a max-width of 1200px, so that long-form text areas can be
    made; however, text fields should be bounded by flexible margins or within
    containers to prevent fields from expanding too wide per
    [Material 3 guidelines](https://m3.material.io/components/text-fields/guidelines#7fb524c4-8f1e-45a2-a660-459dc902b3ad).
-   Textareas can specify the initial number of `rows`. You can also use CSS to
    set `width`, `height`, and `resize` to more closely match the type of
    content you expect to be entered.
-   If a text field is empty, its label will appear in it. Make sure this label
    is sufficiently descriptive, but not too long that it would overflow. If
    additional context is needed, use persistent helper text.
-   Required text fields will automatically have a `*` appended to their label.
    Elsewhere on the page, you should note that `*` fields are required.
-   Use the
    [most appropriate input `type`](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md#input-type)
    for the content you want a user to enter; browsers will provide validation
    and adjust virtual keyboard layout for specialized input types like `email`.
-   Even if using the default `text` type, you can provide a more appropriate
    virtual keyboard layout by setting an
    [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
    that matches the expected input.
-   Set
    [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
    properties to hook into a user's autofill settings.

#### Labels

Input labels should be concise but clear in what content the text input is
expected.

If a text field has a specific format for content (such as an email address or
phone number) it can be useful to include that information in the label; at the
very least this information must be included in the field's error validation
message. Although the format can be explained explicitly, it is usually simpler
to provide valid examples instead. For example:

-   As labels
    -   Email (email@example.com)
    -   ZIP code (12345 or 12345-6789)
-   As error/validation messages
    -   Please enter a valid email (such as 'email@example.com')
    -   Please enter a valid ZIP code (such as '12345' or '12345-6789')

Some content may have a general format but does not have explicit conventions,
such as phone number or URL. In those cases, it is often problematic to hold the
user to a specific format, as explaining it can be confusing and people may
follow different conventions. In those cases, you can still provide an example
format, but it is better to not validate by format on the front end, and do
double-checking after data has been entered into the system.

#### Input cues

Inputs have a number ways to provide additional browser rendering cues, such as
for validation or keyboard choice. You can apply a different input type, which
provides multiple cues at one, or individual cues for custom validation
patterns, alternate mobile keyboards, or form autocompletion.

##### Input types

Input type | Usage
---------- | -----
text       | Single line input (default)
textarea   | Multi-line input
number     | Whole-number, incremental input. **NOT RECOMMENDED.** A text input with `inputmode="numeric"` is preferred, with `pattern` matching if there is a suitable format.
tel        | Phone number input. Not browser validated. Mobile keyboard layout may switch to numpad input. If you provide custom validation, make this pattern clear to users.
email      | Email input. Modern browsers will automatically validate on basic pattern. Mobile keyboard layout may adjust.
url        | URL input. Modern browsers will automatically validate, but require including protocol (http(s)://) in the URL, so not recommended. Mobile keyboard layout may adjust.

##### Input modes

[`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
provides a cue to browsers as to which virtual keyboard to provide for each
field. This is especially useful on mobile, where the appropriate layout makes
it much easier for users to enter information. This overrides the keyboard cue
that the input type uses, so only recommended for inputs that are type text.
Commonly used modes are `numeric`, `tel`, and `url`. While you could set mode to
`email`, if a field is already of input type `email`, it will automatically use
the email-specific keyboard.

##### Custom validation

Use `pattern="REGEXPATTERN"` on an input field to define a basic regular
expression that modern browsers will validate against. For example,
`pattern="[0-9\-]*"` will only allow numbers and dashes, which could be useful
for US postal codes.

When using custom validation, make sure to include error text so users
understand why a field is flagged as invalid if they enter the wrong input.

You can also use back-end validation; however, you will need to implement error
handling and validation messaging on your own. This can be useful if you are
targeting older browsers which ignore the `pattern` attribute and do not provide
automatic validation.

##### Autocomplete

You can provide cues for the browser's autocomplete function, which ties into
the user's preconfigured settings and makes it easier to fill out commonly used
fields, such as email or address.

See the list of
[autocomplete settings](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

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

#### Dependencies (deprecated) {.no-toc}

-   SCSS
    -   [Icons](/docs/components/icons.md) (if using form
        validation)

#### Icons (deprecated) {.no-toc}

If you are using form validation, import SVG assets as per the
[icons documentation](/docs/components/icons.md).

#### HTML (deprecated) {.no-toc}

Make sure that the ID on the `input` or `textarea` matches the `for` property of
the associated `label`.

##### Text field (deprecated) {.no-toc}

A text field takes a single line of input.

```html
<label class="mdc-text-field mdc-text-field--outlined glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextfield-label">
        Label for text field
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input class="mdc-text-field__input" name="mytextfield"
      type="text" aria-labelledby="mytextfield-label">
</label>
```

##### Textarea (deprecated) {.no-toc}

A textarea allows for multiple lines of input. Adjust the value of `rows` to
change the height of the field.

```html
<label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextarea-1-label">
        Label for textarea
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <textarea class="mdc-text-field__input" rows="3" name="mytextarea-1"
      aria-labelledby="mytextarea-1-label"></textarea>
</label>
```

#### TS initialization (deprecated) {.no-toc}

```ts
const materialTextfields = [].map.call(
    document.querySelectorAll<HTMLElement>('.mdc-text-field'),
    (el: HTMLElement) => {
      const materialTextfield = new mdc.textField.MDCTextField(el);
    });
```

### Variations (deprecated) {.no-toc}

#### Prefilled content (deprecated) {.no-toc}

You can prefill a text field by setting a value, or prefill a textarea by adding
content inside of it. Add `mdc-floating-label--float-above` to the
floating-label element so it appears above the textfield and leaves space for
the prefilled content.

##### Text Field (deprecated) {.no-toc}

```html
<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--label-floating glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label mdc-floating-label--float-above"
          id="mytextfield-label">
        Label for textfield 2
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input class="mdc-text-field__input" name="mytextfield"
      type="text" aria-labelledby="mytextfield-label"
      value="Prefilled content">
</label>
```

##### Textarea (deprecated) {.no-toc}

Note that any whitespace inside of the textarea will be preserved.

```html
<label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined mdc-text-field--label-floating glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label mdc-floating-label--float-above"
          id="mytextarea-2-label">
        Label for textarea
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <textarea class="mdc-text-field__input" rows="3"
      name="mytextarea-2"
      aria-labelledby="mytextarea-2-label">Prefilled content</textarea>
</label>
```

#### Required or invalid field indicators (deprecated) {.no-toc}

Include extra indicators on required or invalid fields so the user has a strong
indicator when something is wrong. Include validation text to provide a hint to
the user of why the field is considered invalid.

If a textfield is required, add the `glue-text-field--required` class to the
root element and set `required` on the input/textarea.

Note that a `required` textfield will be validated as long as the input is not
empty. A user can enter spaces or other blank characters into the field and the
browser will not flag the field with an error message. If you need more
stringent validation, you should also include [front-end](#custom-validation) or
back-end validation.

The label of a required field will get an asterisk (`*`) appended to it via CSS.

##### Text Field (deprecated) {.no-toc}

Text fields also include an error icon. Update the icon URL to match where
you've saved the [Glue icons](/docs/components/icons.md)
file.

```html
<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon glue-text-field glue-text-field--required">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextfield-label">
        Label for text field
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input class="mdc-text-field__input" name="mytextfield"
      type="text" aria-labelledby="mytextfield-label"
      required="required">
  <svg class="mdc-text-field__icon mdc-text-field__icon--trailing glue-icon"
       role="presentation" aria-hidden="true">
    <use href="/assets/img/glue-icons.svg#error"></use>
  </svg>
</label>
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
      id="mytextfield-helper" aria-hidden="true">
    Validation helper text
  </div>
</div>
```

##### Textarea (deprecated) {.no-toc}

Textareas do not include an icon.

```html
<label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined glue-text-field glue-text-field--required">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextarea-5-label">
        Label for textarea
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <textarea class="mdc-text-field__input" rows="3" name="mytextarea-5"
      aria-labelledby="mytextarea-5-label" required="required"></textarea>
</label>
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
      id="mytextarea-5-helper" aria-hidden="true">
    Validation helper text
  </div>
</div>
```

#### Helper text/ validation text (deprecated) {.no-toc}

You can add helper text that displays below the select to provide supplemental
information. There are two varieties, one that is persistent (always showing)
and one that only appears if the field is considered invalid.

The helper text should be placed after the select container.

##### Text Field (deprecated) {.no-toc}

Helper text goes after the text field.

Change class `mdc-text-field-helper-text--persistent` to
`mdc-text-field-helper-text--validation-msg` to set the helper text to display
only when the input is marked as invalid.

```html
<label class="mdc-text-field mdc-text-field--outlined glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextfield-label">
        Label for textfield 3
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input class="mdc-text-field__input" name="mytextfield"
      type="text" aria-labelledby="mytextfield-label">
</label>
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent"
      id="mytextfield-helper">
    Persistent helper text message.
  </div>
</div>
```

##### Textarea (deprecated) {.no-toc}

```html
<label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextarea-3-label">
        Label for textarea
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <textarea class="mdc-text-field__input" rows="3"
      name="mytextarea-3" aria-labelledby="mytextarea-3-label"></textarea>
</label>
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent"
      id="mytextarea-3-helper">
    Persistent helper text message
  </div>
</div>
```

#### Character limited / Character counter (deprecated) {.no-toc}

You can set a character limit and add a character counter indicator below a text
field or textarea.

##### Text Field (deprecated) {.no-toc}

Set the `maxlength` property on the input and make sure it matches the text in
the character counter.

```html
<label class="mdc-text-field mdc-text-field--outlined glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextfield-label">
        Label for text field
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input class="mdc-text-field__input" name="mytextfield"
  type="text" aria-labelledby="mytextfield-label"
  maxlength="20">
</label>
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-character-counter">0 / 20</div>
</div>
```

##### Textarea (deprecated) {.no-toc}

Set the `maxlength` property on the textarea and make sure it matches the text
in the character counter.

```html
<label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextarea-4-label">
        Label for textarea
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <textarea class="mdc-text-field__input" rows="3"
      name="mytextarea-4" aria-labelledby="mytextarea-4-label"
      maxlength="120"></textarea>
</label>
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-character-counter">0 / 120</div>
</div>
```

#### Disabled (deprecated) {.no-toc}

To disable a text field or textarea, set the `mdc-text-field--disabled` class on
the root element and the `disabled` property on the input/textarea itself.

##### Text Field (deprecated) {.no-toc}

```html
<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--disabled glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextfield-label">
        Label for text field
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input class="mdc-text-field__input" name="mytextfield"
      type="text" aria-labelledby="mytextfield-label"
      disabled="disabled">
</label>
```

##### Textarea (deprecated) {.no-toc}

```html
<label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined mdc-text-field--disabled glue-text-field">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="mytextarea-6-label">
        Label for textarea
      </span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <textarea class="mdc-text-field__input" rows="3"
      name="mytextarea-6" aria-labelledby="mytextarea-6-label"
      disabled="disabled"></textarea>
</label>
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

Update the `aria-labelledby` attribute on the input to match the ID of the span
with the label text.

##### Text Field (deprecated) {.no-toc}

```html
<div class="glue-form__element glue-form__element--label-float">
  <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label glue-text-field">
    <span class="glue-form__floating-label" id="mytextfield-label">Label for text field</span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <input class="mdc-text-field__input" name="textfield-floating-basic" type="text" aria-labelledby="mytextfield-label">
  </label>
</div>
```

##### Textarea (deprecated) {.no-toc}

```html
<div class="glue-form__element glue-form__element--label-float">
  <label class="mdc-text-field mdc-text-field--textarea mdc-text-field--outlined mdc-text-field--no-label glue-text-field">
    <span class="glue-form__floating-label" id="mytextarea-7-label">Label for textarea</span>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <textarea class="mdc-text-field__input" rows="3" name="mytextarea-7" aria-labelledby="mytextarea-7-label"></textarea>
  </label>
</div>
```

#### Filled style (deprecated) {.no-toc}

The filled style includes a light grey background and a bottom border. It is
more compact than the floating label style, but an overly long label can
overflow the container and wrap, causing it to overlap with the input content.
If JS is disabled, the label will not move, also causing an overlap with input
content.

This style can only be applied to text fields, not to textareas. If you are
using both text fields and textareas in a form, it is not recommended to use
this style.

##### Text Field (deprecated) {.no-toc}

```html
<label class="mdc-text-field mdc-text-field--filled glue-text-field">
  <span class="mdc-text-field__ripple"></span>
  <input class="mdc-text-field__input" name="mytextfield"
      type="text" aria-labelledby="mytextfield-label">
  <span class="mdc-floating-label" id="mytextfield-label">
    Label for text field
  </span>
  <span class="mdc-line-ripple"></span>
</label>
```

### Accessibility (deprecated) {.no-toc}

-   Use the most appropriate input `type` for the content you want a user to
    enter; browsers will provide validation and adjust keyboard layout for
    specialized input types like `email`.
-   Set `autocomplete` properties to hook into a user's autofill settings.

#### Labels (deprecated) {.no-toc}

Input labels should be concise but clear in what content the text input is
expected.

If a text field has a specific format for content (such as an email address or
phone number) it can be useful to include that information in the label; at the
very least this information must be included in the field's error validation
message. Although the format can be explained explicitly, it is usually simpler
to provide valid examples instead. For example:

-   As labels
    -   Email (myname@example.com)
    -   ZIP code (12345 or 12345-6789)
-   As error/validation messages
    -   Please enter a valid email (such as 'email@example.com')
    -   Please enter a 5-digit ZIP code
    -   Please enter a valid ZIP code (such as '12345' or '12345-6789')

Some content may have a general format but does not have explicit conventions,
such as phone number or URL. In those cases, it is often problematic to hold the
user to a specific format, as explaining it can be confusing and people may
follow different conventions. In those cases, you can still provide an example
format, but it is better to not validate by format on the front end, and do
double-checking after data has been entered into the system.

#### Input cues (deprecated) {.no-toc}

Inputs have a number ways to provide additional browser rendering cues, such as
for validation or keyboard choice. You can apply a different input type, which
provides multiple cues at one, or individual cues for custom validation
patterns, alternate mobile keyboards, or form autocompletion.

##### Input types (deprecated) {.no-toc}

Input type | Usage
---------- | -----
text       | Default text input.
number     | Whole-number, incremental input. Mobile keyboard layout may switch to numpad input. Can set additional properties like `min` or `max`. Only recommended for strict whole-number value amount (not for general numeric input)
tel        | Phone number input. Not browser validated. Mobile keyboard layout may switch to numpad input. If you provide custom validation, make this pattern clear to users.
email      | Email input. Modern browsers will automatically validate on basic pattern. Mobile keyboard layout may adjust.
url        | URL input. Modern browsers will automatically validate, but require including protocol (http(s)://) in the URL, so not recommended. Mobile keyboard layout may adjust.

##### Input modes (deprecated) {.no-toc}

`inputmode` provides a cue to browsers as to which virtual keyboard to provide
for each field. This is especially useful on mobile, where the appropriate
layout makes it much easier for users to enter information. This overrides the
keyboard cue that the input type uses, so only recommended for inputs that are
type text. Commonly used modes are `numeric`, `tel`, and `url`. While you could
set mode to `email`, if a field is already of input type `email`, it will
automatically use the email-specific keyboard.

##### Custom validation (deprecated) {.no-toc}

Use `pattern="REGEXPATTERN"` on an input field to define a basic regular
expression that modern browsers will validate against. For example,
`pattern="[0-9\-]*"` will only allow numbers and dashes, which could be useful
for postal codes.

When using custom validation, make sure to include validation helper text so
users understand why a field is flagged as invalid if they enter the wrong
input.

You can also use back-end validation; however, you will need to implement error
handling and validation messaging on your own. This can be useful if you are
targeting older browsers which ignore the `pattern` attribute and do not provide
automatic validation.

##### Autocomplete (deprecated) {.no-toc}

You can provide cues for the browser's autocomplete function, which ties into
the user's preconfigured settings and makes it easier to fill out commonly used
fields, such as email or address.

See the list of
[autocomplete settings](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

### no-JS (deprecated) {.no-toc}

Text fields and textareas are semi-functional and semi-styled even when JS is
disabled. Labels will not move above the input when it is focused, which will
cause text overlap to occur. If you are concerned with no-JS users, you should
use the Floating Label style, which will not have this overlap.

Focus states, invalid states, and the character counter will not function when
JS is disabled. Built-in browser validation (such as for required fields or
email/URL fields) will still function normally, and the browser will provide
native hints on these fields if they are flagged as invalid (although only on
the first occurring invalid input).

### Variation demos (deprecated) {.no-toc}

-   [Text Fields](https://28-0-dot-glue-demo.appspot.com/components/material/forms/textfield)
-   [Textareas](https://28-0-dot-glue-demo.appspot.com/components/material/forms/textarea)
