import React from "react";
import PropTypes from "prop-types";

const CloudinaryImage = ({ baseURL, tnDefaultWidth, img, auto, alt }) => {
  const imageSrc = `${baseURL}/w_${auto ? "auto" : tnDefaultWidth}/${img}`;
  return (
    <div>
      <img src={imageSrc} alt={alt} />
    </div>
  );
};

CloudinaryImage.defaultProps = {
  alt: "",
};

CloudinaryImage.propTypes = {
  baseURL: PropTypes.string.isRequired,
  tnDefaultWidth: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  auto: PropTypes.bool.isRequired,
  alt: PropTypes.string,
};

export default CloudinaryImage;
