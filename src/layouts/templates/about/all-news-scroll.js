/* global document, window */
/* inspired by:  https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks */

import React, { useState, useRef, useEffect } from "react";
import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Container from "../../../components/styles/container";
import useAddToList from "../../../hooks/useAddToList";

const NewsList = styled.ul`
  width: 100%;
  margin: 0 auto;

  > li {
    list-style: none;
    position: relative;
    border: 2px solid #f0f0f0;
    margin: 0 10px 40px;
    &:hover {
      background-color: #f8f8f8;
    }
    a {
      display: flex;
      justify-content: flex-start;
      padding: 20px;
      color: $default-text-color;
      text-decoration: none;
      &:hover {
        color: $default-hover-color;
      }

      > div {
        padding: 0 20px;
        min-width: 190px;
      }

      p {
        margin-top: 0;
      }
    }
    img {
      max-width: 160px;
      max-height: 80px;
      margin: 0;
    }
    p {
      margin-bottom: 10px;
      line-height: 1.2;
      font-weight: 300;
    }
  }
`;

const NewsListPage = props => {
  const allNewsList = props.data.allNewsJson.edges;
  const fields = props.data.allMarkdownRemark.edges[0].node.frontmatter;
  const chunk = 8;

  // useAddToList provides  ref for the element after the list that will be lazy loaded
  // and the listItems to build the list
  const [ref, listItems] = useAddToList(allNewsList, chunk, {
    root: null,
    rootMargin: "200px",
    threashold: 1,
  });

  return (
    <Container>
      <h1>{fields.heading}</h1>
      <h2>{fields.subheading}</h2>
      <NewsList id="newsList">
        {listItems.map(({ node: newsItem }, i) => (
          <li key={`${newsItem.news_title}${i}`}>
            {newsItem.news_type === "press release" ? (
              <Link to={newsItem.news_url}>
                <div>{newsItem.news_date}</div>
                <div>
                  <p className="type">{newsItem.news_type}</p>
                  <p className="org">{newsItem.name_org}</p>
                </div>
                <div>{newsItem.news_title}</div>
              </Link>
            ) : (
              <a
                href={newsItem.news_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>{newsItem.news_date}</div>
                <div>
                  <p className="type">{newsItem.news_type}</p>
                  <p className="org">{newsItem.name_org}</p>
                </div>
                <div>{newsItem.news_title}</div>
              </a>
            )}
          </li>
        ))}
      </NewsList>
      <div ref={ref} />
    </Container>
  );
};

NewsListPage.propTypes = {
  data: PropTypes.shape({
    allNewsJson: PropTypes.object,
    allMarkdownRemark: PropTypes.object,
  }).isRequired,
};

export default NewsListPage;

export const query = graphql`
  query newsListScrollQuery {
    allNewsJson {
      edges {
        node {
          name_org
          news_org_logo
          news_org_logo_wide
          news_title
          news_url
          news_date
          news_type
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "about/all-news-scroll" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            heading
            subheading
          }
        }
      }
    }
  }
`;
