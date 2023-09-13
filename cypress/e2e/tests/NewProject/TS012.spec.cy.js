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
    
    it("TC012 - Verify that the newly created project appears in the project list or dashboard.", () => {

        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Input projectName on the input text field		
        cy.get('#projectName').type("testData")

        //Click Create
        cy.get('button').contains('Create').click()
        
        //Check if modal disappears
        cy.get('div[role="dialog"]').should('not.exist')

        //Input projectName in the search input field	
        cy.get('input[placeholder="Search..."').type('testData')

        //Verify 1 item has been displayed	
        cy.get('table tbody') 
            .find('tr')
            .should('have.length', 2) // +1 for the default;
        
    })
})