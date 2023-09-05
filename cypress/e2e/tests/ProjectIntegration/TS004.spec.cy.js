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
            //cy.title().should('eq', 'Get Started | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC004 - Verify Integration Item Details", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Click the Integrations button
        cy.get(".css-1p02q7g").contains('Integrations').should('be.enabled').click()
        
        //Check the url
        cy.url().should('include', '/projects/integrations/')

        const expectedTexts = [
            'Moralis', 'Alchemy', 'Covalent', 'Tatum', 'Parsiq', 'QuickNode', 'Infura', 'CoinGecko', 'Blockdaemon',
            'CryptoCompare', 'Thirdweb', 'CoinbaseAPI', 'GetBlock', 'BitQuery', 'BitGo', 'Settlemint', 'Blockchain.com', 
            'DefiLlama', 'BinanceAPI', 'NFT.Storage', 'Onramper', 'Pinata', '1inch', 'Rarible', 'Uniblock SDK', 'Uniblock Launcher Marketplace',
            'Uniblock Launcher Multisend', 'Uniblock Launcher Airdrop', 'Uniblock Launcher Presale', 'Uniswap', 'Wagmi'
        ];

        cy.get('.css-1ym7ppv .css-1mdweok').should('exist').each(($element, index) => {
            // Get the text content of the current element
            cy.wrap($element).invoke('text').then((text) => {
              // Check if the text content matches the expected text from the array
              expect(text.trim()).to.equal(expectedTexts[index]);
            });
          
          });
        cy.get('p.css-1b94k16').should('exist')
    })
})