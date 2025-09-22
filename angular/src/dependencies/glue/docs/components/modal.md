# Modal

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-04-17' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Overlay, dialog box

Shows content in a modal box that appears above a screen overlay.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BModal%5D)**

**[SCSS SOURCE](/src/modal/_index.scss)**

**[TS SOURCE](/src/modal/index.ts)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/modal/"
        width="100%" height="250" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/modal/)

## Features

-   Fire events when modal is opening and closing.
-   Keyboard support

## Setup

### Dependencies

-   SCSS
    -   [Buttons](/docs/components/buttons.md) (if using a
        button to trigger the modal)
    -   [Icons](/docs/components/icons.md) (if using an icon
        button to trigger the modal or video modals)
    -   [Typography](/docs/components/typography.md)

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides. The icon and button styles are only
needed if you are using a `glue-button` as the trigger for the modal.

```scss
// Import Glue core layout components
@use '@google/glue/dist/buttons';
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/modal';

// Import Glue layout overrides
```


### HTML

```html
<div class="glue-modal" aria-labelledby="modal-label"
     aria-describedby="modal-content">
  <h2 id="modal-label" class="glue-headline glue-headline--headline-1">
    Modal title
  </h2>
  <p id="modal-content">
    Modal content.
  </p>
  <!-- This close button is optional -->
  <button class="glue-modal__close-btn" aria-label="Close the modal"></button>
</div>
```

The Modal close button in the HTML snippet is optional, users can implement
their own buttons to close the modal by using the public close method.

```ts
customCloseButton.addEventListener('click', () => {modal.close()})
```

### TS initialization

```ts
import {Modal} from '@google/glue';

const modalEl = document.querySelector<HTMLElement>('.glue-modal');
if (modalEl) new Modal(modalEl, triggerButton);

triggerButton.addEventListener('click', () => {
  modal.open();
});

// Listen to the  open and close event
modalElement.addEventListener('GlueModal:opened', handleOpenModal)
modalElement.addEventListener('GlueModal:closed', handleCloseModal)
```



## Constructor Options

You can set the following arguments to create a modal instance.

`Modal(modalElement, focusAfterClosed, focusFirst)`

Name                    | Type         | Default Value | Description
----------------------- | ------------ | ------------- | -----------
`modalElement`          | HTML Element | undefined     | The modal element.
`focusAfterClosed`      | HTML Element | undefined     | The element to focus after modal is closed.
`focusFirst` (optional) | HTML Element | undefined     | The first element to focus after modal is open.

## Events

Name               | Description
------------------ | -------------------------------------
`GlueModal:opened` | Event is fired when modal is opening.
`GlueModal:closed` | Event is fired when modal is closing.

## Public Methods

| Method                  | Params      | Description                 | Return |
| ----------------------- | ----------- | --------------------------- | ------ |
| `open()`                |             | Open a modal.               | void   |
| `close()`               |             | Close a modal.              | void   |
| `setFocusAfterClosed()` | HTMLElement | Set the focus element after modal is closed. | void |
| `destroy()`             |             | Destroy the modal component.| void   |

## Variations

### Basic Modal

The Basic modals are used for common endpoints like texts, images, and so on.
For codes, see the Variation Demos.

### Video Players

The Video modals are used for showing videos on a larger screen. To watch a
video modal you can click a button or a thumbnail. It is recommended to use a
video modal when the video is too small to fit in the content. For codes, see
the Variation Demos.

See also the [cards component](/docs/components/cards.md) for
card-specific video players.

### Dark theme

Add `glue-modal--dark` class to the `glue-modal` root element to activate the
dark theme.

## Accessibility

### Non-button triggers

Ideally, you would use a button as the trigger, as this provides the necessary
context to the browser and screen readers about expected actions. However, you
may want to set a video thumbnail or other element as the trigger depending on
the layout. To add support for `click` and `keydown` events, including Enter and
Space key presses, add event handlers to process a user's input.

```ts
triggerElem.addEventListener('click', () => {
  modal.open();
});

triggerElem.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter' || e.code === ' ') {
    modal.open();
  }
});
```

If you are not using a button as the trigger element, we recommend adding
`role="button"` to it to make it appear as a button control to a screen reader.
You may also need to include an aria-label to explain what happens when you
toggle it.

```html
<div class="glue-modal__video-container glue-modal__trigger" tabindex="0"
     role="button" aria-label="View the promotional video">
  <img src="/assets/img/promo-video-thumb.jpg" alt="Description of thumbnail">
  <svg aria-hidden="true" class="glue-modal__video--icon glue-icon" role="presentation">
    <use href="/assets/img/glue-icons.svg#video-youtube-black"></use>
  </svg>
</div>
```

### Announce the main content

By default Glue Modal sets focus to the first focusable element when the modal
opens. But if the first focusable element is put after the main content, the
screen reader will not read the content to users. When the content is
significant, [W3 WAI](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
suggests adding `tabindex="-1"` to a static element at the start of the content.
That element will receive focus automatically when the modal opens.
