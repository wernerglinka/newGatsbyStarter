import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../components/styles/container";

const LandingPageTemplate = props => {
  console.log(props);
  const {
    data: {
      markdownRemark: { frontmatter: fields },
    },
  } = props;
  const {
    data: {
      allLever: { edges: jobs },
    },
  } = props;

  return (
    <Container>
      <h1>{fields.heading}</h1>
      <ul>
        {jobs.map(({ node: job }) => (
          <li key={job.id}>
            {job.text}, {job.categories.location}
          </li>
        ))}
      </ul>
    </Container>
  );
};

LandingPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    allLever: PropTypes.shape(),
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
