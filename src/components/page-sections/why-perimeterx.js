import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";

import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";
import useWhyPX from "../../hooks/useWhyPX";
import Fade from "../fade";

const PageSection = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  padding: 30px 50px 50px;
  margin: 20px 0;
`;

const Tabs = styled.ul`
  list-style: none;
`;

const TabPanes = styled.div`
  position: relative;
  padding: 20px;
  background-color: #f8f8f8;
  height: 200px;
`;

const TabPane = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 20px 20px;

  ul {
    margin: 0 0 20px 20px;
  }
`;

/**
 * Why PerimeterX Component
 */
const WhyPX = () => {
  const { cloudinaryBaseURL } = siteMetaData();
  const whyPXContent = useWhyPX();

  const initialTabsState = {
    tabPane1: false,
    tabPane2: false,
    tabPane3: false,
    tabPane4: false,
    tabPane5: false,
  };
  const [tabsState, setTabsState] = useState(initialTabsState);

  useEffect(() => {
    setTabsState({ ...tabsState, tabPane1: "true" });
  }, []);

  function manageTabs(e) {
    const tabTarget = e.target.getAttribute("tabtarget");
    setTabsState({
      ...tabsState,
      ...initialTabsState,
      ...(initialTabsState[tabTarget] = "true"),
    });
  }

  return (
    <PageSection>
      <h1>{whyPXContent[0].node.sectionHeader}</h1>
      <div>
        <Tabs>
          {whyPXContent.map(
            ({ node: tabText }, i) =>
              !tabText.sectionHeader && (
                <li key={uuid()}>
                  <button
                    type="button"
                    onClick={manageTabs}
                    onKeyDown={manageTabs}
                    onTouchEnd={manageTabs}
                    tabIndex="-1"
                    tabtarget={`tabPane${i}`}
                  >
                    {tabText.tab}
                  </button>
                </li>
              )
          )}
        </Tabs>
        <TabPanes>
          {whyPXContent.map(
            ({ node: content }, i) =>
              !content.sectionHeader && (
                <Fade key={uuid()} show={tabsState[`tabPane${i}`]}>
                  <TabPane id={`tabPane${i}`}>
                    <h2>{content.title}</h2>
                    <ul>
                      {content.features.map(listItem => (
                        <li key={uuid()}>{listItem}</li>
                      ))}
                    </ul>
                    <Link to={content.link}>{content.linkText}</Link>
                  </TabPane>
                </Fade>
              )
          )}
        </TabPanes>
      </div>
    </PageSection>
  );
};

export default WhyPX;
