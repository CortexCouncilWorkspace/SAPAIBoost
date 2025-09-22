# Social

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-09-05' }
*-->



-   **Category**: SCSS
-   **Category**: TypeScript

**Synonyms:** Social Media, Share, Follow

Displays the social sharing icons for X, Facebook, and others.

## Quick links

<section class="multicol">

**[FILE A BUG](https://b.corp.google.com/issues/new?component=86195&template=326202&title=%5BSocial%5D)**

**[SCSS SOURCE](/src/social/_index.scss)**

**[TS SOURCE](/src/social/index.ts)**

**[BRAND STANDARDS](https://standards.google/guidelines/marketing-web-standards/components/share-follow.html)**

</section>

## Live Demo

<iframe src="https://28-0-dot-glue-demo.appspot.com/standards-demos/components/social/static/"
        width="100%" height="400" style="border:0;max-width:760px;"></iframe>

[View demo](https://28-0-dot-glue-demo.appspot.com/standards-demos/components/social/static/)

## Features

-   Provides links to approved social networks
-   Links can expand outward from a trigger to save space
-   Icons can be full color, monochrome, or partial monochrome (social networks
    in their own color, email/share link in black)
-   Social can be placed adjacent to shareable content or as a persistent widget
    on the side/bottom of the viewport

Social links have a separate implementation when used as part of
[Footer](/docs/components/footer.md).

## Setup

For general social media guidelines, access internal link

### Dependencies

-   SCSS
    -   [Icons](/docs/components/icons.md)
    -   [Tooltips](/docs/components/tooltip.md)
    -   [Typography](/docs/components/typography.md)
    -   If using expansion panels
        -   [Buttons](/docs/components/buttons.md)
        -   [Expansion panels](/docs/components/expansion-panels.md)
    -   If using persistent social
        -   [Accessibility classes](/docs/components/accessibility-classes.md)
-   TS
    -   [Tooltips](/docs/components/tooltip.md)
    -   If using expansion panels
        -   [Expansion panels](/docs/components/expansion-panels.md)

### Icons

Import SVG assets as per the
[icons documentation](/docs/components/icons.md).

### SCSS

This is a UI component, and should be imported after Glue core layout
components, but before layout overrides. Expansion panels are only needed if you
are using that feature of social.

```scss
// Import Glue core layout components
@use '@google/glue/dist/core';
@use '@google/glue/dist/buttons'; // If using expansion panels
@use '@google/glue/dist/icons';
@use '@google/glue/dist/typography';

// Import Glue UI component dependencies
@use '@google/glue/dist/expansionpanels'; // If using expansion panels
@use '@google/glue/dist/tooltips';

// Import Social component
@use '@google/glue/dist/social';

// Import Glue layout overrides
@use '@google/glue/dist/accessibility'; // If using persistent social
```


### HTML

-   Use [spacers](/docs/components/spacers.md) to set
    vertical margins between the social component and other content.
-   Include all the appropriate social links for your page.
-   Links should open in a a new tab/window.
-   Use [simple tooltips](/docs/components/tooltip.md) to
    provide extra cues to what each icon does.

#### Share

Share links point directly to a social network's share interface, which varies
by network. You can customize the link and/or message shared on each network,
but you will need to make sure the text is URL escaped.

Share links can also include an email link (via a mailto) and a way to copy the
link directly to the clipboard through a copy popover.

```html
<section class="glue-social">
  <div class="glue-social__group">
    <p class="glue-social__title glue-social__title--inline">
      Share
    </p>
    <ul class="glue-social__list" role="list">
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.google.com"
            target="_blank" rel="noopener"
            aria-labelledby="share-facebook-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-facebook glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#facebook"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="share-facebook-tooltip">
          Share on Facebook
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://x.com/intent/tweet?text=https%3A//www.google.com"
            target="_blank" rel="noopener"
            aria-labelledby="share-x-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-x glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#x"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="share-x-tooltip">
          Share on X
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://www.linkedin.com/shareArticle?url=https%3A//www.google.com&amp;mini=true"
            target="_blank" rel="noopener"
            aria-labelledby="share-linkedin-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-linkedin glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#linkedin"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="share-linkedin-tooltip">
          Share on LinkedIn
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="mailto:name@example.com?subject=Check%20out%20this%20site&body=Check%20out%20https%3A//www.google.com"
            target="_blank" rel="noopener"
            aria-labelledby="share-email-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-sharemail glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#email"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="share-email-tooltip">
          Send via Email
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <div class="glue-social__popover">
          <div class="glue-social__icon-trigger glue-social__tooltip-trigger"
              aria-labelledby="share-link-tooltip"
              id="share-static-popover-trigger">
            <svg role="presentation" aria-hidden="true"
                class="glue-icon glue-icon--social glue-icon--color-sharelink glue-icon--24px">
              <use href="/public/icons/glue-icons.svg#link"></use>
            </svg>
          </div>

          <div class="glue-social__dialog" id="share-popover-dialog">
            <svg role="presentation" aria-hidden="true"
                class="glue-icon glue-icon--social glue-icon--color-sharelink glue-icon--24px">
              <use href="/public/icons/glue-icons.svg#link"></use>
            </svg>
            <div class="glue-social__copy" glue-copy-success="Copied to clipboard"
                glue-copy-fail="Press Ctrl+C or ⌘+C to copy">
              <input class="glue-social__copy-input" readonly="" type="text"
                  value="www.google.com" aria-label="URL">
              <button class="glue-social__copy-btn" id="share-copy-btn">Copy link</button>
            </div>
            <div aria-label="Close" class="glue-social__close-btn">
              ×
            </div>
          </div>
        </div>
        <span class="glue-social__tooltip-content" id="share-link-tooltip">
          Get shareable link
        </span>
      </li>
    </ul>
  </div>
</section>
```

#### Follow

Follow links point to Google's presence on each social network.

```html
<section class="glue-social">
  <div class="glue-social__group">
    <p class="glue-social__title glue-social__title--inline">
      Follow us
    </p>
    <ul class="glue-social__list" role="list">
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://x.com/google"
            target="_blank" rel="noopener"
            aria-labelledby="follow-x-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-x glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#x"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="follow-x-tooltip">
          Follow us on X
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://www.facebook.com/Google/"
            target="_blank" rel="noopener"
            aria-labelledby="follow-facebook-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-facebook glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#facebook"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="follow-facebook-tooltip">
          Follow us on Facebook
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://www.instagram.com/google/"
            target="_blank" rel="noopener"
            aria-labelledby="follow-instagram-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-instagram glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#instagram"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="follow-instagram-tooltip">
          Follow us on Instagram
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://www.linkedin.com/company/google"
            target="_blank" rel="noopener"
            aria-labelledby="follow-linkedin-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-linkedin glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#linkedin"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="follow-linkedin-tooltip">
          Follow us on LinkedIn
        </span>
      </li>
      <li class="glue-social__item glue-social__tooltip">
        <a class="glue-social__link glue-social__tooltip-trigger"
            href="https://www.youtube.com/user/Google"
            target="_blank" rel="noopener"
            aria-labelledby="follow-youtube-tooltip">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-youtube glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#youtube"></use>
          </svg>
        </a>
        <span class="glue-social__tooltip-content" id="follow-youtube-tooltip">
          Follow us on YouTube
        </span>
      </li>
    </ul>
  </div>
</section>
```

### JS/TS initialization

Social will initialize any subcomponents (tooltips, copy, etc.) within it, so
you do not need to separately initialize them.

```ts
import {Social} from '@google/glue';

const socialEl = document.querySelector<HTMLElement>('.glue-social');
if (socialEl) new Social(socialEl);
```


## Variations

### Colors

There are three color variations for social icons, which can be set by adding a
class to the component root.

-   **Color** is the default variation if you do not set any class on the root.
    Social networks icons will be in their default color, the mail icon will be
    red, and the copy link icon will be dark grey: `<div class="glue-social">`
-   **Monochrome** sets all icons to black: `<div class="glue-social
    glue-social--monochrome">`
-   **Partial Monochrome** sets the email/copy link icons to black but leaves
    social network icons in their default colors: `<div class="glue-social
    glue-social--partialmonochrome">`

### Expandable

Expandable social presents the component title as a button that expands the list
of social network icons horizontally via an expansion panel. The panel can
expand in either the language direction or opposite of language direction.

-   Set an ID on the root element so expansion panels can be properly
    initialized
-   Add class `glue-social--zippy-opposite` to the root to set the panel to
    expand opposite of language direction
-   Update the usage of `h2` titles to match the heading structure of your page.
-   Use the `data-glue-expansion-panel-XXX-tooltip` attributes to include
    translatable aria labels on the expansion panel toggle

#### HTML

```html
<!-- Share links that expand in language direction -->
<section class="glue-social glue-social--zippy" id="social-share"
    data-glue-expansion-panel-expand-tooltip="Share: Expand to see social channels"
    data-glue-expansion-panel-collapse-tooltip="Share: Hide social channels">
  <div class="glue-social__group">
    <h2 class="glue-social__title glue-social__title--zippy glue-social__title--inline">
      <svg role="presentation" aria-hidden="true"
          class="glue-icon glue-icon--social glue-social__share-icon glue-icon--24px">
        <use href="/public/icons/glue-icons.svg#share"></use>
      </svg>
      Share
    </h2>

    <ul class="glue-social__list" role="list">
      <!-- social share links as needed -->
    </ul>
  </div>
</section>

<!-- Follow links that expand opposite of language direction -->
<section class="glue-social glue-social--zippy glue-social--zippy-opposite" id="social-follow"
    data-glue-expansion-panel-expand-tooltip="Follow us: Expand to see social channels"
    data-glue-expansion-panel-collapse-tooltip="Follow us: Hide social channels">
  <div class="glue-social__group">
    <h2 class="glue-social__title glue-social__title--zippy glue-social__title--inline">
      Follow us
    </h2>
    <ul class="glue-social__list" role="list">
      <!-- social follow links as needed -->
    </ul>
  </div>
</section>
```

#### TS

Initializing the social component (details above) will also initialize the
expansion panel subcomponent.

### Persistent

The Persistent social widget is affixed to the side of the viewport (on the
horizontal edge for desktop, or at the bottom for mobile.) It should be used
when the entire page should be shared.

The social widget should be placed after the header (and banner, if it is
present), but before main content. This allows the "jump to content" link in the
header to skip the social widget and go straight to main content. The social
widget should be adjacent (sibling to) Glue Footer, so that footer can adjust
its padding to prevent content overlap when persistent social is present.

Due to the limited amount of space, the text title is hidden from view but is
accessible to screen readers.

#### HTML

```html
<header class="glue-header">
  <!-- Glue header -->
</header>

<!-- include a color class on the root if you want to adjust icon colors -->
<div class="glue-social glue-social--persistent">
  <!-- a visually hidden descriptor for screen readers -->
  <p class="glue-visually-hidden">
    Social Share
  </p>

  <ul class="glue-social__list" role="list">
    <!-- share via email -->
    <li class="glue-social__item glue-social__tooltip">
      <a class="glue-social__link glue-social__tooltip-trigger" href="mailto:"
          aria-labelledby="tooltip-content-share-mail">
        <svg role="presentation" aria-hidden="true"
            class="glue-icon glue-icon--social glue-icon--color-sharemail glue-icon--24px">
          <use href="/public/icons/glue-icons.svg#email"></use>
        </svg>
      </a>
      <span class="glue-social__tooltip-content" id="tooltip-content-share-mail">
        Share - Email
      </span>
    </li>

    <!-- share via copy popover -->
    <li class="glue-social__item glue-social__tooltip">
      <div class="glue-social__popover">
        <div class="glue-social__icon-trigger glue-social__tooltip-trigger"
              id="share-persistent-popover-trigger"
              aria-labelledby="tooltip-content-share-link">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-sharelink glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#link"></use>
          </svg>
        </div>

        <div class="glue-social__dialog" id="share-persistent-popover-dialog">
          <svg role="presentation" aria-hidden="true"
              class="glue-icon glue-icon--social glue-icon--color-sharelink glue-icon--24px">
            <use href="/public/icons/glue-icons.svg#link"></use>
          </svg>
          <div class="glue-social__copy" glue-copy-success="Copied to clipboard"
              glue-copy-fail="Press Ctrl+C or ⌘+C to copy">
            <input class="glue-social__copy-input" readonly="" type="text"
                value="www.google.com" aria-label="URL">
            <button class="glue-social__copy-btn" id="share-persistent-copy-btn">
              Copy link
            </button>
          </div>
          <div aria-label="Close" class="glue-social__close-btn">
            ×
          </div>
        </div>
      </div>
      <span class="glue-social__tooltip-content" id="tooltip-content-share-link">
        Get shareable link
      </span>
    </li>

    <!-- share via social networks -->
    <li class="glue-social__item glue-social__tooltip">
      <a class="glue-social__link glue-social__tooltip-trigger"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.google.com"
          aria-labelledby="tooltip-content-share-facebook" target="_blank" rel="noopener">
        <svg role="presentation" aria-hidden="true"
            class="glue-icon glue-icon--social glue-icon--color-facebook glue-icon--24px">
          <use href="/public/icons/glue-icons.svg#facebook"></use>
        </svg>
      </a>
      <span class="glue-social__tooltip-content" id="tooltip-content-share-facebook">
        Share - Facebook
      </span>
    </li>

    <li class="glue-social__item glue-social__tooltip">
      <a class="glue-social__link glue-social__tooltip-trigger"
          href="https://x.com/intent/tweet?text=https%3A//www.google.com"
          aria-labelledby="tooltip-content-share-x" target="_blank" rel="noopener">
        <svg role="presentation" aria-hidden="true"
            class="glue-icon glue-icon--social glue-icon--color-x glue-icon--24px">
          <use href="/public/icons/glue-icons.svg#x"></use>
        </svg>
      </a>
      <span class="glue-social__tooltip-content" id="tooltip-content-share-x">
        Share - X
      </span>
    </li>

    <li class="glue-social__item glue-social__tooltip">
      <a class="glue-social__link glue-social__tooltip-trigger"
          href="https://www.linkedin.com/shareArticle?url=https%3A//www.google.com&amp;mini=true"
          aria-labelledby="tooltip-content-share-linkedin" target="_blank" rel="noopener">
        <svg role="presentation" aria-hidden="true"
            class="glue-icon glue-icon--social glue-icon--color-linkedin glue-icon--24px">
          <use href="/public/icons/glue-icons.svg#linkedin"></use>
        </svg>
      </a>
      <span class="glue-social__tooltip-content" id="tooltip-content-share-linkedin">
        Share - LinkedIn
      </span>
    </li>
  </ul>
</div>

<main id="content">
  <!-- Page main content -->
</main>

<footer class="glue-footer">
  <!-- Glue footer -->
</footer>
```

#### TS

Initializing the social component (details above) will also initialize
persistent social subcomponents.

## Tips

### Icons

For documentation on social icons, check out
[Icons](/docs/components/icons.md). The maximum number of
icons the social component will display is 8. For mobile, the social component
will display two rows of 4 icons per row.

**Available icons and classes for social networks:**

Network   | SVG Icon ID  | Color Class
--------- | ------------ | ----------------------------
Instagram | `instagram`  | `glue-icon--color-instagram`
Facebook  | `facebook`   | `glue-icon--color-facebook`
LinkedIn  | `linkedin`   | `glue-icon--color-instagram`
X         | `x`          | `glue-icon--color-x`
YouTube   | `youtube`    | `glue-icon--color-youtube`

**Deprecated networks:**

Network | SVG Icon ID    | Color Class
------- | -------------- | --------------------------
Blogger | `post-blogger` | `glue-icon--color-blogger`
Twitter | `twitter`      | `glue-icon--color-twitter`

### Optimizing your page for social sharing

Most social networks will parse the meta tags on the page you are sharing in
order to show snippets or blurbs from it. Make sure that you have set them up
appropriately to get the best content on those networks.

#### Basic meta tags

All your pages should have a usable title tag as well as a meta description tag.
If a network cannot find specific meta tags, it will usually fall back to
parsing content from these basic tags.

```html
<title>Site Name – Google Product</title>
<meta name="description" content="A brief description of this site and the
content of this page.">
```

#### OpenGraph tags

OpenGraph is the general method to add meta tags specifically for social media.
You can add title, description and a small screenshot.

-   `og:type` is always `website`
-   `og:url` is the canonical URL to the site.

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.google.com/mysite/">
<meta property="og:title" content="Site name – Google Product">
<meta property="og:description" content="A brief description of my site and the
content of this page.">
<meta property="og:image" content="https://www.google.com/mysite/images/thumbnail.png">
```

#### X (Twitter) tags

X (Twitter) has its own set of
[meta tags](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)
that it reads.

-   `twitter:card` can be `summary` or `summary_large_image` if you are
    including an image of at least 280x150px.
-   `twitter:site` is the handle of the product or team associated with the
    site, such as @googleanalytics or @lifeatgoogle.

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@google">
<meta name="twitter:title" content="Site name – Google Product">
<meta name="twitter:description" content="A brief description of this site and
the content of this page.">
<meta name="twitter:image" content="https://www.google.com/mysite/images/thumbnail.png">
```

## Accessibility

-   Use simple tooltips to explain what each icon does. Make sure to link the
    trigger and its tooltip with `aria-labelledby` on the trigger and an `id` on
    the content
-   Include `role="list"` on the social list to make sure it's read as a list in
    all screen readers (some will not consider the UL a list because it does not
    have visible bullets)
-   For copy popover, set `aria-label="URL"` on the text input to indicate what
    it contains to screen readers. This label can be customized to match your
    content and context.

## Variation demos

-   [Static](https://28-0-dot-glue-demo.appspot.com/components/social/static/)
-   [Expansion Panels](https://28-0-dot-glue-demo.appspot.com/components/social/expansion-panels/)
-   [Persistent](https://28-0-dot-glue-demo.appspot.com/components/social/persistent/)
