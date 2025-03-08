import("sonarqube-scanner").then(({ default: scanner }) => {
  scanner(
    {
      serverUrl: "http://localhost:9000",
      token: "sqa_1f0fcf4c6afc76847ee0691e9cdd2b40130ceeee",
      options: {
        "sonar.projectKey": "react-nytimes",
        "sonar.sources": "src",
        "sonar.exclusions": "**/node_modules/**,**/*.test.ts,**/*.test.tsx",
        "sonar.language": "ts",
        "sonar.typescript.tsconfigPath": "tsconfig.json",
        "sonar.eslint.reportPaths": "eslint-report.json",
      },
    },
    () => process.exit()
  );
});
