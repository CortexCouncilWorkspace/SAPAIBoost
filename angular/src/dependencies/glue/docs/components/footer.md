# Footer

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-09-05' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

The footer is placed at the bottom of every page and includes links to important
top-level Google pages. It can also contain social media links and/or
site-specific links. The sitelinks section of the footer is a responsive
component that changes between expansion panels on mobile and a column/grid
layout on desktop.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BFooter%5D)**

**[SCSS SOURCE](/src/footer/_index.scss)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/fundamentals/footer.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/footer/global-sitelinks-4col"
        width="100%" height="550" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/footer/global-sitelinks-4col)

## Features

-   Multiple sections can be included in the Footer to provide quick links to
    resources
-   Global section **is required** and contains standardized links used on all
    Google pages
-   Sitelinks section is optional and provides 1–5 columns of links to pages in
    your site, or links to pages adjacent to your site
    -   Uses Responsive Monitor to change rendering between column/grid layout
        (desktop) and expansion panels (mobile)
    -   Can specify at which breakpoint to switch rendering mode
    -   Falls back to stacked layout on mobile
-   Social media section is optional and adds links to your site's social media
    presence

## Setup

### Dependencies

-   SCSS
    -   [Accessibility Classes](/docs/components/accessibility-classes.md)
    -   [Icons](/docs/components/icons.md)
    -   [Spacers](/docs/components/spacers.md)
    -   [Typography](/docs/components/typography.md)
    -   If adding social media section
        -   [Social](/docs/components/social.md)
        -   [Tooltip](/docs/components/tooltip.md)
    -   If adding sitelinks section
        -   [Breakpoints](/docs/components/breakpoints.md)
        -   [Expansion panels](/docs/components/expansion-panels.md)
