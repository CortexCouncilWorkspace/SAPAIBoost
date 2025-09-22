# YouTube Video Player

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-12-04' }
*-->



-   **Category**: TypeScript

**Synonyms:** Video, Player

Displays video content and allows users to control how they view it. An
implementation of the iFrame YouTube Video player.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BYTVideo%5D)**

**[TS SOURCE](/src/ytvideo/index.ts)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/ytvideo/simple-with-controls"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/ytvideo/simple-with-controls)

## Features

-   Can be configured via JS or markup data attributes
-   Provides basic YT player API functionality
-   Can easily live in a page with multiple other YT players
-   Can update player options after player is instantiated
-   Provides preview elements like title, timestamp and image
-   Supports 3 use cases: inline, modal and cards
-   Provides different styling options for preview elements

## Setup

### Types

Via NPM:

```shell
project-root$ npm add @types/youtube
```


### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';

// Import Glue UI components
@use '@google/glue/dist/ytvideo';

// Import Glue layout overrides
```


### HTML

Create a simple inline video element with data attributes with video ID and
configuration.

```html
<div class="glue-video">
  <div class="glue-video__preview-container glue-video__preview-container--inline">
    <picture class="glue-video__preview">
      <img class="glue-video__preview-image" alt="Video preview image" src="/public/images/cards/card-16x9-1.jpg">
    </picture>
    <div class="glue-video__info">
      <svg class="glue-icon glue-video__play-button glue-video__play-button--white" role="presentation">
        <use href="/public/icons/glue-icons.svg#video-youtube"></use>
      </svg>
      <div class="glue-video__label-container">
        <p class="glue-headline glue-headline--headline-3 glue-video__label glue-video__label--large glue-video__label--light">Watch the film</p>
      </div>
      <div class="glue-video__timestamp-container">
        <span class="glue-video__timestamp glue-video__timestamp--dark">
          <svg class="glue-icon glue-video__timestamp-icon" role="presentation">
            <use href="/public/icons/glue-icons.svg#access-time"></use>
          </svg>
          <span class="glue-label glue-video__timestamp-duration"></span>
        </span>
      </div>
    </div>
  </div>

  <div class="glue-video__container glue-video__container--inline"
      data-glue-yt-video-vid="pXc_w49fsmI">
  </div>

  <div class="glue-video__nojs">
    <p><a href="https://www.youtube.com/watch?v=pXc_w49fsmI">Link to Youtube Video</a>
    (visible only when JS is disabled)</p>
  </div>
</div>
```

Include the YouTube iframe player API before the main script.

```html
<script src="https://www.youtube.com/iframe_api"></script>
```

### TS initialization

```ts
// Only include YtVideoOptions if you are customizing the video player
// by passing configuration options through the constructor
import {YoutubeVideo, YtVideoOptions} from '@google/glue';

const videoElement = document.querySelector<HTMLElement>('.glue-video');

if (videoElement) new YoutubeVideo(videoElement);
```




## Preview container elements

-   The element `glue-video__preview-container` and all the elements inside it
    are optional.
-   The element `glue-video__timestamp-duration` is used to display the YouTube
    video duration which is fetched dynamically.
-   In case the `src` attribute of the `glue-video__preview-image` is empty, the
    default webp image for the YouTube video is displayed.

## Constructor Options

You can use the following options in the player markup to configure your player.

Data Attribute                   | Values                   | Description
-------------------------------- | :----------------------- | :----------
`data-glue-yt-video-vid`         | `string`                 | The video ID for the video to embed.
`data-glue-yt-video-height`      | `string`                 | The height value of the video embed.
`data-glue-yt-video-width`       | `string`                 | The width value of the video embed.
`data-glue-yt-video-player-vars` | `Object <string,string>` | Object literal of [YT iFrame Player param](https://developers.google.com/youtube/player_parameters?playerVersion=HTML5) to value.

### Initialization

You can configure this component either by using data attributes in markup (as
shown above) or by using a configuration object that is passed to the component
during initialization.

All the config parameters are passed to the YT.PLayer object that is created
inside the component.

When the configuration object is passed-in, you can also specify event handlers
locally, which is not possible when using data attributes.

```ts
new VideoPlayer(pageElement,
  {
    'width': 700,
    'height': 400,
    'videoId': '1y06G853Udg',
    'playerId': 'player-1',
    'playerVars': {
       'autoplay': 0,
       'controls': 0,
       'cc_load_policy': 1,
    },
    modalElement: document.querySelector<HTMLElement>('.glue-modal');
    tabIndex: 0,
    'events': {
      'onReady': () => this.handlePlayerReady_(),
      'onStateChange': (event) => this.handlePlayerStateChange_(event),
    },
  });
