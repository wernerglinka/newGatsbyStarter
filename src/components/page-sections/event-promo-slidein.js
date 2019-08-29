/* global document, localStorage */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useEventPromo from "../../hooks/useEventPromo";
import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";

const WidgetWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 200px;
  z-index: 1000;
  height: 240px;
  width: 370px;
  padding-left: 40px;
  transform: translateX(330px);
  transition: all 0.5s ease-in-out;

  &.open {
    transform: translateX(0);
  }
`;

const WidgetTrigger = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background-color: #666;
  cursor: pointer;

  p {
    transform: rotate(90deg);
    color: #fff;
    white-space: nowrap;
    padding: 20px 0;
    pointer-events: none;
  }

  svg {
    position: absolute;
    left: 15px;
    bottom: 20px;
    color: #fff;
    transition: all 0.5s ease-in-out;
    pointer-events: none;

    &.open {
      transform: rotate(180deg);
    }
  }
`;

const WidgetContent = styled.div`
  div:first-of-type {
    height: 160px;
    padding-left: 20px;
    background-repeat: no-repeat;
    background-position: top left;

    img {
      width: 200px;
      display: inline-block;
    }
    p {
      color: #fff;
    }
  }
  div:nth-of-type(2) {
    height: 80px;
    padding: 20px;
    background-color: #f8f8f8;

    h3 {
      margin: 0;
    }
  }
`;

/**
 * Event promo widget
 */
const EventPromoSlidein = () => {
  const [widgetIsVisible, setWidgetVisibility] = useState(false);
  const { cloudinaryBaseURL } = siteMetaData();
  const eventData = useEventPromo();
  const backgroundImage = `${cloudinaryBaseURL}/${eventData[0].node.backgroundImage}`;

  /**
   * The event promo is shown to the user automatically, after a slight delay,
   * for a short period of time. A flag in localStorage will be set so the user
   * only sees this automatically once. However, the slideout can always be
   * shown by clicking on the tab.
   */
  useEffect(() => {
    const alreadySeen = localStorage.getItem("promoHasBeenSeen");
    if (!alreadySeen) {
      setTimeout(function() {
        setWidgetVisibility(true);
        setTimeout(function() {
          setWidgetVisibility(false);
          localStorage.setItem("promoHasBeenSeen", "true");
        }, 3000);
      }, 3000);
    }
  }, []);

  return (
    <WidgetWrapper className={widgetIsVisible ? "open" : null}>
      <WidgetTrigger onClick={() => setWidgetVisibility(!widgetIsVisible)}>
        <p>EVENT: {eventData[0].node.name}</p>
        <FiChevronLeft className={widgetIsVisible ? "open" : null} />
      </WidgetTrigger>
      {eventData.map(({ node }) => (
        <WidgetContent
          key={uuid()}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div>
            {node.logo && (
              <CloudinaryImage
                baseURL={cloudinaryBaseURL}
                width={300}
                img={node.logo}
                auto={false}
                alt=""
              />
            )}
            <p>
              {node.eventLocation} | {node.eventDates}
            </p>
          </div>
          <div>
            <h3>{node.eventProse}</h3>
            <a href={node.eventLink} target="_blank" rel="noopener noreferrer">
              {node.eventLinkText}
              <FiChevronRight />
            </a>
          </div>
        </WidgetContent>
      ))}
    </WidgetWrapper>
  );
};

export default EventPromoSlidein;
