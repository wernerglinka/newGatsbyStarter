import React, { Fragment } from "react";
import propTypes from "prop-types";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import uuid from "uuid/v4";

import CloudinaryImage from "../cloudinary-image";
import siteMetaData from "../../hooks/useSiteMetadata";
import useHomeBanner from "../../hooks/useHomeBanner";

const PageSection = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  padding: 30px 50px 50px;
  margin: 20px 0;
`;

const NewTag = styled.span`
  display: inline-block;
  padding: 5px;
  background: #f0f0f0;
  margin: 0 5px;
`;

/**
 * Customers Component
 */
const HomeBanner = () => {
  const { cloudinaryBaseURL } = siteMetaData();

  const homeBannerData = useHomeBanner();

  console.log(homeBannerData);

  return (
    <PageSection
      style={{
        backgroundImage: `url(${cloudinaryBaseURL}/${homeBannerData[0].node.backgroundImage})`,
      }}
    >
      {homeBannerData.map(({ node: bannerContent }) => (
        <Fragment key={uuid()}>
          <h1>{bannerContent.title}</h1>
          <p>{bannerContent.subTitle}</p>
          <h2>{bannerContent.featuredListTitle}</h2>
          <ul>
            {bannerContent.featuredList.map(listItem => (
              <li key={uuid()}>
                <Link to={listItem.link}>{listItem.linkTitle}</Link>
                {listItem.isNew === "true" && <NewTag>NEW</NewTag>}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </PageSection>
  );
};

export default HomeBanner;
