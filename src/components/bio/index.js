/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import getAuthorInfo from "./getAuthorInfo";
import useGetAllAuthors from "../../hooks/useAllAuthors";
import useSiteMetadata from "../../hooks/useSiteMetadata";
import CloudinaryImage from "../cloudinary-image";

const Author = styled.ul`
  list-style: none;
`;

const Bio = ({ author }) => {
  const allAuthors = useGetAllAuthors();
  // get info for all blog authors
  const allAuthorsInfo = getAuthorInfo(author, allAuthors);
  const { cloudinaryBaseURL } = useSiteMetadata();

  return (
    <Author>
      {allAuthorsInfo.map(thisAuthor => (
        <li key={thisAuthor.name}>
          {thisAuthor.avatar && (
            <CloudinaryImage
              baseURL={cloudinaryBaseURL}
              width={150}
              img={thisAuthor.avatar}
              auto={false}
              alt={thisAuthor.name}
            />
          )}
          <h3>{thisAuthor.name}</h3>
          <p>{thisAuthor.title}</p>
          <p>{thisAuthor.bio}</p>
        </li>
      ))}
    </Author>
  );
};

Bio.propTypes = {
  author: PropTypes.array.isRequired,
};

export default Bio;
