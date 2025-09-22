# Glue Accessibility Principles

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



## Intro

Good accessibility provides users of varying abilities the same access to your
site's content. It ties into Google's mission of making content *universally
accessible and useful*. Disabilities fall into a wide variety of categories, and
can be temporary or permanent. There are numerous assistive technologies for
these users, which can affect how they interact with your content.

Glue components are designed to provide a base level of accessibility out of the
box to meet WCAG AA, and in some cases WCAG AAA.


However, this only ensures base Glue meets minimum accessibility requirements.
You will still need to follow WCAG and other accessibility guidelines when
designing and building out your project to make sure it works for disabled users
and assistive technologies.

## Getting started

Your page should pass Lighthouse automated accessibility audit with a 100%
score. If your page does not score 100%, review the audit to see where
Lighthouse suggests fixes. Occasionally Lighthouse will flag something
erroneously, but these exceptions are rare.

Lighthouse and other automated audits can only check basic accessibility
requirements. You will need to do a more thorough audit to ensure you are fully
accessibility compliant.

## General Glue guidelines

Individual component documentation contains specific details for proper
implementation, such as label requirements, spacing, etc. This document is a
collection of general guidelines for whole-site accessibility.

### Page structure

Make sure to use semantic HTML to organize your site's content so that it can be
easily parsed by assistive technologies. A page should have one `H1` tag (the
page's title), and any number of lower headings in appropriate order. Do not use
a heading to set a style. Instead, use an appropriate heading level, and use a
class to set a visual style.

In some cases, there may be a visual (but non-text) indicator of content
sections. You should still include appropriate heading levels to describe these
sections, but you can hide them visually with
[accessibility classes](/docs/components/accessibility-classes.md).

### Color contrast (text/background)

We measure color contrast based on text size, weight, and color vs the
background color it appears over. Text should meet AAA requirements (7:1 for
normal text and 4.5:1 for large text). Secondary text can meet AA requirements
(4.5:1 for normal text and 3:1 for large text). If you are setting custom colors
on elements, or putting text over images, make sure to check the contrast ratio
first. Lighthouse and other automated checkers will flag elements that do not
match AA contrast ratio.

Users may use High Contrast Mode (a setting in Windows, or manually set via
extensions in the browser) which will change all colors to a set the user
prefers. In these cases, the color itself is not as important as making sure
anything that uses color to convey information is still able to be visually
parsed. You can use Glue's
[High Contrast Mode mixins and variables](/docs/components/accessibility-classes.md)
to adjust specific styles if necessary.

### Spacing

Make sure to provide sufficient spacing between interactive elements, so that
users don't worry about activating the wrong one. Material suggests **8px
between** interactive elements.

Make sure that interactive elements have a large enough tap target size to make
it easy for users to activate them. Material suggests a **48x48px minimum target
size**.

### Context for visual elements

Provide context for visual elements for users who can't parse visual elements,
i.e. through a screen reader.

-   Include descriptive `alt` text for images. If you are unable to provide a
    description, use an empty `alt` tag instead. All images should have an `alt`
    tag regardless of its content.
-   Ensure that link and button text makes sense even when taken out of context,
    such as when they are read off as a list by a screen reader
    -   Use an `aria-label` to provide a more descriptive link text if necessary
    -   If multiple links near each other have the same text (i.e. three cards
        all with "Learn more" links), use an `aria-label` to provide more
        context for each link (i.e. "Learn more about Product X" and "Learn more
        about Product Y")
    -   If pulling link content from a CMS, make sure to include an aria-label
        field so link context can be translated. If you need to combine multiple
        CMS fields to create a label, make sure the labels are not grammatically
        order dependent, as this may change when translated. For example, use a
        label like "[Learn more] - [Product X]" instead of "[Learn more about]
        [Product X]"

### Context for audio elements

Provide a descriptive text transcript for any audio elements. This includes text
for audio cues like "upbeat music playing" or "alarm bell ringing". Videos
should have closed captioning or subtitles turned on by default, and matching
the page's language where available.

### Forms

Forms have extra accessibility considerations.

#### Labels and error messaging

Form elements should be clearly labeled, and these labels should be directly
associated with their field with `labelled-by` or `for` properties.

For radios, checkboxes, and switches, the text label should provide a secondary
click/tap target to toggle the input.

For radios and checkboxes that are associated with each other in a group, wrap
them in a `fieldset` and provide a `legend` that explains the grouping. The
legend can be visually hidden, but it should always provide context to screen
readers.

If a text field has a specific format for content (such as an email address or
phone number) it can be useful to include that information in the label; at the
very least this information must be included in the field's error validation
message. Although the format can be explained explicitly, it is usually simpler
to provide valid examples instead. For example:

-   As labels
    -   Email (myname@example.com)
    -   ZIP code (12345 or 12345-6789)
-   As error/validation messages
    -   Please enter a valid email (such as 'email@example.com')
    -   Please enter a 5-digit ZIP code
    -   Please enter a valid ZIP code (such as '12345' or '12345-6789')

Some content may have a general format but does not have explicit conventions,
such as phone number or URL. In those cases, it is often problematic to hold the
user to a specific format, as explaining it can be confusing and people may
follow different conventions. In those cases, you can still provide an example
format, but it is better to not validate by format on the front end, and do
double-checking after data has been entered into the system.

#### Tap target size/spacing

Just like other elements, form elements need to adhere to the 48x48 min tap
target size and 8px spacing requirements. This is particularly important for
checkbox, radio, and switch inputs. Glue form elements already use the Material
class that provides min tap target size, but make sure that they are spaced far
enough apart that a user won't accidentally activate the wrong input.

## Device testing

There are a variety of software and hardware used to provide assistive
technologies.

Desktop users can use VoiceOver (Mac), NVDA or JAWS (Windows), or ChromeVox
(Chromebooks) to test screen reader capabilities. VoiceOver and ChromeVox are a
system-level applications on MacOS and Chromebooks, respectively. NVDA and JAWS
must be installed individually on Windows and may have licensing requirements.

Mobile users can turn on accessibility tools (Talkbalk for Android or VoiceOver
for iOS) to test for mobile issues.

Hardware/physical assistive devices (like switches) are not generally available.
If you're working with a QA team, see if they have access to these devices to
run tests.

## Accessibility audits

There are several methods to audit your site's accessibility.

### Automatic

Lighthouse is built in to Chrome's developer tools. It provides an automated
check of a page, either in a mobile or a desktop viewport, and reports common
errors. These include issues with color contrast ratios, mismatched ARIA
attributes, or missing contexts. The Lighthouse report provides a list of all
elements that don't pass its tests and can be exported, providing an easy
checklist of issues to fix.

Lighthouse can be run manually per page, or automated through the command line.
The [Lighthouse CI](https://developers.google.com/web/tools/lighthouse) can also
be set up on your project to run during build tests.

**Marketing aims to have all new sites pass Lighthouse with a 100% score.**


### Manual

Running a full accessibility audit can be a time-consuming task as it requires
you to review all the usage scenarios for your site. However, it provides a
comprehensive checkup on your site's content, context, and interactions. It also
provides defined actions to fix any issues that are found.

You can also prioritize specific checks to confirm manually, such as navigating
the site through a single screen reader app. While not comprehensive, it can
still identify general problems to be reviewed and fixed.

## References

### Links

-   [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/) -
    General guidelines for accessibility of specific UIs
-   [Google Accessibility](https://www.google.com/accessibility/) - Google's
    public site on accessibility principles
-   [Material Design: Accessibility](https://material.io/design/usability/accessibility.html) -
    information specific to Material's design patterns


### Tools

-   [Color Contrast tester](https://webaim.org/resources/contrastchecker/) -
    Many tools exist for this, but this one is straightforward and includes the
    ability to permalink to results to share with others
-   [Lighthouse](https://developers.google.com/web/tools/lighthouse/) - Runs
    automated testing on a page and provides a report covering common issues and
    methods for fixing them
