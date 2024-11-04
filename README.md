# Fake-Bank_Front

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Tech Stack & Dependencies](#tech-stack--dependencies)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)

---

### 1. Project Overview

> This project is a front-end application simulating a bank's services, including user login, registration, account views, and transaction history. The application is built using ReactJS and Tailwind CSS.

### 2. Directory Structure

```
/assets # Static assets
/src
├── components
|─-__tests__
├── pages
└── App.tsx
```

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
