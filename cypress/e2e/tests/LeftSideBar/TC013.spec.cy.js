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
        // Post-Condition: delete project and then Logout
        cy.wait(2000)
        cy.get('a').contains('Overview').click()
        cy.get('div span').contains('Delete project').click()
        cy.get('input[name="confirmProjectName"]').type('testData')
        cy.get('button').contains('Delete').click()
        
        cy.Logout()
        })
    
    it("TC013 - Verify Users Navigation in PROJECTS Section", () => {
        //Verify that there is a project
        cy.get('tbody tr td div').contains('testData').should('exist')
        .click()

        //Click on the Get Started link
        cy.get('a').contains('Users').should('exist').click()

        //Verify that the page redirected by checking the url
        cy.url().should('include', '/users')
    })
        
})