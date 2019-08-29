import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";

import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";

const PageSection = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  padding: 30px 50px 50px;
  margin: 20px 0;
`;

/**
 * Customers Component
 */
const WhyPX = () => {
  const { cloudinaryBaseURL } = siteMetaData();

  return (
    <PageSection>
      <h1>Why PerimeterX</h1>
    </PageSection>
  );
};

export default WhyPX;
