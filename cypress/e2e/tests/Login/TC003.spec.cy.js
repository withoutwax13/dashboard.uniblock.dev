import LoginPage from "../../objects/LoginPage.object"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login Scenario: TC003", () => {

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
    it("Verify login using a registered email and correct password", () => {
        // Visit the login page and assert that the URL and page title match expected values
        LoginPageObject
            .visit()
            .url().should('eq', pageUrl)
            .title().should('eq', title)

        LoginPageObject.setEmail(validEmail)
        //add gmail
        cy.get("input[name='email']").type('@gmail.com')
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //Verify succesfull login
        cy.url().should('eq', successLoginURL)
        cy.title().should('eq', successLoginTitle)
        cy.Logout()
    })
})