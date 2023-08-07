import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify Left side Bar", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', data.Dashboard.title).should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC012 - Verify Analytics Navigation in PROJECTS Section", () => {
        //Verify that there is a project
        cy.get('td:nth-child(2)').should('exist')
        .click()

        //Click on the Get Started link
        cy.get('a').contains('Analytics').should('exist').click()

        //Verify that the page redirected by checking the url
        cy.url().should('include', '/analytics')
    })
        
})