import { useStaticQuery, graphql } from "gatsby";

const usePXWorks = () => {
  const data = useStaticQuery(graphql`
    query HowPXWorksQuery {
      allHowPxWorksJson {
        edges {
          node {
            header
            image
            imageSmall
            link
            linkText
            name
            text
            shortText
          }
        }
      }
    }
  `);
  return data.allHowPxWorksJson.edges;
};

export default usePXWorks;
