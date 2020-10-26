module.exports = {
  preset: "@shelf/jest-mongodb",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["<rootDir>/test/setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|js)"],
  testPathIgnorePatterns: ["/node_modules/", "frontend/"],
  testEnvironment: "node",
};
