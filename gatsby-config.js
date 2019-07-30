module.exports = {
  siteMetadata: {
    title: "Gatsby  Starter",
    description: "yadayadayada",
  },
  plugins: [
    "gatsby-plugin-layout",
    "gatsby-plugin-emotion",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    {
      // access to all markdown files
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          "gatsby-remark-responsive-iframe",
        ],
      },
    },
  ],
};
