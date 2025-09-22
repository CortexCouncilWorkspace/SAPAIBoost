# Glue versioning

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-04-15' }
*-->




## NPM

Glue in NPM is a versioned library that follows
[Semantic Versioning](http://semver.org/).

To get notified of new releases, security patches, and bug fixes, we recommend
your team join one of our announcement
[mailing lists](/docs/contacts.md).

### Using versions

You can pull a specific version of the glue source with
[npm](https://www.npmjs.com/) by specifying the version number. We recommend
installing the latest version of Glue available, as older versions are not
maintained and will not include latest features, important bug fixes, and other
patches.

Install the most recent version of Glue (i.e. v28):

```shell
npm install git+https://webmaster.googlesource.com/bs/glue#v28.0.0
```

#### Recent Glue releases

-   [28.0.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v28.0.0:):
    April 2024
-   [27.1.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v27.1.0:):
    June 2023
-   [27.0.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v27.0.0:):
    April 2023
-   [26.0.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v26.0.0:):
    August 2022
-   [25.0.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v25.0.0:):
    February 2022
-   [24.0.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v24.0.0:):
    August 2021
-   [23.1.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v23.1.0:):
    January 2021
-   [23.0.0](https://source.cloud.google.com/h/webmaster/bs/glue/+/refs/tags/v23.0.0:):
    November 2020

#### Older releases

See the tags dropdown in the
[cloud source repo](https://source.cloud.google.com/h/webmaster/bs/glue) for
older releases.

## CDN

The Glue CDN also follows semver rules, but the patch portion is hidden, as
these are rolled into each major or minor release.

Glue CDN is served from www.gstatic.com/glue/, in a version folder with the
pattern `vMAJOR_MINOR`, such as `v28_0`.

Files in the latest CDN version (`v28_0`):

-   Primary Glue files
    -   https://www.gstatic.com/glue/v28_0/glue.min.js
    -   https://www.gstatic.com/glue/v28_0/glue.min.css
    -   https://www.gstatic.com/glue/v28_0/glue-no-js.min.css
    -   https://www.gstatic.com/glue/v28_0/glue-icons.svg
-   Optional Glue files
    -   https://www.gstatic.com/glue/v28_0/glue.d.ts
    -   https://www.gstatic.com/glue/v28_0/externs.js
    -   https://www.gstatic.com/glue/v28_0/ccb.min.css
    -   https://www.gstatic.com/glue/v28_0/glue-material.min.css
    -   https://www.gstatic.com/glue/v28_0/material-components-web.min.js

## Releases list

See the
[release notes](/docs/getting-started/release-notes.md) for
details on all the changes that occurred between versions.

### NPM versions

Look up specific tags listed in our repos:

Git Repo                                                                    | Glue versions available         | General install command
--------------------------------------------------------------------------- | ------------------------------- | -----------------------
[bs/glue](https://source.cloud.google.com/h/webmaster/bs/glue)              | v4.0.0 - v5.0.0, v16.0.0 and up | `npm install git+https://webmaster.googlesource.com/bs/glue#VERSION`
[bs/glue-release](https://webmaster.googlesource.com/bs/glue-release/+refs) | v6.0.0 - v15.0.0                | `npm install git+https://webmaster.googlesource.com/bs/glue-release#VERSION --save`

### CDN versions

The following versions are available.

Version | Available files
------- | ---------------
v28_0  | [glue.min.js](https://www.gstatic.com/glue/v28_0/glue.min.js), [externs.js](https://www.gstatic.com/glue/v28_0/externs.js), [glue.d.ts](https://www.gstatic.com/glue/v28_0/glue.d.ts), [glue.min.css](https://www.gstatic.com/glue/v28_0/glue.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v28_0/glue-no-js.min.css), [glue-icons.svg](https://www.gstatic.com/glue/v28_0/glue-icons.svg), [ccb.min.css](https://www.gstatic.com/glue/v28_0/ccb.min.css), [glue-material.min.css](https://www.gstatic.com/glue/v28_0/glue-material.min.css), [material-components-web.min.js](https://www.gstatic.com/glue/v28_0/material-components-web.min.js), [material-components-web.d.ts](https://www.gstatic.com/glue/v28_0/material-components-web.d.ts)
v27_1  | [glue.min.js](https://www.gstatic.com/glue/v27_1/glue.min.js), [externs.js](https://www.gstatic.com/glue/v27_1/externs.js), [glue.d.ts](https://www.gstatic.com/glue/v27_1/glue.d.ts), [glue.min.css](https://www.gstatic.com/glue/v27_1/glue.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v27_1/glue-no-js.min.css), [glue-icons.svg](https://www.gstatic.com/glue/v27_1/glue-icons.svg), [ccb.min.css](https://www.gstatic.com/glue/v27_1/ccb.min.css), [glue-material.min.css](https://www.gstatic.com/glue/v27_1/glue-material.min.css), [material-components-web.min.js](https://www.gstatic.com/glue/v27_1/material-components-web.min.js), [material-components-web.d.ts](https://www.gstatic.com/glue/v27_1/material-components-web.d.ts)
v27_0  | [glue.min.js](https://www.gstatic.com/glue/v27_0/glue.min.js), [externs.js](https://www.gstatic.com/glue/v27_0/externs.js), [glue.d.ts](https://www.gstatic.com/glue/v27_0/glue.d.ts), [glue.min.css](https://www.gstatic.com/glue/v27_0/glue.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v27_0/glue-no-js.min.css), [glue-icons.svg](https://www.gstatic.com/glue/v27_0/glue-icons.svg), [ccb.min.css](https://www.gstatic.com/glue/v27_0/ccb.min.css), [glue-material.min.css](https://www.gstatic.com/glue/v27_0/glue-material.min.css), [material-components-web.min.js](https://www.gstatic.com/glue/v27_0/material-components-web.min.js), [material-components-web.d.ts](https://www.gstatic.com/glue/v27_0/material-components-web.d.ts)
v26_0  | [glue.min.js](https://www.gstatic.com/glue/v26_0/glue.min.js), [externs.js](https://www.gstatic.com/glue/v26_0/externs.js), [glue.d.ts](https://www.gstatic.com/glue/v26_0/glue.d.ts), [glue.min.css](https://www.gstatic.com/glue/v26_0/glue.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v26_0/glue-no-js.min.css), [glue-icons.svg](https://www.gstatic.com/glue/v26_0/glue-icons.svg), [ccb.min.css](https://www.gstatic.com/glue/v26_0/ccb.min.css), [glue-material.min.css](https://www.gstatic.com/glue/v26_0/glue-material.min.css), [material-components-web.min.js](https://www.gstatic.com/glue/v26_0/material-components-web.min.js), [material-components-web.d.ts](https://www.gstatic.com/glue/v26_0/material-components-web.d.ts)
v25_0   | [glue.min.js](https://www.gstatic.com/glue/v25_0/glue.min.js), [externs.js](https://www.gstatic.com/glue/v25_0/externs.js), [glue.d.ts](https://www.gstatic.com/glue/v25_0/glue.d.ts), [glue.min.css](https://www.gstatic.com/glue/v25_0/glue.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v25_0/glue-no-js.min.css), [glue-icons.svg](https://www.gstatic.com/glue/v25_0/glue-icons.svg), [ccb.min.css](https://www.gstatic.com/glue/v25_0/ccb.min.css), [glue-material.min.css](https://www.gstatic.com/glue/v25_0/glue-material.min.css), [material-components-web.min.js](https://www.gstatic.com/glue/v25_0/material-components-web.min.js), [material-components-web.d.ts](https://www.gstatic.com/glue/v25_0/material-components-web.d.ts)
v24_0   | [glue.min.js](https://www.gstatic.com/glue/v24_0/glue.min.js), [externs.js](https://www.gstatic.com/glue/v25_0/externs.js), [glue.d.ts](https://www.gstatic.com/glue/v24_0/glue.d.ts), [glue.min.css](https://www.gstatic.com/glue/v24_0/glue.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v24_0/glue-no-js.min.css), [glue-icons.svg](https://www.gstatic.com/glue/v24_0/glue-icons.svg), [ccb.min.css](https://www.gstatic.com/glue/v24_0/ccb.min.css), [glue-material.min.css](https://www.gstatic.com/glue/v24_0/glue-material.min.css), [material-components-web.min.js](https://www.gstatic.com/glue/v24_0/material-components-web.min.js), [material-components-web.d.ts](https://www.gstatic.com/glue/v24_0/material-components-web.d.ts)
v23_1   | [glue-icons.svg](https://www.gstatic.com/glue/v23_1/glue-icons.svg), [glue-material.min.css](https://www.gstatic.com/glue/v23_1/glue-material.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v23_1/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v23_1/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v23_1/glue.min.css)
v23_0   | [glue-icons.svg](https://www.gstatic.com/glue/v23_0/glue-icons.svg), [glue-material.min.css](https://www.gstatic.com/glue/v23_0/glue-material.min.css), [glue-no-js.min.css](https://www.gstatic.com/glue/v23_0/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v23_0/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v23_0/glue.min.css)
v22_3   | [glue-angular.min.js](https://www.gstatic.com/glue/v22_3/glue-angular.min.js), [glue-icons.svg](https://www.gstatic.com/glue/v22_3/glue-icons.svg), [glue-no-js.min.css](https://www.gstatic.com/glue/v22_3/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v22_3/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v22_3/glue.min.css), [octopus.min.js](https://www.gstatic.com/glue/v22_3/octopus.min.js)
v22_2   | [glue-angular.min.js](https://www.gstatic.com/glue/v22_2/glue-angular.min.js), [glue-icons.svg](https://www.gstatic.com/glue/v22_2/glue-icons.svg), [glue-no-js.min.css](https://www.gstatic.com/glue/v22_2/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v22_2/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v22_2/glue.min.css), [octopus.min.js](https://www.gstatic.com/glue/v22_2/octopus.min.js)
v22_1   | [glue-angular.min.js](https://www.gstatic.com/glue/v22_1/glue-angular.min.js), [glue-detect.min.js](https://www.gstatic.com/glue/v22_1/glue-detect.min.js), [glue-icons.svg](https://www.gstatic.com/glue/v22_1/glue-icons.svg), [glue-no-js.min.css](https://www.gstatic.com/glue/v22_1/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v22_1/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v22_1/glue.min.css), [octopus.min.js](https://www.gstatic.com/glue/v22_1/octopus.min.js)
v22_0   | [glue-angular.min.js](https://www.gstatic.com/glue/v22_0/glue-angular.min.js), [glue-detect.min.js](https://www.gstatic.com/glue/v22_0/glue-detect.min.js), [glue-icons.svg](https://www.gstatic.com/glue/v22_0/glue-icons.svg), [glue-no-js.min.css](https://www.gstatic.com/glue/v22_0/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v22_0/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v22_0/glue.min.css), [octopus.min.js](https://www.gstatic.com/glue/v22_0/octopus.min.js)
v21_0   | [glue-angular.min.js](https://www.gstatic.com/glue/v21_0/glue-angular.min.js), [glue-detect.min.js](https://www.gstatic.com/glue/v21_0/glue-detect.min.js), [glue-no-js.min.css](https://www.gstatic.com/glue/v21_0/glue-no-js.min.css), [glue-vanilla.min.js](https://www.gstatic.com/glue/v21_0/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v21_0/glue.min.css), [octopus.min.js](https://www.gstatic.com/glue/v21_0/octopus.min.js)
v20_0   | [glue-angular.min.js](https://www.gstatic.com/glue/v20_0/glue-angular.min.js), [glue-detect.min.js](https://www.gstatic.com/glue/v20_0/glue-detect.min.js), [glue-vanilla.min.js](https://www.gstatic.com/glue/v20_0/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v20_0/glue.min.css), [hercules.min.css](https://www.gstatic.com/glue/v20_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v20_0/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v20_0/octopus.min.js)
v19_0   | [glue-angular.min.js](https://www.gstatic.com/glue/v19_0/glue-angular.min.js), [glue-detect.min.js](https://www.gstatic.com/glue/v19_0/glue-detect.min.js), [glue-vanilla.min.js](https://www.gstatic.com/glue/v19_0/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v19_0/glue.min.css), [hercules.min.css](https://www.gstatic.com/glue/v19_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v19_0/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v19_0/octopus.min.js)
v18_1   | [glue-detect.min.js](https://www.gstatic.com/glue/v18_1/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v18_1/glue-lite.min.js), [glue-vanilla.min.js](https://www.gstatic.com/glue/v18_1/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v18_1/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v18_1/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v18_1/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v18_1/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v18_1/octopus.min.js)
v18_0   | [glue-detect.min.js](https://www.gstatic.com/glue/v18_0/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v18_0/glue-lite.min.js), [glue-vanilla.min.js](https://www.gstatic.com/glue/v18_0/glue-vanilla.min.js), [glue.min.css](https://www.gstatic.com/glue/v18_0/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v18_0/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v18_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v18_0/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v18_0/octopus.min.js)
v17_2   | [glue-detect.min.js](https://www.gstatic.com/glue/v17_2/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v17_2/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v17_2/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v17_2/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v17_2/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v17_2/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v17_2/octopus.min.js), [octopus.v2.min.js](https://www.gstatic.com/glue/v17_2/octopus.v2.min.js)
v17_1   | [glue-detect.min.js](https://www.gstatic.com/glue/v17_1/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v17_1/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v17_1/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v17_1/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v17_1/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v17_1/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v17_1/octopus.min.js)
v17_0   | [glue-detect.min.js](https://www.gstatic.com/glue/v17_0/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v17_0/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v17_0/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v17_0/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v17_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v17_0/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v17_0/octopus.min.js)
v16_0   | [glue-detect.min.js](https://www.gstatic.com/glue/v16_0/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v16_0/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v16_0/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v16_0/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v16_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v16_0/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v16_0/octopus.min.js)
v15_0   | [glue-detect.min.js](https://www.gstatic.com/glue/v15_0/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v15_0/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v15_0/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v15_0/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v15_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v15_0/hercules.min.js), [octopus.min.js](https://www.gstatic.com/glue/v15_0/octopus.min.js)
v14_0   | [glue-detect.min.js](https://www.gstatic.com/glue/v14_0/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v14_0/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v14_0/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v14_0/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v14_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v14_0/hercules.min.js), [templates.js](https://www.gstatic.com/glue/v14_0/templates.js)
v13_0   | [glue-detect.min.js](https://www.gstatic.com/glue/v13_0/glue-detect.min.js), [glue-lite.min.js](https://www.gstatic.com/glue/v13_0/glue-lite.min.js), [glue.min.css](https://www.gstatic.com/glue/v13_0/glue.min.css), [glue.min.js](https://www.gstatic.com/glue/v13_0/glue.min.js), [hercules.min.css](https://www.gstatic.com/glue/v13_0/hercules.min.css), [hercules.min.js](https://www.gstatic.com/glue/v13_0/hercules.min.js)

## Dependency versions

-   Starting from v28, Glue supports Material 3 components.
    -   Material 2 components are deprecated but not removed, so that users have
        time to migrate their implementations. Material 2 will be removed in a
        future version of Glue.
-   Starting from v24, Glue does not depend on Closure.
-   Starting from v23, Glue does not depend on AngularJS.
-   Starting from v23, Glue supports Material 2 components.

Glue             | AngularJS | Closure Library | Material 2 | Material 3
---------------- | --------- | --------------- | ---------- | ----------
Glue 28.x        | N/A       | N/A             | 9.0.0      | 1.0
Glue 27.x        | N/A       | N/A             | 9.0.0      | N/A
Glue 26.x        | N/A       | N/A             | 9.0.0      | N/A
Glue 25.x        | N/A       | N/A             | 9.0.0      | N/A
Glue 24.x        | N/A       | N/A             | 9.0.0      | N/A
Glue 23.x        | N/A       | v20200315       | 7.0.0      | N/A
Glue 22.x        | 1.6.4     | v20190513       | N/A        | N/A
Glue 21.x        | 1.6.4     | v20190513       | N/A        | N/A
Glue 20.x        | 1.6.4     | v20190513       | N/A        | N/A
Glue 19.x        | 1.6.4     | v20181028       | N/A        | N/A
Glue 18.1.x      | 1.6.4     | v20180716       | N/A        | N/A
Glue 16.x ~ 18.1 | 1.6.4     | v20171112       | N/A        | N/A
Glue 12.x ~ 15.x | 1.5       | v20170218       | N/A        | N/A
Glue 8.x ~ 11.x  | 1.5       | v20160517       | N/A        | N/A
Glue 7.x         | 1.4       | v20160517       | N/A        | N/A
Glue 6.x         | 1.4       | v20160517       | N/A        | N/A
Glue 5.x         | 1.4       | v20160517       | N/A        | N/A
Glue 4.x         | 1.4       | v20160517       | N/A        | N/A
Glue 3.x         | 1.4       | v20160517       | N/A        | N/A
Glue 2.x         | 1.3       | v20160517       | N/A        | N/A
Glue 1.x         | 1.2, 1.3  | v20160517       | N/A        | N/A

## Upgrading

If you are upgrading between **minor versions** of Glue (e.g. v27.0.0 to
v27.1.0), you should not need to make any changes, but should do a spot check of
your component usage just to be sure.

If you are upgrading to a new **major version** of Glue (e.g. v26.0.0 to
v27.0.0) then you may need to make some code changes in your project, depending
on whether any components you are using had breaking changes. Read the
[migration guide](/docs/getting-started/migration-guide.md)
for instructions on how to upgrade.
