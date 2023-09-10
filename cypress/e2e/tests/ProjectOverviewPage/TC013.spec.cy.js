import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project item overview page", () => {
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
        // Post-Condition:Delete the project then Logout
        cy.get('div span').contains('Delete project').click()
        cy.wait(500)
        cy.get('#confirmProjectName').type('newProject')
        cy.wait(500)
        cy.get('button').contains('Delete').click()
        cy.Logout()
        })
    
    it("TC013 - Verify that the project name is properly formatted in the page header", () => {
        let expectedText = "Project Overview";
        let projectName = "newProject";

        //Navigate to the project
        cy.get('div').contains('newProject').click()
        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Verify that the project name is properly formatted in the page header	
        cy.get('h4').should('contain', `${expectedText} · ${projectName}`);  
    })
})