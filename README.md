# IPL Data Project I

This project is about getting several insights and information from a large set of data. The Data is of all IPL seasons played from 2008 to 2017.

## Installations

### 1. Install git

**`For Linux`** <https://git-scm.com/downloads>

**`For Windows`** <https://gitforwindows.org/>

### 2. Install Node

<https://nodejs.org/en/download/>

### 3. Install VSCode

<https://code.visualstudio.com/download>

### 4. Clone this repository

```sh
git clone https://github.com/Sutirtha17/IPL_Project-I.git
```

### 5. Install npm

```sh
npm install
```

### 6. Install papaparse for parsing csv file

```sh
npm i papaparse
```

### Go to the working directory

```sh
cd IPL_data_Project-I
```

### 7. Get the outputs

```sh
npm run start
```

---

## Obtained Insights

1. Number of matches played per year for all the years in IPL.
2. Number of matches won per team per year in IPL.
3. Extra runs conceded per team in the year 2016
4. Top 10 economical bowlers in the year 2015

## Project Structure

**`src`**: This directory contains four directories:

- **`data`**: This directory contains the datasets `matches.csv` and `deliveries.csv`

- **`functions`**: This directory contains the functional logic of the problems named as `numberOfMatches.js` , `matchesWonPerYear.js` , `extraRuns2016.js` and `economicalBowlers.js`

- **`public`**: This directory contains a directory named `output` and files `index.html` and `style.css`

  - **`output`**: This directory contains 4 output files with named as `matchesPerYear.json`, `matchesWonPerYear.json`, `extraRuns2016.json` and `economicalBowlers.json`.

- **`server`**

  - **`index.js`**: This file contains the code which: 1. Reads csv data from dataset. 2. Imports all function from `src/functions` directory and executes them. 3. Stores the solution of each problem in separate output files in `src/public/output` directory.

---
