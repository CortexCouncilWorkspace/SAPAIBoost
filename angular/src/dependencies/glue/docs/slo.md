# Glue SLO

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-02-27' }
*-->



This document formalizes the service level that the Glue team aims to achieve
for our library, and outlines the requirements we expect of client teams.

It was last updated on **January 19th, 2023**.

This is separate from the
[Glue Cookie Notification Bar SLO/SLA](/docs/cnb-slo.md).

## Metrics

The Glue team aims to achieve the following metrics.

### Feedback

#### Response Times (General):

-   Questions asked via [Chatroom](https://chat.google.com/room/AAAA1UAVNJU)
    (recommended): Response within 3 business days
-   Questions asked via email (glue-discuss@ or glue-external-users@): Response
    within 3 business days


### Accessibility status

-   Glue+MWS component demos pass Lighthouse with 100% score, except for pure
    utility components or style override components (which are not tested).
-   All Glue+MWS components have achieved, or are in progress towards, a GAR4
    rating, with exceptions as noted above.

Note that while Glue out-of-box meets accessibility standards, your project
still needs to be designed/coded in an accessible manner, and needs its own set
of accessibility testing to confirm it meets Google/industry standards.
Individual components include accessibility notes on where clients need to make
adjustments.

## Client Expectations

### Implementing Glue

Clients will use Glue components as a whole component (using all the provided
HTML/CSS/JS), rather than breaking encapsulation by using only a part of the
provided component (e.g. using Glue CSS to apply to hand-rolled HTML).

When customizing component styles, clients will prioritize using the supported
provided Sass mixins or variables where available, rather than add their own
custom CSS or SCSS/Sass. Similarly, if customizing component functionality,
clients will prioritize using Glue-provided APIs. Clients understand that
additional customization of Glue may not be fully supported by the Glue team,
and may break if Glue code is updated.

Some components have subcomponents in order to segment out functionality. Any
subcomponents meant for clients' consumption will be exported from the main
component and listed in the documentation; otherwise they are considered for
internal Glue use only.

### Testing

Clients are expected to catch their own project regressions, such as through
unit tests,
[visual regression tests](/docs/concepts/vrts.md), and
project QA.

Glue runs visual regression tests on base components. Clients with VRTs in
google3 should add them to
[Glue's test suite](/docs/concepts/vrts.md),
to catch visual regressions that may arise from changes in base components.

Clients should run accessibility testing on their project to ensure it meets
Google/industry standards.

### Providing Feedback

If clients find issues with Glue, they should contact the Glue team as noted in
the [Feedback section](#feedback), above. In cases of bug reports, clients
should provide as much detail as possible to make it easier for the Glue team to
reproduce the issue (version, platform, component, demo code, preview server,
etc.)

## Supported Platforms

### Browsers

Support is for the most recent version + 2 versions back for each browser, as
tested by the Cybage QA team.

#### Desktop

-   Chrome (Windows, Windows High Contrast Mode, Mac OS X)
-   Safari (Mac OS X)
-   Firefox (Windows, Windows High Contrast Mode, Mac OS X)
-   Edge (Windows, Windows High Contrast Mode)
-   Opera (Windows)

#### Mobile

Mobile QA is done on both a phone-sized and a tablet-sized device, when
possible.

-   Safari (iOS)
-   Chrome (Android)

### Screen Readers

Glue supports the following screen reader/browser combinations, as tested by the
Cybage Accessibility QA team.

#### Desktop

-   JAWS/Firefox on Windows
-   NVDA/Firefox on Windows
-   VoiceOver/Chrome on Mac OSX
-   ChromeVox/Chrome on ChromeOS

#### Mobile

-   TalkBack/Chrome on Android
-   VoiceOver/Safari on iOS

## Partially Supported Platforms

We provide partial support to some older browsers. Content is expected to be
accessible and viewable, but advanced layout and/or functionality may be
lacking. Bugs filed against these browsers will usually be prioritized lower
than bugs filed against fully supported platforms unless there is a major
security or related concern.

-   IE 11, with the following additional supports
    -   [IE11 polyfill](http://www.gstatic.com/glue/polyfill.min.js) to backfill
        some functionality
        ([internal doc](/docs/concepts/ie11-polyfill.md) |
        [external doc](https://source.cloud.google.com/h/webmaster/bs/glue/+/master:docs/concepts/ie11-polyfill.md))
    -   [svg4everyone](https://www.gstatic.com/external_hosted/svg4everybody/svg4everybody.min.js)
        so that inline SVGs are rendered
        ([internal doc](/docs/components/icons.md)
        |
        [external doc](https://source.cloud.google.com/h/webmaster/bs/glue/+/master:docs/components/icons.md))

## Unsupported Platforms

Other platforms are not supported at this time. Our efforts are focused on
platforms with high usage metrics and testing automation ability, and
furthermore is limited by our capacity.

While you may still file bugs against unsupported platforms, these bugs will be
prioritized lower than bugs filed against fully supported/partially supported
platforms unless there is a major security or related concern.

## Components

Components Glue components are provided as-is, and come ready out-of-box with
core functionality and layouts through the default setup as provided in Glue
documentation. Some components also provide variants to cover additional common
use cases, also provided in Glue documentation.

A few components provide functionality but no MWS styled layouts (such as
filters). Until Glue is able to provide MWS styles to these components (pending
design and implementation), you will need to provide your own styles to the
component.

A few components are only styled when used as a subcomponent in a larger
component (such as copy, when used within the social component.) If you wish to
use these on their own, you will need to provide your own styles to the
component.

If you have an issue with customizing a component layout or functionality,
contact the Glue team. However, note that the Glue team prioritizes styles and
functionality that support MWS, and may not be able to provide full support.

## External Package

The Glue external package is hosted on
[Git-on-Borg](https://webmaster.googlesource.com/bs/glue). The package
distributes JS, SCSS and type definition files, and can be used with both JS and
TS projects. Clients are responsible for installing the following management
systems:

-   Glue versions starting at v25
    -   Does not depend on specific Node version
-   Glue versions before v25
    -   Node v10.15.3
    -   npm v6.4.1

Other dependencies are installed along with Glue and can be seen in Glue's
`package.json`.


## Update Policy for NPM/CDN Users

The [external Glue package](https://webmaster.googlesource.com/bs/glue) and
[Glue CDN](/docs/getting-started/cdn.md) are versioned
following semver conventions. Breaking changes will be released into a new major
version. Clients can choose to stay on their current version or migrate to the
newer version with the
[migration guide](/docs/getting-started/migration-guide.md)
provided by the Glue team. Glue team will try to group breaking changes together
to reduce the frequency of major releases vs minor releases.

Glue team recommends upgrading to the latest version of Glue when possible in
order to pick up the latest features and bug fixes.
