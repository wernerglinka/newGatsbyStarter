import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";
import Head from "../../../components/head";

import Container from "../../../components/styles/container";

const PressReleaseTemplate = props => {
  const {
    data: {
      markdownRemark: { frontmatter: fields, html },
    },
  } = props;

  const siteMetadata = {
    title: fields.title,
    description: fields.description,
  };

  return (
    <>
      <Head metaData={siteMetadata} />
      <Container>
        <section id="content">
          <article itemScope itemType="http://schema.org/BlogPosting">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </section>
      </Container>
    </>
  );
};

PressReleaseTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PressReleaseTemplate;

export const pageQuery = graphql`
  query AboutPressReleaseTemplate {
    markdownRemark(frontmatter: { template: { eq: "about/press-release" } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
