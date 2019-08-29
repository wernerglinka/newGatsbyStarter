import React, { useState } from "react";
import propTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { FiX } from "react-icons/fi";
import useHowPXWorks from "../../hooks/useHowPXWorks";
import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";

const PageSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 40px;
`;

const TextContainer = styled.div`
  position: absolute;
  h3 {
    margin: 0 0 10px;
  }

  .longText {
    position: absolute;
    z-index: 1;
    width: 400px;
    padding: 20px;
    background-color: #f8f8f8;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    pointer-events: none;

    &.isVisible {
      opacity: 1;
      z-index: 2;
      pointer-events: auto;
    }

    svg {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
  }

  &#deploy {
    top: 20%;
    left: 5%;

    .longText {
      top: 0;
      left: 0;
    }
  }
  &#sense {
    bottom: 20%;
    left: 5%;

    .longText {
      bottom: 0;
      left: 0;
    }
  }
  &#detect {
    top: 20%;
    right: 5%;

    .longText {
      top: 0;
      right: 0;
    }
  }
  &#enforce {
    bottom: 20%;
    right: 5%;

    .longText {
      bottom: 0;
      right: 0;
    }
  }
`;

const ShortText = styled.div`
  width: 160px;
  height: 120px;
  overflow: hidden;
  padding: 10px;

  button {
    cursor: pointer;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const ButtonLink = styled(props => <Link {...props} />)`
  display: inline-block;
  padding: 10px 30px;
  border: 1px solid #000;
  text-decoration: none;
`;

/**
 * How PX Platform Works Component
 */
const HowPXWorks = () => {
  const hideAllTextPanes = {
    deploy: false,
    sense: false,
    detect: false,
    enforce: false,
  };

  const [textPane, showTextPane] = useState(hideAllTextPanes);

  const { cloudinaryBaseURL } = siteMetaData();
  const howToData = useHowPXWorks();

  const HowToImageSmall = () => (
    <img
      src={`${cloudinaryBaseURL}/${howToData[0].node.imageSmall}`}
      alt={howToData[0].node.header}
    />
  );
  const HowToHeader = () => <h1>{howToData[0].node.header}</h1>;
  const HowToLink = () => (
    <Link to={howToData[0].node.link}>{howToData[0].node.linkText}</Link>
  );

  function handleReadMore(e) {
    const textPaneID = e.target.getAttribute("parentid");
    switch (textPaneID) {
      case "deploy":
        showTextPane({ ...textPane, ...hideAllTextPanes, deploy: true });
        break;
      case "sense":
        showTextPane({ ...textPane, ...hideAllTextPanes, sense: true });
        break;
      case "detect":
        showTextPane({ ...textPane, ...hideAllTextPanes, detect: true });
        break;
      case "enforce":
        showTextPane({ ...textPane, ...hideAllTextPanes, enforce: true });
        break;

      default:
    }
  }

  function closeTextPane() {
    showTextPane({ ...textPane, ...hideAllTextPanes });
  }

  return (
    <PageSection>
      <HowToHeader />
      <CloudinaryImage
        baseURL={cloudinaryBaseURL}
        width={500}
        img={howToData[0].node.image}
        auto={false}
        alt="howToData[0].node.header"
      />
      <HowToLink />
      {howToData.map(
        ({ node: point }, i) =>
          !point.header && (
            <TextContainer id={point.name.toLowerCase()} key={uuid()}>
              <ShortText>
                <h3>{point.name}</h3>
                {point.shortText}
                <button
                  onClick={handleReadMore}
                  onTouchStart={handleReadMore}
                  onKeyDown={handleReadMore}
                  parentid={point.name.toLowerCase()}
                  tabIndex="0"
                  type="button"
                >
                  ...Read More
                </button>
              </ShortText>
              <div
                className={`longText ${
                  textPane[point.name.toLowerCase()] ? "isVisible" : null
                }`}
              >
                <FiX onClick={closeTextPane} />
                <h3>{point.name}</h3>
                {point.text}
              </div>
            </TextContainer>
          )
      )}
    </PageSection>
  );
};

export default HowPXWorks;
