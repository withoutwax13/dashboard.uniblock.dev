import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project integration page	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+4@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC009 - Verify Multiple Integration Items", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Click the Integrations button
        cy.get('button').contains('Integrations').should('be.enabled').click()
        
        //Check the url
        cy.url().should('include', '/projects/integrations/')

        const expectedTexts = [
            'Moralis', 'Alchemy', 'Covalent', 'Tatum', 'Parsiq', 'QuickNode', 'Infura', 
            'CoinMarketCap', 'CoinGecko', 'CryptoCompare', 'Blockdaemon', 'Thirdweb', 
            'CoinbaseAPI', 'GetBlock', 'BitQuery', 'BitGo', 'Settlemint', 'Blockchain.com', 
            'DefiLlama', 'BinanceAPI',
          ];
          
          // Select all elements with the given classes
          cy.get('.css-1ym7ppv .css-j7qwjs')
            .should('exist')
            .each(($element, index) => {
              cy.wrap($element)
                .should('contain.text', expectedTexts[index]) 
                .get('p:contains("Not configured"), p:contains("Coming soon")')
                .should('be.visible'); 
            });
    })
})