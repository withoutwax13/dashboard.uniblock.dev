import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify deleting project API key feature", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+3.2@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        
        cy.Logout()
        })
    
    it("TC002 - Verify deletion of API key by user", () => {
    
        //verify url
        cy.url().should('include', 'projects/list')
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()

        //Locate the API Keys list component in the API Keys section of the page.
        cy.get("table thead th").contains("Key").should('exist')	

        //Locate the New API key then click
        cy.get("div").contains("New API Key").should('exist')
        cy.get("button").contains('New API Key').should('exist').and('be.disabled')

    })
})