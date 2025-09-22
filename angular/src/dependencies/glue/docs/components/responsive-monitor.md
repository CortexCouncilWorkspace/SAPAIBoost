# Responsive Monitor

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



-   **Category**: TypeScript

**Synonyms:** Responsive layout

Pass handler functions when media queries or named breakpoints change so that
you can build responsive UI components and functionality.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BResponsive%20Monitor%5D)**

**[TS SOURCE](/src/responsivemonitor/index.ts)**

</section>

## Features

-   Instances of the `ResponsiveMonitor` class call handler functions when the
    result of a media query changes, or when a
    [CSS-injected named breakpoint](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript)
    is included in a list of strings. They can also call another handler when
    one of the conditions above does not apply anymore.
-   They typically can be used to enable or disable a UI component based on the
    viewport size, ie. creating responsive UI components.

## Setup

### Dependencies

-   SCSS
    -   [Breakpoints](/docs/components/breakpoints.md)

### SCSS

Import the following Glue styles. Breakpoints is a core layout component, and
should be imported before Glue UI components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/breakpoints';

// Import Glue UI components

// Import Glue layout overrides
```


### TS initialization

```ts
import {ResponsiveMonitor} from '@google/glue';
new ResponsiveMonitor();
```

## Constructor Options

[Rules](#viewport-rules) are activated by passing them to the
`ResponsiveMonitor` constructor.

```ts
import {ResponsiveMonitor, RuleSet} from '@google/glue';
new ResponsiveMonitor(rule: RuleSet);
```

You can also pass it an array of [rules](#viewport-rules).

```ts
new ResponsiveMonitor([rule1, rule2, rule3, ...]: RuleSet);
```

### Viewport rules

Viewport changes can be intercepted by specifying rules, which can be either
media query or breakpoint based.

#### Media query rules

```ts
const rule = {
  media: '(min-width: 800px)',
  transform: () => component.start(),
};
```

Here, `component.start()` will be executed immediately if the media query is
already true once the rule is activated. Later on, it will be called **every
time** the media query state switches from false to true.

If you need to call another handler function once the rule becomes false, you
can also optionally set it in the rule. Typically this handler will undo what
was done in the `transform` handler.

```ts
const rule = {
  media: '(min-width: 501px) and (max-width: 800px)',
  transform: () => component.start(),
  revert: () => component.stop(),
};
```

NOTE: The `revert` handler will only be called if the `transform` handler has
been called once previously.

Also, both `transform` and `revert` handlers receive the original
[MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
object as an argument.

```ts
const rule = {
  media: '(min-width: 501px) and (max-width: 800px)',
  transform: (mql) => ...,
  revert: (mql) => ...,
};
```

#### Breakpoint rules

If you have
[named breakpoints](/docs/components/breakpoints.md)
already defined in your stylesheets, you can use them instead of raw media
queries.

```ts
const rule = {
  breakpoint: ['md', 'lg'],
  enter: () => component.start(),
};
```

Here, `component.start()` will be executed immediately if the current breakpoint
is `md` or `lg`. Later on, it will be called **every time** the current
breakpoint changes from one that was not either `md` or `lg` to one of these
values.

Similarly to the `revert` handler of media query rules, you can specify a
`leave` handler that will be called once none of the specified breakpoints is
the current one.

```ts
const rule = {
  breakpoint: ['md', 'lg'],
  enter: () => component.start(),
  leave: () => component.stop(),
};
```

Finally, both `enter` and `leave` handlers receive the current named breakpoint
as an argument.

```ts
const rule = {
  breakpoint: ['md', 'lg'],
  enter: (size) => ...,
  leave: (size) => ...,
};
```

## Public Methods

Method                            | Params                       | Description                                                                 | Return
--------------------------------- | ---------------------------- | --------------------------------------------------------------------------- | ------
`listen`                          | ResponsiveChangeHandler/Rule | Activates a viewport rule, or starts listening to every breakpoint change.  | void
`unlisten`                        | ResponsiveChangeHandler/Rule | Deactivates a viewport rule, or stops listening to every breakpoint change. | void
`destroy`                         |                              | Clears rules and stops listening to all DOM events.                         | void
`getCurrentBreakpoint()`          |                              | Returns the current named breakpoint.                                       | string
`ResponsiveMonitor.getInstance()` |                              | Returns the singleton instance.                                             | ResponsiveMonitor

## Tips

### Singleton

Each `ResponsiveMonitor` instance will attach handlers to the `resize`,
`DOMContentReady` and `orientationchange` DOM events, and creating multiple
instances may bloat the number of handlers. To mitigate that, it is also
possible to retrieve the singleton instance and pass it rules with the
`listen()` method.

```ts
import {ResponsiveMonitor} from '@google/glue';
ResponsiveMonitor.getInstance().listen(rule);
```

The downside is you have to keep references to each of your rules so that you
can deactivate them later with `unlisten()`. This is not needed for a
`ResponsiveMonitor` instance where you simply call `destroy()` to release all
rules automatically.

### Performance and debouncing handlers

Debouncing handler functions assigned to resize events can bring significant
performance enhancements. Use our
[Debounce](/docs/components/debounce.md) class to easily
debounce the handler methods assigned in your rules.

### Listen to media query changes

```ts
// Start a component when the viewport is larger than 600px, otherwise stop it.
new ResponsiveMonitor({
  media: '(min-width: 600px)',
  transform: () => component.start(),
  revert: () => component.stop(),
});
```

### Listen to named breakpoints changes

```ts
// Start a component when the current breakpoint is either 'medium', or 'large', otherwise stop it.
new ResponsiveMonitor({
  breakpoint: ['md', 'lg'],
  enter: () => component.start(),
  leave: () => component.stop(),
});
```

### Listen to every breakpoint change

```ts
const responsiveMonitorInstance = new ResponsiveMonitor();
responsiveMonitorInstance.listen((size) => {
  if (size == 'sm') // ...
  if (size == 'md') // ...
  if (size == 'lg') // ...
  if (size == 'xl') // ...
});
```

### Stop listening to breakpoint changes

A reference to a rule needs to be kept in order to disable it later.

```ts
responsiveMonitorInstance.unlisten(rule);
```

Otherwise, if you created an instance of `ResponsiveMonitor` and don't need it
anymore, you can simply destroy the instance. This will disable all the rules it
was listening to.

```ts
responsiveMonitorInstance.destroy();
```
