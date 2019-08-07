import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import useSiteMetadata from "../hooks/useSiteMetadata";

const Head = ({ metaData }) => {
  // deconstruct the passed-in meta data
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

  // get the default data
  const defaultSiteMetadata = useSiteMetadata();
  const {
    canonicalURL: defaultCanonicalURL,
    description: defaultdescription,
    faviconURL: defaultFaviconURL,
    imageURL: defaultImageURL,
    pageURL: defaultPageURL,
    social: defaultSocial,
    title: defaultTitle,
    validate: defaultValidate,
  } = defaultSiteMetadata;

  // use default meta data if the particular meta data is not passed in
  const metadata = {
    canonicalURL: canonicalURL || defaultCanonicalURL,
    description: description || defaultdescription,
    faviconURL: faviconURL || defaultFaviconURL,
    imageURL: imageURL || defaultImageURL,
    pageURL: pageURL || defaultPageURL,
    social: social || defaultSocial,
    title: title || defaultTitle,
    validate: validate || defaultValidate,
  };

  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="cleartype" content="on" />

      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />

      <title>{metadata.title} | PerimeterX</title>
      <meta name="description" content={metadata.description} />
      <meta name="msvalidate.01" content={metadata.validate.ms} />

      <link rel="canonical" href={canonicalURL} />
      <link rel="shortcut icon" href={faviconURL} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={metadata.social.twitterHandle} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:creator" content={metadata.social.siteOwner} />
      <meta name="twitter:image" content={metadata.imageURL} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.pageURL} />
      <meta property="og:site_name" content={metadata.social.siteOwner} />
      <meta property="og:image" content={metadata.imageURL} />

      <meta itemProp="”name”" content={metadata.title} />
      <meta itemProp="”description”" content={metadata.description} />
    </Helmet>
  );
};

Head.propTypes = {
  metaData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    pageURL: PropTypes.string,
    validate: PropTypes.shape(),
    canonicalURL: PropTypes.string,
    faviconURL: PropTypes.string,
    social: PropTypes.shape(),
  }),
};

Head.defaultProps = {
  metaData: {
    title: null,
    description: null,
    imageURL: null,
    pageURL: null,
    validate: null,
    canonicalURL: null,
    faviconURL: null,
    social: null,
  },
};

export default Head;
