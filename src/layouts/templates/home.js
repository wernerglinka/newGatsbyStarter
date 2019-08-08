import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import { FiX } from "react-icons/fi";
import Modal from "../../components/modal/Modal";
import ModalVideo from "../../components/modal/ModalVideo";
import useToggle from "../../components/modal/useToggle";

import Container from "../../components/styles/container";
import Headline from "../../components/styles/page-headline";

const HomePageTemplate = ({
  data: {
    markdownRemark: { frontmatter: fields },
  },
}) => {
  const { isShown, hide, show } = useToggle();
  return (
    <Container>
      <Headline>{fields.title}</Headline>
      <p>{fields.heading}</p>
      <p>{fields.subheading}</p>
      <Link to="/page-2/">Go to page 2</Link>
      <div dangerouslySetInnerHTML={{ __html: fields.pagecontent }} />

      <button type="button" onClick={show}>
        Open a Video Modal
      </button>

      {isShown && (
        <Modal>
          <ModalVideo closeModal={hide} videoID="IsaYnLROaNU" />
          <FiX className="closeModal" type="button" onClick={hide} />
        </Modal>
      )}
    </Container>
  );
};

HomePageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default HomePageTemplate;

export const pageQuery = graphql`
  query HomePageTemplate {
    markdownRemark(frontmatter: { template: { eq: "home" } }) {
      frontmatter {
        title
        heading
        subheading
        pagecontent
      }
    }
  }
`;
