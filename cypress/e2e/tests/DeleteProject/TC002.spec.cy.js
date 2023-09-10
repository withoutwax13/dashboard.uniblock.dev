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
            //cy.title().should('eq', 'Get Started | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Delete project and Logout
        cy.wait(1000)
        cy.get('div').contains('newProject').click()
        cy.wait(1000)
        cy.get('div span').contains('Delete project').click()
        cy.wait(1000)
        cy.get('#confirmProjectName').type('newProject')
        cy.wait(1000)
        cy.get('button').contains('Delete').click()
        cy.Logout()
        })
    
    it("TC002 - Verify cancelling deleting a project item successfully.", () => {
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

        //Click Close button
        cy.get('button').contains('Close').click()

        //Navigate to Project list
        cy.get('a div').contains('projects').click()
        cy.url().should('include', 'https://dashboard-test.uniblock.dev/dashboard/projects/list')

        //Verify projectName does exist in project list
        cy.get('div').contains('newProject').should('exist')
    })
})