const baseUrl = Cypress.env("baseUrl");
const uuid = () => Cypress._.random(0, 1e10);
const id = uuid();
const email = `username${id}@hello.com`;

const password = Cypress.env("password");
const invalidEmail = "username@9829596636";

const availablefixtures = [
  {
    name: "HealthPlan£20",
    context: "Health Plan Cost £20",
  },
  {
    name: "HealthPlan£60",
    context: "Health Plan Cost £60",
  },
];

describe("Boost UK", () => {
  beforeEach("visit the URL & Accept Cookies", () => {
    cy.visit(baseUrl);
    cy.get("#onetrust-accept-btn-handler").click();
  });

  availablefixtures.forEach((afixture) => {
    describe(afixture.context, () => {
      beforeEach(function () {
        cy.fixture(afixture.name).as("healthPlanDetails");
      });
      it(
        "Success E2E Flow - Simply Health - Get a health plan with edits for " +
          afixture.name,
        function () {
          cy.visit("https://www.simplyhealth.co.uk/");
          cy.get('a[href="/health-plan?homepageBanner=HP1"]')
            .should("have.length", 1)
            .click();
          cy.get("#button1046153040-1").should("have.length", 1).click();
          cy.selectPlan(this.healthPlanDetails.planCost);
          cy.aboutYou(
            this.healthPlanDetails.firstName,
            this.healthPlanDetails.lastName
          );
          cy.dateOfBirth(true, this.healthPlanDetails.age);
          cy.contactDetails(
            this.healthPlanDetails.phone,
            this.healthPlanDetails.email
          );
          cy.addressDetails(
            this.healthPlanDetails.postcode,
            this.healthPlanDetails.address,
            this.healthPlanDetails.firstLine
          );
          cy.contains("div", "Skip this step").click();
          cy.get("#ReferAFriend_Next_Button").click();
          cy.get("#MarketingPreferences_Next_Button").click();
          cy.editMarketingPreferences(
            this.healthPlanDetails.emailMarketingPreference,
            this.healthPlanDetails.phoneMarketingPreference,
            this.healthPlanDetails.smsMarketingPreference,
            this.healthPlanDetails.postMarketingPreference
          );
          cy.get("#CheckDetails_Agree_Button").click();
          cy.url().should(
            "eq",
            "https://www.simplyhealth.co.uk/products/consumers/simplyhealth/cp/direct-debit-payment"
          );
        }
      );
    });
  });

  it("Failure Scenario - Dental Plan - Incorrect Names", () => {
    cy.visit(
      "https://www.simplyhealth.co.uk/products/dental/dental-plan/cp/about-you"
    );
    cy.aboutYou("", "");
    cy.get("#AboutYou_firstName-error-message-0_Text").should(
      "contain",
      "First name is required"
    );
    cy.get("#AboutYou_lastName-error-message-0_Text").should(
      "contain",
      "Last name is required"
    );
    cy.aboutYou(" ", " ");
    cy.get("#AboutYou_firstName-error-message-0_Text").should(
      "contain",
      "First name is too short"
    );
    cy.get("#AboutYou_lastName-error-message-0_Text").should(
      "contain",
      "Last name is too short"
    );
  });

  it("Rewards Checks", () => {
    cy.visit("https://www.simplyhealth.co.uk/health-plan/rewards#rewards");
    cy.get("h3").contains("Fitbit");
    cy.get("p").contains(
      "Huge range of ski, snow and climbing clothing & equipment from the world's best brands."
    );
  });

  it("Member Portal Registration", () => {
    cy.visit("https://www.simplyhealth.co.uk/member-portal/account/register");
    cy.get('[data-testid="general_email_email"]')
      .invoke("attr", "type", "password")
      .type(email, { log: false });
    cy.get('[data-testid="general_confirmEmail_email"]')
      .invoke("attr", "type", "password")
      .type(email, { log: false });
    cy.get('[data-testid="general_password_password"]').type(password, {
      log: false,
    });
    cy.get('[data-testid="general_confirmPassword_password"]').type(password, {
      log: false,
    });
    cy.get('[data-testid="Register_CreateAccount_Button"]').click();
    cy.get("h1").contains(/Ok great!(\s)*Now check your email.../);
    cy.get(".Register_text__m4BtQ").contains("We've sent you an email to ");
    cy.get("span").contains(email);
    cy.get("p").contains(
      "Within it, you'll find instructions to verify your email account. Note: The link will expire within 24 hours."
    );
    cy.get(".Register_text__m4BtQ").contains("Not received email?");
    cy.get(".Register_resend_button_wrapper__RtKNZ").contains(
      "Remember to check your spam and junk folder."
    );
    cy.get('[data-testid="RegisterConfirmation_ResendEmail_Button"]').should(
      "be.visible"
    );
  });

  it("Member Portal Registration Fields Checks", () => {
    cy.visit("https://www.simplyhealth.co.uk/member-portal/account/register");
    cy.get('[data-testid="general_email_email"]').type(invalidEmail);
    cy.get('[data-testid="general_confirmEmail_email"]')
      .type("different email")
      .tab({ shift: true });
    cy.get(".FieldElement_error_message__3ppWy").contains(
      "Email addresses do not match"
    );
    cy.get('[data-testid="general_confirmEmail_email"]').clear();
    cy.get('[data-testid="general_confirmEmail_email"]').type(invalidEmail);
    cy.get('[data-testid="general_password_password"]').type(password, {
      log: false,
    });
    cy.get('[data-testid="general_confirmPassword_password"]').type(password, {
      log: false,
    });
    cy.get('[data-testid="Register_CreateAccount_Button"]').click();
    cy.get("div").contains("Error!");
    cy.get("div").contains("Error: Invalid email address format.");
  });
});
