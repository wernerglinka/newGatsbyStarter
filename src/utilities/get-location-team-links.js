function getLocationTeamLinks(obj) {
  const leverLocations = [];
  const leverTeams = [];

  // get the location and team for every job
  obj.forEach((edge, index) => {
    if (edge.node.categories.location) {
      // accumulate all locations
      leverLocations.push(edge.node.categories.location);
    }
    if (edge.node.categories.team) {
      // accumulate all team names
      leverTeams.push(edge.node.categories.team);
    }
  });

  // reduce multiple locations/teams to one
  const allLocations = leverLocations.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );
  const allTeams = leverTeams.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );

  // create path from name, e.g. "Miami, Fl" becomes "miami-fl"
  const locationLinks = allLocations.map(loc => ({
    name: loc,
    path: `${loc
      .replace(/\s+/g, "-")
      .replace(/,/g, "")
      .toLowerCase()}/`,
  }));
  const teamLinks = allTeams.map(team => ({
    name: team,
    path: `${team
      .replace(/\s+/g, "-")
      .replace(/,/g, "")
      .toLowerCase()}/`,
  }));

  return [locationLinks, teamLinks];
}

export default getLocationTeamLinks;
