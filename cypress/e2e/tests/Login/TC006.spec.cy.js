import LoginPage from "../../objects/LoginPage.object"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login Scenario: TC006", () => {

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
    it("Verify login using random string as the email", () => {
        // Visit the login page and assert that the URL and page title match expected values
        LoginPageObject
            .visit()
            .url().should('eq', pageUrl)
            .title().should('eq', title)

        LoginPageObject.setEmail("wewdsfdsfew")
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //Verify Invalid email error message
        cy.get('div').contains('Email must be a valid').should("be.visible")
        //Verify that page did not proceed to dashboard
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)
    })
})