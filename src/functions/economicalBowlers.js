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

export default function economicalBowlers(result) {
  const mapOfBowlers = new Map();
  for (let i = 1; i < result.length; i++) {
    if (result[i][0] <= 59) {
      let bowler = result[i][8];
      let runsOnEachBowl = Number(result[i][17]);
      if (mapOfBowlers.get(bowler) == undefined)
        mapOfBowlers.set(bowler, [runsOnEachBowl, 1]);
      else {
        let currentStat = mapOfBowlers.get(bowler);
        currentStat[0] += runsOnEachBowl;
        currentStat[1] += 1;
        mapOfBowlers.set(bowler, currentStat);
      }
    }
  }
  const objOfBowlers = mapToObject(mapOfBowlers);
  const resultObject = getTop10(objOfBowlers);
  return resultObject;
}
