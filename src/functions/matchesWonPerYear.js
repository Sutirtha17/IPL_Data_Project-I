export default function matchesWonPerYear(result) {
  const mapOfMatchesWonPerYear = new Map(); //
  for (let i = 1; i < result.length; i++) {
    let year = result[i][1];
    let team = result[i][10];
    if (mapOfMatchesWonPerYear.get(year) == undefined) {
      mapOfMatchesWonPerYear.set(year, new Map());
    } else {
      if (mapOfMatchesWonPerYear.get(year).get(team) == undefined && team)
        mapOfMatchesWonPerYear.get(year).set(team, 1);
      else {
        if (team) {
          let matches = mapOfMatchesWonPerYear.get(year).get(team);
          matches += 1;
          mapOfMatchesWonPerYear.get(year).set(team, matches);
        }
      }
    }
  }
  return mapOfMatchesWonPerYear;
}
