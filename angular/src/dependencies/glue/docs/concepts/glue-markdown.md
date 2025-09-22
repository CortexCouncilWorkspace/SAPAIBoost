# Glue markdown setup

internal link

<!--*
# Document freshness: For more information, see internal link
freshness: { owner: 'glue-eng-core' reviewed: '2023-07-05' }
*-->



### Using Glue with markdown

In order to encapsulate Glue styles, components use the `glue` prefix for class
names. If you'd like to use Glue styles on markdown code where you cannot add
class names, you can wrap them in a container that extends Glue typography
styles. You only need to extend the elements you intend to use in your site.

### SCSS

```scss
@use '@google/glue/dist/typography' as glue-typography;
@use '@google/glue/dist/links' as glue-links;

.glue-markdown {
  text-align: start;

  h1 {
    @extend .glue-headline, .glue-headline--headline-1;
  }

  h2 {
    @extend .glue-headline, .glue-headline--headline-2;
  }

  h3 {
    @extend .glue-headline, .glue-headline--headline-3;
  }

  h4 {
    @extend .glue-headline, .glue-headline--headline-4;
  }

  h5 {
    @extend .glue-headline, .glue-headline--headline-5;
  }

  h6 {
    @extend .glue-headline, .glue-headline--headline-6;
  }

  a {
    @extend .glue-link;
  }

  blockquote,
  ol,
  ol li,
  p,
  ul,
  ul li,
  table {
    @extend .glue-body;
  }

  ol,
  ul {
    padding-block: 0 20px;
    padding-inline: 20px 0;
  }
}
```

### HTML

Put your markdown content inside of a `glue-markdown` container.

```html
<div class="glue-markdown">

  <!-- markdown-rendered content -->

</div>
```
