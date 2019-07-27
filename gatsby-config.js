module.exports = {
  siteMetadata: {
    title: `Gatsby  Starter`,
    description: `yadayadayada`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-plugin-emotion`,
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/data`,
      },
    },
  ],
};
