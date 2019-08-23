/* global document */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import paragraphs from "lines-to-paragraphs";

import Modali, { useModali } from "modali";
import ContentModal from "./modals/ModalContent";
import VideoModal from "./modals/ModalVideo";

import Container from "../../components/styles/container";
import Headline from "../../components/styles/page-headline";

const HomePageTemplate = ({ data }) => {
  const [exampleModal, toggleExampleModal] = useModali({ animated: true });
  const [exampleModal2, toggleExampleModal2] = useModali({ animated: true });

  const {
    markdownRemark: { frontmatter: fields },
  } = data;

  // this page template has 2 modals
  // modal content is defined in /src/data/modals.json
  // modal templates are located in /src/layouts/templates/modal

  // get the modal content data for modalID: "modal1"
  const thisModalData = data.textModal.edges[0].node;

  // get the modal content data for modalID: "modal2"
  const videoID = data.videoModal.edges[0].node.videoID;

  useEffect(() => {
    document.addEventListener("click", function() {
      console.log("Clicked alright");
    });
  });

  return (
    <Container>
      <Headline>{fields.title}</Headline>
      <p>{fields.heading}</p>
      <p>{fields.subheading}</p>
      <p>
        <Link to="/page-2/">Go to page 2</Link>
      </p>
      <p>
        <Link to="/solutions/">Go to Solutions</Link>
      </p>

      <div>
        <button type="button" onClick={toggleExampleModal}>
          Click me to open the video modal
        </button>

        <Modali.Modal {...exampleModal}>
          <VideoModal videoID={videoID} />
        </Modali.Modal>
      </div>

      <div>
        <button type="button" onClick={toggleExampleModal2}>
          Click me to open the text modal
        </button>
        <Modali.Modal {...exampleModal2}>
          <ContentModal modalData={thisModalData} />
        </Modali.Modal>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: paragraphs(fields.pagecontent) }}
      />
    </Container>
  );
};

HomePageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    textModal: PropTypes.shape({
      edges: PropTypes.array,
    }),
    videoModal: PropTypes.shape({
      edges: PropTypes.array,
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
    # query for a specifi modalID
    textModal: allModalsJson(filter: { modalID: { eq: "modal1" } }) {
      edges {
        node {
          title
          subTitle
          modalContent
        }
      }
    }
    # query for a specifi modalID
    videoModal: allModalsJson(filter: { modalID: { eq: "modal2" } }) {
      edges {
        node {
          videoID
        }
      }
    }
  }
`;
