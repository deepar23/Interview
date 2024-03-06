# Interview

This is a sample framework demonstrating UI, API and database tests.

**Pre-requitesites**
Node.js

**Install**
Clone repository:
git clone https://github.com/deepar23/Interview.git

Move to the directory
cd Interview

**Install Dependencies:**
npm install

**Run tests**
Open Cypress Runner: npx cypress open
Run UI Tests: npm run feature
Run API tests: npm run apitests
Combining Reports: merge:reports
Create html report: create:html:report

**Framework:**
Used BDD to create automation framework using Cypress. Language used is Javascript
UI tests are saved into cypress/e2e/UI folder
API test is saved into cypress/e2e/API
database test is saved into cypress/e2e/Database
All the steps definitions and common mathods are saved in cypress/e2e/integration/commons.js
Test data used for API tests are saved in cypress/fixtures folder in json format
Sensitive data (both login credentials and database related data) are saved in cypress.env.json file, this is usually ignored during git push
Mochwesome reporter is used for reporting and the reports will be stored in cypress/mochawesome-report folder. The reports can be combined to a single html report
package.json has all the dependencies and plugins used for the framework, has all the scripts to be run and reporter info
cypress.config.js has the function for db connectivity, viewport dimensions, base and api urls, reporter configurations, path to spec files/ feature files etc.
Replace the mobile number with a valid mobile number in cypress.env.json

**Reports**
Html Report will look like below
1. Failed test
![image](https://github.com/deepar23/Interview/assets/101648011/3464fbab-99b3-40ca-b48c-fd27865ed12d)

2. Passed tests
![image](https://github.com/deepar23/Interview/assets/101648011/2942a0ef-fb22-4bf1-bb50-0e96bba20d08)




