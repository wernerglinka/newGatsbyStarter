/**
 * @name getAuthorInfo
 * @param {*} name array containing user names of blog post author(s)
 * @param {*} allAuthors  array containing all knows authors
 *
 * @description full author names are listed in data/authors/authors.json
 *
 * @returns array with all author(s) info
 */
const getAuthorInfo = (name, allAuthors) => {
  // there might be multiple authors
  const authorInfo = [];
  let foundName;
  // retrieve post author name(s) from all authors
  name.forEach((authorName, index) => {
    const temp = {};
    // loop through all know authors and compare with post author(s)
    foundName = allAuthors.find(({ node }) => node.name === authorName.trim());
    if (foundName) {
      // temp.name = foundName.node.name;
      // foundName.node.position && (temp.position = foundName.node.position);
      // temp.avatar = foundName.node.avatar;
      // temp.bio = foundName.node.bio;
      // temp.email = foundName.email;

      authorInfo.push(foundName.node);
    }
  });
  return authorInfo;
};

export default getAuthorInfo;
