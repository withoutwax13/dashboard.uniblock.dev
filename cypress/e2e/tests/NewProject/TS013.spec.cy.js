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
    
    it("TC013 - Verify that the project name field has a character limit, and entering more characters than allowed triggers an error prompt.t", () => {

        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Input projectName on the input text field		
        cy.get('#projectName').type("This is a project name that exceeds the character limit")

        //Click Create
        cy.get('button').contains('Create').click()

        //Verify that error message "Max 30 characters" is visible
        cy.get('div').contains('Max 30 characters').should('exist').and('be.visible')

        //Click Close
        cy.get('button').contains('Close').click()
    })
})