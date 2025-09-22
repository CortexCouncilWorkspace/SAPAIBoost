# Icons

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-09-05' }
*-->



-   **Category**: SCSS

**Synonyms:** Image, Symbol, SVG

Renders SVG icons used by various Glue components. Some icons are from the
Material library while others are custom for MWS.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BIcons%5D)**

**[SCSS SOURCE](/src/icons/_index.scss)**

</section>

## Demo

[View demo in the Glue app](https://28-0-dot-glue-demo.appspot.com/components/icons/)

## Features

-   Commonly used icons for UI components
-   Classes for commonly used sizes
-   Classes for color adjustment

## Setup

### Icon file

Save the icon file locally to your project. The SVG needs to be on the same
domain as your site as some browsers will not load a cross-origin URL in the
href attribute. We recommend placing it along with the other image assets in
your site for easy access.

NOTE: In Glue v21 and earlier, you had to embed an svg definition at the bottom
of all of the pages in your site. This is no longer necessary.


#### NPM

Copy the SVG asset from `@google/glue/assets/icons/glue-icons.svg` (in the
`node_modules` directory) into your project.

#### CDN

Copy the SVG asset from the CDN
(`https://www.gstatic.com/glue/VERSION/glue-icons.svg`) into your project. See
the [versioning doc](/docs/concepts/versioning.md) to find
the right version.

### SCSS

Import the following Glue SCSS files. This is a core layout component, and
should be imported before Glue UI components and layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';

// Import Glue UI components

// Import Glue layout overrides
```



### HTML

Include the SVG code, with the appropriate file path and icon ID in the `<use>`
tag. You can find the IDs in the table below. The file path should be a local
reference to the folder where you put your image assets.

```html
<svg role="presentation" aria-hidden="true" class="glue-icon">
  <use href="/path/to/glue-icons.svg#ICON_ID"></use>
</svg>
```

## Icon list

These are the available icons in `glue-icons.svg`; you can refer to each one
through their ID.

Name                | ID                      | Category         | Preview 
------------------- | ----------------------- | ---------------- | -------
Chevron left        | chevron-left        | Chevron          | <img src="/docs/assets/glue-icon_chevron-left.png">
Chevron right       | chevron-right       | Chevron          | <img src="/docs/assets/glue-icon_chevron-right.png">
Expand less         | expand-less         | Chevron          | <img src="/docs/assets/glue-icon_expand-less.png">
Expand more         | expand-more         | Chevron          | <img src="/docs/assets/glue-icon_expand-more.png">
Arrow back          | arrow-back          | Arrow (tailed)   | <img src="/docs/assets/glue-icon_arrow-back.png">
Arrow forward       | arrow-forward       | Arrow (tailed)   | <img src="/docs/assets/glue-icon_arrow-forward.png">
Arrow upward        | arrow-upward        | Arrow (tailed)   | <img src="/docs/assets/glue-icon_arrow-upward.png">
Arrow downward      | arrow-downward      | Arrow (tailed)   | <img src="/docs/assets/glue-icon_arrow-downward.png">
Arrow left          | arrow-left          | Arrow (triangle) | <img src="/docs/assets/glue-icon_arrow-left.png">
Arrow right         | arrow-right         | Arrow (triangle) | <img src="/docs/assets/glue-icon_arrow-right.png">
Arrow drop up       | arrow-drop-up       | Arrow (triangle) | <img src="/docs/assets/glue-icon_arrow-drop-up.png">
Arrow drop down     | arrow-drop-down     | Arrow (triangle) | <img src="/docs/assets/glue-icon_arrow-drop-down.png">
Help                | help                | Link             | <img src="/docs/assets/glue-icon_help.png">
Drive PDF           | drive-pdf           | Link             | <img src="/docs/assets/glue-icon_drive-pdf.png">
File download       | file-download       | Link             | <img src="/docs/assets/glue-icon_file-download.png">
Open in new         | open-in-new         | Link             | <img src="/docs/assets/glue-icon_open-in-new.png">
Info                | info                | Link             | <img src="/docs/assets/glue-icon_info.png">
Share               | share               | Social           | <img src="/docs/assets/glue-icon_share.png">
Email               | email               | Social           | <img src="/docs/assets/glue-icon_email.png">
Link                | link                | Social           | <img src="/docs/assets/glue-icon_link.png">
Blogger             | blogger             | Social           | <img src="/docs/assets/glue-icon_post-blogger.png">
Facebook            | facebook            | Social           | <img src="/docs/assets/glue-icon_post-facebook.png">
Instagram           | instagram           | Social           | <img src="/docs/assets/glue-icon_instagram.png">
LinkedIn            | linkedin            | Social           | <img src="/docs/assets/glue-icon_post-linkedin.png">
Twitter             | twitter             | Social           | <img src="/docs/assets/glue-icon_twitter.png">
X                   | x                   | Social           | <img src="/docs/assets/glue-icon_x.png">
YouTube             | youtube             | Social           | <img src="/docs/assets/glue-icon_video-youtube.png">
Close               | close               | UI               | <img src="/docs/assets/glue-icon_close.png">
Expand all          | expand-all          | UI               | <img src="/docs/assets/glue-icon_expand-all.png">
Menu                | menu                | UI               | <img src="/docs/assets/glue-icon_menu.png">
More vert           | more-vert           | UI               | <img src="/docs/assets/glue-icon_more-vert.png">
Phone               | phone               | UI               | <img src="/docs/assets/glue-icon_phone.png">
Play circle filled  | play-circle-filled  | UI               | <img src="/docs/assets/glue-icon_play-circle-filled.png">
Search              | search              | UI               | <img src="/docs/assets/glue-icon_search.png">
Filter              | filter              | UI               | <img src="/docs/assets/glue-icon_filter.png">
Checkmark           | checkmark           | UI               | <img src="/docs/assets/glue-icon_checkmark.png">
YouTube (Black)     | video-youtube-black | Video            | <img src="/docs/assets/glue-icon_video-youtube-black.png">
YouTube (Red)       | video-youtube-red   | Video            | <img src="/docs/assets/glue-icon_video-youtube-red.png">
YouTube (White)     | video-youtube-white | Video            | <img src="/docs/assets/glue-icon_video-youtube-white.png">
Pause               | pause-button        | Video            | <img src="/docs/assets/glue-icon_pause-button.png">
Play                | play-button         | Video            | <img src="/docs/assets/glue-icon_play-button.png">
Time                | access-time         | Video            | <img src="/docs/assets/glue-icon_access-time.png">

## Icon Options

### Icon Size

You can set a specific size for your icon by adding a class:
`glue-icon--[SIZE]`.

NOTE: Some components use a specific icon size (such as buttons or social) which
should not be overwritten.

Size | Class
---- | -----------------
18px | `glue-icon--18px`
20px | `glue-icon--20px`
24px | `glue-icon--24px`
32px | `glue-icon--32px`

### Icon Color

By default, an icon picks up the text color of its parent element. For example,
inline with text it will appear dark grey; inline with a link it will appear
blue. You can set a specific color on a link with an `glue-icon--color-[COLOR]`
class.

For product colors, only apply to that particular icon. For example, only use
the Blogger color on a Blogger icon; do not apply it to the YouTube icon.

Color                | Class
-------------------- | ----------------------------
White                | `glue-icon--color-white`
Black                | `glue-icon--color-black`
Link (within an `A`) | `glue-icon--color-link`
Mail (generic share) | `glue-icon--color-email`
Link (generic share) | `glue-icon--color-sharelink`
Blogger              | `glue-icon--color-blogger`
Facebook             | `glue-icon--color-facebook`
Instagram            | `glue-icon--color-instagram`
LinkedIn             | `glue-icon--color-linkedin`
Twitter              | `glue-icon--color-twitter`
YouTube              | `glue-icon--color-youtube`
X                    | `glue-icon--color-x`

You can set a specific color with a custom class, by setting the `fill`. Please
review the Accessibility section for caveats on setting custom icon colors in
High Contrast modes.

```scss
.my-orange-icon {
  fill: #f90;
}
```

```html
<svg role="presentation" aria-hidden="true" class="glue-icon my-orange-icon">
  <use href="/path/to/glue-icons.svg#file-download"></use>
</svg>
```

Color classes will not affect the `video-youtube-COLOR` icons, as these have
color built into the SVG definition.

## Accessibility

Depending on how you are using an icon, you may need to add a label to it so it
can be read by assistive technologies.

### Icon labels

An icon only needs to be labelled if it is a standalone element that requires
extra context. If an icon is being used as part of a larger interactive element,
that parent element should handle the labelling/context and the icon itself can
be hidden from the accessibility tree. However, if the icon provides additional
context, you may still need to label it.

#### Labelled icon

If an icon should be labelled, ensure it's added to the accessibility tree by
treating it as a standalone image.

Add `role="img"` to the SVG and a descriptive `alt` tag.

```html
<p>Speaker notes are available in the following formats:</p>
<svg class="my-icon" role="img" alt="PDF format">
  <use href="/assets/img/glue-icons.svg#pdf"></use>
</svg>
```

In this example, we need to provide additional context to the icon to inform
users the link opens in a new window.

```html
<a href="/myproduct/" target="_blank" rel="noopener">
  Visit MyProduct to learn more
  <svg class="my-icon" role="img" alt="Link opens in a new window">
    <use href="/assets/img/glue-icons.svg#open-in-new"></use>
  </svg>
</a>
```

#### Unlabelled icon

If an icon should not be labelled, or if its parent element already contains a
descriptive label, the icon should be hidden from the accessibility tree to
prevent it from being spoken multiple times.

Add `role="presentation"` and `aria-hidden="true"` to the SVG.

```html
<a href="path/to/speakernotes.pdf"
    aria-label="Download the speaker notes as a PDF file">
  <svg class="glue-icon" role="presentation" aria-hidden="true">
    <use href="/assets/img/glue-icons.svg#pdf"></use>
  </svg>
  Download speaker notes
</a>
```

### Icon color in High Contrast Mode

If you set a custom color on an icon, it will appear in that color even in High
Contrast Mode, which may make the icon difficult to see. If this is an issue, we
recommend setting color on the icon's parent element, and have the icon inherit
it via the `currentColor` value, such as:

```html
<div class="my-element">
  <svg class="glue-icon" role="presentation" aria-hidden="true">
    <use href="/assets/img/glue-icons.svg#phone"></use>
  </svg>
  Call the support hotline at 1-800-555-5555
</div>
```

```scss
.my-element {
  color: #f90;

  .glue-icon {
    fill: currentColor;
  }
}
```

Alternatively, you can set specific icon colors using High Contrast Mode
[media queries](/docs/components/accessibility-classes.md).

## Additional icons


You can find additional Material icons (UI) at the
[Material icons page](https://material.io/icons/), which
provides SVG versions of all icons. Filled style is recommended to match Glue
icons.

## Support for IE11

IE11 does not support
[external URIs](https://caniuse.com/#feat=mdn-svg_elements_use_external_uri) in
SVG `use`. In order to provide support for SVGs in IE11, you can use a polyfill
called SVG4Everybody available on
[gstatic](https://www.gstatic.com/external_hosted/svg4everybody/svg4everybody.min.js).

Run this script at the end of `<body>`.

```html
<script src="https://www.gstatic.com/external_hosted/svg4everybody/svg4everybody.min.js"></script>
<script>svg4everybody();</script>
```
