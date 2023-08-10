import LoginPage from "../../objects/LoginPage.object"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login Scenario: TC004", () => {

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
    it("Verify login using a registered email and a blank and  incorrect password", () => {
        // Visit the login page and assert that the URL and page title match expected values
        LoginPageObject
            .visit()
            .url().should('eq', pageUrl)
            .title().should('eq', title)

        LoginPageObject.setEmail(validEmail)
        cy.get("input[name='email']").type('@gmail.com')
        
        LoginPageObject.clickLoginButton();
        //verify error message password is required

        LoginPageObject.setPassword("adadsa")
        LoginPageObject.clickLoginButton();
        //Verify error message password is incorrect
        cy.get("div#notistack-snackbar").should("be.visible")

        //Verify that page did not proceed to dashboard
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)
    })
})