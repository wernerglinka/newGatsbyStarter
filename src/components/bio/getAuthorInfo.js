/**
 * @name getAuthorInfo
 * @param {*} name string containing user names of blog post author(s)
 * @param {*} allAuthors  array containing all knows authors
 *
 * @description full author names are listed in data/authors/authors.json
 *
 * @returns array with all author(s) info
 */
const getAuthorInfo = (name, allAuthors) => {
  // there might be multiple authors
  // if  no author is given we add a default author
  const postAuthors = name.length ? name : ["admin"];
  const authorInfo = [];
  let foundName;
  // retrieve post author name(s) from all authors
  postAuthors.forEach((authorName, index) => {
    const temp = {};
    // loop through all know authors and compare with post author(s)
    foundName = allAuthors.find(({ node }) => node.name === authorName.trim());
    if (foundName) {
      temp.name = `${foundName.node.name}`;
      temp.title = `${foundName.node.title}`;
      temp.avatar = `${foundName.node.avatar}`;
      temp.bio = `${foundName.node.bio}`;
    }
    authorInfo.push(temp);
  });
  return authorInfo;
};

export default getAuthorInfo;
