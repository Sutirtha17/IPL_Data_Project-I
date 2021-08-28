import fs from "fs";

import papa from "papaparse";

import http from "http";

import {
  extraRuns2016,
  matchesWonPerYear,
  numberOfMatches,
  economicalBowlers,
} from "./ipl.js";

const port = 3000;

const matches = fs.createReadStream("./../data/matches.csv");

const deliveries = fs.createReadStream("./../data/deliveries.csv");

papa.parse(matches, {
  complete: function (matches) {
    //problem 1

    const objectOfYears = numberOfMatches(matches.data);
    const jsonOfYears = JSON.stringify(objectOfYears);
    try {
      fs.writeFileSync("./../public/output/matchesPerYear.json", jsonOfYears);
    } catch (err) {
      console.log(err);
    }
    //problem 2

    const objectOfMatchesWonPerYear = matchesWonPerYear(matches.data);
    const jsonOfMatches = JSON.stringify(objectOfMatchesWonPerYear);
    try {
      fs.writeFileSync(
        "./../public/output/matchesWonPerYear.json",
        jsonOfMatches
      );
    } catch (err) {
      console.log(err);
    }

    papa.parse(deliveries, {
      complete: function (deliveries) {
        // problem 3

        const objOf2016 = extraRuns2016(matches.data, deliveries.data, 2016);
        const jsonExtraRuns = JSON.stringify(objOf2016);
        try {
          fs.writeFileSync(
            "./../public/output/extraRuns2016.json",
            jsonExtraRuns
          );
        } catch (err) {
          console.log(err);
        }

        // problem 4

        const objOfbowlers = economicalBowlers(
          matches.data,
          deliveries.data,
          2015
        );
        const jsonOfBowlers = JSON.stringify(objOfbowlers);
        try {
          fs.writeFileSync(
            "./../public/output/economicalBowlers.json",
            jsonOfBowlers
          );
        } catch (err) {
          console.log(err);
        }
      },
    });
  },
});
const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./../public/index.html", function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Error: File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
});
server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});
