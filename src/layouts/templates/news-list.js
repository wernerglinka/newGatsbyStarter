/* global document, window */

import React, { useState, useRef } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Container from "../../components/styles/container";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const NewsList = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > li {
    list-style: none;
    position: relative;
    width: 200px;
    height: 300px;
    border: 2px solid #f0f0f0;
    margin: 0 10px 40px;

    &:hover {
      background-color: #f8f8f8;
    }

    a {
      display: block;
      padding: 20px;
      color: $default-text-color;
      text-decoration: none;

      &:hover {
        color: $default-hover-color;
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
  const allNewsListLength = allNewsList.length;
  const chunk = 6;
  const displayLengthRef = useRef(chunk);

  let listItemsToDisplay = allNewsList.slice(0, chunk);
  const [listItems, setListItems] = useState(listItemsToDisplay);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  // Todo: display length is updated after rendering so displayLength is "one step" behind
  // need to use a ref
  function fetchMoreListItems() {
    console.log(displayLengthRef);
    const displayLength = displayLengthRef.current;
    if (displayLength < allNewsListLength) {
      listItemsToDisplay = allNewsList.slice(
        displayLength + 1,
        displayLength + chunk
      );
      displayLengthRef.current += chunk;

      setListItems(prevState => [...prevState, ...listItemsToDisplay]);
      setIsFetching(false);
    }
  }

  return (
    <Container>
      <h1>{fields.heading}</h1>
      <h2>{fields.subheading}</h2>
      <NewsList>
        {listItems.map(({ node: newsItem }) => (
          <li key={newsItem.news_title}>
            <a
              href={newsItem.news_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`/assets/images/news-logos/${newsItem.news_org_logo}`}
                alt={newsItem.name_org}
              />
              <p>{newsItem.news_title}</p>
              <p>{newsItem.news_date}</p>
            </a>
          </li>
        ))}
      </NewsList>
      {isFetching && "Fetching more list items..."}
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
  query newsListQuery {
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
      filter: { frontmatter: { template: { eq: "news-list" } } }
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
