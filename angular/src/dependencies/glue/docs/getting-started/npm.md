# Getting started via NPM

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



This guide is for adding a custom Glue build setup to a project. If you don't
need a custom build setup, we recommended setup through the
[Web Standard Bracket scaffold](https://webmaster.googlesource.com/bracket/+/refs/heads/master/scaffolds/web-standard/).

## Install Glue and dependencies

If you don't have node or npm installed, you will need to
[install those first](https://docs.npmjs.com/getting-started/installing-node).
You can also install nvm to manage versions more easily.

Then, install Glue. You should always install the latest released version of
Glue to get the latest features and bug fixes. See the
[versioning doc](/docs/concepts/versioning.md) for more
details.

```shell
npm install git+https://webmaster.googlesource.com/bs/glue#v27.1.0 --save
```

Then install some extra tooling:

```shell
npm install google-closure-compiler sass  --save-dev
```

## Write TS/JS code

Glue components are written in TypeScript. We recommend that your site code is
also written in TS to take advantage of the typings offered.

Glue is tested with TS version 4.3.2

```ts
import {Header} from '@google/glue';

const headerEl = document.querySelector<HTMLElement>('.glue-header');
if (headerEl) new Header(headerEl);
```

## Write SCSS code

Import Glue core layouting components, then Glue UI components, and finally Glue
layout overrides. Add your own project's styles afterward.

For all imports, use namespaces as needed to prevent naming conflicts.
[Learn more about the @use syntax](https://sass-lang.com/documentation/at-rules/use).

```scss
// Import Glue core layout components
@use '@google/glue/lib/core' as glue-core;
@use '@google/glue/lib/breakpoints' as glue-breakpoints;
@use '@google/glue/lib/buttons' as glue-buttons;
@use '@google/glue/lib/grids' as glue-grids;
@use '@google/glue/lib/icons' as glue-icons;
@use '@google/glue/lib/links' as glue-links;
@use '@google/glue/lib/page' as glue-page;
@use '@google/glue/lib/typography' as glue-typography;

// Import Glue UI components
@use '@google/glue/lib/header' as glue-header;
@use '@google/glue/lib/footer' as glue-footer;

// Import Glue layout overrides
@use '@google/glue/lib/spacers' as glue-spacers;

// Add your site's styles below
```

See individual component documentation for the exact list of libraries and
dependencies to import, as well as variables and/or mixin files you can import
for customization.

## Include assets

### SVG icons

Copy the SVG asset from `node_modules/@google/glue/icons/glue-icons.svg` (in the
project's `node_modules` directory) into your project.

The SVG needs to be on the same domain as your site as some browsers will not
load a cross-origin URL in the href attribute. We recommend placing it along
with the other image assets in your site for easy access.

See the [Icons documentation](/docs/components/icons.md) for
more details as well as an IE11 polyfill.

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

## Configure Webpack

Webpack is recommended for development and must be configured to compile TS
source. For building production code, we recommend using the
[Google closure compiler module](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)


```js
const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: require.resolve('./tsconfig-dev.json')
        }
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    open: true,
    index: 'index.html',
  },
};
```

### Add a tsconfig.json file

This is a sample tsconfig for building with Webpack. Adjust the settings for
your project as needed.

```json
{
  "compilerOptions": {
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "declaration": false,
    "importsNotUsedAsValues": "preserve",
    "forceConsistentCasingInFileNames": true,
    "lib": ["es2018", "dom", "DOM.Iterable", "ScriptHost"],
    "module": "ESNext",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "pretty": true,
    "sourceMap": true,
    "strict": true,
    "target": "es2018",
    "moduleResolution": "node",
  }
}
```


### Production environment

Use the
[Webpack closure-compiler plugin](https://www.npmjs.com/package/closure-webpack-plugin)
to compile your code into minified production code. Add this to your node
packages and webpack config.

For example:

```js
optimization: {
    concatenateModules: false,
    minimizer: [
      new ClosurePlugin(
        { mode: 'AGGRESSIVE_BUNDLE' },
      ),
    ],
  },
```


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

If you are using Material Components for the web, follow the additional
[Material setup guide](/docs/getting-started/material.md).
