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

**this is the new starting setup. ESLint/Prettier now works**

## Add `gatsby-plugin-layout`

Reference: `https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout`

This plugin enables adding components which live above the page components and persist across page changes.
This is done to:

- Persisting layout between page changes for e.g. animating navigation
- Storing state when navigating pages
- Inject additional data into pages using React Context

> This means pages are automatically wrapped into layout and do NOT need to import the layout compponent individually

## Add page transitions

Reference: https://www.framer.com/motion/

Reference: https://github.com/ryanwiemer/gatsby-using-page-transitions

## Add styled components with emotion

Reference: https://emotion.sh/docs/styled
