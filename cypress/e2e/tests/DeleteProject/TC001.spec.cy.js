import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify deleting project item feature", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+2@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC001 - Verify deleting a project item successfully.", () => {
        
        //Click New Project Button
        cy.get('button').contains('New Project').click()

        //Input projectName in the text field
        cy.get('#projectName').type("newProject")

        //Click create button
        cy.get('button').contains('Create').click()
        
        //Navigate to the project
        cy.get('div').contains('newProject').click()

        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Click Delete button	
        cy.get('div span').contains('Delete project').click()
        cy.wait(500)

        //Input projectName in the text input field
        cy.get('#confirmProjectName').type('newProject')
        cy.wait(500)

        //Click delete button
        cy.get('button').contains('Delete').click()

        //Verify redirected to dashboard page	
        cy.url().should('include', 'https://dashboard-test.uniblock.dev/dashboard/projects/list')

        //Verify projectName does not exist in project list
        cy.get('div').contains('No Projects').should('be.visible')
    })
})