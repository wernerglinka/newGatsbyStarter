import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PostPreview = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug;
  const blogAuthor = post.frontmatter.author.join(", ");

  return (
    <li>
      <h3>
        <Link to={post.fields.slug}>{title}</Link>
      </h3>
      <p>
        <span>{post.frontmatter.date}</span> | <span>{blogAuthor}</span>
      </p>
      <p dangerouslySetInnerHTML={{ __html: post.excerpt }} /> {/*eslint-disable-line*/}
    </li>
  );
};

export default PostPreview;

PostPreview.propTypes = {
  post: PropTypes.shape().isRequired,
};
