
///<reference types="Cypress"/>

describe('Change Options', () => {


    beforeEach(() => {
        cy.viewport('macbook-16')
        cy.visit('https://vandebron.nl')
        cy.get('.cookiebar-button').click({ force: true })
        cy.fillAddress('1069SE', '12')//This will call fill address function from commands.js file
        cy.completeWizard()
        cy.get('#e2e-edit-usage').should('be.visible').click({ force: true })
    })



    it('TC #1 - Change Menu should appear/ disappear', () => {
        cy.get('[id="toggle-double-meter"]').should('be.visible')
        cy.get('.EditUsageContainer-close').click({ force: true })


    })

    it('TC #2 - make sure that (make estimate) link is there and working properly', () => {
        cy.get('.EditUsageContainer-header a').click({ force: true })
        cy.get('.EditUnknownUsage').should('be.visible')
        cy.get('.EditUsageContainer-close').click({ force: true })
    })

    it('TC #3 - Make sure that "Double Meter option is there and working fine and check URL"', () => {
        cy.get('[id="toggle-double-meter"]').click({ force: true })
        cy.get('[name="priceParameters.offPeakEstimate"]').should('be.visible').should('have.value', '1140')
        cy.get('[name="priceParameters.offPeakEstimate"]').clear({ force: true }).type('2000', { force: true })//2nd meter should appear and the values correct
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click({ force: true })
        cy.url().should('contain', `offPeakEstimate=2000`)
    })



    it('TC #4 - Should be abel to change the basic estimate', () => {
        cy.get('[name="priceParameters.basicEstimate"]').should('have.value', '2850')//Make sure previous selection is correctly written in the field
        cy.url().should('contain', `basicEstimate=2850`)//make sure previous selection is there in the URL
        cy.get('[name="priceParameters.basicEstimate"]').clear({ force: true }).type('2855', { force: true })// Change previous selection
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click({ force: true })// Press OK to have the change in the URL
        cy.url().should('contain', `basicEstimate=2855`)// Make sure the change has been detected by the URL
    })

    it('TC #5 - Disable Gas and check URL value changes ', () => {
        cy.url().should('contain', `includeGas=1`)// Gas was already in URL
        cy.get('.SwitchBase__StyledSwitchBaseCore-sc-1xmvua5-2 > .Base-sc-11hu4bh-0-span').click({ force: true })
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click({ force: true })
        cy.url().should('contain', `includeGas=0`)


    })

    it('TC #6 - Disable Solar Panel and check URL value changes ', () => {
        cy.url().should('contain', `solarPanelYield=2000`)// Solar was already in URL
        cy.get('.Icon-module__icon.Icon-module__u-font-color-charcoal-gray.Switch-module__icon.Switch-module__icon-end').click({ force: true })//Disable Solar pannel
        cy.get('.EditUsageContainer-form > .Base-sc-11hu4bh-0-button').click({ force: true })//OK
        cy.url().should('contain', `solarPanelYield=0`)
    })

})


describe('Make an estimate', () => {

    beforeEach(() => {
        cy.viewport('macbook-16')
        cy.visit('https://vandebron.nl')
        cy.get('.cookiebar-button').click({ force: true })
        cy.fillAddress('1069SE', '12')//This will call fill address function from commands.js file
        cy.completeWizard()
        cy.get('#e2e-edit-usage').should('be.visible').click({ force: true })

    })

    it('TC #7 - Make Estimate link and Information match my previous selection (House Type)', () => {
        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click({ force: true })
        cy.get('.EditUnknownUsage > :nth-child(1) > .Text-module__text-default').should('contain.text', 'Type woning: Tussenwoning')
        cy.get('#town-house').should('have.css', 'opacity', '1')

    })

    it('TC #8 - Make Estimate link and Information match my previous selection (Number of Residents)', () => {
        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click({ force: true })
        cy.get('.EditUnknownUsage > :nth-child(2) > .Text-module__text-default').should('contain.text', 'Aantal bewoners: 3')
        cy.get(':nth-child(2) > .RadioGroup__StyledRadioGroup-sc-11dzx2z-0 > :nth-child(3) > .SwitchBase__StyledSwitchBaseButtonWrapper-sc-1xmvua5-3 > .SwitchBase__StyledSwitchBaseButton-sc-1xmvua5-4').should('have.css', 'opacity', '1')
    })

    it('TC #9 - Make Estimate link and Information match my previous selection (Gas & Energey Selection)', () => {
        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click({ force: true })
        cy.get('.EditUnknownUsage > :nth-child(3) > .Text-module__text-default').should('contain.text', 'Soort:  Stroom en Gas')
        cy.get(':nth-child(3) > .RadioGroup__StyledRadioGroup-sc-11dzx2z-0 > :nth-child(2) > .SwitchBase__StyledSwitchBaseButtonWrapper-sc-1xmvua5-3 > .SwitchBase__StyledSwitchBaseButton-sc-1xmvua5-4').should('have.css', 'opacity', '1')
        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a > .Pressable__StyledPressableText-xp7e18-3').should('contain.text', 'Ik weet').click({ force: true })
        cy.get('.EditKnownUsage > :nth-child(1) > .Flex-module__flex-row').should('be.visible')

    })

    it('TC #10 - Make Estimate link and Information match my previous selection (Energy Provider Selection)', () => {
        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click({ force: true })
        cy.get('.InputBase-module__input.InputBase-module__input-placeholder-right').should('have.value', '2000')
    })

})