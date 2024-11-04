# Fake-Bank_Front

home for the Fake bank company

## Start Project

Simply install dependencies and start project

Node version >= 16.20.0

```
yarn
yarn start
```

## Project Structure

```
├── src
│   ├── components    // global components that can be reused
│   ├── pages         // project pages
│   ├── stores        // mobx stores
│   ├── styles        // default style variables for index.scss
│   ├── config        // config styles received from dotenv
|── router            // routing all pages
```

## Tailwind

```
yarn add -D tailwindcss

```

## chart.js

```
yarn add react-countup react-chartjs-2 chart.js react-bootstrap bootstrap
```

## Datepicker

```
yarn add react-datepicker
```

## jsPdf

```
yarn add jspdf
```

# Project Name - Front-End README

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Tech Stack & Dependencies](#tech-stack--dependencies)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [Code Style & Standards](#code-style--standards)
7. [Common Issues & Debugging](#common-issues--debugging)
8. [Contribution Guidelines](#contribution-guidelines)
9. [Additional Notes](#additional-notes)
10. [Contact Information](#contact-information)

---

### 1. Project Overview

> This project is a front-end application simulating a bank's services, including user login, registration, account views, and transaction history. The application is built using ReactJS and Tailwind CSS.

### 2. Directory Structure

/assets # Static assets
/src
├── components
|──**tests**
├── pages
└── App.tsx

### 3. Tech Stack & Dependencies

- **Framework**: ReactJS
- **Styling**: Tailwind CSS
- **API Requests**: Axios
- **Additional Libraries**: React Router, Chart.js, Datepicker, jsPDF

### 4. Installation & Setup

Simply install dependencies and start project

Node version >= 16.20.0

```
yarn

yarn add -D tailwindcss

yarn add react-countup react-chartjs-2 chart.js react-bootstrap bootstrap

yarn add react-datepicker

yarn add jspdf

yarn start
```

### 5. Environment Variables

REACT_APP_API_BASE_URL=https://fake-bank-back-kmv3.onrender.com
