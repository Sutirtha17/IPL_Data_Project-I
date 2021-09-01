fetch("./output/matchesPerYear.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure1(outputDataJSON));

fetch("./output/matchesWonPerYear.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure2(outputDataJSON));

fetch("./output/extraRuns2016.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure3(outputDataJSON));

fetch("./output/economicalBowlers.json")
  .then((response) => response.json())
  .then((outputDataJSON) => figure4(outputDataJSON));

function figure1(outputDataJSON) {
  const years = outputDataJSON.map((object) => object.year);
  const matches = outputDataJSON.map((object) => object.matches);
  Highcharts.chart("matchesPerYear", {
    title: {
      text: " Matches Played per Season in IPL",
      style: {
        color: "black",
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    chart: {
      type: "column",
      zoomType: "x",
      borderRadius: 10,
      backgroundColor: "rgba(249, 241, 250, 0.5)",
      borderWidth: 2,
      borderColor: "black",
      style: {
        fontFamily: "monospace",
        color: "black",
      },
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
        style: {
          color: "#000000",
        },
      },
      categories: years,
      labels: {
        style: {
          color: "black",
        },
      },
    },
    yAxis: {
      title: {
        text: "Matches",
        style: {
          color: "black",
        },
      },
      labels: {
        style: {
          color: "black",
        },
      },
    },
    plotOptions: {
      series: {
        color: "rgba(43, 171, 9, 0.5)",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
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

function figure2(outputDataJSON) {
  const years = outputDataJSON.reduce((allSeasons, { year }) => {
    if (!allSeasons.includes(year)) {
      allSeasons.push(year);
    }
    return allSeasons;
  }, []);
  const teams = outputDataJSON.reduce((allTeams, { team }) => {
    if (!allTeams.includes(team)) {
      allTeams.push(team);
    }
    return allTeams;
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
      text: "Matches Won per Team per Year in IPL",
      style: {
        color: "black",
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    chart: {
      type: "column",
      zoomType: "xy",
      borderRadius: 10,
      backgroundColor: "rgba(249, 241, 250, 0.5)",
      borderWidth: 2,
      borderColor: "black",
      style: {
        fontFamily: "monospace",
        color: "black",
      },
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
        style: {
          color: "black",
        },
      },
      categories: years,
      labels: {
        style: {
          color: "black",
        },
      },
    },
    yAxis: {
      title: {
        text: "Wins",
        style: {
          color: "black",
        },
      },
      labels: {
        style: {
          color: "black",
        },
      },
    },
    series: series,
  });
}

function figure3(outputDataJSON) {
  const teams = outputDataJSON.map((object) => object.team);
  const extraRuns = outputDataJSON.map((object) => object.extra_runs);
  Highcharts.chart("extraRuns2016", {
    title: {
      text: "Extra Runs conceded per Team in the Year 2016",
      style: {
        color: "black",
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    chart: {
      type: "column",
      zoomType: "x",
      borderRadius: 10,
      backgroundColor: "rgba(249, 241, 250, 0.5)",
      borderWidth: 2,
      borderColor: "black",
      style: {
        fontFamily: "monospace",
        color: "black",
      },
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
        style: {
          color: "black",
        },
      },
      categories: teams,
      labels: {
        style: {
          color: "black",
        },
      },
    },
    yAxis: {
      title: {
        text: "Extra Runs",
        style: {
          color: "black",
        },
      },
      labels: {
        style: {
          color: "black",
        },
      },
    },
    plotOptions: {
      series: {
        color: "rgba(43, 171, 9, 0.5)",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
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

function figure4(outputDataJSON) {
  const bowlers = outputDataJSON.map((object) => object.bowler);
  const series = outputDataJSON.reduce((series, entry) => {
    series.push(Number(entry.economy));
    return series;
  }, []);
  Highcharts.chart("economicalBowlers", {
    title: {
      text: "Top 10 Economical Bowlers in the Year 2015",
      style: {
        color: "black",
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    chart: {
      type: "column",
      zoomType: "xy",
      borderRadius: 10,
      backgroundColor: "rgba(249, 241, 250, 0.5)",
      borderWidth: 2,
      borderColor: "black",
      style: {
        fontFamily: "monospace",
        color: "black",
      },
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
        style: {
          color: "black",
        },
      },
      categories: bowlers,
      labels: {
        style: {
          color: "black",
        },
      },
    },
    yAxis: {
      title: {
        text: "Economy_rate",
        style: {
          color: "black",
        },
      },
      labels: {
        style: {
          color: "black",
        },
      },
    },
    plotOptions: {
      series: {
        color: "rgba(43, 171, 9, 0.5)",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
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
