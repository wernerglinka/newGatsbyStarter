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
  console.log(fields);
  return (
    <Container>
      <h1>{fields.heading}</h1>
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
  query AboutCareersPageTemplate {
    markdownRemark(frontmatter: { template: { eq: "about/careers" } }) {
      frontmatter {
        title
        heading
      }
    }
    allLever {
      edges {
        node {
          id
          lever_id
          createdAt
          text
          hostedUrl
          applyUrl
          categories {
            commitment
            location
            team
          }
          description
          descriptionPlain
          lists {
            text
            content
          }
          additional
          additionalPlain
        }
      }
    }
  }
`;