```

The following config options are valid when using JS to initialize the player.

Parameter     | Type                            | Description
------------- | :------------------------------ | :----------
width         | number                          | The width of the player iframe.
height        | number                          | The height of the player iframe.
videoId       | string                          | The video ID from YouTube.
playerId      | string                          | The ID of the player.
playerVars    | Object<string, string/number>   | A list of YT player options. [Reference here](https://developers.google.com/youtube/player_parameters?playerVersion=HTML5)
events        | Object<string, Function(event)> | A list of YT player events. [Reference here](https://developers.google.com/youtube/iframe_api_reference#Events)
modalElement  | HTMLElement                     | Custom modal element to be initialized

## Public Methods

| Method                          | Params | Description   | Return    |
| ------------------------------- | ------ | ------------- | --------- |
| `refreshPlayerOptions(options)` | Object | Changes the layer options to the supplied config object. | void
| `getPlayer()`                   |        | Returns the YT Player object of the video in the component (when initialized). | YT.Player
| `getPlayerId()`                 |        | Returns the ID of the video (if provided.) | string
| `destroy()`                     |        | Removes the  video and  component. | void

## Variations

The component supports 3 use cases: inline, modal and cards.

### Inline

The Inline YTVideo replaces the preview element with video when it is clicked.
Refer to the above [html](#html) for the example.

### Modal

The Modal YTVideo opens the video in a modal when it is clicked. This is used
with the [Glue Modal Component](modal.md), hence import styles for modal
as well.

If the YTVideo markup includes the modal elements like in the snippet below, the
YTVideo component will auto-init a Modal component to open when the video is
played. The Modal TS file does not need to be imported.

#### HTML

```html
<div class="glue-video">
  <div class="glue-video__preview-container glue-video__preview-container--modal">
    <picture class="glue-video__preview">
      <img class="glue-video__preview-image" alt="Video preview image" src="/public/images/cards/card-16x9-1.jpg">
    </picture>
    <div class="glue-video__info">
      <svg class="glue-icon glue-video__play-button glue-video__play-button--white" role="presentation">
        <use href="/public/icons/glue-icons.svg#video-youtube"></use>
      </svg>
      <div class="glue-video__label-container">
        <p class="glue-headline glue-headline--headline-3 glue-video__label glue-video__label--large glue-video__label--light">Watch the film</p>
      </div>
      <div class="glue-video__timestamp-container">
        <span class="glue-video__timestamp glue-video__timestamp--dark">
          <svg class="glue-icon glue-video__timestamp-icon" role="presentation">
            <use href="/public/icons/glue-icons.svg#access-time"></use>
          </svg>
          <span class="glue-label glue-video__timestamp-duration"></span>
        </span>
      </div>
    </div>
  </div>

  <!-- modal container with video -->
  <div class="glue-modal glue-modal--dark">
    <div class="glue-video__container glue-modal__content-wrapper" tabindex="0" data-glue-yt-video-vid="pXc_w49fsmI" data-glue-yt-video-height="100%" data-glue-yt-video-width="100%"></div>
    <button class="glue-modal__close-btn" tabindex="0" aria-label="Close this modal"></button>
  </div>
