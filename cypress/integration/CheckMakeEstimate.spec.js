
///<reference types="Cypress"/>

describe('Make an estimate', () => {


    beforeEach(() => {
        cy.viewport('macbook-16')
        cy.visit('https://vandebron.nl')
        cy.get('.cookiebar-button').click({ force: true })
        cy.fillAddress('1069SE', '12')//This will call fill address function from commands.js file
        cy.completeWizard()
        cy.get('#e2e-edit-usage').should('be.visible').click({ force: true })

    })

    it('MAke Estimate link and Information match my previous selection (House Type)', () => {

        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click()
        cy.get('.EditUnknownUsage > :nth-child(1) > .Text-module__text-default').should('contain.text', 'Type woning: Tussenwoning')
        cy.get('#town-house').should('have.css', 'opacity', '1')

    })

    it('Make Estimate link and Information match my previous selection (Number of Residents)', () => {

        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click()

        cy.get('.EditUnknownUsage > :nth-child(2) > .Text-module__text-default').should('contain.text', 'Aantal bewoners: 3')
        cy.get(':nth-child(2) > .RadioGroup__StyledRadioGroup-sc-11dzx2z-0 > :nth-child(3) > .SwitchBase__StyledSwitchBaseButtonWrapper-sc-1xmvua5-3 > .SwitchBase__StyledSwitchBaseButton-sc-1xmvua5-4').should('have.css', 'opacity', '1')


    })

    it('Make Estimate link and Information match my previous selection (Gas & Energey Selection)', () => {

        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click()

        cy.get('.EditUnknownUsage > :nth-child(3) > .Text-module__text-default').should('contain.text', 'Soort:  Stroom en Gas')
        cy.get(':nth-child(3) > .RadioGroup__StyledRadioGroup-sc-11dzx2z-0 > :nth-child(2) > .SwitchBase__StyledSwitchBaseButtonWrapper-sc-1xmvua5-3 > .SwitchBase__StyledSwitchBaseButton-sc-1xmvua5-4').should('have.css', 'opacity', '1')
        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a > .Pressable__StyledPressableText-xp7e18-3').should('contain.text', 'Ik weet').click()
        cy.get('.EditKnownUsage > :nth-child(1) > .Flex-module__flex-row').should('be.visible')

    })

    it('Make Estimate link and Information match my previous selection (Energy Provider Selection)', () => {

        cy.get('.EditUsageContainer-header > .Base-sc-11hu4bh-0-a').should('be.visible').click()
        cy.get('.InputBase-module__input.InputBase-module__input-placeholder-right').should('have.value', '2000')
    })




})
