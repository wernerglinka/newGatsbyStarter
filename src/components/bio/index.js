/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from "react";
import PropTypes from "prop-types";
import getAuthorInfo from "./getAuthorInfo";
import useGetAllAuthors from "../../hooks/useGetAllAuthors";

const Bio = ({ author }) => {
  const allAuthors = useGetAllAuthors();
  // get info for all blog authors
  const allAuthorsInfo = getAuthorInfo(author, allAuthors);

  return (
    <ul>
      {allAuthorsInfo.map(thisAuthor => (
        <li key={thisAuthor.title}>
          <img
            src={`/assets/images/team/${thisAuthor.avatar}`}
            alt={thisAuthor.name}
          />
          <h3>{thisAuthor.name}</h3>
          <p>{thisAuthor.title}</p>
          <p>{thisAuthor.bio}</p>
        </li>
      ))}
    </ul>
  );
};

Bio.propTypes = {
  author: PropTypes.array.isRequired, // eslint-disable-line
};

export default Bio;
