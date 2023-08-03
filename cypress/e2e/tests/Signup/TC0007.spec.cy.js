import SignupPage from "../../objects/SignupPage.object"

describe("Signup Scenario: TC007", () => {

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

    it("Verify signup functionality using random string as email (password valid and matching)", () => {
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
        SignupPageObject.setEmail('adsasdwqdad')
        SignupPageObject.setPassword("Asdfghjkl0")
        SignupPageObject.setConfirmPassword("Asdfghjkl0")

        //Verify that the Create account button is still enabled

        SignupPageObject.clickSignupButton()

        //Verify that an error message saying email should be valid appears
        cy.get('div').contains('Email must be a valid').should('exist').and('be.visible')

        //Verify pop up message that shows the requirement of the password
        cy.get(".css-eir4cz").should('exist')
            .get('p').contains('characters').should('have.attr', 'style', 'color: green;')
            .get('p').contains('uppercase').should('have.attr', 'style', 'color: green;')
            .get('p').contains('lowercase').should('have.attr', 'style', 'color: green;')
            .get('p').contains('one number').should('have.attr', 'style', 'color: green;')
            .get('p').contains('matches').should('have.attr', 'style', 'color: green;')
    })
})