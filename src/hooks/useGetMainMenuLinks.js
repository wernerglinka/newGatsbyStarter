import { useStaticQuery, graphql } from "gatsby";

/**
 * Query to get all main menu data
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
            empty
            promo {
              image
              action
              prose
            }
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
            empty
            promo {
              image
              action
              prose
            }
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
            promo {
              image
              action
              prose
            }
          }
        }
      }
      allGetStartedJson {
        edges {
          node {
            link
            name
            category
            label
            class
            external
            promo {
              image
              action
              prose
            }
          }
        }
      }
    }
  `);
  return data;
};

export default useGetMainNavLinks;
