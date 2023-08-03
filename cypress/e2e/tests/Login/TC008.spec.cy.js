import LoginPage from "../../objects/LoginPage.object"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login Scenario: TC008", () => {

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
    it("Verify the forget password function for registered account", () => {
        // Visit the login page and assert that the URL and page title match expected values
        LoginPageObject
            .visit()
            .url().should('eq', pageUrl)
            .title().should('eq', title)
        //Confirm that there is a button for forget password
        cy.get('a').contains('Forgot password')
            .click()

        //Verify that the url changed to https://dashboard.uniblock.dev/auth/reset-password
        cy.url().should('eq', 'https://dashboard.uniblock.dev/auth/reset-password')

        //Enter email
        cy.get('[name=email]')
            .type("renzdesierra08@gmail.com")
    })
})