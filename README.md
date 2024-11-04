# Fake-Bank_Front

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Tech Stack & Dependencies](#tech-stack--dependencies)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)

---

### Project Overview

This project is a front-end application simulating a bank's services, including user login, registration, account views, and transaction history. The application is built using ReactJS and Tailwind CSS.

---

### Directory Structure

```
/assets
/src
├── components
|─-__tests__
├── pages
└── App.tsx
```

### Tech Stack & Dependencies

- **Framework**: ReactJS
- **Styling**: Tailwind CSS
- **API Requests**: Axios
- **Additional Libraries**:
  - `React Router`: For routing
  - `Chart.js` & `react-chartjs-2`: For charting and data visualization
  - `Datepicker`: For date selection in forms
  - `jsPDF`: For generating PDF reports

### Installation & Setup

1. **Node Version Requirement**: Node.js version >= 16.20.0

2. **Install Dependencies**:
   Run the following commands to set up the project:

   ```
   # Install core dependencies
   yarn

   # Install TailwindCSS as a development dependency
   yarn add -D tailwindcss

   # Install additional required packages
   yarn add react-countup react-chartjs-2 chart.js react-bootstrap bootstrap react-datepicker jspdf

   # Start the development server
   yarn start
   ```

3. **Project Startup**:
   - Ensure all dependencies are installed.
   - Run yarn start to launch the project on the local development server.

### 5. Environment Variables

Create a .env file in the root directory to store environment-specific variables.
REACT_APP_API_BASE_URL=https://fake-bank-back-kmv3.onrender.com
