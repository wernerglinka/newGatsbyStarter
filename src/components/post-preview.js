import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import CloudinaryImage from "./cloudinary-image";

const PostPreview = ({ post, imageData }) => {
  const title = post.frontmatter.title || post.fields.slug;
  const blogAuthor = post.frontmatter.author.join(", ");
  const thumbnail = post.frontmatter.featuredImage;
  const altText = post.frontmatter.alt;
  const { tnDefaultWidth, cloudinaryBaseURL } = imageData;

  console.log(post);

  return (
    <li>
      {thumbnail && (
        <CloudinaryImage
          baseURL={cloudinaryBaseURL}
          tnDefaultWidth={tnDefaultWidth}
          img={thumbnail}
          auto={false}
          alt={altText}
        />
      )}
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
  imageData: PropTypes.shape().isRequired,
};
