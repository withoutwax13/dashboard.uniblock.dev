import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify adding new project item feature", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+4@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC010 - Verify that the modal contains a 'Create or Add' button to save the new project", () => {

        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Verify if a create button is enabled and exists	
        cy.get('button').contains('Create').should('exist').and('be.enabled')

        //Click Close
        cy.get('button').contains('Close').click()
    })
})