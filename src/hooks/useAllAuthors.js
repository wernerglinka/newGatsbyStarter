import { useStaticQuery, graphql } from "gatsby";

const useGetAllAuthors = () => {
  const data = useStaticQuery(graphql`
    query AuthorsQuery {
      allAuthorsJson {
        edges {
          node {
            key
            name
            email
            position
            bio
            avatar
            twitter
            other {
              forbes_tech_council {
                logo
                name
                url
              }
            }
          }
        }
      }
    }
  `);
  return data.allAuthorsJson.edges;
};

export default useGetAllAuthors;
