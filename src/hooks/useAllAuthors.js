import { useStaticQuery, graphql } from "gatsby";

const useGetAllAuthors = () => {
  const data = useStaticQuery(graphql`
    query AuthorsQuery {
      allAuthorsJson {
        edges {
          node {
            name
            title
            avatar
            bio
          }
        }
      }
    }
  `);
  return data.allAuthorsJson.edges;
};

export default useGetAllAuthors;
