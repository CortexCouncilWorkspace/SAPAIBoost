# Getting started

internal link

<!--* freshness: { exempt: true } *-->



Glue is a UI component library for building Google-branded websites, using
[Marketing Web Standards](https://standards.google/guidelines/marketing-web-standards/).


## Why Glue?

internal link

-   Ships with 30+ Google branded UI components, which uses Marketing Web
    Standards.
-   Integrates into any framework using HTML/CSS/TS.
-   Speeds up development cycle for web projects.
-   Works with both internal and external projects.
-   Provides a CDN service.

## Concepts

### Bracket

[Bracket](https://goog-bracket.appspot.com/) is a tool for prototyping,
building, staging, maintaining, and launching marketing websites in external
projects. A `web-standard` scaffold is available for quickly starting up new
Glue-based projects.

### Glue Node package

Glue has been released as an
[external node package](https://source.cloud.google.com/h/webmaster/bs/glue) on
Git-on-Borg. It is versioned based on SEMVER.

### CDN service

Glue CDN is hosted on gStatic, which can be used in both internal and external
projects. The CDN is also versioned based on SEMVER.

## Setup options

-   [Use Glue with Bracket in external projects](https://goog-bracket.appspot.com/#web-standard-es-modules-scss-scaffold)
    -   Use the `web-standard` scaffold when starting a new Bracket project
-   [Use Glue via external Node package](npm.md)
-   [Use Glue via CDN service](cdn.md)
    -   [Glue CDN namespaces](cdn-namespaces.md)

### Additional setup

-   [Use Glue with Material Components for the web](material.md)
-   [IE11 polyfills](/docs/concepts/ie11-polyfill.md)

## Versioning


The external Glue Node package and CDN are versioned. Users are responsible to
upgrade Glue projects based on the [Migration guide](migration-guide.md). All
the release notes can be found [here](release-notes.md)
