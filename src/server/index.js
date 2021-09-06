import fs from 'fs';

import papa from 'papaparse';

import {
  extraRuns2016,
  matchesWonPerYear,
  numberOfMatches,
  economicalBowlers,
} from './ipl.js';

const matches = fs.createReadStream('./../data/matches.csv');

const deliveries = fs.createReadStream('./../data/deliveries.csv');

const saveFile = (location, data) => {
  fs.writeFileSync(location, data);
};

papa.parse(matches, {
  header: true,
  complete: function (matches) {
    //problem 1

    const objectOfYears = numberOfMatches(matches.data);
    const jsonOfYears = JSON.stringify(objectOfYears);

    saveFile('./../public/output/matchesPerYear.json', jsonOfYears);

    //problem 2

    const objectOfMatchesWonPerYear = matchesWonPerYear(matches.data);
    const jsonOfMatches = JSON.stringify(objectOfMatchesWonPerYear);

    saveFile('./../public/output/matchesWonPerYear.json', jsonOfMatches);
    papa.parse(deliveries, {
      header: true,
      complete: function (deliveries) {
        // problem 3

        const objOf2016 = extraRuns2016(matches.data, deliveries.data, 2016);
        const jsonExtraRuns = JSON.stringify(objOf2016);

        saveFile('./../public/output/extraRuns2016.json', jsonExtraRuns);

        // problem 4

        const objOfbowlers = economicalBowlers(
          matches.data,
          deliveries.data,
          2015
        );
        const jsonOfBowlers = JSON.stringify(objOfbowlers);

        saveFile('./../public/output/economicalBowlers.json', jsonOfBowlers);
      },
      error: function (error) {
        console.log(error.message);
      },
    });
  },
  error: function (error) {
    console.log(error.message);
  },
});
