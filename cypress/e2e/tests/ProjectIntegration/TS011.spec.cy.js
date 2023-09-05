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
    
    it("TC011 - Verify Integration Item Collapse", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get(".css-1p02q7g").contains('Integrations').should('be.enabled').click()
        
        //Click the burger menu on the integration item.
        cy.contains('.css-crt53z', 'Moralis').should('exist').within(() => {
            cy.get('.css-1gwtl1m').should('be.enabled');
            cy.get('.css-z4rakn').should('be.enabled').click();
          });
        
        //Verify that additional details for the item are displayed.
        cy.get('.simplebar-content').should('exist')

        //Click collapse
        cy.contains('.css-crt53z', 'Moralis').should('exist').within(() => {
            cy.get('.css-z4rakn').should('be.enabled').click();
          });
    })
})