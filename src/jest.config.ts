import type { Config } from "jest";

const jestConfig: Config = {
  testEnvironment: "node",
  rootDir: ".",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testTimeout: 60000,
};

export default jestConfig;
