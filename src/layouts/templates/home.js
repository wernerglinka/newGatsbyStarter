import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Container from "../../components/styles/container";
import Headline from "../../components/styles/page-headline";

const HomePageTemplate = ({
  data: {
    markdownRemark: { frontmatter: fields },
  },
}) => {
  console.log(fields);
  return (
    <Container>
      <Headline>{fields.title}</Headline>
      <p>{fields.heading}</p>
      <p>{fields.subheading}</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
      <Link to="/page-2/">Go to page 2</Link>
    </Container>
  );
};

HomePageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default HomePageTemplate;

export const pageQuery = graphql`
  query HomePageTemplate {
    markdownRemark(frontmatter: { template: { eq: "home" } }) {
      frontmatter {
        title
        heading
        subheading
      }
    }
  }
`;
