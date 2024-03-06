const cucumber = require('cypress-cucumber-preprocessor').default;
const mysql = require('mysql');
const { defineConfig } = require("cypress");

//function to do the db queries
function queryDb(query, config) {
  const connection = mysql.createConnection({
    //below are taken from cypress.config.js
    host: Cypress.config('dbHost'),
    user: Cypress.config('dbUser'),
    password: Cypress.config('dbPass'),
    database: Cypress.config('dbName')
  })

  //prmise to handle SQL queries against database which is an synchrounos operation
  return new Promise((resolve, reject) => {
    //executes SQL query
    connection.query(query, (error, results) => {
      //catches any error
      //promise is rejected if the query encounters an error
      if (error) reject(error);
      //query is successful and the promise is resolved
      else resolve(results);
      //closed db connection
      connection.end();
    });
  });
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://www.bookbazaar.com/',
    apiUrl: 'https://jsonplaceholder.typicode.com/',
    pageLoadTimeout: 120000,
    reporter: 'mochawesome',
    reporterOptions: {
      // To display small circular charts regarding test results
      charts: true,
      // Generate JSON file to create custom reports
      json: true,
      // Customize the directory in which reports are saved
      reportsDir: 'mochawesome-report',
      // Customize the report file name
      reportFilename: 'my-report',
      // Generate new report file or overwrite the a single file
      overwrite: false
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //set up preprocessor for cucumber
      on('file:preprocessor', cucumber());
      //custom task for datbase queries
      on('task', {
        dbQuery: (query) => queryDatabase(query, config)
      });
      return config;
    },

    //specPattern: '**/*.feature',
    specPattern: 'cypress/e2e/**/*.{cy.js,cy.ts,spec.js,spec.ts,feature}',
  },
});
