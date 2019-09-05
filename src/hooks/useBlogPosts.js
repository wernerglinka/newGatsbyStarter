import { useStaticQuery, graphql } from "gatsby";

const useBlogPosts = () => {
  const data = useStaticQuery(graphql`
    query BlogPostsQuery {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { glob: "**/src/pages/resources/posts/**/*.md" }
          frontmatter: { draft: { ne: true } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              blog_title
              categories
              tags
              date(formatString: "MMMM DD, YYYY")
              author
              thumbnail
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges;
};

export default useBlogPosts;
