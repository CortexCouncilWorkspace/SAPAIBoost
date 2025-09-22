# Debounce

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: TypeScript

**Synonyms:** Callback

Convenience method to create a debounced function.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BDebounce%5D)**

**[TS SOURCE](/src/debounce/index.ts)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/components/debounce/"
        width="100%" height="250" style="border:1px solid #dadce0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/components/debounce/)

## Features

-   Wraps a function and delays its execution every time the debounced function
    is called. This is convenient when attaching callbacks to scroll or resize
    events.

## Setup

### TS Initialization

```ts
import {Debounce} from '@google/glue';
const instance = new Debounce(fn, delay);
instance.debounce();
```


## Constructor Options

Name    | Type       | Description
------- | ---------- | -------------------------
`fn`    | `Function` | The function to debounce.
`delay` | `number`   | The delay in ms.

## Public Methods

| Name       | Description                                                   |
| ---------- | ------------------------------------------------------------- |
`cancel` | Call `cancel()` on the object returned by `glueDebounce()` to stop the internal timer and prevent further execution of the debounced function.
| `debounce` | Execute the debounced function after a delay                  |

## Tips

### Subscribe to a debounced function

Pass a reference to a function and a delay in milliseconds to `new Debounce(fn,
delay)`. It will return a Debounce instance that you can pass directly to an
event subscription method.

```ts
const handleScroll = function() {...};
const instance = new Debounce(handleScroll, 500);
window.addEventListener('scroll', evt => instance.debounce());
```

### Unsubscribe to a debounced function

You need to keep a reference to the debounced function in order to unsubscribe
to an event. Calling its `cancel()` method will also prevent any further
execution if a debounce timer is still ongoing. `cancel()` returns a reference
to the debounced function, so you can pass it directly to an event
unsubscription method.

```ts
const handleScroll = function() {...};
const instance = new Debounce(handleScroll, 500);
window.addEventListener('scroll', evt => instance.debounce());

// Later...
window.removeEventListener('scroll', evt => instance.cancel());
```
