import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Pager from "../../components/pager";
import Container from "../../components/styles/container";

const NewsList = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

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

const News = props => {
  const newsItems = props.data.allNewsJson.edges; // eslint-disable-line

  // get the context to build a pager
  const {
    pageContext: { numNewsPages, currentNewsPage },
  } = props;

  return (
    <Container>
      {currentNewsPage === 1 && (
        <div>
          <h2>Our Press Coverage</h2>
          <p>
            This text is only displayed on the first news listing page.
            <br />
            {/* eslint react/jsx-one-expression-per-line:0 */}
            All press items are stored in <em>data/news/news.json</em>. The code
            to implement paging is located in <strong>gatsby-node.js</strong>.
            The approach was inspired by
            https://www.gatsbyjs.org/docs/adding-pagination/. However, all
            pagination examples seem to focus on a blog implementation, with
            blog pages authored in markdown. For this News application there are
            no pages only the list pages and the list pages display the news
            title and news organization logo linked to the original publication.
          </p>
        </div>
      )}

      <NewsList>
        {newsItems.map(({ node }) => (
          <li key={node.news_title}>
            <a href={node.news_url} target="_blank" rel="noopener noreferrer">
              <img
                src={`/assets/images/news-logos/${node.news_org_logo}`}
                alt={node.name_org}
              />
              <p>{node.news_title}</p>
              <p>{node.news_date}</p>
            </a>
          </li>
        ))}
      </NewsList>

      {numNewsPages > 1 ? (
        <Pager
          numPages={numNewsPages}
          currentPage={currentNewsPage}
          pageType="news"
        />
      ) : null}
    </Container>
  );
};

News.propTypes = {
  data: PropTypes.object.isRequired,   // eslint-disable-line
  pageContext: PropTypes.shape({
    numNewsPages: PropTypes.number.isRequired,
    currentNewsPage: PropTypes.number.isRequired,
  }).isRequired,
};

export default News;

export const query = graphql`
  query newsQuery($skip: Int!, $limit: Int!) {
    allNewsJson(limit: $limit, skip: $skip) {
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
  }
`;
