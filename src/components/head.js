import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const Head = ({ metaData }) => {
  const {
    canonicalURL,
    description,
    faviconURL,
    imageURL,
    pageURL,
    social,
    title,
    validate,
  } = metaData;

  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="cleartype" content="on" />

      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />

      <title>{title} | PerimeterX</title>
      <meta name="description" content={description} />
      <meta name="msvalidate.01" content={validate.ms} />

      <link rel="canonical" href={canonicalURL} />
      <link rel="shortcut icon" href={faviconURL} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={social.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={social.siteOwner} />
      <meta name="twitter:image" content={imageURL} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageURL} />
      <meta property="og:site_name" content={social.siteOwner} />
      <meta property="og:image" content={imageURL} />

      <meta itemProp="”name”" content={title} />
      <meta itemProp="”description”" content={description} />
    </Helmet>
  );
};

Head.propTypes = {
  metaData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    pageURL: PropTypes.string.isRequired,
    validate: PropTypes.shape().isRequired,
    canonicalURL: PropTypes.string.isRequired,
    faviconURL: PropTypes.string.isRequired,
    social: PropTypes.shape().isRequired,
  }).isRequired,
};

export default Head;
