import { useStaticQuery, graphql } from "gatsby";

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
    }
  `);
  return data;
};

export default useGetMainNavLinks;
