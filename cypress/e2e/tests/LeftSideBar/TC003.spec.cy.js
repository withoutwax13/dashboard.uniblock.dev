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
    
    it("TC003 - Verify APIs Navigation in RESOURCES Section", () => {
        cy.intercept('GET', 'https://explorer.uniblock.dev/').as('linkClicked');
        cy.get('a').contains('API').click()
        cy.wait('@linkClicked').then((interception) => {
            const url = interception.response.url;
            cy.visit(url); // Visit the URL in the same window
        })
        //Verify if the URL is correct
        cy.url().should('include', 'https://explorer.uniblock.dev/');
        cy.go('back')
    })
        
})