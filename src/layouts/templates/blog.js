/*  eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import PostPreview from "../../components/post-preview";
import Pager from "../../components/pager";
import Container from "../../components/styles/container";
import Headline from "../../components/styles/page-headline";

/**
 * Listing page for Blogposts
 * This page is build as a class-based react component since it uses graphql variables
 * and they will not work with static queries
 */
class BlogIndex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array.isRequired
      }).isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    // Get the posts object
    const { data: { allMarkdownRemark: { edges: posts } } } = this.props;
    // Get pager info from page context
    const { pageContext : { numPages, currentPage}} = this.props;

    return (
      <Container>
        <Headline>Blogposts</Headline>
        <ul>
          {posts.map(({ node }) => <PostPreview post={node} key={node.fields.slug} />)}
        </ul>

        {numPages > 1 ? <Pager numPages={numPages} currentPage={currentPage} pageType="blog" /> : null}
            
      </Container>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/pages/posts/*.md" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            author
          }
        }
      }
    }
  }
`;