-   TS
    -   If adding sitelinks section
        -   [Expansion panels](/docs/components/expansion-panels.md)
    -   If adding social media section
        -   [Social](/docs/components/social.md)
        -   [Tooltip](/docs/components/tooltip.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides.

```scss
// Import Glue core layout components
@use '@google/glue/dist/breakpoints'; // if adding sitelinks section
@use '@google/glue/dist/core';
@use '@google/glue/dist/icons';
@use '@google/glue/dist/spacers';
@use '@google/glue/dist/typography';

// Import Glue UI components
@use '@google/glue/dist/footer';

// Import expansion panels if adding sitelinks section
@use '@google/glue/dist/expansionpanels';

// Import social and tooltip if adding social media section
@use '@google/glue/dist/social';
@use '@google/glue/dist/tooltip';

// Import Glue layout overrides
@use '@google/glue/dist/accessibility';
```


### HTML

The global section is always required in the footer. It includes links to the
Google homepage as well as terms/policies/etc. **The global links should not be
altered,** except to point to the appropriate language/regional version of that
page.

The extra links section on the right is optional, but can contain a link to your
site's help center, additional links per legal requirements, and/or a site
switcher to swap between different languages/regions. You will currently need to
implement your own JS to actually change the site when a different
language/region is chosen in the site switcher.

Use a [vertical spacer](/docs/components/spacers.md) to
adjust the distance between your site's content and the footer.

Adjust heading levels if needed to match the content structure of your site.

```html
<footer class="glue-footer glue-spacer-3-top">
  <h2 class="glue-visually-hidden">Footer links</h2>
  <section class="glue-footer__global">
    <div class="glue-footer__logo">
      <a href="https://www.google.com" title="Google">
        <svg role="presentation" aria-hidden="true" class="glue-footer__logo-img">
          <use href="/path/to/glue-icons.svg#google-solid-logo"></use>
        </svg>
      </a>
    </div>

    <ul class="glue-footer__global-links glue-no-bullet" role="list">
      <li class="glue-footer__global-links-list-item">
        <a class="glue-footer__link" href="https://about.google/">
          About Google
        </a>
      </li>

      <li class="glue-footer__global-links-list-item">
        <a class="glue-footer__link" href="https://about.google/products/">
          Google products
        </a>
      </li>

      <li class="glue-footer__global-links-list-item">
        <a class="glue-footer__link" href="https://policies.google.com/privacy">
          Privacy
        </a>
      </li>

      <li class="glue-footer__global-links-list-item">
        <a class="glue-footer__link" href="https://policies.google.com/terms">
          Terms
        </a>
      </li>
    </ul>

    <ul class="glue-footer__global-links glue-footer__global-links--extra glue-no-bullet"
        role="list">
      <li class="glue-footer__global-links-list-item
          glue-footer__global-links-list-item--extra">
        <a class="glue-footer__link" href="https://support.google.com/?hl=en">
          <svg role="presentation" aria-hidden="true" class="glue-icon
              glue-icon--24px glue-icon--footer-help">
            <use href="/path/to/glue-icons.svg#help"></use>
          </svg>
          Help
        </a>
      </li>
      <li class="glue-footer__global-links-list-item
          glue-footer__global-links-list-item--extra">
        <!-- This language selector is a placeholder -->
        <select aria-label="Change language" name="lang-selector" id="lang-selector"
            class="glue-form__dropdown glue-footer__lang-dropdown">
          <option value="https://www.google.com/intl/en/mysite">
            English
          </option>
          <option value="https://www.google.com/intl/pt-BR/mysite">
            Português – Brasil
          </option>
          <option value="https://www.google.com/intl/ja/mysite">
            日本語
          </option>
        </select>
      </li>
    </ul>
  </section>
</footer>
```

### TS Initialization

This is only required when including a sitelinks section, to switch between
expansion panels (accordion) UI on mobile.

```ts
import {Footer, FooterOptions} from '@google/glue';

const footerOpts: Partial<FooterOptions> = {
  columnCount: 4
};

const footerEl = document.querySelector<HTMLElement>('.glue-footer');
if (footerEl) new Footer(footerEl, footerOpts);
```


## Constructor Options

Name              | Type    | Default Value | Description
----------------- | ------- | ------------- | -----------
panelsBreakpoints | Array   | `['sm']`      | An array of [named breakpoints](/docs/components/breakpoints.md) where expansion panels will display
isAnimated        | Boolean | `True`        | Whether the panels are animated when expanding/collapsing.
columnCount       | Number  | `4`           | The number of columns in the footer. Maximum value is 5.

## Public Methods

Method    | Default Parameters | Description
--------- | ------------------ | -----------
destroy() | None               | Removes responsive monitor and expansion panels from the footer sitelinks section

## Variations

### Language selector

NOTE: The current language selector is a placeholder only; it offers basic
styling but does not implement any logic that navigates the user to the new URL
when the dropdown is changed. Currently, you will need to provide logic to
change the URL.

When displaying language/region options in the dropdown, follow these
guidelines:

-   The options in the locale switcher should always be in their own language
    (e.g., Spanish should be listed as “Español” regardless of the page's
    current language.)
-   The options in the locale switcher should be ordered alphabetically.
-   Selecting an option in the locale switcher sends users to the same page, but
    in the selected language/region.
-   If a website has translated versions but the content doesn’t vary by
    location, the locale switcher should lead with the language. Examples:
    “English” and “Español”.
    -   If there is a language variant, it should be added after the language
        designation and separated by an en dash (–). Examples: “Português –
        Brasil” and “中文 – 简体”.
-   If a website has localized versions for different countries, or regions with
    locale-specific content, display the country or region name first, followed
    by the language (if needed) and separated by an en dash (–). Examples:
    “Australia – English” and “España – Español”.
    -   If there is a language variant, include after the region and language,
        in parenthesis. Examples: “Estados Unidos – Español (Latinoamérica)” and
        “中国 – 中文（简体中文）”

Note that screen readers may not be able to pronounce localized language names
properly; this is a known issue that may be affected by page language, the
user's browser language settings, and/or the user's screen reader settings.

### Sitelinks section

If your site contains a number of subpages, include a sitelinks section. This
serves as a sitemap. You can add between 2 and 5 columns of links.

The site links section goes above the `glue-footer__global` section. Adjust the
`glue-footer__site-links-grid--X-col` modifier to match the number of columns
your site links section needs (maximum 5 columns).

If you are using the responsive sitelinks component, you need to add IDs to each
column (`<div class="glue-footer__site-links-column" id="column-X">`) and each
column's link list (`<ul class="glue-footer__site-links-list glue-no-bullet"
id="column-X-content">`), where `X` denotes the number of that column.

```html
<footer class="glue-fullbleed glue-footer glue-spacer-3-top">
  <h2 class="glue-visually-hidden">Footer links</h2>
  <nav class="glue-footer__site-links">
    <div class="glue-footer__site-links-grid glue-footer__site-links-grid--5-col">
      <div class="glue-footer__site-links-column">
        <h3 class="glue-footer__site-links-header">
          <span class="glue-footer__site-links-header-button" id="column-1-toggle">
            <span class="glue-footer__site-links-header-text">
              Link column 1 header
            </span>
            <svg role="presentation" aria-hidden="true"
                 class="glue-icon glue-icon--footer glue-expansion-panel__header-arrow">
              <use href="/public/icons/glue-icons.svg#expand-more"></use>
            </svg>
          </span>
        </h3>
        <div class="glue-footer__site-links-list" id="column-1-content">
          <ul class="glue-no-bullet" role="list">
            <li class="glue-footer__site-links-list-item">
              <a class="glue-footer__link" href="https://www.google.com/mysite/linkone">
                Link one
              </a>
            </li>
            <!-- addition links in column -->
          </ul>
        </div>
      </div>
      <!-- additional columns (maximum 5 columns total) -->
    </div>
  </nav>

  <section class="glue-footer__global">
    <!-- see above for full global footer code -->
  </section>
</footer>
```

#### Changing panel expand/collapse animation

If you would like to change the panel animation you will need to update the SCSS
or TS.

##### Changing the timing (SCSS)

If you'd like to update the animation timing from the default value of 200ms,
you can override the default values in the SCSS when importing the footer
styles. This is separate from the timing for general expansion panels.

```scss
@use '@google/glue/dist/footer' with (
  $animation-timing: 500ms
);
```

##### Removing animation completely

To turn off animation, set `isAnimated` to false and pass it into the sitelinks
constructor.

```ts
// TypeScript
const footerOpts: Partial<FooterOptions> = {
  columnCount: 4,
  isAnimated: false
};

new Footer(footerEl, footerOpts);
```

You do not need to update the SCSS in this case.

#### Changing the breakpoint

If you would like expansion panels to render on more breakpoints than just small
(mobile), you will need to update both the TS and the SCSS.

See the [breakpoints](/docs/components/breakpoints.md)
documentation for details on notation and values.

##### TS

Pass in an array of named breakpoints where you would like expansion panels to
be rendered to the sitelinks component.

```ts
// TypeScript
const footerOpts: Partial<FooterOptions> = {
  columnCount: 4,
  panelsBreakpoints: ['sm', 'md']
};

new FooterSitelinks(footerEl, footerOpts);
```

The default array value is `['sm']`, or render expansion panels only on the
small/mobile viewport.

##### SCSS

Override the breakpoint variable when importing footer sitelink styles to change
when the layout swaps to columns.

```scss
@use '@google/glue/dist/footer' with (
  $breakpoint-min-columns: 'lg'
);
```

The default value is `md`, or render columns starting at the medium breakpoint.

### Social Media section

You can add an optional social media section above the sitelinks and global
sections of the footer. Refer to
[Social](/docs/components/tooltip.md) for icons and
additional information. The social media section in Footer uses Footer-specific
colors, so you do not need to worry about adding a color variation class.

#### HTML

```html
<footer class="glue-fullbleed glue-footer glue-spacer-3-top">
  <h2 class="glue-visually-hidden">Footer links</h2>
  <section class="glue-footer__upper">
    <section class="glue-social">
      <div class="glue-social__group">
        <h3 class="glue-social__title glue-social__title--inline">
          Follow us
        </h3>
        <ul class="glue-social__list" role="list">
          <li class="glue-social__item glue-social__tooltip">
            <a class="glue-social__link glue-social__tooltip-trigger"
                href="https://www.youtube.com/user/Google"
                target="_blank" rel="noopener"
                aria-labelledby="footer-social-youtube-tooltip">
              <svg role="presentation" aria-hidden="true"
                  class="glue-icon glue-icon--24px glue-icon--social">
                <use href="/path/to/glue-icons.svg#video-youtube"></use>
              </svg>
            </a>
            <span class="glue-social__tooltip-content" id="footer-social-youtube-tooltip">
              Follow us on YouTube
            </span>
          </li>
          <!-- additional Follow Us links -->
        </ul>
      </div>
    </section>
  </section>

  <nav class="glue-footer__site-links">
    <!-- see above for site links code -->
  </nav>

  <section class="glue-footer__global">
    <!-- see above for full global footer code -->
  </section>
</footer>
```

#### TS initialization

Initialize the footer's social component. This will initialize the tooltip
subcomponents.

```ts
import {Social} from '@google/glue';

const footerSocialEl = document.querySelector<HTMLElement>('.glue-footer .glue-social');
if (footerSocialEl) new Social(footerSocialEl);
```


### Cookies management controls

If you're using the
[Cookie notification bar](/docs/components/cookienotificationbar.md),
component please see the
[documentation](/docs/components/cookienotificationbar.md)
to add a *"Cookies management controls"* button to the footer.

## Accessibility

-   Include a visually hidden header at the start of footer with the content
    "Footer links" to provide waypoint navigation for screen readers. Adjust
    heading level for this title and social/sitelinks titles as needed to match
    your page's structure.
-   Include `role="list"` on `ul` elements so that screen readers understand
    they are lists (because they are styled without bullets, some screen readers
    will treat them as a generic container unless specified).
-   For social links, include a tooltip that describes what the link does (such
    as "Follow us on YouTube"). Refer to
    [Social](/docs/components/social.md) for additional
    accessibility guidelines.

## Variation demos

-   [Global only](https://28-0-dot-glue-demo.appspot.com/components/footer/global-only)
-   [Global only (with cookies management controls)](https://28-0-dot-glue-demo.appspot.com/components/cookienotificationbar/2A)
-   [Global + social](https://28-0-dot-glue-demo.appspot.com/components/footer/global-social)
-   [Global + sitelinks (3 columns) + social](https://28-0-dot-glue-demo.appspot.com/components/footer/global-sitelinks-3col-social)
-   [Global + sitelinks (4 columns)](https://28-0-dot-glue-demo.appspot.com/components/footer/global-sitelinks-4col)
-   [Global + sitelinks (5 columns) + social](https://28-0-dot-glue-demo.appspot.com/components/footer/global-sitelinks-5col-social)
