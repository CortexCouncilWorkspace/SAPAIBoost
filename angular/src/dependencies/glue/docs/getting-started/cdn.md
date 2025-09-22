# Getting started via CDN

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



## Versioning

The Glue CDN is versioned. Make sure to link to the appropriate one for your
project. See the
[versioning doc](/docs/concepts/versioning.md) for the full
list of available versions on gstatic as well as dependencies.

## Include assets

### Glue CSS and JS

Import the Glue CDN CSS file in the `<head>`. Import the Glue CDN JS file at the
end of `<body>`.

```html
<head>
  ...

  <link href="//www.gstatic.com/glue/VERSION/glue.min.css" rel="stylesheet">
</head>

<body>
  ...
  <script src="//www.gstatic.com/glue/VERSION/glue.min.js"></script>
</body>
```

### SVG icons

Copy the SVG asset from the CDN into your project.

```
curl http://www.gstatic.com/glue/VERSION/glue-icons.svg -o glue-icons.svg -s
```

The SVG needs to be on the same domain as your site as some browsers will not
load a cross-origin URL in the href attribute. We recommend placing it along
with the other image assets in your site for easy access.

See the [Icons documentation](/docs/components/icons.md) for
more details.

### Fonts


Glue uses several Google Sans families and Product Sans for its typography.
Import these fonts in the `<head>`, using `preconnect` and `preload` to optimize
loading and rendering.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Product+Sans&family=Google+Sans+Display:ital@0;1&family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Google+Sans+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Product+Sans&family=Google+Sans+Display:ital@0;1&family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Google+Sans+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap">
```

More information on fonts can be found on the
[typography documentation page](/docs/components/typography.md),
including loading fonts for different languages.

## Configure TS typedefs

If the source code for your CDN-based site will be in TypeScript it will likely
need the Glue d.ts files. These are available with the Glue CDN and need to be
placed where the TypeScript compiler will see them. Currently d.ts files
are available for Glue versions `v24_0` and newer.

```
curl http://www.gstatic.com/glue/VERSION/glue.d.ts -o glue.d.ts -s
```

## Configure externs

The Glue CDN includes an externs file for projects using JS site code passed
through the Google Closure Compiler. These externs are consumed at compile time
to inform the compiler about the Glue CDN namespaces (much like the d.ts file)

Save the externs.js file and then pass it to the Closure Compiler in the
compiler settings.

```
curl http://www.gstatic.com/glue/VERSION/externs.js -o externs.js -s
```

## Glue namespaces

See the
[namespaces documentation](/docs/getting-started/cdn-namespaces.md)
for the list of Glue namespaces.

## no-JS styles

If you are concerned about how components render when JS is not enabled, import
the no-JS stylesheet inside of a `<noscript>` tag.

```html
<noscript>
  <link rel="stylesheet" href="//www.gstatic.com/glue/VERSION/glue-no-js.min.css">
</noscript>
```

## Accessibility

Please review
[Glue's accessibility principles](/docs/concepts/a11y-principles.md)
to familiarize yourself with Glue's accessibility practices, and to learn how to
make sure your site meets Google's accessibility guidelines.

## Material components

If you are using Material Web components, follow the additional
[Material setup guide](/docs/getting-started/material.md).
