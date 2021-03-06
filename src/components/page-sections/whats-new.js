import React, { useState, useEffect } from "react";
import WhatsNewSlider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import propTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";

const PageSection = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  padding: 30px 50px 50px;
  margin: 20px 0;

  .slick-arrow {
    position: absolute;
    height: 30px;
    width: auto;
    top: 45%;
    left: -40px;
    cursor: pointer;

    &.slick-next {
      left: auto;
      right: -40px;
    }

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const SliderHeader = styled.div`
  position: relative;

  h1 {
    margin: 0 0 30px;
  }
  a {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Slide = styled.div`
  height: 250px;
  width: 250px;
`;

const ImageContainer = styled.div`
  height: 150px;
  width: 250px;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <span {...props}>{children}</span>
);

/**
 * What's New Component
 */
const WhatsNew = () => {
  const {
    allWhatsNewJson: { edges: whatsNewData },
  } = useStaticQuery(graphql`
    query WhatsNewQuery1 {
      allWhatsNewJson {
        edges {
          node {
            header
            sectionLink
            sectionLinkText
            linkText
            category
            external
            image
            link
            text
          }
        }
      }
    }
  `);
  const { cloudinaryBaseURL } = siteMetaData();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: (
      <SlickButtonFix>
        <FiChevronRight />
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <FiChevronLeft />
      </SlickButtonFix>
    ),
  };

  return (
    <PageSection>
      <SliderHeader>
        <h1>{whatsNewData[0].node.header}</h1>
        <Link to={whatsNewData[0].node.sectionLink}>
          {whatsNewData[0].node.sectionLinkText}
        </Link>
      </SliderHeader>

      <WhatsNewSlider {...sliderSettings}>
        {whatsNewData.map(
          ({ node: slide }) =>
            !slide.header && (
              <Slide key={uuid()}>
                <ImageContainer
                  style={{
                    backgroundImage: `url(${cloudinaryBaseURL}/fl_strip_profile,q_auto,f_auto,w_400/${slide.image})`,
                  }}
                />
                <div>
                  <p>
                    <strong>{slide.category}</strong>: {slide.text}
                  </p>
                  <p>
                    {slide.external ? (
                      <a
                        href="slide.link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {slide.linkText}
                      </a>
                    ) : (
                      <Link to={slide.link}>{slide.linkText}</Link>
                    )}
                  </p>
                </div>
              </Slide>
            )
        )}
      </WhatsNewSlider>
    </PageSection>
  );
};

export default WhatsNew;
