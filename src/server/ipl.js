/* functions used to get matchIds for problem 3 and problem 4*/

function getMatchIds(matches, requiredSeason) {
  let matchIds = new Set();

  matches
    .filter((currentMatch) => currentMatch[1] == requiredSeason)
    .forEach((currentMatch) => {
      matchIds.add(currentMatch[0]);
    });

  return matchIds;
}

/* Problem 1*/

function numberOfMatches(matches) {
  return matches
    .filter((currentMatch) => parseInt(currentMatch[1]) > 0)
    .reduce((objectOfYears, currentMatch) => {
      let year = parseInt(currentMatch[1]);

      objectOfYears[year] = (objectOfYears[year] || 0) + 1;

      return objectOfYears;
    }, new Object());
}

/* Problem 2*/

function matchesWonPerYear(matches) {
  return matches
    .filter((currentMatch) => parseInt(currentMatch[1]) && currentMatch[10])
    .reduce((objectOfMatchesWonPerYear, currentMatch) => {
      let year = parseInt(currentMatch[1]);
      let team = currentMatch[10];

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
    }, {});
}

/* Problem 3*/

function extraRuns2016(matches, deliveries, requiredSeason) {
  const matchIds = getMatchIds(matches, requiredSeason);

  return deliveries
    .filter((currentMatch) => currentMatch[3] && matchIds.has(currentMatch[0]))
    .reduce((objOfExtraRuns2016, currentMatch) => {
      let team = currentMatch[3];
      let extraRuns = parseInt(currentMatch[16]);

      objOfExtraRuns2016[team] = (objOfExtraRuns2016[team] || 0) + extraRuns;

      return objOfExtraRuns2016;
    }, new Object());
}

/* Problem 4*/

function bowlsToOverConvertion(totalBowls) {
  return Math.floor(totalBowls / 6) + (totalBowls % 6) / 10;
}

function calculateEconomy(objectOfBowlers) {
  const objOfBowlers = new Object();

  Object.keys(objectOfBowlers).forEach((bowler) => {
    let totalRuns = objectOfBowlers[bowler][0];
    let totalBowls = objectOfBowlers[bowler][1];
    let overs = bowlsToOverConvertion(totalBowls);
    let economyRate = (totalRuns / overs).toFixed(2);
    objOfBowlers[bowler] = economyRate;
  });

  return objOfBowlers;
}

function getTop10(objOfBowlers) {
  const resultObject = new Object();

  Object.keys(objOfBowlers)
    .sort(function (a, b) {
      return objOfBowlers[a] - objOfBowlers[b];
    })
    .slice(0, 10)
    .forEach((bowler) => {
      let economyRate = objOfBowlers[bowler];
      resultObject[bowler] = economyRate;
    });
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
