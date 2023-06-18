// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("selectPlan", (cost) => {
  cy.get("#sh-premiums").contains(cost).click();
  cy.get("#sh-choose-plan-button").click();
  cy.get("#Layout_per-month-cost_Text").should("text", cost);
});

Cypress.Commands.add("aboutYou", (firstName, lastName) => {
  if (firstName !== "") {
    cy.get('[name="firstName"]').clear().type(firstName);
  }
  if (lastName !== "") {
    cy.get('[name="lastName"]').clear().type(lastName);
  }
  cy.get("#AboutYou_Next_Button").click();
});

const dayjs = require("dayjs");

Cypress.Commands.add("dateOfBirth", (valid, ageInYears) => {
  if (valid) {
    let yearBack = ageInYears,
      format = "year";
    var dd = dayjs().subtract(yearBack, format).format("DD");
    var mm = dayjs().subtract(yearBack, format).format("MM");
    var yyyy = dayjs().subtract(yearBack, format).format("YYYY");
    cy.get('[data-name="dateOfBirth.day"]').clear().type(dd);
    cy.get('[data-name="dateOfBirth.month"]').clear().type(mm);
    cy.get('[data-name="dateOfBirth.year"]').clear().type(yyyy);
  }
  cy.get("#DateOfBirth_Next_Button").click();
});

Cypress.Commands.add("contactDetails", (telephone, email) => {
  cy.get('[name="contactNumber"]').clear().type(telephone);
  cy.get('[aria-label="emailAddress"]').clear().type(email);
  cy.get("#ContactDetails_Next_Button").click();
});

Cypress.Commands.add("addressDetails", (postcode, selectAdress, firstLine) => {
  cy.get('[name="postcode"]').clear().type(postcode);
  cy.get("#Address_findAddress_Button").click();
  cy.get("#Address_selected-address_SelectInput").select(selectAdress);
  cy.get("#Address_line1_TextInput").should("value", firstLine);
  cy.get("#Address_Next_Button").click();
});

Cypress.Commands.add("editMarketingPreferences", (email, phone, sms, post) => {
  cy.get("#CheckDetails_edit-marketing-preferences_Button").click();
  if (email === 1) {
    cy.get("#EditMarketingPreferences_email-Span_Radio_true").click();
  } else if (email === 0) {
    cy.get("#EditMarketingPreferences_email-Span_Radio_false").click();
  }
  if (phone === 1) {
    cy.get("#EditMarketingPreferences_phone-Span_Radio_true").click();
  } else if (phone === 0) {
    cy.get("#EditMarketingPreferences_phone-Span_Radio_false").click();
  }
  if (sms === 1) {
    cy.get("#EditMarketingPreferences_sms-Span_Radio_true").click();
  } else if (sms === 0) {
    cy.get("#EditMarketingPreferences_sms-Span_Radio_false").click();
  }
  if (post === 1) {
    cy.get("#EditMarketingPreferences_post-Span_Radio_true").click();
  } else if (post === 0) {
    cy.get("#EditMarketingPreferences_post-Span_Radio_false").click();
  }
  cy.get("#marketing-preferences_save_Button").click();
});
