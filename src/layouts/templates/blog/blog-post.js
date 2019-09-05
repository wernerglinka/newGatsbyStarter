import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import PostBody from "../../../components/blog-post";
import RelatedBlogPosts from "../../../components/blog-post/related-blog-posts";
import Container from "../../../components/styles/container";

const NextPreviousPager = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;

  a {
    text-decoration: none;
  }
`;

const BlogPageTemplate = props => {
  // deconstruct previous and next objects from props
  const {
    pageContext: { previous, next },
  } = props;

  // deconstruct all post content
  const {
    data: {
      markdownRemark: { frontmatter: fields, html },
    },
  } = props;

  return (
    <Container>
      <PostBody fields={fields} content={html} />

      <NextPreviousPager>
        {previous && (
          <li>
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </NextPreviousPager>
      <RelatedBlogPosts posts={fields.related_posts} />
    </Container>
  );
};

BlogPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.string,
    }),
  }),
  pageContext: PropTypes.shape({
    previous: PropTypes.shape(),
    next: PropTypes.shape(),
  }),
};

BlogPageTemplate.defaultProps = {
  data: {
    markdownRemark: {
      frontmatter: null,
      html: null,
    },
  },
  pageContext: {
    previous: null,
    next: null,
  },
};

export default BlogPageTemplate;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        related_posts
        thumbnail
        breadcrumbs {
          name
          path
        }
      }
    }
  }
`;
