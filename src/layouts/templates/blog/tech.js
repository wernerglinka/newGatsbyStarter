/*  eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import PostPreview from "../../../components/blog-post/post-preview";
import Pager from "../../../components/pager";
import Container from "../../../components/styles/container";
import Headline from "../../../components/styles/page-headline";

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
      }).isRequired,
      allSite: PropTypes.shape().isRequired,
    }).isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    // Get the posts object
    const { data: { allMarkdownRemark: { edges: posts } } } = this.props;
    // Get image base URL and default thumbnail width
    const { data: { allSite: { edges: siteMetaData } } } = this.props;
    const imageData = siteMetaData[0].node.siteMetadata;
    // Get pager info from page context
    const { pageContext : { numPages, currentPage}} = this.props;

    console.log(imageData);

    return (
      <Container>
        <Headline>Blogposts</Headline>
        <ul>
          {posts.map(({ node }) => <PostPreview post={node} imageData={imageData} key={node.fields.slug} />)}
        </ul>

        {numPages > 1 ? <Pager numPages={numPages} currentPage={currentPage} pageType="blog" /> : null}
            
      </Container>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query techBlogListQuery{
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/pages/techBlog/**/*.md" },frontmatter: { draft: { ne: true } } }
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
