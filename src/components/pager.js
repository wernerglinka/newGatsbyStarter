import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PagerItem = ({ i, numPages, pageType }) => (
  <Link to={`/${pageType}/${i + 1}`}>
    {(i === 0 && "First") ||
      (i !== 0 && i + 1 !== numPages && i + 1) ||
      (i + 1 === numPages && "Last")}
  </Link>
);

PagerItem.propTypes = {
  i: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
};

// an interesting use of Array.from to create the pager elements
// see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const Pager = ({ numPages, currentPage, pageType }) => (
  <ul>
    {Array.from({ length: numPages }, (_, i) => (
      <li
        key={`pagination-number${i + 1}`}
        {...(i + 1 === currentPage && { className: "active" })}
      >
        {i + 1 !== currentPage ? (
          <PagerItem i={i} numPages={numPages} pageType={pageType} />
        ) : (
          (i === 0 && "First") ||
          (i !== 0 && i + 1 !== numPages && i + 1) ||
          (i + 1 === numPages && "Last")
        )}
      </li>
    ))}
  </ul>
);
export default Pager;

Pager.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
};
