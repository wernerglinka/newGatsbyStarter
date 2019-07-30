import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Container from "../../components/styles/container";

const SecondPageTemplate = ({
  data: {
    markdownRemark: { frontmatter: fields },
  },
}) => (
  <Container>
    <h1>{fields.title}</h1>
    <p>{fields.heading}</p>
    <Link to="/">Go back to the homepage</Link>
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
      }
    }
  }
`;
