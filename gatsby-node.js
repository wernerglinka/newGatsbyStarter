// const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const siteValues = require("./src/data/site-globals");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // query by different content types: blog, news, page etc...
    // all blog posts are located in src/pages/blogs
    // all other pages are located in src/pages
    return graphql(`
      {
        blogs: allMarkdownRemark(
          filter: {
            fileAbsolutePath: { glob: "**/src/pages/resources/posts/**/*.md" }
            frontmatter: {
              draft: { ne: true }
              categories: { ne: "Engineering" }
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
                tags
                breadcrumbs {
                  name
                  path
                }
              }
            }
          }
          totalCount
        }
        techblogs: allMarkdownRemark(
          filter: {
            fileAbsolutePath: { glob: "**/src/pages/techblog/**/*.md" }
            frontmatter: {
              draft: { ne: true }
              categories: { eq: "Engineering" }
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
                tags
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
              glob: "**/src/pages/**/*.md|!**/src/pages/techBlog/**/*.md|!**/src/pages/resources/posts/**/*.md"
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
        allLever {
          edges {
            node {
              id
              categories {
                location
                team
              }
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()));
          return Promise.reject(result.errors);
        }

        /** ********************************************************************************
         * Regular blog
         ********************************************************************************* */
        /**
         * Build the regular blog pages
         * All blog posts are located in 'src/pages/blogs'
         */
        const posts = result.data.blogs.edges;
        const tags = [];

        posts.forEach((edge, index) => {
          if (edge.node.frontmatter.tags) {
            // accumulate all tags in allTags
            edge.node.frontmatter.tags.forEach(tag => tags.push(tag));
          }

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
              `src/layouts/templates/${String(
                edge.node.frontmatter.template
              )}.js`
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
         * Build the regular blog index page
         */
        // destructure totalCount variable from result object
        let totalCount = result.data.blogs.totalCount;

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
            name: "Resources",
            path: "/resources/",
          },
          {
            name: "Blog",
          },
        ];

        let countTags = tags.reduce((prev, curr) => {
          prev[curr] = (prev[curr] || 0) + 1;
          return prev;
        }, {});
        const allTags = Object.keys(countTags);

        createPage({
          path: `/resources/blog/`,
          component: path.resolve("./src/layouts/templates/blog/index.js"),
          context: {
            breadcrumbs,
            allTags,
          },
        });

        /**
         * Build the tag pages
         */
        allTags.forEach((tag, i) => {
          breadcrumbs = [
            {
              name: "Home",
              path: "/",
            },
            {
              name: "Resources",
              path: "/resources/",
            },
            {
              name: "Blog",
              path: "/resources/blog/",
            },
            {
              name: `Tag: ${tag}`,
            },
          ];

          createPage({
            path: `/resources/blog/tags/${tag
              .replace(/\s+/g, "-")
              .toLowerCase()}`,
            component: path.resolve("./src/layouts/templates/blog/tags.js"),
            context: {
              allTags,
              tag,
              breadcrumbs,
              layout: "tags",
            },
          });
        });

        /** ********************************************************************************
         * TechBlog
         ********************************************************************************* */

        /**
         * Build the tech blog pages
         * All blog posts are located in 'src/pages/blogs'
         */
        const techPosts = result.data.techblogs.edges;
        const techTags = [];

        techPosts.forEach((edge, index) => {
          if (edge.node.frontmatter.tags) {
            // accumulate all tags in allTags
            edge.node.frontmatter.tags.forEach(tag => techTags.push(tag));
          }
          const id = edge.node.id;

          // create the previous / next links
          const previous =
            index === techPosts.length - 1 ? null : techPosts[index + 1].node;
          const next = index === 0 ? null : techPosts[index - 1].node;

          // inject frontmatter breadcrumbs into the page context so we access in layout
          breadcrumbs = edge.node.frontmatter.breadcrumbs;

          createPage({
            path: edge.node.fields.slug,
            tags: edge.node.frontmatter.tags,
            component: path.resolve(
              `src/layouts/templates/${String(
                edge.node.frontmatter.template
              )}.js`
            ),
            // pass links via page context
            context: {
              id,
              previous,
              next,
              breadcrumbs,
              layout: "techblog",
            },
          });
        });

        /**
         * Build the tech blog index page
         */
        // destructure totalCount variable from result object
        totalCount = result.data.techblogs.totalCount;

        countTags = techTags.reduce((prev, curr) => {
          prev[curr] = (prev[curr] || 0) + 1;
          return prev;
        }, {});
        const allTechTags = Object.keys(countTags);

        createPage({
          path: `/techblog/`,
          component: path.resolve("./src/layouts/templates/blog/tech.js"),
          context: {
            layout: "techblogList",
            allTechTags,
          },
        });

        /**
         * Build the tech blog tag pages
         */

        allTechTags.forEach((tag, i) => {
          breadcrumbs = [
            {
              name: "TechBlog",
              path: "/techblog/",
            },
            {
              name: `Tag: ${tag}`,
            },
          ];
          createPage({
            path: `/techblog/tags/${tag.replace(/\s+/g, "-").toLowerCase()}`,
            component: path.resolve(
              "./src/layouts/templates/blog/techblog-tags.js"
            ),
            context: {
              allTechTags,
              tag,
              breadcrumbs,
              layout: "tags",
            },
          });
        });

        /** ********************************************************************************
         * Pages
         ********************************************************************************* */

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
              `src/layouts/templates/${String(
                edge.node.frontmatter.template
              )}.js`
            ),
            context: {
              id,
              breadcrumbs,
            },
          });
        });

        /** ********************************************************************************
         * Lever Job Pages
         ********************************************************************************* */
        const leverPages = result.data.allLever.edges;

        const leverLocations = [];
        const leverTeams = [];

        leverPages.forEach((edge, index) => {
          if (edge.node.categories.location) {
            // accumulate all locations
            leverLocations.push(edge.node.categories.location);
          }
          if (edge.node.categories.team) {
            // accumulate all team names
            leverTeams.push(edge.node.categories.team);
          }
        });

        const allLocations = leverLocations.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
          []
        );

        const allTeams = leverTeams.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
          []
        );

        const locationLinks = allLocations.map(loc => ({
          name: loc,
          path: `${loc
            .replace(/\s+/g, "-")
            .replace(/,/g, "")
            .toLowerCase()}/`,
        }));

        const teamLinks = allTeams.map(team => ({
          name: team,
          path: `${team
            .replace(/\s+/g, "-")
            .replace(/,/g, "")
            .toLowerCase()}/`,
        }));

        /**
         * Build the job detail pages
         */
        leverPages.forEach(edge => {
          const id = edge.node.id;

          breadcrumbs = [
            {
              name: "Home",
              path: "/",
            },
            {
              name: "About",
              path: "/about/",
            },
            {
              name: "Careers",
              path: "/about/careers/",
            },
            {
              name: `${id}`,
            },
          ];

          createPage({
            path: `/about/careers/${id}/`,
            component: path.resolve("./src/layouts/templates/about/job.js"),
            context: {
              id,
              breadcrumbs,
              locationLinks,
              teamLinks,
            },
          });
        });

        /**
         * Build the job list pages by location
         */
        leverLocations.forEach(location => {
          breadcrumbs = [
            {
              name: "Home",
              path: "/",
            },
            {
              name: "About",
              path: "/about/",
            },
            {
              name: "Careers",
              path: "/about/careers/",
            },
            {
              name: `${location}`,
            },
          ];

          createPage({
            path: `/about/careers/${location
              .replace(/\s+/g, "-")
              .replace(/,/g, "")
              .toLowerCase()}/`,
            component: path.resolve(
              "./src/layouts/templates/about/locations.js"
            ),
            context: {
              breadcrumbs,
              location,
              locationLinks,
              teamLinks,
            },
          });
        });

        /**
         * Build the job list pages by team
         */
        leverTeams.forEach(team => {
          breadcrumbs = [
            {
              name: "Home",
              path: "/",
            },
            {
              name: "About",
              path: "/about/",
            },
            {
              name: "Careers",
              path: "/about/careers/",
            },
            {
              name: `${team}`,
            },
          ];

          createPage({
            path: `/about/careers/${team
              .replace(/\s+/g, "-")
              .replace(/,/g, "")
              .toLowerCase()}/`,
            component: path.resolve("./src/layouts/templates/about/teams.js"),
            context: {
              breadcrumbs,
              team,
              locationLinks,
              teamLinks,
            },
          });
        });
      })
      .then(resolve());
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
