export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",  // Transpile TypeScript files
      "^.+\\.jsx?$": "babel-jest" // Transpile JavaScript files
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Mock styles
    },
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"]
  };
  