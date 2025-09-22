# Visual Regression Tests (VRTs)

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



## Purpose

Visual regression tests (VRTs) are a type of automated unit test comparing the
visual rendering of a page between two different versions. VRTs are designed to
prevent accidental visual changes; if a visual change is detected, the tests are
flagged and screenshots show where the change(s) occur. If a visual change is
intended, the new screenshot(s) are approved as 'golden' and the VRTs will use
this for comparison the next time tests are run.

We encourage Glue users who are working on complex and/or long-term projects to
set up VRTs within your own projects to ensure visual consistency.

## What should be tested

Glue has VRTs set up for all components that impact layout or visual rendering.
They are run against filler content that represents the standard component,
common variations, and transitive states (such as after an interaction, when an
element is focused, etc.)

For a published site, there are two primary test setups to consider:

### Published site layout and content

You can run VRTs against the site as it is published. This means any changes,
whether layout or content, will be flagged as diffs and you will need to approve
new goldens before being able to submit.

Pros:

-   Test against real content
-   Flags content changes along with layout changes
-   Don't need to set up special test demos

Cons:

-   Flags content changes, which may be extra churn for projects that update
    content frequently or through the CMS
-   May not adequately test all site functionality

### Ideal site layout and filler content

You can create a series of layouts that represent how your site works, but with
filler content. Since these demos are made only for testing, you can include any
and all scenarios, such as interaction or transition states. You can also break
out components into individual tests for faster or more detailed testing.

Pros:

-   Custom demos to test any and all desired scenarios
-   Stable tests because of filler content
-   Can test individual components independently of each other

Cons:

-   Filler content may not accurately represent published content
-   May miss interactions between components if testing everything individually
-   Need to create custom demos for test

## VRT services

There are two primary VRT services that Glue has used.

### Percy (external)

[Percy](https://percy.io) is a third-party solution that is part of the
BrowserStacks testing environment. If you already have a BrowserStacks account,
you can see if you have access to Percy screenshots. Pricing varies based on the
expected number of screenshots you will need to run monthly.

Percy is the primary solution for projects that are in git-on-borg repositories,
but cannot be used for any project which may hold confidential or proprietary
data, as the screenshots are handled by a third party.

Glue used Percy when its source of truth was in git-on-borg. However, now that
Glue source has moved into google3, we have turned down our Percy setup.

### Scuba (internal)

[Scuba](http://internal link is the recommended internal solution as it can be
integrated into your project's BUILD files and run as part of your testing
suite.

Glue currently uses Scuba now that its source of truth has moved to google3.

