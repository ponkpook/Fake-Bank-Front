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
