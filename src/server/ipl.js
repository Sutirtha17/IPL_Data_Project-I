/* functions used to get matchIds for problem 3 and problem 4*/

function getMatchIds(matches, requiredSeason) {
  let matchIds = new Set();
  for (let i = 1; i < matches.length; i++) {
    if (matches[i][1] == requiredSeason) {
      matchIds.add(matches[i][0]);
    }
  }
  return matchIds;
}

/* Problem 1*/

function numberOfMatches(matches) {
  const objectOfYears = matches.reduce((objectOfYears, currentMatch) => {
    let year = parseInt(currentMatch[1]);
    if (!year) return objectOfYears;
    if (!objectOfYears[year]) objectOfYears[year] = 1;
    else objectOfYears[year] = Number(objectOfYears[year]) + 1;
    return objectOfYears;
  }, new Object());

  return objectOfYears;
}

/* Problem 2*/

function matchesWonPerYear(matches) {
  const objectOfMatchesWonPerYear = matches.reduce(
    (objectOfMatchesWonPerYear, currentMatch) => {
      let year = parseInt(currentMatch[1]);
      let team = currentMatch[10];
      if (!year || !team) return objectOfMatchesWonPerYear;
      if (!objectOfMatchesWonPerYear[year]) {
        objectOfMatchesWonPerYear[year] = new Object();
      }
      if (!objectOfMatchesWonPerYear[year][team]) {
        objectOfMatchesWonPerYear[year][team] = 1;
      } else {
        let noOfMatches = Number(objectOfMatchesWonPerYear[year][team]);
        noOfMatches += 1;
        objectOfMatchesWonPerYear[year][team] = noOfMatches;
      }
      return objectOfMatchesWonPerYear;
    },
    new Object()
  );
  return objectOfMatchesWonPerYear;
}

/* Problem 3*/

function extraRuns2016(matches, deliveries, requiredSeason) {
  const matchIds = getMatchIds(matches, requiredSeason);
  const objOfExtraRuns2016 = deliveries.reduce(
    (objOfExtraRuns2016, currentMatch) => {
      let matchId = currentMatch[0];
      if (matchIds.has(matchId)) {
        let team = currentMatch[3];
        if (!team) return objOfExtraRuns2016;
        let extraRuns = Number(currentMatch[16]);
        if (!objOfExtraRuns2016[team]) {
          objOfExtraRuns2016[team] = extraRuns;
        } else {
          let currentExtraRuns = Number(objOfExtraRuns2016[team]);
          currentExtraRuns += extraRuns;
          objOfExtraRuns2016[team] = currentExtraRuns;
        }
      }
      return objOfExtraRuns2016;
    },
    new Object()
  );
  return objOfExtraRuns2016;
}

/* Problem 4*/

function bowlsToOverConvertion(totalBowls) {
  return Math.floor(totalBowls / 6) + (totalBowls % 6) / 10;
}

function calculateEconomy(objectOfBowlers) {
  const objOfBowlers = new Object();
  for (let [bowler, currentStat] of Object.entries(objectOfBowlers)) {
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

function economicalBowlers(matches, deliveries, requiredSeason) {
  let matchIds = getMatchIds(matches, requiredSeason);
  const objectOfBowlers = deliveries.reduce((objectOfBowlers, currentMatch) => {
    let matchId = currentMatch[0];
    if (matchIds.has(matchId)) {
      let bowler = currentMatch[8];
      let runsOnEachBowl = Number(currentMatch[17]);
      let wideBalls = Number(currentMatch[10]);
      let noballs = Number(currentMatch[13]);
      if (!objectOfBowlers[bowler]) {
        if (wideBalls > 0 || noballs > 0) {
          objectOfBowlers[bowler] = [runsOnEachBowl, 0];
        } else {
          objectOfBowlers[bowler] = [runsOnEachBowl, 1];
        }
      } else {
        let currentStat = objectOfBowlers[bowler];
        currentStat[0] += runsOnEachBowl;
        if (wideBalls == 0 && noballs == 0) {
          currentStat[1] += 1;
        }
        objectOfBowlers[bowler] = currentStat;
      }
    }
    return objectOfBowlers;
  }, new Object());
  const resultObjectOfBowlers = calculateEconomy(objectOfBowlers);
  return getTop10(resultObjectOfBowlers);
}

export { numberOfMatches, matchesWonPerYear, extraRuns2016, economicalBowlers };
