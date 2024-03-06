// Import Cypress commands and assertions
import { Given, When, Then , And} from 'cypress-cucumber-preprocessor/steps';
let mobile = Cypress.env('Mobile');
let password = Cypress.env('Password');

// Given step: Set up the initial context
Given('I open the bookbazar homepage', () => {
  // Visit a URL to your homepage)
  cy.visit('/');
});

Given('I open the bookbazar registration page', () => {
  // Navigate to the registration page)
  cy.on('uncaught:exception', (err, runnable) => {
    return false;
  })
  cy.visit('/registration');
});

And ('I type {string} in the {string} field', (value, fieldName) => {
  switch (fieldName) {
    case "RegMobile":
      cy.get(`#${fieldName}`).should('be.visible').type(mobile, {force: true});
      break;
    case "RegPass":
    case "RegPass1":
      cy.get(`#${fieldName}`).should('be.visible').type(password, {force: true});
      break;
    default:
      cy.get(`#${fieldName}`).should('be.visible').type(value, {force: true});
  }
})

// Click on any button
When('I click on the {string} button', (btn) => {
  cy.get(`#${btn}`).should('be.visible').click({force : true});
});

And ('I search for the item {string}',(item) => {
  cy.on('uncaught:exception', (err, runnable) => {
    return false;
  })
  cy.get('#small-searchterms').should('be.visible').type(item);
})

//Wait for a page to load
And('I wait to see {string} page', (heading) => {
  assertPage(heading);
})

// Then step: Verify Google homepage elements
Then('the user click on search bar', () => {
  // Assert that the search bar and Google logo elements are visible
  cy.get('textarea[name="q"]').click();

});

// And step: Verify the URL of the page
And('the URL of the page should be {string}', (expectedUrl) => {
  // Assert that the current URL matches the expected URL
  cy.url().should('eq', 'https://www.google.com/imghp?hl=en&ogbl');
});

function assertPage(assertCase, heading) {
  switch (assertCase) {
    case "should see":
    case "see":
      cy.contains('h1', heading)
        .should('be.visible');
      break;

    case "should not see":
      cy.get('h1')
        .should('not.contain', heading)
      break;

    default:
      cy.get('h1')
        .should('be.visible');
  }
}

Then('I {string} the username {string} on the welcome page', (assertValue, name) => {
  switch (assertValue) {
    case "should see":
    case "see":
      cy.contains('#ctl00_loginname', name).should('be.visible');
      break;
    default:
      cy.contains(name).should('be.visible');
  }
});

When('I login as test user', () => {
    cy.get('#ctl00_signin').click({force: true});
    cy.get('#LgnMobileOrEmail').type(Cypress.env('Mobile'));
    cy.get('#logintextpswd').type(Cypress.env('Password'), { sensitive: true });
    cy.get('#ctl00_ContentPlaceHolder1_btnLogin', { timeout: 10000 }).should('be.visible').click({ force: true });
  });

When('I click on the search icon', ()=> {
  cy.get(`div[title='Search'] span.fa-search`, {timeout : 10000}).should('be.visible').click({force: true});
})

//Click on any link
When('I click on {string} in the page', (item)=> {
  cy.contains(item, { failOnStatusCode: false }).should('be.visible').click({force: true});
})

And ('I {string} {string} in the {string}', (assertion, text, element)=> {
  switch (assertion) {
    case "should see":
    case "see":
      cy.get(`#${element}`).invoke('text').should('eq', text);
  }
})

And ('I click on the payment button', (assertion, text, element)=> {
  cy.get('#payment_method button.btnchange').click();
})

Then('I wait until the {string} page has been loaded', (pathname) => {
  cy.location('pathname', {timeout: 100000}).should('contain', pathname)
})

And('I see the element with text {string} in the page', (text)=> {
  cy.contains(text).should('be.visible');
})

And('I check the check box {string}', (checkbox) => {
  cy.get(`#${checkbox}`).check();
})

And('I see the check box {string} is checked', (checkbox) => {
  cy.get(`#${checkbox}`).should('be.checked');
})

Given('I perform a {string} query in database', (query) => {
  cy.task('queryDb', query).then((result) => {
    expect(result).to.have.length.greaterThan(0);
  });
})

And ('I wait {int} seconds to see the {string}', (time, text) => {
  cy.wait(time);
})

And('I wait for the api calls to ge completed', () => {
  cy.intercept('POST', 'url-of-api-call').as('getContent');
})

And('I wait for the {string} api call to happen', (apiCall)=> {
  cy.intercept('POST', `https://api19.bookbazaar.com/SchoolStuffService.asmx/${apiCall}`).as('getContent');

})