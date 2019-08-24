import { useStaticQuery, graphql } from "gatsby";

/**
 * Query to get all top menu data
 * The main nav has various main sections and a promo section called Get Started
 */
const useTopMenuLinks = () => {
  const data = useStaticQuery(graphql`
    query TopMenuLinksQuery {
      allAboutJson {
        edges {
          node {
            label
            link
            name
          }
        }
      }
      allSupportJson {
        edges {
          node {
            label
            link
          }
        }
      }
      allSignInJson {
        edges {
          node {
            external
            label
            link
          }
        }
      }
    }
  `);
  return data;
};

export default useTopMenuLinks;
