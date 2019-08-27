import { useStaticQuery, graphql } from "gatsby";

/**
 * Query to get all Quicklinks
 *
 */
const useQuickLinks = () => {
  const data = useStaticQuery(graphql`
    query QuickLinksQuery {
      allQuicklinksJson {
        edges {
          node {
            name
            link
            icon
          }
        }
      }
    }
  `);
  return data;
};

export default useQuickLinks;
