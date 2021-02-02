
///<reference types="Cypress"/>

describe('Test Address entry', () => {


    beforeEach(() => {
        cy.viewport('macbook-16')
        cy.visit('https://vandebron.nl')
        cy.get('.cookiebar-button').click({ force: true })
    })


    it('TC #1 - should be able to proceed if user filled a valid address correctly', () => {
        cy.fillAddress('1069SE', '12')
        cy.get('.ab-house-1').should('be.visible')// validate next page has apeeared
    })

    it('TC #2 - Box underline will change to green if address entries are valid', () => {
        cy.get('[name="submitData.shippingAddress.zipCode"]').type('1069SE', { force: true })
        cy.get('[name="submitData.shippingAddress.number"]').type('12', { force: true })
        cy.get('.Input__StyledInputLine-yt9vxy-1.dkhzlW').first().should('have.css', 'background-color', 'rgb(111, 211, 0)')// validate format change to green underline for address box


    })

    it('TC #3 - should be not able to proceed if user filled a valid address wrongly', () => {
        cy.fillAddress('a0000aa', '200')//This will call fill address function from commands.js file (WRONG ADDRESS)
        cy.contains('Waar woon je?').should('be.visible')//To make sure that the Wrong Address will call Re-Enter Address wizard
    })

    it('TC #4 - Box underline will change to red if address entries are not valid', () => {
        cy.get('[name="submitData.shippingAddress.zipCode"]').type('a0000aa', { force: true })
        cy.get('[name="submitData.shippingAddress.number"]').type('200a', { force: true })
        cy.get('.Input__StyledInputLine-yt9vxy-1.gDLpSY').first().should('have.css', 'background-color', 'rgb(208, 2, 27)')// validate format change to red underline for address box

    })
    describe('Wizard Test', () => {

        beforeEach('fill address', () => {

            cy.fillAddress('1069SE', '12')//This will call fill address function from commands.js file

        })



        it('TC #5 - should change the house type in the URL for every option', () => {
            const houses = [1, 2, 3, 4, 5] //Indixes for all house type options
            //Below for loop to validate URL has been updated based on house type selection 
            houses.forEach(house => {
                cy.get(`.ab-house-${house}`).first().click({ force: true })
                cy.url().should('contain', `houseTypeIdx=${house - 1}`)
            })

        })

        it('TC #6 - should change the box style for every option', () => {
            const houses = [1, 2, 3, 4, 5] //Indixes for all house type options
            //Below for loop to validate style has been updated based on house type selection 
            houses.forEach(house => {
                cy.get(`.ab-house-${house}`).first().click({ force: true }).should('have.css', 'opacity', '1')
            })

        })



        it('TC #7 - should change the resident type in the URL for every option', () => {
            const residents = [1, 2, 3, 4, 5] //Indixes for all house type options
            cy.get('.ab-house-button-next-step').click({ force: true }) //Select one house type for the next step
            //Below for loop is to make sure that URL is being updated while selecting different resident type
            residents.forEach(restident => {
                cy.get(`.ab-resident-${restident}`).first().click({ force: true })
                cy.url().should('contain', `residentTypeIdx=${restident - 1}`)
            })
        })

        it('TC #8 - should change the style (opacity) while changing the resident', () => {
            const residents = [1, 2, 3, 4, 5] //Indixes for all house type options

            cy.get('.ab-house-button-next-step').click({ force: true }) //Select one house type for the next step
            //Below for loop is to make sure that style is being updated while selecting different resident type
            residents.forEach(restident => {
                cy.get(`.ab-resident-${restident}`).first().click({ force: true }).should('have.css', 'opacity', '1')
            })
        })



        it('TC #9 - should change the energy service type in the URL for every option', () => {

            cy.get('.ab-house-button-next-step').click({ force: true })//Select one house type for the next step
            cy.get('.ab-resident-button-next-step').click({ force: true })//Select resident type for the next step
            cy.get('.ab-with-gas').first().click({ force: true })//select with gas option 
            cy.url().should('contain', `includeGas=1`)//Validate URL while gas option is enabled 
            cy.get('.ab-without-gas').first().click({ force: true })//select without gas option
            cy.url().should('contain', `includeGas=0`)//Validate URL while gas option is disabled 
        })

        it('TC #10 - should change the energy service type in the style when option is selected', () => {

            cy.get('.ab-house-button-next-step').click({ force: true })//Select one house type for the next step
            cy.get('.ab-resident-button-next-step').click({ force: true })//Select resident type for the next step
            cy.get('.ab-with-gas').first().click({ force: true }).should('have.css', 'opacity', '1')
            cy.get('.ab-without-gas').first().click({ force: true }).should('have.css', 'opacity', '1')

        })



        it.only('TC #11 - should change the solar panel value in the URL for every option', () => {

            cy.get('.ab-house-button-next-step').click({ force: true })//Select one house type for the next step
            cy.get('.ab-resident-button-next-step').click({ force: true })//Select resident type for the next step
            cy.get('.ab-view-offer-button').click({ force: true })//Next.. 
            cy.contains('Nee').click({ force: true })// Select No (for generating energey)
            cy.url().should('contain', `solarPanelYield=0`)//make sure that solar panel had 0 value in the URL

            cy.contains('Ja').click({ force: true })// select yes
            cy.contains('Volgende stap').click({ force: true })// select next
            cy.get('[name="priceParameters.solarPanelYield"]').clear().type('2000')
            cy.url().should('contain', `solarPanelYield=2000`)//URL should have the correct value for SolarPanelYeild

        })

        it('TC #12 - should change style while selecting solar panel value', () => {

            cy.get('.ab-house-button-next-step').click({ force: true })//Select one house type for the next step
            cy.get('.ab-resident-button-next-step').click({ force: true })//Select resident type for the next step
            cy.get('.ab-view-offer-button').click({ force: true })//Next.. 
            cy.contains('Nee').click({ force: true }).should('have.css', 'opacity', '1')// Select No & observe style change
            cy.contains('Ja').click({ force: true }).should('have.css', 'opacity', '1')// select yes & observe style change & observe style change

        })
    })



})
