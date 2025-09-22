# Setting up Material Components for the web

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-23' }
*-->



Note: This setup is in addition to the steps outlined in other getting started
guides. Scaffold users will also need to follow these steps to use Material
components.

Starting with Glue v23, specific Material Components for the web are available
for use in Glue. The primary UI and styling is taken directly from Material,
with Glue providing some SCSS overrides to ensure these components meet
Marketing Web Standards in terms of color and typography.

## Versioning

Glue uses the following Material versions. Make sure to refer to the appropriate
Material version based on which Glue version you are using.

Glue version   | Material version
-------------- | -----------------
28.x - latest  | Material 3 v1.0.0
24.x - 27.x    | Material 2 v9.0.0
23.x           | Material 2 v7.0.0

## Available components

-   Checkbox
    -   [Glue documentation](/docs/components/checkbox.md)
    -   [Material 3 documentation](https://github.com/material-components/material-web/blob/main/docs/components/checkbox.md)
-   Radio
    -   [Glue documentation](/docs/components/radio.md)
    -   [Material 3 documentation](https://github.com/material-components/material-web/blob/main/docs/components/radio.md)
-   Select
    -   [Glue documentation](/docs/components/select.md)
    -   [Material 3 documentation](https://github.com/material-components/material-web/blob/main/docs/components/select.md)
-   Switch
    -   [Glue documentation](/docs/components/switch.md)
    -   [Material 3 documentation](https://github.com/material-components/material-web/blob/main/docs/components/switch.md)
-   Textfield
    -   [Glue documentation](/docs/components/textfield.md)
    -   [Material 3 documentation](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md)

## Material 3 setup

Material 3 components will need to be imported from 2 sources: the Material
repository for TS source, and the Glue repository for SCSS source.

### TS

For TS, you will need to import each component individually; some components may
require multiple imports.

```ts
// Import individual components from Material source
import '@material/web/checkbox/checkbox';
import '@material/web/select/outlined-select';
import '@material/web/select/select-option';
```

### SCSS

For SCSS, you can import components individually, or all components at once.

```scss
// Import only the components you are using
@use '@google/glue/dist/mwc3/theme' as glue-mwc3-theme;  // Import Glue tokens and theme for MWC3 components
@use '@google/glue/dist/mwc3/checkbox' as glue-mwc3-checkbox;  // Import checkbox component styles
@use '@google/glue/dist/mwc3/select' as glue-mwc3-select;  // Import select component styles

// Alternatively, import the whole MWC3 library at once
@use '@google/glue/dist/mwc3' as glue-mwc3;
```

### HTML

For HTML, components will need to be placed inside of a `glue-mwc3` container.
This container includes all the design tokens used to create the Glue theme for
Material components. This container can be the `body` element, which would apply
the Glue theme to any Material components you have on the page (whether from
Glue or from elsewhere), or a more specific container (such as a `glue-form`) to
restrict the scope of the Glue theme settings.

```html
<body class="glue-body glue-mwc3">
  <p>
    In this setup, all Material components use the Glue theme.
  </p>
  <md-circular-progress id="my-glue-progress" indeterminate></md-circular-progress>
  <div class="glue-mwc3-textfield">
    <md-outlined-text-field label="Text field" id="my-glue-textfield" name="my-glue-textfield"></md-outlined-text-field>
  </div>
</body>

<body class="glue-body">
  <p>
    In this setup, only Material components inside the glue-mwc3 container use the Glue theme.
  </p>
  <md-circular-progress id="my-material-progress" indeterminate></md-circular-progress>
  <md-outlined-text-field label="Text field" id="my-material-textfield" name="my-material-textfield"></md-outlined-text-field>
  <form class="glue-mwc3">
    <div class="glue-mwc3-textfield">
      <md-outlined-text-field label="Text field" id="my-glue-textfield" name="my-glue-textfield"></md-outlined-text-field>
    </div>
  </form>
</body>
```


### Additional NPM setup

Install the Material 3 components from their repo and import from that source.
You will likely also need to install Rollup in order to bundle packages to
resolve the bare module specifiers. The
[Material quick start guide](https://github.com/material-components/material-web/blob/main/docs/quick-start.md)
has full details.

```shell
$ npm install @material/web
$ npm install rollup @rollup/plugin-node-resolve
$ npx rollup -p @rollup/plugin-node-resolve index.js -o bundle.js
```

### Additional CDN setup

The Glue CDN includes both the TS and SCSS sources for these components, so no
additional work is needed to use them.

## Accessibility

Code examples from Material documentation may not include all ARIA tags or other
accessibility considerations built-in. Material documentation often includes a
specific section for accessibility, which includes all of these settings. Please
keep this in mind if you are copying demo code directly from the Material
documentation.

All Glue documentation has accessibility considerations included in the demo
code and can be copied as-is into your site. Each component has its
accessibility concerns listed out on their respective documentation pages.

## Material 2 setup (deprecated)

Warning: Material 2 components are deprecated and will be removed in a future
version of Glue (v29). Please migrate these components to the Material 3
implementation at your earliest convenience. This documentation is provided as
reference.

### Setup (deprecated) {.no-toc}

#### CSS (deprecated) {.no-toc}

Include Glue's Material CSS CDN in the head. You do not need to include the
Material CSS CDN.

If you are using Glue latest, you should refer to the same file as the latest
Glue published version.

See the [versioning doc](/docs/concepts/versioning.md) for
a list of published versions.

```html
<head>
  ...
  <link href="https://www.gstatic.com/glue/GLUE_VERSION/glue-material.min.css" rel="stylesheet">
</head>
```

Because styles are provided in a CSS CDN, you do not need to update your site's
SCSS. However, you are also unable to use the Material SCSS APIs to provide
further customization to these components.

Note: If you are using Material components not part of Glue's library, you will
need to install and set up those styles on your own. Refer to the
[Material setup guide](https://material.io/develop/web/getting-started).

#### HTML (deprecated) {.no-toc}

Include HTML for the component in your page. See individual component docs for
code samples.

#### JS/TS (deprecated) {.no-toc}

You will need to use the Material JS via a CDN. Include the CDN before your
site's JS.

##### Glue v23.x (Material v7.x) (deprecated) {.no-toc}

For Glue v23.x, you will need to use Material via their
[unpkg CDN host](https://github.com/material-components/material-components-web/blob/v7.0.0/docs/getting-started.md#quick-start-cdn).
Note that you do only need to include the CDN for the precompiled JS.

##### Glue v24+, Latest (Material v9.x) (deprecated) {.no-toc}

Starting in Glue v24.x, Glue provides a mirror of the Material v9.0.0
precompiled JS via gstatic. This will make it easier to link to from Google
properties.

If you are using Glue latest, you should refer to the same file as the latest
Glue published version.

See the [versioning doc](/docs/concepts/versioning.md) for
a list of published versions.

```html
<script src="https://www.gstatic.com/glue/GLUE_VERSION/material-components-web.min.js"></script>
<script src="/assets/js/mysite.min.js"></script>
```


##### Typings for non-google3 code (deprecated) {.no-toc}

If the source code will be in TypeScript it will likely need the
Material d.ts files. These are available with the Glue CDN and need to
be placed where the TypeScript compiler will see them.

```
curl http://www.gstatic.com/glue/GLUE_VERSION/material-components-web.d.ts -o material-components-web.d.ts -s
```

##### Initializing components (deprecated) {.no-toc}

See individual component docs for code samples.