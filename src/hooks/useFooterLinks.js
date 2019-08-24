import { useStaticQuery, graphql } from "gatsby";

/**
 * Query to get all footer links
 *
 */
const useFooterLinks = () => {
  const data = useStaticQuery(graphql`
    query FooterLinksQuery {
      allFooterJson {
        edges {
          node {
            name
            link
            category
          }
        }
      }
    }
  `);
  return data;
};

export default useFooterLinks;
