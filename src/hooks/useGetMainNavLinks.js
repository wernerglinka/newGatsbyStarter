import { useStaticQuery, graphql } from "gatsby";

/**
 * Query to get all main nav data
 * The main nav has various main sections and a promo section called Get Started
 */
const useGetMainNavLinks = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allSolutionsJson {
        edges {
          node {
            link
            name
            label
            category
          }
        }
      }
      allProductsJson {
        edges {
          node {
            link
            name
            label
            category
            subCategory
          }
        }
      }
      allResourcesJson {
        edges {
          node {
            link
            name
            label
            category
          }
        }
      }
      allGetStartedJson {
        edges {
          node {
            category
            label
            class
          }
        }
      }
    }
  `);
  return data;
};

export default useGetMainNavLinks;
