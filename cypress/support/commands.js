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
    cy.wait(1000)//Address sometimes need extra time to load properly
    cy.get('[name="submitData.shippingAddress.zipCode"]').type(zipCode, { force: true })
    cy.wait(1000)
    cy.get('[name="submitData.shippingAddress.number"]').type(houseNumber, { force: true })
    cy.wait(1000)
    cy.get('button').contains('Bereken je maandbedrag').click({ force: true })
})
Cypress.Commands.add('completeWizard', () => {
    cy.get('.ab-house-button-next-step', { timeout: 10000 }).click({ force: true })//Select one house type for the next step
    cy.get('.ab-resident-button-next-step', { timeout: 10000 }).click({ force: true })//Select resident type for the next step
    cy.get('.ab-view-offer-button', { timeout: 10000 }).click({ force: true })//Next..
    cy.contains('Ja').click({ force: true })// select yes
    cy.contains('Volgende stap').click({ force: true })// select next
    cy.get('[name="priceParameters.solarPanelYield"]').clear({ force: true }).type('2000')
    cy.get('[type="submit"]').click({ force: true })//Next.. 

})