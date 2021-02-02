
///<reference types="Cypress"/>

describe('Change Options', () => {


    before(() => {
        cy.viewport('macbook-16')
        cy.visit('https://vandebron.nl')
        cy.get('.cookiebar-button').click({ force: true })
        cy.fillAddress('1069SE', '12')//This will call fill address function from commands.js file
        cy.completeWizard()


    })

    it('TC #1 - Change Menu should appear/ disappear', () => {

        cy.get('#e2e-edit-usage').should('be.visible').click({ force: true })
        cy.get('[id="toggle-double-meter"]').should('be.visible')
        cy.get('.EditUsageContainer-close').click({ force: true })
        cy.get('[id="toggle-double-meter"]').should('not.be.visible')


    })

    it.only('TC #2 - make sure that (make estimate) link is there and working properly', () => {

        cy.get('#e2e-edit-usage').should('be.visible').click({ force: true })// Click on Change
        cy.get('[id="toggle-double-meter"]').should('be.visible').click()//click on make change
        cy.get('[id="priceParameters.offPeakEstimate"]').should('be.visible')




    })



    it('Test Electricity Selection ', () => {

        cy.get('[name="priceParameters.basicEstimate"]').should('have.value', '2850')//Make sure previous selection is correctly written in the field
        cy.url().should('contain', `basicEstimate=2850`)//make sure previous selection is there in the URL
        cy.get('[name="priceParameters.basicEstimate"]').clear().type('2855')// Change previous selection
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click()// Press OK to have the change in the URL
        cy.url().should('contain', `basicEstimate=2855`)// Make sure the change has been detected by the URL


    })

    it('Test Electricity Selection/ Double Meter Option ', () => {

        cy.get('#toggle-double-meter').should('be.visible').click()//Enable Double Meter 
        cy.get('[name="priceParameters.offPeakEstimate"]').should('be.visible').should('have.value', '1140')//2nd meter should appear and the values correct
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click()//OK
        cy.url().should('contain', `meterTypeIdx=2`).and('contain', `offPeakEstimate=1140`)//Doubel meter should be enabled in the URL with correct values

    })
    it('Disable Gas and check URL value changes ', () => {
        cy.url().should('contain', `includeGas=1`)// Gas was already in URL
        cy.get('.SwitchBase__StyledSwitchBaseCore-sc-1xmvua5-2 > .Base-sc-11hu4bh-0-span').click()
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click()
        cy.url().should('contain', `includeGas=0`)


    })

    it('Disable Solar Panel and check URL value changes ', () => {
        cy.url().should('contain', `solarPanelYield=2000`)// Solar was already in URL
        cy.get('.Icon-module__icon.Icon-module__u-font-color-charcoal-gray.Switch-module__icon.Switch-module__icon-end').click()//Disable Solar pannel
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click()//OK
        cy.url().should('contain', `solarPanelYield=0`)


    })


})
