import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../components/styles/container";

const LandingPageTemplate = props => {
  const {
    data: {
      markdownRemark: { frontmatter: fields },
    },
  } = props;
  const {
    data: {
      allBrightTalkWebinar: { edges: webinars },
    },
  } = props;

  return (
    <Container>
      <h1>{fields.heading}</h1>
      {webinars.map(({ node: webinar }) => (
        <div key={webinar.linkURL}>
          <img src={webinar.thumbnail} alt={webinar.title} />
          <h2>{webinar.title}</h2>
          <p>{webinar.description}</p>
          <a href={webinar.linkURL} target="_blank" rel="noopener noreferrer">
            Watch Webinar
          </a>
        </div>
      ))}
    </Container>
  );
};

LandingPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default LandingPageTemplate;

export const pageQuery = graphql`
  query ResourcesWebinarsVideosTemplate {
    markdownRemark(
      frontmatter: { template: { eq: "resources/webinars-videos" } }
    ) {
      frontmatter {
        title
        heading
      }
    }
    allBrightTalkWebinar {
      edges {
        node {
          description
          linkURL
          thumbnail
          title
        }
      }
    }
  }
`;
