import LoginPage from "../../objects/LoginPage.object"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login Scenario: TC007", () => {

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
    it("Verify if the hide/unhide button in password works correctly", () => {
        // Visit the login page and assert that the URL and page title match expected values
        LoginPageObject
            .visit()
            .url().should('eq', pageUrl)
            .title().should('eq', title)

        LoginPageObject.setEmail(validEmail)
        cy.get("input[name='email']").type('@gmail.com')
        
        LoginPageObject.setPassword(validPassword)
        //Verify that the input type for password is password
        cy.get('input[name=password]').should('have.attr', "type", "password")
        //Click the hide or show password icon
        cy.get('div#__next>div>main>div:nth-of-type(2)>div>form>div>div:nth-of-type(2)>div>div>button').click()

        //Verify that the input type changed
        cy.get('input[name=password]').should('have.attr', "type", "text")
    })
})