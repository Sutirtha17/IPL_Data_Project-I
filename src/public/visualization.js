fetch("./output/matchesPerYear.json")
  .then((response) => response.json())
  .then((JSONData) => plot1(JSONData));
function plot1(JSONData) {
  console.log(JSONData.map(({ year }) => year));
  Highcharts.chart("matchesPerYear", {
    title: {
      text: "1. Matches Played per Season in IPL",
    },
    chart: {
      type: "column",
      zoomType: "x",
      borderRadius: 20,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "#333333",
      borderRadius: 20,
      style: {
        color: "#ffffff",
      },
    },
    xAxis: {
      title: {
        text: "Years",
      },
      categories: JSONData.map(({ year }) => year),
    },
    yAxis: {
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Matches",
        data: JSONData.map(({ matches }) => matches),
      },
    ],
  });
}

fetch("./output/extraRuns2016.json")
  .then((response) => response.json())
  .then((JSONData) => plot3(JSONData));
function plot3(JSONData) {
  Highcharts.chart("extraRuns2016", {
    title: {
      text: "3. Extra Runs conceded per Team in the Year 2016",
    },
    chart: {
      type: "column",
      zoomType: "x",
      borderRadius: 20,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "#333333",
      borderRadius: 20,
      style: {
        color: "#ffffff",
      },
    },
    xAxis: {
      title: {
        text: "Teams",
      },
      categories: JSONData.map(({ team }) => team),
    },
    yAxis: {
      title: {
        text: "Extra Runs",
      },
    },
    series: [
      {
        name: "Extra Runs",
        data: JSONData.map(({ extra_runs }) => extra_runs),
      },
    ],
  });
}
fetch("./output/economicalBowlers.json")
  .then((response) => response.json())
  .then((JSONData) => plot4(JSONData));
function plot4(JSONData) {
  series = [];
  JSONData.forEach((entry) => {
    series.push(Number(entry.economy));
  });
  Highcharts.chart("economicalBowlers", {
    title: {
      text: "4. Top 10 Economical Bowlers in the Year 2015",
    },
    chart: {
      type: "column",
      zoomType: "x",
      borderRadius: 20,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "#333333",
      borderRadius: 20,
      style: {
        color: "#ffffff",
      },
    },
    xAxis: {
      title: {
        text: "Bowlers",
      },
      categories: JSONData.map(({ bowler }) => bowler),
    },
    yAxis: {
      title: {
        text: "Economy_rate",
      },
    },
    series: [
      {
        name: "Economy_rate",
        data: series,
      },
    ],
  });
}

fetch("./output/matchesWonPerYear.json")
  .then((response) => response.json())
  .then((JSONData) => plot2(JSONData));
function plot2(JSONData) {
  const teams = JSONData.reduce((subjectTeams, { team }) => {
    if (!subjectTeams.includes(team)) {
      subjectTeams.push(team);
    }
    return subjectTeams;
  }, []).sort((teamA, teamB) => teamA.localeCompare(teamB));

  const years = JSONData.reduce((subjectYears, { year }) => {
    if (!subjectYears.includes(year)) {
      subjectYears.push(year);
    }
    return subjectYears;
  }, []);

  const series = [];
  teams.forEach((currentTeam) => {
    let pushSeries = {
      name: currentTeam,
      data: [],
    };
    let pushWins = 0;
    years.forEach((currYear) => {
      JSONData.forEach(({ year, team, wins }) => {
        if (team === currentTeam && year === currYear) {
          pushWins = Number(wins);
        }
      });
      pushSeries["data"].push(pushWins);
    });
    series.push(pushSeries);
  });
  Highcharts.chart("matchesWonPerYear", {
    title: {
      text: "2. Matches Won per Team per Year in IPL",
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    chart: {
      type: "column",
      zoomType: "x",
      borderRadius: 20,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "#333333",
      borderRadius: 20,
      style: {
        color: "#ffffff",
      },
    },
    xAxis: {
      title: {
        text: "Years",
      },
      categories: years,
    },
    yAxis: {
      title: {
        text: "Wins",
      },
    },
    series: series,
  });
}
