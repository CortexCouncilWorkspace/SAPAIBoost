# Copy

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-06-20' }
*-->



-   **Category**: TypeScript

**Synonyms:** Clipboard

Copies content from input box to the clipboard. This component is used in the
Glue social component. The copy component is not related to typography or
copywriting.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BCopy%5D)**

**[TS SOURCE](/src/copy/index.ts)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/copy/base"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/copy/base)

## Features

-   Copies content from input box to the clipboard.
-   Displays a success message if the copy command is executed successfully.
-   Displays a failure message if the copy command is not executed successfully
    or is not supported by the browser.

## Setup

### SCSS

The copy component does not currently have any styles associated with it. When
it is used as part of another Glue component (such as social), that component
adds its own styles to it.

If you wish to use the copy component as a stand-alone element you will need to
add your own styles to it.

### HTML

```html
<div class="glue-copy"
    glue-copy-success="COPIED TO CLIPBOARD"
    glue-copy-fail="Press Ctrl+C or ⌘+C to copy">
  <input class="glue-copy-value" type="text" value="www.google.com" aria-label="URL" readonly>
  <button class="glue-copy-button" aria-live="polite">Copy above text to clipboard</button>
</div>
```

### TS initialization

```ts
import {Copy} from '@google/glue';

const copyEl = document.querySelector<HTMLElement>('.glue-copy');
if (copyEl) new Copy(copyEl);
```


## Constructor Options

Set the following options to indicate a successful or failed copy in the markup
(see [example HTML](#html).) These strings should be included in your
localization flow.

Name                | Type   | Default Value               | Description
------------------- | ------ | --------------------------- | -----------
`glue-copy-success` | string | COPIED TO CLIPBOARD         | Indicates success.
`glue-copy-fail`    | string | Press Ctrl+C or ⌘+C to copy | Indicates failure.

## Public Methods

You can use the following methods to interact with the copy component.

Method      | Description
----------- | ---------------------------------------------------------------
`reset()`   | Resets the Copy component.
`destroy()` | Removes all the event listeners attached to the copy component.

## Accessibility

-   `aria-live="polite"` is set on the copy button, so it reads out either the
    `glue-copy-success` or `glue-copy-fail` message when the user toggles the
    copy button, depending on how it is handled. For the failure message, it
    suggests alternative methods of copying the text input.
-   `readonly` is set on the text input so that users cannot accidentally change
    its value.
-   `aria-label="URL"` is set on the text input to indicate what it contains to
    screen readers. This label can be customized to match your content and
    context.
