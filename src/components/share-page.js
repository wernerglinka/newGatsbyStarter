import React from "react";
import PropTypes from "prop-types";
import { FiTwitter, FiFacebook, FiLinkedin, FiMail } from "react-icons/fi";
import styled from "@emotion/styled";
import useSiteMetadata from "../hooks/useSiteMetadata";

const SocialShareList = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    margin: 0 20px;
  }
`;

const SharePage = ({ pageURL, title, description }) => {
  const { canonicalURL: siteURL } = useSiteMetadata();
  return (
    <SocialShareList>
      <li>
        <a
          href={`http://www.linkedin.com/shareArticle?url=${siteURL}${pageURL}&title=${title}&summary=${description}&source=${siteURL}`}
          target="_blank"
          rel="noopener noreferrer"
          title="share on LinkedIn"
        >
          <FiLinkedin />
        </a>
      </li>
      <li>
        <a
          href={`https://twitter.com/intent/tweet?text=${siteURL}${pageURL}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Twitter"
        >
          <FiTwitter />
        </a>
      </li>
      <li>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${siteURL}${pageURL}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
        >
          <FiFacebook />
        </a>
      </li>
      <li>
        <a
          href={`mailto:?subject=Checkout this page&body=Very interesting read: ${siteURL}${pageURL}`}
          title="Share via email"
        >
          <FiMail />
        </a>
      </li>
    </SocialShareList>
  );
};

SharePage.propTypes = {
  pageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SharePage;
