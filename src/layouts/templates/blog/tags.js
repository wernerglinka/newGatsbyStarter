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
import SelectTag from "../../../components/select-tag";

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
    pageContext: { tag, allTags },
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
      <Headline>Blog Posts with Tag: {tag}</Headline>
      <SelectTag pathPrefix="/resources/blog/tags/" tagsList={allTags} />
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
  query tagsBlogQuery($tag: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/src/pages/resources/posts/**/*.md" }
        frontmatter: { draft: { ne: true }, tags: { in: [$tag] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            blog_title
            categories
            tags
            related_posts
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
