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
        // Post-Condition: Delete the Integration then Logout
        cy.get('.css-1035b08 ul li').should('contain', 'Delete key').click();
        cy.wait(1000)
        cy.Logout()
        })
    
    it("TC007 - Verify Burger Menu for Created Integration", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get(".css-1p02q7g").contains('Integrations').should('be.enabled').click()
        
        //Click the burger menu on the integration item.
        cy.contains('.css-1fkeqk1', 'Moralis').should('exist').within(() => {
            cy.get('.css-1gwtl1m').click();
           
          });
          //Verify that the burger menu now replaces the add button, and it includes the "Delete API key" option.
          cy.get('.css-1035b08 ul li').should('contain', 'Delete key').and('be.visible');
        
        
    })
})