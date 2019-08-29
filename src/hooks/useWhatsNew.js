import { useStaticQuery, graphql } from "gatsby";

const useWhatsNew = () => {
  const data = useStaticQuery(graphql`
    query WhatsNewQuery {
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
  return data.allWhatsNewJson.edges;
};

export default useWhatsNew;
