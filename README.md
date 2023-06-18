This is a Cypress test project using GitHub Actions Workflows for CI pipeline for the purpose of Boost UK GUI validations.

Pre-Requisites/Installation:

1. node
2. npm
3. cypress
4. docker
5. cypress-xpath
6. cypress-tab
7. mochawesome report

Tests:

1. Successful health plan flows
2. Successful Member Portal Registration flow
3. Health Plan setup failure cases
4. Member Portal Registration negative cases

Reports:
Available in cypress/reports/html/index.html

Videos:
Available in cypress/reports/html/videos.\*.mp4

Screenshots:
Available in cypress/screenshots/\*

GitHub Actions:

1. docker.yaml
2. ci.yaml

Implementations:

1. Retries/Attempts on failed tests
2. Fixtures/Datasets
3. Reports
