import { useStaticQuery, graphql } from "gatsby";

const useGetMainNavLinks = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allNavigationJson {
        edges {
          node {
            link
            name
          }
        }
      }
    }
  `);
  return data.allNavigationJson.edges;
};

export default useGetMainNavLinks;
