# Right-to-left (RTL) layouts

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



Right-to-left layouts flip the display of a page for languages read in a
right-to-left direction, such as Arabic, Farsi, Hebrew, or Urdu. There are
numerous ways to adjust a site's layout for RTL. Glue uses 2 methods: CSS
logical properties and RTL directional overrides. We recommend that Glue users
adopt the same methods to provide consistent adjustments between LTR and RTL
rendering.

## CSS Logical Properties

See the
[Better RTL Layouts deck](https://docs.google.com/presentation/d/1b2hTl1GilvRp7r5s0HRPSNxDXG-Q8fTW6xAPGCC3cBU/edit?usp=sharing&resourcekey=0-JRbi0Dy99HM9WegGOyJ_2g)
for a quick overview on how CSS Logical Properties work.

Instead of using physical directions such as `left` or `bottom` to set things
like borders or margins, use content axes and directions such as `inline-start`
or `block-end`. Browsers will automatically flip these properties for RTL
layouts. The concept is similar to how CSS Flex and CSS Grid layouts work by
arranging content across two axes/dimensions.

Logical properties exist for:

-   Border
-   Border radius (with special property naming)
-   Margin
-   Padding
-   Positioning (left/right/top/bottom, using the `inset` property name)
-   Text alignment

Note: Technically, overflow and float also have logical properties, but are only
supported by Firefox and should not be used.

Glue is written from the perspective of an English layout (left to right, top to
bottom, horizontal language) so physical directions can be mapped as follows:

-   `left` -> `inline-start`
-   `right` -> `inline-end`
-   `top` -> `block-start`
-   `bottom` -> `block-end`

Some properties do not have logical equivalents:

-   Background-image properties
-   Box-shadow
-   Transform

These properties will still need manual adjustment with directional overrides.

## Directional overrides

You can target the `dir` attribute, which should be set to either `ltr` or `rtl`
based on which language a page is displayed in. For projects using web
components, you will want to target the `:host` container. Other projects
normally set this property on the `html` root, so a general ancestor selector is
used.

```scss
.next-icon {
  transform: rotate(0deg);

  [dir='rtl'] &,
  :host([dir='rtl']) & {
    transform: rotate(180deg);
  }
}
```

## Alternative methods

Other solutions for RTL layouts are available, but may not be compatible with
Glue's usage of logical properties + directional overrides.

-   Automated flipping tools like RTLCSS or CSSJanus
    -   These generate separate files for LTR and RTL styles instead of letting
        the browser make adjustments
