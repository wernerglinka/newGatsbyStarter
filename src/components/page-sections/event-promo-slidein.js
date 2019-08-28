import React, { useState } from "react";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { FiChevronRight } from "react-icons/fi";
import useEventPromo from "../../hooks/useEventPromo";
import Container from "../styles/container";
import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";

const WidgetWrapper = `
  position: fixed;
  right: 0;
`;

const WidgetTrigger = `
  width: 40px;
  background-color: #666;

  p {
    transform: rotate(90deg);
    color: #fff;
  }
`;

const WidgetContent = styled.div`
  div:first-child {
    background-repeat: no-repeat;
    background-position: top left;
  }
`;

const EventPromoSlidein = () => {
  const [widgetIsVisible, setWidgetVisibility] = useState(false);
  const { cloudinaryBaseURL } = siteMetaData();
  const eventData = useEventPromo();
  const backgroundImage = `${cloudinaryBaseURL}/${eventData[0].node.backgroundImage}`;
  return (
    <WidgetWrapper style={{ backgroundImage: `url(${backgroundImage})` }}>
      <WidgetTrigger>
        <p>Trigger here...</p>
      </WidgetTrigger>
      {eventData.map(({ node }) => (
        <WidgetContent key={uuid()}>
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
            <div>
              {node.eventLocation} | {node.eventDates}
            </div>
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
