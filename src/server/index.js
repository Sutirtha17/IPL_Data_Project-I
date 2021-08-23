import fs from "fs";

import papa from "papaparse";

import { extraRuns2016 } from "./ipl.js";

import { matchesWonPerYear } from "./ipl.js";

import { numberOfMatches } from "./ipl.js";

import { economicalBowlers } from "./ipl.js";

const matches = fs.createReadStream("./../data/matches.csv");

const deliveries = fs.createReadStream("./../data/deliveries.csv");

papa.parse(matches, {
  complete: function (results) {
    //problem 1

    const mapOfYears = numberOfMatches(results.data);
    const jsonOfYears = JSON.stringify(mapOfYears);
    fs.writeFileSync("./../public/output/matchesPerYear.json", jsonOfYears);

    //problem 2

    const mapOfMatchesWonPerYear = matchesWonPerYear(results.data);
    const objOfMatches = {};
    for (let key of mapOfMatchesWonPerYear.keys()) {
      const obj = Object.fromEntries(mapOfMatchesWonPerYear.get(key)); // converting from nested map to object
      objOfMatches[key] = obj;
    }
    const jsonOfMatches = JSON.stringify(objOfMatches);
    fs.writeFileSync(
      "./../public/output/matchesWonPerYear.json",
      jsonOfMatches
    );
  },
});

papa.parse(deliveries, {
  complete: function (results) {
    // problem 3

    const objOf2016 = extraRuns2016(results.data);
    const jsonExtraRuns = JSON.stringify(objOf2016);
    fs.writeFileSync("./../public/output/extraRuns2016.json", jsonExtraRuns);

    // problem 4

    const objOfbowlers = economicalBowlers(results.data);
    const jsonOfBowlers = JSON.stringify(objOfbowlers);
    fs.writeFileSync(
      "./../public/output/economicalBowlers.json",
      jsonOfBowlers
    );
  },
});
