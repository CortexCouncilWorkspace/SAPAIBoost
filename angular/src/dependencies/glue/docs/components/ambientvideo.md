# Ambient Video Player

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-09-13' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Video, Player

Displays small less than 10 seconds ambient video and allows users to play and
pause the video.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BAmbientVideo%5D)**

**[TS SOURCE](/src/ambientvideo/index.ts)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/ambientvideo/ambientvideo-dark"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/ambientvideo/ambientvideo-dark)

## Features

-   Provides light / dark theme for play/pause button.
-   Allows multiple ambient videos on single page.
-   Plays in loop and mute.

## Setup

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components
@use '@google/glue/dist/ambientvideo';

// Import Glue layout overrides
```


### HTML

Create a simple ambient video player with a trigger button for play and pause of
the video.

```html
<div class="glue-ambient-video">
  <video class="glue-ambient-video__container" muted="true" loop="true" playsinline preload="auto">
    <source src="video.mp4" type="video/mp4">
  </video>
  <div class="glue-ambient-video__button glue-ambient-video__button--paused">
    <div class="glue-ambient-video__tooltip">
      <span class="glue-ambient-video__tooltip-play glue-label">play silent looping video</span>
      <span class="glue-ambient-video__tooltip-pause glue-label">pause silent looping video</span>
    </div>
    <div class="glue-ambient-video__icon">
      <svg role="presentation" aria-hidden="true" focusable="false">
        <use class="glue-ambient-video__icon-play" href="/public/icons/glue-icons.svg#play-button"></use>
        <use class="glue-ambient-video__icon-pause" href="/public/icons/glue-icons.svg#pause-button"></use>
      </svg>
    </div>
  </div>
</div>
```

### TS initialization

```ts
import {AmbientVideo} from '@google/glue';

const ambientvideo = document.querySelector<HTMLElement>('.glue-ambient-video')
if (ambientvideo) new AmbientVideo(ambientvideo);
```



## Public Methods

Method         | Description                 | Return
-------------- | --------------------------- | ------
`playVideo()`  | Play the ambient video.     | void
`pauseVideo()` | Pause the ambient video.    | void
`destroy()`    | Remove all event listeners. | void

## Accessibility

-   When focusing on the play/pause button, the screen reader announces the text
    of the tooltip.
-   Reference:
    [WAI-ARIA best practices](https://www.w3.org/WAI/WCAG21/quickref/#pause-stop-hide)

## Variations

### Ambient Video Controls Dark

The dark theme is the default. Apply the class `.glue-ambient-video` to the
Ambient video root element to display dark controls.

```html
<div class="glue-ambient-video">...</div>
```

### Ambient Video Controls Light

Apply the class .glue-ambient-video and `.glue-ambient-video--light` to the
Ambient video root element to display light controls.

```html
<div class="glue-ambient-video glue-ambient-video--light">...</div>
```

## Variation Demos

-   [Ambient video dark](https://28-0-dot-glue-demo.appspot.com/components/ambientvideo/ambientvideo-dark)
-   [Ambient video light](https://28-0-dot-glue-demo.appspot.com/components/ambientvideo/ambientvideo-light)
