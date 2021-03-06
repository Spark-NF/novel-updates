module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",

    testMatch: [
        "**/?(*.)+(spec|test).ts"
    ],

    coveragePathIgnorePatterns: [
        "/Fake*",
    ],
    coverageReporters: [
        "lcovonly",
        "html",
    ],

    collectCoverageFrom: [
        "src/**/*.ts",
    ],

    globals: {
        "ts-jest": {
            diagnostics: false,
            tsConfig: "src/tsconfig.json"
        }
    }
};