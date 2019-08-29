import React from "react";
import propTypes from "prop-types";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useMainNavLinks from "../../hooks/useMainMenuLinks";
import processLists from "../navigation/process-mega-menu-lists";
import removePromo from "../../utilities/remove-promo";
import Container from "../styles/container";

const PageSection = styled.section`
  width: 100%;
  border: 1px solid #000;
  padding: 50px;
`;

const SectionContent = styled.div`
  display: flex;
  opacity: 1;

  > div {
    flex: 0 0 33%;
  }

  ul {
    list-style: none;
  }
  li {
    padding: 5px 0;

    &.categoryTitle {
      font-weight: bold;
    }
    &.subCategoryTitle {
      font-weight: bold;
      padding-top: 15px;
    }
    &.empty {
      height: 20px;
    }
  }
`;

const GetStarted = () => {
  // get all nav links from the data layer
  const allLinks = useMainNavLinks();

  const sectionTitle = allLinks.allGetStartedJson.edges[0].node.label;
  const sectionContent = removePromo(
    processLists(allLinks.allGetStartedJson.edges)
  );

  return (
    <PageSection>
      <Container>
        <h1>{sectionTitle}</h1>
        <SectionContent>
          {sectionContent.map(list => (
            <div key={uuid()}>{list}</div>
          ))}
        </SectionContent>
      </Container>
    </PageSection>
  );
};

export default GetStarted;
