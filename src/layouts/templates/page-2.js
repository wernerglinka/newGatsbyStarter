import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../components/styles/container";

const VideoContainer = styled.div`
  width: 100%;
  max-width: 640px;

  video {
    width: 100%;
    height: auto;
  }
`;

const SecondPageTemplate = ({
  data: {
    markdownRemark: { frontmatter: fields },
  },
}) => (
  <Container>
    <h1>{fields.title}</h1>
    <p>{fields.heading}</p>
    <Link to="/">Go back to the homepage</Link>

    <p>Video is served from Cloudinary</p>

    <VideoContainer>
      {/* eslint jsx-a11y/media-has-caption:0 */}
      <video
        poster="https://res.cloudinary.com/glinkaco/video/upload/v1565046696/Industrial/industrial_acjl8w.jpg"
        controls
      >
        <source
          src="http://res.cloudinary.com/glinkaco/video/upload/v1565046696/Industrial/industrial_acjl8w.webm"
          type="video/webm"
        />
        <source
          src="http://res.cloudinary.com/glinkaco/video/upload/v1565046696/Industrial/industrial_acjl8w.ogv"
          type="video/ogg"
        />
        <source
          src="http://res.cloudinary.com/glinkaco/video/upload/v1565046696/Industrial/industrial_acjl8w.mp4"
          type="video/mp4"
        />
      </video>
    </VideoContainer>
  </Container>
);

SecondPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default SecondPageTemplate;

export const pageQuery = graphql`
  query Page2Template {
    markdownRemark(frontmatter: { template: { eq: "page-2" } }) {
      frontmatter {
        title
        heading
        subheading
        videoid
      }
    }
  }
`;
