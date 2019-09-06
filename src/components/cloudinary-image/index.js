import React from "react";
import PropTypes from "prop-types";

const CloudinaryImage = ({ baseURL, width, img, auto, alt }) => {
  // auto quality, auto width, auto format -e.g. webp if supported with a max width of 800px
  const autoString = `fl_strip_profile,q_auto,w_auto,f_auto,c_scale/w_800`;
  // auto quality, default width with auto format
  const defaultString = `fl_strip_profile,q_auto,w_${width},f_auto`;
  // compose image url: baseURL and tnDefaultWidth is defined in siteMetadata, img comes from page frontmatter
  const imageSrc = `${baseURL}/${auto ? autoString : defaultString}/${img}`;

  return <img src={imageSrc} alt={alt} sizes="100vw" />;
};

CloudinaryImage.defaultProps = {
  alt: "",
};

CloudinaryImage.propTypes = {
  baseURL: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  auto: PropTypes.bool.isRequired,
  alt: PropTypes.string,
};

export default CloudinaryImage;
