import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify Left side Bar", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', data.Dashboard.title).should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC006 - Verify PROJECTS Section on Other Pages", () => {
        
        //Create new project
        //Click the New Project button
        cy.get('button').contains('New Project').click()

        //Input namte testData in the project name
        cy.get('input[name="projectName"]').type('testData')

        //Click the Create button
        cy.get('button').contains('Create').click()

        //Verify that there is a project
        cy.get('tbody tr td div').contains('testData').should('exist')
        .click()

        //Verify that the url is correct
        cy.url().should('include', '/overview')

        //Verify that the left side nav exists
        //cy.get('a').contains('Get Started').should('exist').and('be.visible')
        cy.get('a').contains('Overview').should('exist').and('be.visible')
        cy.get('a').contains('Contracts').should('exist').and('be.visible')
        cy.get('a').contains('Integration').should('exist').and('be.visible')
        cy.get('a').contains('Endpoints').should('exist').and('be.visible')
        cy.get('a').contains('Analytics').should('exist').and('be.visible')
        cy.get('a').contains('Users').should('exist').and('be.visible')

    })

        
})