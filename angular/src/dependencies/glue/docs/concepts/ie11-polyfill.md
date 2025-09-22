# Glue polyfill for IE11

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



## Use case

Glue only provides partial support for IE11 browsers. Content is expected to
display, but the layout and interactions may not all function as they do on a
modern browser.

In order to allow for additional functionality, Glue provides a polyfill for
some features that IE11 does not natively support.

## Setup

Run the polyfill at the end of the page.

```html
<script src="https://www.gstatic.com/glue/polyfill.min.js"></script>
```

## SVG polyfill for icons

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
