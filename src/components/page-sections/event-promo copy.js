import React from "react";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { FiChevronRight } from "react-icons/fi";
import useEventPromo from "../../hooks/useEventPromo";
import Container from "../styles/container";
import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";

const PageSection = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
`;

const SectionContent = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoColumn = styled.div`
  flex: 0 0 40%;
  padding: 5px;
  img {
    display: block;
    width: 50%;
  }
  div {
  }
`;

const Description = styled.div`
  flex: 0 0 40%;
  padding: 5px;
  color: #fff;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
  }
`;

const UnderLogo = styled.p`
  color: #fff;
  margin: 0;
`;

const EventPromo = () => {
  const { cloudinaryBaseURL } = siteMetaData();
  const eventData = useEventPromo();
  const backgroundImage = `${cloudinaryBaseURL}/${eventData[0].node.backgroundImage}`;
  return (
    <PageSection style={{ backgroundImage: `url(${backgroundImage})` }}>
      {eventData.map(({ node }) => (
        <SectionContent key={uuid()}>
          <LogoColumn>
            {node.logo && (
              <CloudinaryImage
                baseURL={cloudinaryBaseURL}
                width={300}
                img={node.logo}
                auto={false}
                alt=""
              />
            )}
            <UnderLogo>
              {node.eventLocation} | {node.eventDates}
            </UnderLogo>
          </LogoColumn>
          <Description>
            <h3>{node.eventProse}</h3>
            <a href={node.eventLink} target="_blank" rel="noopener noreferrer">
              {node.eventLinkText}
              <FiChevronRight />
            </a>
          </Description>
        </SectionContent>
      ))}
    </PageSection>
  );
};

export default EventPromo;
