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
    
    it("TC007 - Verify Overview Navigation in PROJECTS Section", () => {
        
        //Verify that there is a project
        cy.get('tbody tr td div').contains('testData').should('exist')
        .click()

        //Click on the Get Started link
        cy.get('a').contains('Overview').should('exist').click()

        //Verify that the page redirected by checking the url
        cy.url().should('include', '/overview')
    })
        
})