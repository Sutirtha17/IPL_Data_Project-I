export default function numberOfMatches(result) {
  const mapOfYears = new Map();
  for (let i = 1; i < result.length; i++) {
    let year = result[i][1];
    if (mapOfYears[year] == undefined) {
      mapOfYears[year] = 1;
    } else {
      mapOfYears[year] += 1;
    }
  }
  return mapOfYears;
}
