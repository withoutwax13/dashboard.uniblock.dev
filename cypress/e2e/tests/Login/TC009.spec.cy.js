import LoginPage from "../../objects/LoginPage.object"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login Scenario: TC009", () => {

    let LoginPageObject = new LoginPage()
    let pageUrl, title, validEmail, validPassword, successLoginURL, successLoginTitle

    before(() => {
        //Load data from fixture
        cy.fixture('appData').then(data => {
            pageUrl = data.LoginPage.url
            title = data.LoginPage.title
            validEmail = data.LoginPage.validCredentials.email
            validPassword = data.LoginPage.validCredentials.password
            successLoginURL = data.Dashboard.url
            successLoginTitle = data.Dashboard.title
        })
    })
    it("Verify return to sign in link from reset password", () => {
        // Visit the login page and assert that the URL and page title match expected values
        LoginPageObject
            .visit()
            .url().should('eq', pageUrl)
            .title().should('eq', title)

        //Navigate to Forget Password page
        cy.get('a').contains('Forgot password')
            .click()

        cy.url().should('eq', "https://dashboard-test.uniblock.dev/auth/reset-password")
        
        //Confirm that there is a link for going back to sign in
        cy.get('a').contains('Return to ').should('exist')
            .click()

        //Verify if the url is correct 
        cy.url().should('eq', 'https://dashboard-test.uniblock.dev/auth/login')
    })
})