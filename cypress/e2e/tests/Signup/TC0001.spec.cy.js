import SignupPage from "../../../e2e/objects/SignupPage.object"

describe("Signup Scenario: TC001", () => {

    var SignupPageObject = new SignupPage()
    var pageUrl, title, validEmail, validPassword, loginPageUrl

    before(() => {
        //Load data from fixture
        cy.fixture('appData').then(data => {
            //Login page url is used in order to make sure that the link going to sign up is functional
            loginPageUrl = data.SignupPage.loginurl
            pageUrl = data.SignupPage.url
            title = data.SignupPage.title
            validEmail = data.SignupPage.validCredentials.email
            validPassword = data.SignupPage.validCredentials.password
        })
    })

    it("TC001 - Verify signup functionality using valid email with correct password format", () => {
        //Visit the login page and assert that the URL and page match expected url
        SignupPageObject
            .visit()
            .url().should('eq', loginPageUrl)

        //Verify the link to create exist new account and clicking the link
        cy.get('a').contains('Create an account').should('exist')
            .click()
        //Verify that the page title and url is correct after clicking
        cy.url().should('eq', pageUrl)
            .title().should('eq', title)

        //Input valid email 
        //Input invalid password format
        SignupPageObject.setEmail(validEmail)
        SignupPageObject.setPassword(validPassword)
        SignupPageObject.setConfirmPassword(validPassword)

        //Verify pop up message that shows the requirement of the password
        cy.get(".css-eir4cz").should('exist')
            .get('p').contains('characters').should('have.attr', 'style', 'color: green;')
            .get('p').contains('uppercase').should('have.attr', 'style', 'color: green;')
            .get('p').contains('lowercase').should('have.attr', 'style', 'color: green;')
            .get('p').contains('one number').should('have.attr', 'style', 'color: green;')
            .get('p').contains('matches').should('have.attr', 'style', 'color: green;')


        //Verify that the Create account button is still enabled
        SignupPageObject.clickSignupButton()
        cy.Logout()
    })
})