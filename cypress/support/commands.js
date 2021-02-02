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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('fillAddress', (zipCode, houseNumber) => {
    cy.get('[name="submitData.shippingAddress.zipCode"]').type(zipCode, { force: true })
    cy.get('[name="submitData.shippingAddress.number"]').type(houseNumber, { force: true })
    cy.get('button').contains('Bereken je maandbedrag').click({ force: true })
})
Cypress.Commands.add('completeWizard', () => {


    cy.get('.ab-house-button-next-step').click({ force: true })//Select one house type for the next step
    cy.get('.ab-resident-button-next-step').click({ force: true })//Select resident type for the next step
    cy.get('.ab-view-offer-button').click({ force: true })//Next..
    cy.contains('Ja').click({ force: true })// select yes
    cy.contains('Volgende stap').click({ force: true })// select next
    cy.get('[name="priceParameters.solarPanelYield"]').clear().type('2000')
    cy.get('[type="submit"]').click()//Next.. 

})