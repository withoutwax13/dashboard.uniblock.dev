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
        // Post-Condition: Delete projects then Logout
        cy.get('div').contains('testData').click()
        cy.wait(500)
        cy.get('div span').contains('Delete project').click()
        cy.wait(500)
        cy.get('#confirmProjectName').type('testData')
        cy.wait(500)
        cy.get('button').contains('Delete').click()
        cy.Logout()
        })
    
    it("TC007 - Verify that the error prompt appears instantly after entering an existing project name without requiring to click any buttons", () => {

        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Input projectName on the input text field		
        cy.get('#projectName').type("testData")

        //Click Create
        cy.get('button').contains('Create').click()
        
        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Input projectName on the input text field		
        cy.get('#projectName').type("testData")
        
        cy.get('#projectName').type('{enter}');

        //Verify that error message was displayed	
        cy.get('div').contains('Duplicate Project Name').should('exist');

        cy.get('button').contains("Close").click()
    })
})