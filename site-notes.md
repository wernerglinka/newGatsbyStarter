# Build site from ground up

## Initial Preparation

Create a bare-bones starter site with ESLint/Prettier

1. Create a new starter with `gatsby new initialgatsby`
2. Strip to bare minimum, no image, no helmet, etc

```
module.exports = {
siteMetadata: {
title: `Gatsby Starter`,
description: `yadayadayada`,
},
plugins: [],
}
```

3. Add eslint and eslint-plugin-prettier

```
"devDependencies": {
"eslint": "^5.3.0",
"eslint-config-airbnb": "^17.1.1",
"eslint-config-prettier": "^6.0.0",
"eslint-plugin-import": "^2.18.0",
"eslint-plugin-jsx-a11y": "^6.2.3",
"eslint-plugin-prettier": "^3.1.0",
"eslint-plugin-react": "^7.14.2",
"prettier": "^1.18.2"
}
```

4. Add .eslintrc.js

```
module.exports = {
"extends": ["airbnb", "prettier"],
"plugins": ["prettier"],
"rules": {
"prettier/prettier": ["error"],
"react/jsx-filename-extension": 0,
"import/prefer-default-export": 0
},
};
```

**this is the new starting setup with ESLint/Prettier**

## Add `gatsby-plugin-layout`

Reference: `https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout`

This plugin enables adding components which live above the page components and persist across page changes.
This is done to:

- Persisting layout between page changes for e.g. animating navigation
- Storing state when navigating pages
- Inject additional data into pages using React Context

> > > This means pages are automatically wrapped into layout and do NOT need to import the layout component individually

## Add Ppage Transitions

Reference: `https://www.framer.com/motion/`
Reference: `https://github.com/ryanwiemer/gatsby-using-page-transitions`

## Add Styled Components with Emotion

Reference: https://emotion.sh/docs/styled

## Add Markdown Content

Install all markdown related plugins:

- gatsby-remark-responsive-iframe
- gatsby-remark-images
- gatsby-transformer-remark
- lines-to-paragraphs

Add folder `/src/pages/`. This folder will hold all markdown content. The corresponsing page templates are located in `/src/layouts/templates/`

The `lines-to-paragraphs` node module allows to have frontmatter fields with multiple paragraphs:

" >- One paragraph, every line between text is converted to a <br>"
" |- Multiple paragraphs, every line between text is converted to a new paragraph"

### Separate Page Building According to Content Type

Blog pages need different processing than regular pages. For example, blog pages have links to the previous and next blog post in their page context. Also, blog landing pages with paging are generated from blog pages only. In addition other content types like news items will only generate landing pages with links to external news pages.

## Add JSON Data

Data like blog authors and navigation reside in json files in `/src/data`

Install the json transformer plugin and add the data folder as a gatsby source

```
"gatsby-transformer-json",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/src/data`,
    },
  },
```

## Add Cloudinary Assets Integration

Reference: https://cloudinary.com/

Images will all be served from Cloudinary as automatic responsive using Client Hints with a fallback.

Reference: https://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints

Add `<meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width">` to the page <head> section.
The **CloudinaryImage** component is used to request and render images from Cloudinary.

Images will be listed in frontmatter by their names only, e.g. _authors/barack-obama_yvcczg.jpg_ . This is the Cloudinary File name. All other parts of the url will be composed with the **CloudinaryImage** component.

## Add Draft Pages

Add a draft value to the frontmatter of a markdown page. Add a filter in gatsby-node.js
`frontmatter: { draft: { ne: true } }` to the graphql query to only get pages that have `draft: true`

## Add Metadata to Head Section

Install:

- gatsby-plugin-react-helmet
- react-helmet

Initial metadata are fetched from `site-metadata.json`. Every page overwrites what's necessary.

When using an empty **category** field to force a new UL in a megamenu the category must have a space as value! E.g. `"category": " "`

## Add Breadcrumbs

Every page has a breadcrumbs object in its frontmatter so we can use the real page title and have the ability to manipulate the breadcrumb.

## Add a Modal

Reference: https://upmostly.com/tutorials/modal-components-react-custom-hooks
Reference: https://github.com/upmostly/modali

Install:

- modali

### How to build a modal from frontmatter?

Just like other parts of the page but modal data would be props for a modal component. So every modal type would have a corresponding component that acts like a template.
We could also use a JSON file for modals so we can reuse the data.

## Add Infinite Scrolling

Reference: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
Reference: https://github.com/Upmostly/react-hooks-infinite-scroll
