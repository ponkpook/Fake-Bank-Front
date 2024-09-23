module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jsdom", // Simulates the browser environment for testing
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpile TypeScript and TSX files
    "^.+\\.(js|jsx)$": "babel-jest", // Transpile JavaScript and JSX files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Make sure Jest processes axios or any other ES module in node_modules
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports during testing
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Add this line
};
