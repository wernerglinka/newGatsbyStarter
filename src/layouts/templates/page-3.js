/* global document */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Container from "../../components/styles/container";

const Comparison = styled.div`
  position: relative;
  width: 640px;
  height: 480px;
`;

const BeforeImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("https://res.cloudinary.com/glinkaco/image/upload/v1565648973/beforeafter/xcomputer_img2-1.png.pagespeed.ic.yKBqVe9oeI_b2dgks.webp");
  background-size: cover;
`;

const AfterImage = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background-image: url("https://res.cloudinary.com/glinkaco/image/upload/v1565648970/beforeafter/xcomputer_img1-1.png.pagespeed.ic.6V3s8gtHcG_mmeol1.webp");
  background-size: cover;
`;

const Handle = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%;
  background: transparent;
  position: absolute;
  top: 45%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  /* Special styling for WebKit/Blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  /* All the same stuff for Firefox */
  &:-moz-range-thumb {
    border: 1px solid #000000;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  /* All the same stuff for IE */
  &::-ms-thumb {
    border: 1px solid #000000;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0;
    cursor: pointer;
    background: none;
  }

  &::-moz-range-track {
    width: 100%;
    height: 0;
    cursor: pointer;
    background: none;
  }

  &::-ms-track {
    width: 100%;
    height: 0;
    cursor: pointer;
    background: transparent;
    border: none;
  }
`;

const ThirdPageTemplate = ({
  data: {
    markdownRemark: { frontmatter: fields },
  },
}) => {
  const [divisorValue, setDivisorValue] = useState(50);

  useEffect(() => {
    const divisor = document.getElementById("divisor");
    const slider = document.getElementById("slider");

    divisor.style.width = `${slider.value}%`;
  }, [divisorValue]);

  const handleChange = e => {
    setDivisorValue(e.target.value);
  };

  return (
    <Container>
      <h1>{fields.title}</h1>
      <p>{fields.heading}</p>
      <Link to="/">Go back to the homepage</Link>

      <Comparison>
        <BeforeImage>
          <AfterImage id="divisor" />
        </BeforeImage>
        <Handle
          type="range"
          min="0"
          max="100"
          value={divisorValue}
          id="slider"
          onChange={handleChange}
        />
      </Comparison>
    </Container>
  );
};
ThirdPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default ThirdPageTemplate;

export const pageQuery = graphql`
  query Page3Template {
    markdownRemark(frontmatter: { template: { eq: "page-3" } }) {
      frontmatter {
        title
        heading
        subheading
      }
    }
    allSite {
      edges {
        node {
          siteMetadata {
            cloudinaryBaseURL
          }
        }
      }
    }
  }
`;
