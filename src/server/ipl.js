export function numberOfMatches(result) {
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

export function matchesWonPerYear(result) {
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

export function extraRuns2016(result) {
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

function bowlsToOverConvertion(totalBowls) {
  return Math.floor(totalBowls / 6) + (totalBowls % 6) / 10;
}

function mapToObject(mapOfBowlers) {
  const objOfBowlers = new Object();
  for (let bowler of mapOfBowlers.keys()) {
    let currentStat = mapOfBowlers.get(bowler);
    let runs = currentStat[0];
    let overs = bowlsToOverConvertion(currentStat[1]);
    let economyRate = (runs / overs).toFixed(2);
    objOfBowlers[bowler] = economyRate;
  }
  return objOfBowlers;
}

function getTop10(objOfBowlers) {
  const resultObject = new Object();
  let keysSorted = Object.keys(objOfBowlers).sort(function (a, b) {
    return objOfBowlers[a] - objOfBowlers[b];
  });

  for (let i = 0; i < 10; i++) {
    let bowler = keysSorted[i];
    let economyRate = objOfBowlers[bowler];
    resultObject[bowler] = economyRate;
  }
  return resultObject;
}

export function economicalBowlers(result) {
  const mapOfBowlers = new Map();
  for (let i = 1; i < result.length; i++) {
    if (result[i][0] >= 518 && result[i][0] <= 576) {
      let bowler = result[i][8];
      let runsOnEachBowl = Number(result[i][17]);
      let wideBalls = Number(result[i][10]);
      let noballs = Number(result[i][13]);
      if (mapOfBowlers.get(bowler) == undefined) {
        if (wideBalls > 0 || noballs > 0)
          mapOfBowlers.set(bowler, [runsOnEachBowl, 0]);
        else {
          mapOfBowlers.set(bowler, [runsOnEachBowl, 1]);
        }
      } else {
        let currentStat = mapOfBowlers.get(bowler);
        currentStat[0] += runsOnEachBowl;
        if (wideBalls == 0 && noballs == 0) currentStat[1] += 1;
        mapOfBowlers.set(bowler, currentStat);
      }
    }
  }
  const objOfBowlers = mapToObject(mapOfBowlers);
  const resultObject = getTop10(objOfBowlers);
  return resultObject;
}
