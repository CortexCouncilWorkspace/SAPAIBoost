# Cookie Notification Bar

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-01-10' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** CCB, CNB, Cookie Consent Banner, Cookie Consent Bar, Consent
Banner, Consent Bar

Marketing's implementation of internal link

Jump directly to [setup](#setup).

## SLO/SLA

Understand and follow the
[Glue Cookie Notification Bar SLO/SLA](/docs/cnb-slo.md).
This is separate from the main [Glue SLO](/docs/slo.md).

## Implementation help

### Troubleshooting

Review the topics under [Troubleshooting](#troubleshooting-faq) to see if your
question is already covered.


### Chat room

[Cookie Notification Bar Users (external)](https://mail.google.com/chat/u/0/#chat/space/AAAANQqNlw0)
is the Google Chat room for Cookie Notification Bar users to ask questions and
get help from other users and from Glue developers. It is available to external
users. Glue dev team aims to respond to chat inquiries within 3 business days.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BCookie%20Notification%20Bar%5D)**

**[SCSS SOURCE](/src/cookienotificationbar/_index.scss)**

**[TS SOURCE](/src/cookienotificationbar/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/cookie-notification-bar.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/cookienotificationbar/2A"
        width="100%" height="550" style="border: 0; max-width: 760px;"></iframe>

## Features

-   Localized into
    [~40 languages](#why-is-it-in-english-what-languages-are-available) (and
    approved by privacy/legal)
-   Integrates into the default marketing
    [Google Tag Manager](#google-tag-manager) setup
-   Only shows the banner to users in
    [eligible countries](https://goto.google.com/consent-bump-countries)
-   Supports
    [category 2A & 2B](https://goto.google.com/cookiebar#2-google-non-product-or-marketing-sites-and-apps)
    websites
-   Category 2A sites will
    [fallback](#why-is-it-not-showing-the-consent-button-if-the-category-is-set-to-2a)
    to 2B for users in [EEA regions](https://goto.google.com/dma-countries)

## Setup

### Dependencies

#### Google Tag Manager

Follow the guidance at internal link to set up the GTM
container, ensuring the bootstrap is added to the page in the documented way.

```js
window.dataLayer = window.dataLayer || [];
// Any initial page load dataLayer.push should be placed here

function glueCookieNotificationBarLoaded() {
  // <GTM BOOTSTRAP HERE>
}
```

#### Fonts

**Skip this section if your site already uses
[Glue typography](/docs/components/typography.md),**
otherwise import the required *Google Sans* and *Google Sans Text* fonts from
the Google Fonts API. Use `preconnect` and `preload` to optimize loading and
first render.

```html
<head>
  ...
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Google+Sans+Text:wght@400&family=Google+Sans:wght@500&display=swap" as="style">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Text:wght@400&family=Google+Sans:wght@500&display=swap">
  ...
</head>
```

For Arabic, Chinese, Japanese, and Korean languages, please follow
[Glue typography implementation](/docs/components/typography.md)
to import additional language-specific fonts.

### CSS

Import the styles directly from the CDN - you do not need to use or import any
other Glue styles in order to use the Cookie Notification Bar.

```html
<head>
  ...
  <link href="https://www.gstatic.com/glue/cookienotificationbar/cookienotificationbar.min.css" rel="stylesheet">
  ...
</head>
```

### JS

Import the script at the bottom of your page, which will automatically load an
instance of the component. [Options](#options) can be set via data attributes
(by prefixing the option name with `data-glue-cookie-notification-bar`).

```html
<body>
  ...
  <script src="https://www.gstatic.com/glue/cookienotificationbar/cookienotificationbar.min.js"
          data-glue-cookie-notification-bar-category="2A"
          data-glue-cookie-notification-bar-site-id="google.com/subdirectory">
  </script>
  ...
</body>
```

If you need access to the component, it is available at
`window.glue.CookieNotificationBar.instance` - see
[public methods & properties](#public-methods-properties) for api details and
[cookienotificationbar.d.ts](https://www.gstatic.com/glue/cookienotificationbar/cookienotificationbar.d.ts)
for type definitions you can use in your project.

#### Non-autoload

If you do not want to autoload the component, add the
`data-glue-cookie-notification-bar-autoload=false` attribute to the script and
then initialize through `window.glue.CookieNotificationBar`. [Options](#options)
can be set via the second argument to the constructor (with the option names
converted to camel case - for example `site-name` becomes `siteName`).

```html
<script src="https://www.gstatic.com/glue/cookienotificationbar/cookienotificationbar.min.js"
        data-glue-cookie-notification-bar-autoload="false">
</script>
```

```ts
const cookieNotificationBar =
    new window.glue.CookieNotificationBar(document.body, {
      category: window.glue.CookieNotificationBar.category.TWO_A,
      siteId: 'google.com/subdirectory',
    });
```

### HTML

**For category 2A sites**, a *Cookies management controls* button is required.
The component will automatically localize the content and only show it to
eligible users. If using the
[Glue Footer](/docs/components/footer.md), it is recommended
to place this button as the last item in the global links, otherwise the snippet
below can be placed anywhere on the page (and is the developer's responsibility
to style accordingly).

```html
<button aria-hidden="true" class="glue-cookie-notification-bar-control">
  Manage cookies
</button>
```

#### Glue v22+

```html
<ul class="glue-footer__global-links glue-no-bullet" role="list">
  ...
  <li aria-hidden="true" class="glue-footer__global-links-list-item">
    <button aria-hidden="true" class="glue-footer__link glue-cookie-notification-bar-control">
      Cookies management controls
    </button>
  </li>
</ul>
```

#### Glue v21

```html
<ul class="glue-footer__global-links glue-no-bullet">
  ...
  <li aria-hidden="true" class="glue-footer__global-links-list-item">
    <a aria-hidden="true"
       class="glue-footer__link glue-cookie-notification-bar-control"
       role="button"
       tabindex="0">
      Cookies management controls
    </a>
  </li>
</ul>
```

#### Glue/Hercules v20-

```html
<ul class="h-c-footer__global-links h-no-bullet">
  ...
  <li aria-hidden="true" class="h-c-footer__global-links-list-item">
    <a aria-hidden="true"
       class="h-c-footer__link glue-cookie-notification-bar-control"
       role="button"
       tabindex="0">
      Cookies management controls
    </a>
  </li>
</ul>
```


## Implementation

### Options

The following options can be passed to the component via either data attributes
or the constructor (depending on [implementation](#setup)).

Name       | Type                  | Default value                   | Description
---------- | --------------------- | ------------------------------- | -----------
`analytics-storage` | boolean | `false` | The default granted status for anaytics storage on a 2A site (if setting to `true`, please ensure this has been signed off by PCounsel).
`category` | [Category](#category) | `"2A"`                          | The site's category as defined by internal link
`language` | string                | `document.documentElement.lang` | The language (iso code) to render the component in - used when the language required does not match that of the document.
`site-id`  | string                | `location.host`                 | The unique identifier (“site”) to store consent under (eg. google.com/subdirectory or subdomain.withgoogle.com). This is also displayed in the UI.
`auto-margin-class` | string | `"glue-footer"` | The class name of an element on the page to auto-adjust margin-bottom so that the component does not cover up page content.

### Public methods & properties

Property   | Value               | Description
---------- | ------------------- | -----------
`options`  | [Options](#options) | The options the component was instantiated with.
`root`     | `HTMLElement`       | The parent element containing the component.
`status`   | [Status](#status)   | The current consent status of the user.
`visible`  | `boolean`           | Returns whether the component ui is currently visible on screen.

Method     | Signature                                                         | Description
---------- | ----------------------------------------------------------------- | -----------
`destroy ` | `() => void`                                                      | Removes the component from the page, and cleans up any management control buttons.
`listen`   | `(event: string, callback: (event: CustomEvent) => void) => void` | Subscribes the callback to the event specified (see [Events](#events)).
`open`     | `(focus?: boolean) => void`                                       | Opens the component ui (and moves keyboard focus to it if the param is true).
`unlisten` | `(event: string, callback: () => void) => void`                   | Unsubscribes the callback to the event specified.


### Events

The following events can be subscribed to via
[`.listen()`](#public-methods-properties).

#### loaded

Triggered when the config has been loaded, emitting the
[consent status](#status) of the user as well as whether they're visiting from
an eligible region within `event.detail`.

```ts
const {instance, status: CookieNotificationBarStatus} =
    window.glue.CookieNotificationBar;

instance.listen('loaded', (event) => {
  // event.detail =
  //     {eea?: true, required: boolean, status: CookieNotificationBarStatus}
  if (event.detail.status === CookieNotificationBarStatus.ACCEPTED) {
    // User has previously granted or from an non-eligible region
  }
});
```

Note: The `eea` property in `event.detail` will only be present if users
visiting from an EEA region and on a category 2A website.

#### statuschange

Triggered when a user updates their consent status via the UI, emitting the
[consent status](#status) of the user within `event.detail`.

```ts
const {instance, status: CookieNotificationBarStatus} =
    window.glue.CookieNotificationBar;

instance.listen('statuschange', (event) => {
  // event.detail = {status: CookieNotificationBarStatus}
  if (event.detail.status === CookieNotificationBarStatus.ACCEPTED) {
    // User has granted
  }
});
```

#### visibilitychange

Triggered when the component ui is shown or hidden, emitting the visibility
value within `event.detail`.

```ts
const {instance} = window.glue.CookieNotificationBar;

instance.listen('visibilitychange', (event) => {
  // event.detail = {visible: boolean}
  if (event.detail.visible) {
    // Cookie Notification Bar is being shown
  }
});
```

### Enums


#### Category

The site's category as defined by internal link available at
`window.glue.CookieNotificationBar.category`. The string values provided here
can be used if setting options via [data attributes](#js).

Key     | String | Description
------- | ------ | -----------
`TWO_A` | `'2A'` | Sites that may use cookies for personalization or advertising.
`TWO_B` | `'2B'` | Sites that do NOT use cookies for personalization and advertising.

#### Status

The consent status of the user, available at
`window.glue.CookieNotificationBar.status`.

Key        | Description
---------- | -----------
`ACCEPTED` | User has accepted to the use of cookies for the activities defined by the category.
`REJECTED` | User has rejected to the use of cookies.
`UNKNOWN`  | User has yet to accept/reject the use of cookies, or their previous action has now expired.

## Accessibility

-   All accessibility labels and attributes are handled by the component.
-   If changing the parent of the Cookie Notification Bar, ensure it remains the
    first content node in the DOM so a screen reader accesses it before the rest
    of the site.
-   When adding the *Cookies management controls* button, ensure
    `aria-hidden="true"` is set by default - the component will then remove this
    attribute if the Cookie Notification Bar is required.
-   The component will automatically add/remove margin-bottom on the element
    identified by the [`auto-margin-class` option](#options) to prevent the
    component from covering content on the page. By default this is
    `glue-footer`, so any site already using
    [Glue Footer](/docs/components/footer.md) does not need
    to make any changes to implementation.
    -   If you are not using Glue Footer, you can pass in your own class name
        identifier, generally referring to the last visible element on the page
        (like your own site's footer.)
    -   If an element with that class name is not found, the component will not
        do anything. This means you can disable the auto-adjustment on Glue
        Footer by passing in a non-existent class name like `glue-null`.

## Troubleshooting / FAQ

### Cookie Notification Bar is not showing / showing the wrong version

The Cookie Notification Bar will only be shown if the user is visiting from an
eligible region, so will not be visible if testing from elsewhere (eg. United
States). The serving infrastructure (SCS) uses multiple signals to determine
which location and language is given to users.


### Why is it in English / what languages are available?

If the site is in a language that is listed below (our currently supported
languages), please check that the [`language` option](#options) is being set to
the correct code (the value in brackets). However, if it is not in this list,
the content of the bar will default to English - **this behavior is expected and
approved by legal**.

-   Arabic (`ar`)
-   Bulgarian (`bg`)
-   Catalan (`ca`)
-   Czech (`cs`)
-   Danish (`da`)
-   German (`de`)
-   Greek (`el`)
-   English (`en`)
-   English - UK (`en-GB`)
-   Basque (`eu`)
-   Spanish (`es`)
-   Spanish - Latin America (`es-419`)
-   Estonian (`et`)
-   Finnish (`fi`)
-   French (`fr`)
-   French - Canada (`fr-CA`)
-   Galician (`gl`)
-   Croatian (`hr`)
-   Hungarian (`hu`)
-   Icelandic (`is`)
-   Italian (`it`)
-   Hebrew (`iw`)
-   Japanese (`ja`)
-   Korean (`ko`)
-   Lithuanian (`lt`)
-   Latvian (`lv`)
-   Maltese (`mt`)
-   Dutch (`nl`)
-   Norwegian (`no`)
-   Polish (`pl`)
-   Portuguese - Brazil (`pt-BR`)
-   Portuguese - Portugal (`pt-PT`)
-   Romanian (`ro`)
-   Russian (`ru`)
-   Slovak (`sk`)
-   Slovenian (`sl`)
-   Serbian (`sr`)
-   Swedish (`sv`)
-   Turkish (`tr`)
-   Ukrainian (`uk`)

### Why is it not showing the consent button if the category is set to 2A?

Due to policy requirements, visitors to category 2A websites from
internal link (also understood as EEA regions) are unable to give consent,
with website expected to behave similarly to 2B. Therefore the Cookie
Notification Bar renders a dismissible message rather than one with an option to
consent.

If you were expecting a 2A bar with consent, ensure the
[category option](#options) is set to `2A` and the user is visiting from a
non-EEA eligible region (eg. UK).


### How can I spoof a different country?

You can use internal link (or another extension to spoof your IP) to
proxy your traffic from almost anywhere. It's worth double checking that
Polyjuice is active on your page (a hard refresh may help), as it may take a
little while to take effect or old requests may be cached.

Note that spoofing your IP will prevent access debugging parameters/headers
while it is active. Also, extensions are typically disabled in incognito mode so
this will not work if you are testing via this method.

### Why is the typography rendering so large?

The sizing of the Cookie Notification Bar is controlled by the root element's
font size
([rem](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units))
and may differ between sites - however it is expected that all sites that have a
final computed rem value of 18px or less should display the component at a
consistent size. If your root element has a larger font size set, you can
override the component's base font size manually - it is expected that the value
set here should equal 16px.

```scss
.glue-cookie-notification-bar {
  // if html font size = 20px
  font-size: .8rem;  // 16 / 20 = 0.8
}
```

### Why is it covering content on the page / adding extra space to the page?

The Cookie Notification Bar appears fixed to the bottom of the viewport, which
may cover content. You can pass in an element reference via the
[`auto-margin-class` option](#options), which should be the last element on the
page visually, and Cookie Notification Bar will automatically update its
margin-bottom to accommodate the Cookie Notification Bar height. If this element
is not found, no adjustments will be made. By default, this element is
`glue-footer`, so [Glue Footer](/docs/components/footer.md)
users do not need to make any changes.


## Variation Demos

-   [2A site example](https://28-0-dot-glue-demo.appspot.com/components/cookienotificationbar/2A)
-   [2B site example](https://28-0-dot-glue-demo.appspot.com/components/cookienotificationbar/2B)
