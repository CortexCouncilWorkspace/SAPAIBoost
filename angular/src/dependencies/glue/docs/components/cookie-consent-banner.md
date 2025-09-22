IMPORTANT: **This component has been deprecated** - please see internal link
for the replacement.

This documentation is still available for reference but will be removed once
most projects have migrated to internal link

---

# Cookie Consent Banner

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-06-15' }
*-->



-   **Category**: SCSS

**Synonyms:** CCB, Cookie Consent Bar, Consent Banner

Cookie Consent Banner (CCB) lets the user know about the usage of cookies on the
website.

IMPORTANT: Glue only provides styles on top of the base
[Cookie Consent Bar](https://developers.google.com/marketing/agency-guide/analytics/cookie-consent-bar) -
if you have questions or issues regarding the content or functionality of the
component itself, see internal link

## Quick links

<section class="multicol">

**[FILE A BUG (style issues only)](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BCookie-Consent-Banner%5D)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/cookie-consent-banner.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/cookie-consent-banner/"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/cookie-consent-banner/)

## Features

-   Glue provides additional MWS styling on top of the base
    [Cookie Consent Bar](https://developers.google.com/marketing/agency-guide/analytics/cookie-consent-bar)
    designed for a common use case.
-   The CCB has built-in localization features for the website to work in
    different locales.

## Setup

IMPORTANT: Before using the Cookie Consent Bar, register your use at
internal link

NOTE: When implemented, the component will only render if the user's location
(or specified locale) requires a banner to be displayed - for example it will
not be shown if visiting from the US. To test, please use a proxy to simulate
traffic from an eligible region.

### HTML

#### Script

Import this script into your HTML file at the end of the `<body>` tag:

```html
<script
    data-autoload-cookie-consent-bar="true"
    src="https://www.gstatic.com/brandstudio/kato/cookie_choice_component/cookie_consent_bar.v3.js">
</script>
```

For all configuration and localization options, please see the official
[documentation](https://developers.google.com/marketing/agency-guide/analytics/cookie-consent-bar#implementation).

### SCSS

The Cookie Consent Bar uses styles that are independent of Glue. Starting in
Glue v24, you can include the CCB-specific styles directly from the Glue CDN.
Replace `VERSION` to match the version of Glue that you are using, i.e. `v25_0`.

```html
<link href="//www.gstatic.com/glue/VERSION/ccb.min.css" rel="stylesheet">
```

You do not need to use any other Glue styles in order to use the Cookie Consent
Banner styles.

#### Fonts

If you are not already, make sure you are importing Google Sans
[font families](/docs/components/typography.md)

### DOM hierarchy

The default bar style (the same style you’ll see on cookiechoices.org) can be
overridden to fall in line with the appearance of your site. The DOM elements
have been structured with this in mind.

NOTE: The script adds this DOM hierarchy automatically.

```html
<div id="cookieBar">
  <div class="cookieBarInner">
    <span class="cookieBarText"></span>
    <span class="cookieBarButtons">
      <a class="cookieBarButton"></a>
      <a class="cookieBarButton"></a>
    </span>
  </div>
</div>
```

## Overriding styles

Since the CCB is initialized by an external JS file, styling the component
directly by accessing the class / id names is not possible. Hence, to change the
style of your existing CCB, wrap your classes inside the `<body>` tag.

```scss
body #cookieBar {
  background-color: #fff;
}
```

## Accessibility

The CCB should be the first content node in the DOM, so that a screen reader
will access its content first.

If the user scrolls all the way to the bottom of the page without dismissing the
bar, it will cover up content, primarily anything at the bottom of the footer.
