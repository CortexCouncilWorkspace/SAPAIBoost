# Glue Cookie Notification Bar SLO/SLA

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2024-02-26' }
*-->

This document formalizes the service level that the Glue team aims to achieve
for the Glue Cookie Notification Bar component, and outlines the requirements we
expect of client teams. This SLO/SLA is separate from the base Glue SLO, as Glue
Cookie Notification Bar has a different release schedule and setup.

It was last updated on **February 26, 2024**.



## SLO

These are the Service Level Objectives that
[Glue Cookie Notification Bar](/docs/components/cookienotificationbar.md)
aims to meet to maintain quality and provide support.

-   Update timing
    -   CDN
        -   Run daily pushes to frontend JS/CSS CDN files starting at 9am
            Pacific (takes ~5-10 minutes to propagate fully). Note that most of
            these are no ops unless changes are submitted to google3 HEAD.
        -   Track progress in the
            [Rapid dashboard](http://rapid/glue_cdn_cookienotificationbar).
        -   Run manual pushes to backend config files when updates are needed,
            i.e. to update translations or add settings.
    -   NPM repository
        -   Cookie Notification Bar is not pushed to the Glue NPM repository.
            Glue NPM users will need to use the CDN implementation.
-   Response to feedback
    -   Follow the same timing as the
        [base Glue SLO](/docs/slo.md).
-   Accessibility
    -   Pass Lighthouse accessibility report with a score of 100.
    -   Meet GAR4 (currently GAR2023) requirements (pending resolution to
        several bugs in our
        [hotlist](http://b/issues?q=hotlistid:5054137%20status:open%20title:a11y)).
    -   Review GAR score on a yearly basis during Glue's annual GAR audit
        (typically April/May), which also aligns it with that year's version of
        GAR.
    -   Include accessibility-focused test cases during manual QA when adding
        new features or making significant changes which may affect
        accessibility rating.
-   Localization
    -   Provide and maintain all strings and translations for supported
        languages, including locale-specific strings.
    -   Add new strings, as well as languages/locales, as needed.
-   Browsers
    -   Support the same browser/OS/screen reader combinations as the
        [base Glue SLO](/docs/slo.md).
-   Testing
    -   Run comprehensive automated tests (unit tests, visual regression tests)
        for general quality control and to catch simple bugs. These are updated
        with large changes to provide coverage.
    -   Run manual tests (test cases checked by a QA team) to minimize
        unexpected bugs and regressions when changes are made. The amount of
        manual tests depends on the size of a given change. At minimum, some
        basic smoke tests will be run; larger changes will go through fuller QA
        cycles (functionality and/or accessibility) as time permits.

## SLA

This is the Service Level Agreement that projects agree to while using the Glue
Cookie Notification Bar, to manage consistency and compliance. Projects which do
not follow this SLA may be broken without warning and have limited support for
fixes or feature requests.

-   Join a Glue announcement mailing list to be informed of changes to Cookie
    Notification Bar:
    -   Developers:
        -   Internal/google3 users: glue-users-internal@google.com
        -   External users: glue-users-external@google.com
        -   These lists will also see announcements of general Glue releases and
            potential breaking changes; Cookie Notification Bar updates will be
            clearly labeled as such.
    -   PMs, PMMs, GTM managers:
        -   Internal users: cookie-remediation-contacts@google.com
-   Use Glue Cookie Notification Bar for
    [category 2 sites](http://internal link
    (2A or 2B) only.
-   Use the
    [CDN implementation](/docs/components/cookienotificationbar.md)
    unless there are other barriers to adoption (such as being unable to import
    code from external sources or needing to contain all dependencies within a
    project.)
-   Set up the
    [Google Tag Manager container](/docs/components/cookienotificationbar.md)
    so that it understands and responds to changes in the Cookie Notification
    Bar status.
-   2A implementations: Add a
    [Cookies management controls button](/docs/components/cookienotificationbar.md)
    in an appropriate location, such as the site footer.
-   Use the provided
    [initialization options](/docs/components/cookienotificationbar.md),
    [events](/docs/components/cookienotificationbar.md),
    and
    [APIs](/docs/components/cookienotificationbar.md)
    for customizing and/or adding extra interactions to the Cookie Notification
    Bar.
-   Use an appropriate feedback channel for questions, bugs, and requests. YAQS
    and the chat room are our preferred channels.
    -   External:
        -   [Glue Users (External) chat room](https://chat.google.com/room/AAAA1UAVNJU)
            chat room.
        -   Email glue-eng-core@google.com to contact the dev team directly.
