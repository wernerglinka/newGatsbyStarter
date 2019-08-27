import { useStaticQuery, graphql } from "gatsby";

const useEventPromo = () => {
  const data = useStaticQuery(graphql`
    query EventPromoQuery {
      allEventPromoJson {
        edges {
          node {
            name
            logo
            backgroundImage
            eventLocation
            eventDates
            eventProse
            eventLink
            eventLinkText
          }
        }
      }
    }
  `);
  return data.allEventPromoJson.edges;
};

export default useEventPromo;