</div>
```

### Cards

The Cards YTVideo opens the video in a modal when card is clicked. It is used
with the [Glue Cards Component](cards.md), hence import styles for modal
and cards.

#### HTML

```html
<ul class="glue-grid glue-cards">
  <li class="glue-grid__col glue-grid__col--span-4 glue-grid__col--span-6-md glue-video">
    <a class="glue-card glue-video__preview-container glue-video__preview-container--cards"
        aria-label="Video card with white icon" href="#">
      <div class="glue-card__inner">
        <div class="glue-video__info">
          <picture class="glue-video__preview">
            <img src="https://i.ytimg.com/vi/-ZNEzzDcllU/maxresdefault.jpg" alt="Image description" class="glue-video__preview-image">
          </picture>
          <svg class="glue-icon glue-video__play-button glue-video__play-button--white" role="presentation">
            <use href="/public/icons/glue-icons.svg#video-youtube"></use>
          </svg>
          <div class="glue-video__timestamp-container">
            <span class="glue-video__timestamp glue-video__timestamp--light">
              <svg class="glue-icon glue-video__timestamp-icon" role="presentation">
                <use href="/public/icons/glue-icons.svg#access-time"></use>
              </svg>
              <span class="glue-label glue-video__timestamp-duration"></span>
            </span>
          </div>
        </div>
        <div class="glue-card__content">
          <p class="glue-label">Light timestamp</p>
          <p class="glue-headline glue-headline--headline-5">Card with white play icon</p>
          <p class="glue-card__description">
            User added YT jpeg image. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </div>
        <div class="glue-card__cta">
          <span class="glue-button glue-button--low-emphasis">Learn more</span>
        </div>
      </div>
    </a>
    <div class="glue-modal glue-modal--dark" role="dialog" aria-modal="true">
      <div class="glue-video__container glue-modal__content-wrapper"
        tabindex="0"
        data-glue-yt-video-vid="-ZNEzzDcllU"
        data-glue-yt-video-height="100%"
        data-glue-yt-video-width="100%"
        data-glue-yt-video-autoplay="true">
      </div>
      <button class="glue-modal__close-btn" tabindex="0" aria-label="Close this modal"></button>
    </div>
  </li>
</ul>
```

## Style Variations

The preview elements can have variations in the label size, label color, label
highlight and timestamp color.

Class                            | Description
-------------------------------- | -----------------------------------------
`glue-video__label--large`       | Use large font size for the video label
`glue-video__label--small`       | Use small font size for the video label
`glue-video__label--light`       | Use light color font for the video label
`glue-video__label--dark`        | Use dark color font for the video label
`glue-video__label--highlight`   | Add a background color to the video label
`glue-video__timestamp--light`   | Add a light background for the timestamp
`glue-video__timestamp--dark`    | Add a dark background for the timestamp
`glue-video__play-button--white` | Use white play icon
`glue-video__play-button--grey`  | Use grey play icon
`glue-video__play-button--red`   | Use red play icon

### Examples

```html
<!-- video label with large font size and light font color -->
<p class="glue-video__label glue-video__label--large glue-video__label--light">Watch the film</p>

<!-- video label with small font size, dark font color and background highlight -->
<p class="glue-video__label glue-video__label--small glue-video__label--dark glue-video__label--highlight">Watch the film</p>

<!-- timestamp with light background -->
<span class="glue-video__timestamp glue-video__timestamp--light">...</span>

<!-- red color play icon -->
<svg class="glue-icon glue-video__play-button glue-video__play-button--red" role="presentation">
  <use href="/public/icons/glue-icons.svg#video-youtube"></use>
</svg>
```

## Tips

### Adding Video Controls

The YT Player API allows some external controls to be added. In this example,
some simple buttons that change the player state.

Sample video player controls markup

```html
<div class="button-container">
  <button id="player-button">Play</button>
</div>
```

Add click listeners to the elements for play and pause.

```ts
this.playerButton = document.getElementById('play-button');

this.playerButton.addEventListener('click', () => {
  if (this.playerButton.innerText === 'Play') {
    this.playerButton.innerText = 'Pause';
    this.player.playVideo();
  } else {
    this.playerButton.innerText = 'Play';
    this.player.pauseVideo();
  }
});
```

The [Demos section](#variation-demos) below includes example code and HTML for
more configurations.

### Capturing Player Events

You can add your own event listeners to the player configuration to get YT
player events. You can then add the following code to the player config
(see [Initialization](#initialization)) to react to events - which yields
an event with a player state ID. Once the YT Player API is installed, it
includes an object 'window.YT.PlayerState' that contains a map of player state
IDs to event descriptions.

```ts
'events': {
  'onStateChange': (event) => this.handlePlayerStateChange_(event),
},
```


## Variation demos

-   [Inline](https://28-0-dot-glue-demo.appspot.com/components/ytvideo/inline)
-   [Modal](https://28-0-dot-glue-demo.appspot.com/components/ytvideo/simple)
-   [Cards](https://28-0-dot-glue-demo.appspot.com/components/ytvideo/cards)
