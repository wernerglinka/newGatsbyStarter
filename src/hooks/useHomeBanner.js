import { useStaticQuery, graphql } from "gatsby";

const useHomeBanner = () => {
  const data = useStaticQuery(graphql`
    query HomeBannerQuery {
      allHomeBannerJson {
        edges {
          node {
            featuredList {
              isNew
              link
              linkTitle
            }
            backgroundImage
            featuredListTitle
            subTitle
            title
          }
        }
      }
    }
  `);
  return data.allHomeBannerJson.edges;
};

export default useHomeBanner;
