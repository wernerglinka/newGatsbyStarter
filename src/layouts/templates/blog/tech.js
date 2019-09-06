/* global document */
/*  eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import PostPreview from "../../../components/blog-post/post-preview";
import Container from "../../../components/styles/container";
import Headline from "../../../components/styles/page-headline";
import useAddToList from "../../../hooks/useAddToList";

/**
 * Listing page for Blogposts
 */
const BlogIndex = props => {
  // Get the posts object
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
  } = props;
  // Get image base URL and default thumbnail width
  const {
    data: {
      allSite: { edges: siteMetaData },
    },
  } = props;
  const imageData = siteMetaData[0].node.siteMetadata;
  // Get pager info from page context
  const {
    pageContext: { numPages, currentPage },
  } = props;

  const chunk = 8;

  // useAddToList provides  ref for the element after the list that will be lazy loaded
  // and the listItems to build the list
  const [ref, listItems] = useAddToList(posts, chunk, {
    root: null,
    rootMargin: "200px",
    threashold: 1,
  });

  return (
    <Container>
      <Headline>Blogposts</Headline>
      <ul>
        {listItems.map(({ node }) => (
          <PostPreview
            post={node}
            imageData={imageData}
            key={node.fields.slug}
          />
        ))}
      </ul>
      <div ref={ref} />
    </Container>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }).isRequired,
    allSite: PropTypes.shape().isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default BlogIndex;

export const pageQuery = graphql`
  query techBlogListQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/src/pages/techBlog/**/*.md" }
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
    allSite {
      edges {
        node {
          siteMetadata {
            cloudinaryBaseURL
            tnDefaultWidth
          }
        }
      }
    }
  }
`;
