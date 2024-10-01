module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // 这里是让 Jest 转换 axios 中的 ES 模块
  ],
};
