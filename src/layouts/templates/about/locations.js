import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../components/styles/container";
import SharePage from "../../../components/share-page";
import LinkDropdown from "../../../components/link-dropdown";

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
  const {
    data: {
      allLever: { edges: jobs },
    },
  } = props;
  const {
    pageContext: { location, locationLinks, teamLinks },
  } = props;

  return (
    <Container>
      <h1>{location}</h1>
      <LinkDropdown
        header="View by Location"
        pathPrefix="/about/careers/"
        linksList={locationLinks}
      />
      <LinkDropdown
        header="View by Team"
        pathPrefix="/about/careers/"
        linksList={teamLinks}
      />
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
    allLever: PropTypes.shape(),
  }).isRequired,
  pageContext: PropTypes.shape().isRequired,
};

export default LandingPageTemplate;

export const pageQuery = graphql`
  query CareersLocationsPageTemplate($location: String!) {
    allLever(filter: { categories: { location: { eq: $location } } }) {
      edges {
        node {
          id
          text
          categories {
            location
            team
          }
        }
      }
    }
  }
`;
