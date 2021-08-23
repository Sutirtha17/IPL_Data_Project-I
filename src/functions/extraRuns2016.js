export default function extraRuns2016(result) {
  const mapOf2016 = new Map();
  for (let i = 1; i < result.length; i++) {
    if (result[i][0] > 576) {
      let team = result[i][3];
      let extraRuns = Number(result[i][16]);
      if (mapOf2016.get(team) == undefined) mapOf2016.set(team, extraRuns);
      else {
        let currentExtraRuns = mapOf2016.get(team);
        currentExtraRuns += extraRuns;
        mapOf2016.set(team, currentExtraRuns);
      }
    }
  }
  return Object.fromEntries(mapOf2016);
}
