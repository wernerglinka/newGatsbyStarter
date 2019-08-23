import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../../components/styles/container";

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
  query ProductsTechnologyPlatformPageTemplate {
    markdownRemark(
      frontmatter: { template: { eq: "products/technology-platform/index" } }
    ) {
      frontmatter {
        title
        heading
      }
    }
  }
`;
