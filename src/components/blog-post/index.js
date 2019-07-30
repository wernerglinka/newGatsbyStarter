import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Container from "../styles/container";
import Headline from "../styles/page-headline";
import Bio from "../bio";

const BlogLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  section {
    flex: 0 0 ${props => props.theme.mainWidth};
    padding-right: 30px;
  }
  aside {
    flex: 0 0 ${props => props.theme.sidebarWidth};
    border: 1px solid #f5f5f5;
  }
`;

const BlogPost = ({ fields, content }) => {
  const { author } = fields;

  return (
    <Container>
      <BlogLayout>
        <section id="content">
          <article itemScope itemType="http://schema.org/BlogPosting">
            <header>
              <Headline itemProp="headline">{fields.title}</Headline>
              <p>
                <time itemProp="datePublished" dateTime={fields.date}>
                  {fields.date}
                </time>
              </p>
            </header>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </section>

        <aside id="sidebar">
          <Bio author={author} />
        </aside>
      </BlogLayout>
    </Container>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  fields: PropTypes.object.isRequired, // eslint-disable-line
  content: PropTypes.string.isRequired,
};
