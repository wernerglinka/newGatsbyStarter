import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../components/styles/container";
import Button from "../../../components/styles/button";
import SocialShare from "../../../components/share-page";
import LinkDropdown from "../../../components/link-dropdown";

const JobListing = styled.article`
  h1 {
    position: relative;

    span {
      font-size: 0.8em;
    }
    .buttonContainer {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      padding: 5px 10px;
      border: 1px solid #ccc;
      font-size: 0.8em;
    }
  }

  section {
    margin-bottom: 30px;
  }
`;

const LandingPageTemplate = props => {
  const job = props.data.allLever.edges[0].node;

  const {
    pageContext: { locationLinks, teamLinks },
  } = props;

  return (
    <Container>
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
      <JobListing key={job.id}>
        <h1>
          {job.text} -
          <span>
            {job.categories.location},{job.categories.team},
            {job.categories.commitment}
          </span>
          <Button to={job.applyUrl} type="secondary" external text="Apply" />
        </h1>
        <section>{job.descriptionPlain}</section>
        <section>
          {job.lists.map(item => (
            <div key={item.text}>
              <h2>{item.text}</h2>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          ))}
        </section>
        <section>{job.additionalPlain}</section>
        <Button to={job.applyUrl} type="primary" external text="Apply Now" />
        <SocialShare
          pageURL={`about/careers/${job.id}`}
          title={job.text}
          description={job.descriptionPlain}
        />
      </JobListing>
    </Container>
  );
};

LandingPageTemplate.propTypes = {
  data: PropTypes.shape().isRequired,
  pageContext: PropTypes.shape().isRequired,
};

export default LandingPageTemplate;

export const pageQuery = graphql`
  query JobPageTemplate($id: String!) {
    allLever(filter: { id: { eq: $id } }) {
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
