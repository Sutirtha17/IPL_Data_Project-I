/* functions used to get matchIds for problem 3 and problem 4*/

function getMatchIds(matches, requiredSeason) {
  let matchIds = new Set();

  matches.forEach(({ id, season }) => {
    if (season == requiredSeason) matchIds.add(id);
  });

  return matchIds;
}

/* Problem 1*/

function numberOfMatches(matches) {
  return matches.reduce((objectOfYears, { season }) => {
    if (!season) return objectOfYears;
    objectOfYears[season] = (objectOfYears[season] || 0) + 1;

    return objectOfYears;
  }, new Object());
}

/* Problem 2*/

function matchesWonPerYear(matches) {
  return matches.reduce((objectOfMatchesWonPerYear, { season, winner }) => {
    if (!season || !winner) return objectOfMatchesWonPerYear;
    if (!objectOfMatchesWonPerYear[season]) {
      objectOfMatchesWonPerYear[season] = new Object();
    }
    if (!objectOfMatchesWonPerYear[season][winner]) {
      objectOfMatchesWonPerYear[season][winner] = 1;
    } else {
      let noOfMatches = Number(objectOfMatchesWonPerYear[season][winner]) + 1;
      objectOfMatchesWonPerYear[season][winner] = noOfMatches;
    }

    return objectOfMatchesWonPerYear;
  }, {});
}

/* Problem 3*/

function extraRuns2016(matches, deliveries, requiredSeason) {
  const matchIds = getMatchIds(matches, requiredSeason);

  const objOfExtraRuns2016 = deliveries.reduce(
    (
      objOfExtraRuns2016,
      { match_id: id, bowling_team: team, extra_runs: extraRuns }
    ) => {
      if (matchIds.has(id)) {
        if (!team) return objOfExtraRuns2016;
        if (!objOfExtraRuns2016[team]) {
          objOfExtraRuns2016[team] = extraRuns;
        } else {
          let currentExtraRuns =
            Number(objOfExtraRuns2016[team]) + parseInt(extraRuns);
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

  const objectOfBowlers = deliveries.reduce(
    (
      objectOfBowlers,
      {
        match_id: id,
        bowler,
        wide_runs: wideRuns,
        noball_runs: noballRuns,
        total_runs: runsOnEachBowl,
      }
    ) => {
      if (matchIds.has(id)) {
        runsOnEachBowl = Number(runsOnEachBowl);
        wideRuns = Number(wideRuns);
        noballRuns = Number(noballRuns);

        if (!objectOfBowlers[bowler]) {
          if (wideRuns > 0 || noballRuns > 0) {
            objectOfBowlers[bowler] = [runsOnEachBowl, 0];
          } else {
            objectOfBowlers[bowler] = [runsOnEachBowl, 1];
          }
        } else {
          let currentStat = objectOfBowlers[bowler];
          currentStat[0] += runsOnEachBowl;
          if (wideRuns == 0 && noballRuns == 0) {
            currentStat[1] += 1;
          }
          objectOfBowlers[bowler] = currentStat;
        }
      }

      return objectOfBowlers;
    },
    new Object()
  );
  const resultObjectOfBowlers = calculateEconomy(objectOfBowlers);

  return getTop10(resultObjectOfBowlers);
}

export { numberOfMatches, matchesWonPerYear, extraRuns2016, economicalBowlers };
