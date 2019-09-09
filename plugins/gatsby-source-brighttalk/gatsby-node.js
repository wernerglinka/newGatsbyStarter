const request = require("request");
const parseString = require("xml2js").parseString;

/**
 * Plugin to get all webinars from BrightTalk RSS feed
 */
exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  _,
  cb
) => {
  request.get("https://www.brighttalk.com/channel/17706/feed", function(
    error,
    response,
    data
  ) {
    if (error) {
      return console.dir(error);
    }

    parseString(data, function(err, result) {
      const allWebinars = result.feed.entry;
      let webinarLinkURL;
      let webinarTn;

      allWebinars.forEach(webinar => {
        const links = webinar.link;

        links.forEach((link, indexå) => {
          if (link.$.rel === "alternate") {
            webinarLinkURL = link.$.href;
          }
          if (link.$.rel === "related") {
            webinarTn = link.$.href;
          }
        });
        const node = {
          title: webinar.title,
          description: webinar.summary,
          linkURL: webinarLinkURL,
          thumbnail: webinarTn,
          id: createNodeId(webinarLinkURL),
          internal: {
            type: "BrightTalkWebinar",
            contentDigest: createContentDigest(webinar),
          },
        };

        actions.createNode(node);

        console.log(node);
      });
    });
    cb();
  });
};
