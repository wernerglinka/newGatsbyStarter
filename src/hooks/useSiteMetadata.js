import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          canonicalURL
          pageURL
          description
          faviconURL
          imageURL
          cloudinaryBaseURL
          social {
            siteOwner
            twitterHandle
          }
          title
          validate {
            ms
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
