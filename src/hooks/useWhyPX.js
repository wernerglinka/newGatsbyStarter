import { useStaticQuery, graphql } from "gatsby";

const useWhyPX = () => {
  const data = useStaticQuery(graphql`
    query WhyPXQuery {
      allWhyPxJson {
        edges {
          node {
            sectionHeader
            tab
            title
            features
            link
            linkText
            videoLink
            thumbnail
          }
        }
      }
    }
  `);
  return data.allWhyPxJson.edges;
};

export default useWhyPX;
