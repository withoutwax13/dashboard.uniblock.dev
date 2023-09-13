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
        // Post-Condition: Delete the Integration then Logout
        cy.get('div').contains('Delete key').click();
        cy.wait(1000)
        cy.Logout()
        })
    
    it("TC007 - Verify Burger Menu for Created Integration", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get("button").contains('Integrations').should('be.enabled').click()
        
        //Click the burger menu on the integration item.
        let IntegrationCard = ".css-1fkeqk1"
        cy.contains(`${IntegrationCard}`, 'Moralis').should('exist').within(() => {
            cy.get('#menu-button').click();
           
          });
          //Verify that the burger menu now replaces the add button, and it includes the "Delete API key" option.
          cy.get('div ul li').should('contain', 'Delete key').and('be.visible');
        
        
    })
})