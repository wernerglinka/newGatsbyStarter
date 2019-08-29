/* global document */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import paragraphs from "lines-to-paragraphs";

import Modali, { useModali } from "modali";
import { FiArrowRight } from "react-icons/fi";
import ContentModal from "./modals/ModalContent";
import VideoModal from "./modals/ModalVideo";

import Container from "../../components/styles/container";
import Headline from "../../components/styles/page-headline";

// import page sections
import GetStarted from "../../components/page-sections/get-started";
import EventPromo from "../../components/page-sections/event-promo";
import EventPromoSlidein from "../../components/page-sections/event-promo-slidein";
import HowPXWorks from "../../components/page-sections/how-px-works";
import WhatsNew from "../../components/page-sections/whats-new";
import OurCustomers from "../../components/page-sections/our-customers";
import WhyPX from "../../components/page-sections/why-perimeterx";
import HomeBanner from "../../components/page-sections/home-banner";

const HomePageTemplate = ({ data }) => {
  const [exampleModal, toggleExampleModal] = useModali({ animated: true });
  const [exampleModal2, toggleExampleModal2] = useModali({ animated: true });

  const {
    markdownRemark: { frontmatter: fields },
  } = data;

  const {
    markdownRemark: { html },
  } = data;

  // this page template has 2 modals
  // modal content is defined in /src/data/modals.json
  // modal templates are located in /src/layouts/templates/modal

  // get the modal content data for modalID: "modal1"
  const thisModalData = data.textModal.edges[0].node;

  // get the modal content data for modalID: "modal2"
  const videoID = data.videoModal.edges[0].node.videoID;

  return (
    <Container>
      <HomeBanner />
      <WhyPX />
      <OurCustomers />
      <WhatsNew />
      <HowPXWorks />
      {fields.hasEventPromo && <EventPromo />}
      <GetStarted />

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

      {fields.hasEventPromo && <EventPromoSlidein />}
    </Container>
  );
};

HomePageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.string,
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
      html
      frontmatter {
        title
        heading
        subheading
        hasEventPromo
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
