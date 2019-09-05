import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import useBlogPosts from "../../hooks/useBlogPosts";

const RelatedPostsWrapper = styled.aside`
  background-color: #f0f0f0;
  padding: 20px;
  margin: 30px 0;

  h2,
  h3 {
    margin-top: 0;
  }
`;

const RelatedPostsList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;

  li {
    max-width: 30%;
    padding: 20px;
    margin: 0 20px;
    background-color: #fff;
  }

  a {
    text-decoration: none;
  }
  .date {
    padding-right: 20px;
  }
`;

const RelatedBlogPosts = ({ posts }) => {
  // if there are no related posts just return
  if (!posts) return null;

  const allPosts = useBlogPosts();
  const relatedPosts = allPosts.filter(({ node }) => {
    return posts.includes(node.frontmatter.blog_title);
  });

  return (
    <RelatedPostsWrapper>
      <h2>Related Posts</h2>
      <RelatedPostsList>
        {relatedPosts.map(({ node: post }) => (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>
              <h3>{post.frontmatter.blog_title}</h3>
              <span className="date">{post.frontmatter.date}</span>
              <span className="names">
                {post.frontmatter.author.map((person, i) => (
                  <span className="name" key={`${person}${i}`}>
                    {person}
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </RelatedPostsList>
    </RelatedPostsWrapper>
  );
};

export default RelatedBlogPosts;

RelatedBlogPosts.propTypes = {
  posts: PropTypes.array,
};

RelatedBlogPosts.defaultProps = {
  posts: null,
};
