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
  query ResourcesResourcesServicesTemplate {
    markdownRemark(frontmatter: { template: { eq: "resources/services" } }) {
      frontmatter {
        title
        heading
      }
    }
  }
`;
