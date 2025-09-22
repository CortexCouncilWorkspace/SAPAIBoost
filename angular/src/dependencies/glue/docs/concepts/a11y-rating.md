# Glue Accessibility Rating

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



Be sure to read Glue's
[accessibility principles](/docs/concepts/a11y-principles/.md).

The goal for all components is to provide standard accessibility out-of-box. In
general this means that components pass Lighthouse with 100% rating and they
meet the equivalent of WCAG 2.0 AA rating.

-   Some components are for utility, and do not have any context for
    accessibility testing.
-   All components should be re-tested within your own site's context, as they
    depend on individual implementation. For example, color palette on its own
    does not have any GAR testing, but using specific pairings of colors on your
    site needs to be tested to ensure proper contrast ratios between text and
    background elements.


## Don't rely on us for your project's compliance

Usage of our library doesn't guarantee that your project is compliant with
accessibility requirements (though it provides a solid base). We recommend you
conduct your own accessibility audit to ensure it meets accessibility
requirements.

If you discover an accessibility issue within Glue, please file a bug at
internal link or [contact the Glue team](/docs/contacts.md).
