const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const siteValues = require("./src/data/site-globals");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  // query by different content types: blog, news, page etc...
  // all blog posts are located in src/pages/blogs
  // all other pages are located in src/pages
  return graphql(`
    {
      blogs: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { glob: "**/src/pages/posts/**/*.md" }
          frontmatter: { draft: { ne: true } }
        }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
              title
              breadcrumbs {
                name
                path
              }
            }
          }
        }
        totalCount
      }
      pages: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {
            glob: "**/src/pages/**/*.md|!**/src/pages/posts/**/*.md"
          }
        }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
              title
              breadcrumbs {
                name
                path
              }
            }
          }
        }
      }
      news: allNewsJson {
        totalNewsCount: totalCount
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    /**
     * Build the blog pages
     * All blog posts are located in 'src/pages/blogs'
     */
    const posts = result.data.blogs.edges;

    posts.forEach((edge, index) => {
      const id = edge.node.id;
      // create the previous / next links
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      // inject frontmatter breadcrumbs into the page context so we access in layout
      const breadcrumbs = edge.node.frontmatter.breadcrumbs;

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/layouts/templates/${String(edge.node.frontmatter.template)}.js`
        ),
        // pass links via page context
        context: {
          id,
          previous,
          next,
          breadcrumbs,
        },
      });
    });

    /**
     * Build the blog index pages
     * This includes the variables for the full pager
     */
    // destructure totalCount variable from result object
    const totalCount = result.data.blogs.totalCount;

    // create the blog list pages
    const blogItemsPerPage = siteValues.list_blogs_per_page;
    const numPages = Math.ceil(totalCount / blogItemsPerPage);

    // create blog landing page breadcrumbs
    let breadcrumbs = [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Blog",
      },
    ];

    Array.from({ length: numPages }).forEach((a, i) => {
      createPage({
        path: i === 0 ? "/blog" : `/blog/${i}`,
        component: path.resolve("./src/layouts/templates/blog/index.js"),
        context: {
          limit: blogItemsPerPage,
          skip: i * blogItemsPerPage,
          numPages,
          currentPage: i + 1,
          breadcrumbs,
        },
      });
    });

    /**
     * section for creating news lists
     */
    // destructure totalCount variable from result object
    const {
      data: {
        news: { totalNewsCount },
      },
    } = result;

    // Create the news list pages
    const newsItemsPerPage = 6;
    const numNewsPages = Math.ceil(totalNewsCount / newsItemsPerPage);

    // create blog landing page breadcrumbs
    breadcrumbs = [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "About",
        path: "/who-we-are/",
      },
      {
        name: "News",
      },
    ];

    Array.from({ length: numNewsPages }).forEach((a, i) => {
      createPage({
        path: i === 0 ? "/about/news" : `/about/news/${i}`,
        component: path.resolve("./src/layouts/templates/about/news.js"),
        context: {
          limit: newsItemsPerPage,
          skip: i * newsItemsPerPage,
          numNewsPages,
          currentNewsPage: i + 1,
          breadcrumbs,
        },
      });
    });

    /**
     * Build the site pages
     * Site pages are all page other than
     * - blog posts
     * - news items
     */
    const pages = result.data.pages.edges;

    pages.forEach((edge, index) => {
      const id = edge.node.id;
      // inject frontmatter breadcrumbs into the page context so we access in layout
      breadcrumbs = edge.node.frontmatter.breadcrumbs;

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        page_id: edge.node.frontmatter.page_id,
        component: path.resolve(
          `src/layouts/templates/${String(edge.node.frontmatter.template)}.js`
        ),
        context: {
          id,
          breadcrumbs,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
