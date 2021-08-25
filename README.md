# Sutirtha_IPL_Project

This project is about getting several insights and information from a large set of data. The data is of all IPL seasons played from 2008 to 2017. The data is stored in CSV files.

## Installations

### 1. Install git

**`For Linux`** <https://git-scm.com/downloads>

**`For Windows`** <https://gitforwindows.org/>

### 2. Install Node

<https://nodejs.org/en/download/>

### 3. Open terminal

```sh
Open your terminal.
Use CTRL + ALT + T (Linux)
```

### 4. Clone this repository

```sh
git clone https://github.com/Sutirtha17/Sutirtha_IPL_Project.git
```

### 5. Go to the working directory

```sh
cd Sutirtha_IPL_Project
```

### 6. Install npm

```sh
npm install
```

### 7. Install papaparse for parsing csv file

```sh
npm i papaparse
```

### 8. Run the functions

```sh
npm run start
```

### 9. Check the outputs

go to the output directory using

```sh
cd src/public/output
```

each file will be containing separate outputs

## Obtained Insights

1. Number of matches played per year for all the years in IPL.
2. Number of matches won per team per year in IPL.
3. Extra runs conceded per team in the year 2016
4. Top 10 economical bowlers in the year 2015

## Project Structure

[**`src`**](/src): This directory contains four directories:

- [**`data`**](/src/data): This directory contains the datasets `matches.csv` and `deliveries.csv`

- [**`public`**](/src/public): This directory contains a directory named `output` and files `index.html` and `style.css`

  - [**`output`**](/src/public/output): This directory contains four output files named as `matchesPerYear.json`, `matchesWonPerYear.json`, `extraRuns2016.json` and `economicalBowlers.json`.

- [**`server`**](/src/server)

  - [**`ipl.js`**](/src/server/ipl.js): This file contains the functional logic of problems which are separated in four module named as `numberOfMatches` , `matchesWonPerYear` , `extraRuns2016` and `economicalBowlers`

  - [**`index.js`**](/src/server/index.js): This file contains the code which : 1 Reads csv data from dataset. 2 Imports all function from `ipl.js` file and executes them. 3 Stores the solution of each problem in separate output files in `src/public/output` directory.

**`node_modules`**: This directory is used by node and npm to store third party packages like `papaparse`. It will appear once you install `papaparse` package from [step 7](#7-Install-papaparse-for-parsing-csv-file) of Installation.

**papaparse**: Papa Parse is the fastest in-browser CSV (or delimited text) parser for JavaScript. It is reliable and correct according to RFC 4180.
To learn more you can visit [papapparse](https://www.npmjs.com/package/papaparse).

---
