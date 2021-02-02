
///<reference types="Cypress"/>



describe('Test offer Page', () => {

    before(() => {
        cy.viewport('macbook-16')
        cy.visit('https://vandebron.nl')
        cy.get('.cookiebar-button').click({ force: true })
        cy.fillAddress('1069SE', '12')//This will call fill address function from commands.js file
        cy.completeWizard()
    })


    it('TC #1 - Make sure offer page has appeared', () => {
        cy.get('.CarouselPage-header-title > .Text-module__u-font-h2').should('be.visible')

    })

    it('TC #2 - Check that 3 offers will appear on the screen', () => {


        cy.contains('1 jaar').first().click({ force: true }).should('be.visible')
        cy.contains('3 jaar prijszeker').first().click({ force: true }).should('be.visible')
        cy.contains('Variabel').first().click({ force: true }).should('be.visible')

    })

    it('TC #3 - Check offer1 One Year will update the (URL)', () => {


        cy.contains('1 jaar').first().click({ force: true })//To select the one year option
        cy.url().should('contain', `activePropositionName=12`)// URL updated correctly

    })

    it('TC #4 - Check offer2 (3 Years) will update the (URL)', () => {


        cy.contains('3 jaar prijszeker').first().click({ force: true })//To select the 3 years option
        cy.url().should('contain', `activePropositionName=36`)// URL updated correctly

    })

    it('TC #5 - Check offer3 (3 variabel) will update the (URL)', () => {


        cy.contains('Variabel').first().click({ force: true })//To select the variabel option
        cy.url().should('contain', `activePropositionName=Variable`)// URL updated correctly

    })


    it('TC #6 - while selecting any offer the box will be green & the other one will be gray', () => {
        cy.contains('1 jaar').first().click({ force: true })//To select the one year option
        cy.get('.optionBlock-info-wrapper').eq('0').should('have.css', 'background-color', 'rgb(3, 154, 39)')// should be green
        cy.get('.optionBlock-info-wrapper').eq('1').should('have.css', 'background-color', 'rgb(51, 61, 71)')//should be gray
        cy.get('.optionBlock-info-wrapper').eq('2').should('have.css', 'background-color', 'rgb(51, 61, 71)')//should be gray


    })


    it('TC #7 - Three offers should conatin price box and it should be visible', () => {
        const boxes = [0, 1, 2]
        boxes.forEach(box => {
            cy.get('.optionBlock-content-price').eq(box).should('be.visible')


        });

    })

    it('TC #8 - ((Change)) LINK should be visible', () => {

        cy.get('#e2e-edit-usage').scrollIntoView().should('be.visible')


    });

    it('TC #9 - ((SAVE OFFER)) should be visible', () => {
        cy.get('.CarouselPage-footer-button').eq('0').should('be.visible')


    });
    it('TC #10 - ((NEXT STEP)) should be visible', () => {
        cy.get('.CarouselPage-footer-button').eq('1').should('be.visible')


    });


})
