import { useStaticQuery, graphql } from "gatsby";

const useGetMainNavLinks = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allNavigationJson {
        edges {
          node {
            name
            data {
              data {
                link
                name
              }
              name
            }
          }
        }
      }
    }
  `);
  return data.allNavigationJson.edges;
};

export default useGetMainNavLinks;
