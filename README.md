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
npx tailwindcss -i ./src/input.css -o ./public/output.css --watch

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

三. 主体

# 01. Introduction

## Introduction to the Project

1. **Team Overview**:
   - We are a team of 5 members dedicated to creating a user-friendly platform for elderly users.
   - Our goal was to empower seniors by teaching them how to confidently navigate online banking transactions.
2. **Target Audience**:
   - The elderly, specifically those unfamiliar with modern digital payment systems.
   - Our focus was on making the process intuitive and secure for first-time users.

---

# 02. Project and Client Overview

## Client Overview: Fake-Bank Company

1. **Client Description**:
   - Fake-Bank is a trusted financial institution focused on providing services for elderly care.
   - The bank aims to enhance the financial literacy of elderly users, especially in online transactions.
2. **Project Scope**:
   - Our project was to develop a comprehensive platform that simplifies online banking for seniors.
   - We covered several key functionalities including:
     - Account registration and login.
     - Payment methods: Credit card, BPAY, and recurrence payments.

## Key Objectives

1. **Empowering Users**:
   - Build a platform that teaches seniors to confidently use online transaction services.
   - Simplify complex banking processes.
2. **Core Features**:
   - Registration and Login System.
   - Payment Methods and Payer Management.
   - BPAY and Recurrence Payment Options.

---

# 03. Technologies Used

## Front-End Technologies

1. **React.js**:
   - React.js was used to develop the front-end, ensuring a dynamic and responsive user interface.
2. **Deployment**:
   - The front-end was deployed using **Vercel** for seamless, fast deployment.
3. **Testing**:
   - **Jest** was used for testing the front-end functionalities to ensure robustness and reliability.

## Back-End Technologies

1. **Nest.js**:
   - Nest.js was used to build the back-end, providing a scalable and efficient structure for the server-side logic.
2. **Database**:
   - We used **MongoDB Atlas** for database management, ensuring security and scalability of the data.
3. **Deployment**:
   - The back-end was deployed using **Render**.
4. **Testing**:
   - For back-end testing, we used **Nest.js’s built-in testing framework** to validate APIs and functionality.

---

# 04. Challenges Faced

## Key Challenges

1. **User Interface Simplicity**:
   - Designing an interface that is both simple and intuitive for elderly users, without overwhelming them with too many features.
2. **Security vs. Usability**:
   - Balancing security features with ease of use for seniors who may not be familiar with digital security protocols.
3. **Technical Integration**:
   - Integrating multiple payment methods like BPAY and recurrence payments posed significant technical challenges.

## Overcoming Challenges

1. **Iterative User Testing**:
   - Conducted multiple rounds of testing with elderly users to gather feedback and improve usability.
2. **Collaboration with Client**:
   - Worked closely with Fake-Bank to ensure their security standards were met while keeping the platform user-friendly.

---

# 05. Lessons Learned

## Key Takeaways

1. **User-Centered Design**:
   - Importance of continuously testing and refining the user interface based on real user feedback, especially for the elderly demographic.
2. **Collaboration**:
   - Close collaboration with the client helped align technical requirements with user needs.
3. **Technical Skills**:
   - Enhanced our skills in React.js, Nest.js, and MongoDB, particularly in deploying secure, scalable applications.
4. **Balancing Security and Usability**:
   - Learned the significance of finding the balance between providing robust security features and maintaining usability for non-tech-savvy users.

---

# 06. Achievements & What We’re Proud Of

## Key Achievements

1. **Empowering Elderly Users**:
   - Successfully developed a platform that enables seniors to confidently use online banking services.
2. **Technical Excellence**:
   - Efficiently integrated complex functionalities like BPAY and recurring payments.
3. **Client Satisfaction**:
   - Received positive feedback from Fake-Bank for delivering a secure, scalable, and user-friendly platform.

## Proud Moments

1. **Teamwork**:
   - Excellent collaboration and problem-solving within the team, which led to timely project delivery.
2. **Impact**:
   - The potential positive impact on elderly users’ lives by making online transactions accessible and easy to use.
