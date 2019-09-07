import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../../components/styles/container";
import Button from "../../../components/styles/button";
import SocialShare from "../../../components/share-page";

const JobListing = styled.article`
  h1 {
    position: relative;

    span {
      font-size: 0.8em;
    }
    a {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      padding: 5px 10px;
      border: 1px solid #ccc;
      font-size: 0.8em;
      text-decoration: none;
    }
  }

  section {
    margin-bottom: 30px;
  }
`;

const LandingPageTemplate = props => {
  console.log(props);

  const {
    pageContext: { id: jobID },
  } = props;

  const {
    data: {
      allLever: { edges: allJobs },
    },
  } = props;

  return (
    <Container>
      {allJobs.map(({ node: job }) => {
        return job.id === jobID ? (
          <JobListing key={job.id}>
            <h1>
              {job.text} -{" "}
              <span>
                {job.categories.location},{job.categories.team},
                {job.categories.commitment}
              </span>
              <Button
                to={job.applyUrl}
                type="secondary"
                external
                text="Apply"
              />
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
            <Button
              to={job.applyUrl}
              type="primary"
              external
              text="Apply Now"
            />
            <SocialShare
              pageURL={`about/careers/${job.id}`}
              title={job.text}
              description={job.descriptionPlain}
            />
          </JobListing>
        ) : null;
      })}
    </Container>
  );
};

LandingPageTemplate.propTypes = {
  data: PropTypes.shape().isRequired,
  pageContext: PropTypes.shape().isRequired,
};

export default LandingPageTemplate;

export const pageQuery = graphql`
  query JobPageTemplate {
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
