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
        // Post-Condition: Logout
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
    
    it("TC004 - Verify deleting a project item without inputting the project name.", () => {
        
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

        //Click delete button
        cy.get('button').contains('Delete').click()

        //Verify Error Message
        cy.get('div').contains('Required').should('be.visible')
        //Click cancel button
        cy.get('button').contains('Close').click()
    })
})