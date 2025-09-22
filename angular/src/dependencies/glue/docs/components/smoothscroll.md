# SmoothScroll

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: TypeScript

Convenience method to create a smooth scroll effect to a DOM element.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BSmoothScroll%5D)**

**[TS SOURCE](/src/smoothscroll/index.ts)**

</section>

## Live Demo

[View demo in the Glue app](https://28-0-dot-glue-demo.appspot.com/components/smoothscroll/jump-link/basic)

Smoothscroll allows an event handler, such as a click, to scroll to a desired
HTML element. The smoothscroll reduces jitters during scrolling when moving
through HTML DOM elements.

## Setup

### TS initialization

```ts
// Only include SmoothScrollOptions if you are customizing the smoothscroll
// by passing configuration options through the constructor
import {SmoothScroll} from '@google/glue';
import {SmoothScrollOptions} from '@google/glue';

const smoothScroll = new SmoothScroll();
```



## API

Config param is an optional parameter.

### Config object variables

Name        | Type       | Default        | Description
----------- | ---------- | -------------- | -----------
`duration`  | `number`   | 600            | The delay in ms.
`offset`    | `position` |                | The page position, specified by x and y coordinates.
`easing`    | `string`   | easeInOutQuart | The type of easing t: be used. Refer to https://easings.net/en
`hash`      | `boolean`  | true           | Set to false hash in URL is different than the element to be scrolled to.
`direction` | `string`   | both           | Scroll can be along 1 axis or both axes. Specify as 'x', 'y', or 'both'.

## Public Methods

| Method         | Params              | Description           | Return
| -------------- | ------------------- | --------------------- | ------
| `scrollToId` | string, SmoothScrollOptions | Scroll the page to target element. | void

## Usage

### Multiple configurations

It is not necessary to create multiple components for different types of
smoothscroll. Simply create one single component, and apply different config
options to be used for each event handler.

```ts
const smoothScroll = new SmoothScroll();

const Config1 = {
  'offset': {
    'x': 1000,
    'y': 0,
  },
  'easing': 'easeInOutQuart',
  'direction': 'both',
}

const handleLinkClick = smoothScroll.scrollToId('id-to-jump-to', Config1);
const link = document.getElementById('#linkId');
link.addEventListener('click', handleLinkClick);

const Config2 = {
  'duration': 1000,
}

const handleLinkClick2 = smoothScroll.scrollToId('id-to-jump-to', Config2);
const link2 = document.getElementById('#linkId2');
link2.addEventListener('click', handleLinkClick2);
```

## Variation demos

-   [Jumplink](https://28-0-dot-glue-demo.appspot.com/components/smoothscroll/jump-link/basic)
-   [Horizontal](https://28-0-dot-glue-demo.appspot.com/components/smoothscroll/horizontal/basic)
