import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../components/styles/container";
import SharePage from "../../../components/share-page";

const JobsList = styled.ul`
  list-style: none;

  li {
    display: flex;
    justify-content: flex-start;
    padding: 5px 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;

    span {
      min-width: 20%;
    }
  }
`;

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
      <JobsList>
        {jobs.map(({ node: job }) => (
          <li key={job.id}>
            <span className="location">{job.categories.location}</span>
            <span className="team">{job.categories.team}</span>
            <Link to={`/about/careers/${job.id}`}>{job.text}</Link>
          </li>
        ))}
      </JobsList>
      <SharePage
        pageURL="/about/careers/"
        title="Jobs at PerimeterX"
        description="Jobs at PerimeterX"
      />
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
