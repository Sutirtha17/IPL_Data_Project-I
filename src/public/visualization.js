fetch("./output/matchesPerYear.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure1(outputDataJSON));
function figure1(outputDataJSON) {
  const years = outputDataJSON.map((object) => object.year);
  const matches = outputDataJSON.map((object) => object.matches);
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
      categories: years,
    },
    yAxis: {
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Matches",
        data: matches,
      },
    ],
  });
}

fetch("./output/extraRuns2016.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure3(outputDataJSON));
function figure3(outputDataJSON) {
  const teams = outputDataJSON.map((object) => object.team);
  const extraRuns = outputDataJSON.map((object) => object.extra_runs);
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
      categories: teams,
    },
    yAxis: {
      title: {
        text: "Extra Runs",
      },
    },
    series: [
      {
        name: "Extra Runs",
        data: extraRuns,
      },
    ],
  });
}

fetch("./output/economicalBowlers.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure4(outputDataJSON));
function figure4(outputDataJSON) {
  const bowlers = outputDataJSON.map((object) => object.bowler);
  const series = outputDataJSON.reduce((series, entry) => {
    series.push(Number(entry.economy));
    return series;
  }, []);
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
      categories: bowlers,
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
  .then((outputDataJSON) => figure2(outputDataJSON));
function figure2(outputDataJSON) {
  const years = outputDataJSON.reduce((playingYears, { year }) => {
    if (!playingYears.includes(year)) {
      playingYears.push(year);
    }
    return playingYears;
  }, []);
  const teams = outputDataJSON.reduce((playingTeams, { team }) => {
    if (!playingTeams.includes(team)) {
      playingTeams.push(team);
    }
    return playingTeams;
  }, []);
  const series = [];
  teams.forEach((currentTeam) => {
    let currentTeamData = [];
    years.forEach((currentYear) => {
      let isPresent = false;
      outputDataJSON.forEach(({ year, team, wins }) => {
        if (team == currentTeam && year == currentYear) {
          currentTeamData.push(Number(wins));
          isPresent = true;
        }
      });
      if (!isPresent) currentTeamData.push(0);
    });
    series.push({ name: currentTeam, data: currentTeamData });
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
      zoomType: "xy",
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
