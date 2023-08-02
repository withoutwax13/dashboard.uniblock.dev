import LoginPage from "../../objects/LoginPage"
//import { randEmail, randPassword } from '@ngneat/falso';

describe("Login", () => {
    
    var LoginPageObject = new LoginPage()
    var pageUrl, title, validEmail, validPassword, successLoginURL, successLoginTitle
    
    before( () => {
        //Load data from fixture
        cy.fixture('appData').then(data => {

            pageUrl = data.LoginPage.url
            title = data.LoginPage.title
            validEmail = data.LoginPage.validCredentials.email
            validPassword= data.LoginPage.validCredentials.password
            successLoginURL = data.Dashboard.url
            successLoginTitle = data.Dashboard.title

        })

    })
    beforeEach(()=>{

        // Visit the login page and assert that the URL and page title match expected values
    
    LoginPageObject
        .visit()
        .url().should('eq', pageUrl)
        .title().should('eq', title)
    })
    it("TC001 - Verify login using google account", () =>{
        //cy.xpath("(//button[@type='button'])[2]").click()
    
        //Verify succesfull login
        /*cy.url().should('eq', successLoginURL)
        cy.title().should('eq', successLoginTitle)
        cy.Logout()*/
    })
    it("TC002 - Verify login using github account", () =>{
        //cy.xpath("(//button[@type='button'])[2]").click()
    
        //Verify succesfull login
        /*cy.url().should('eq', successLoginURL)
        cy.title().should('eq', successLoginTitle)
        cy.Logout()*/
    })

    it("TC003 - Verify login using a registered email and correct password", () =>{
        LoginPageObject.setEmail(validEmail)
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //Verify succesfull login
        cy.url().should('eq', successLoginURL)
        cy.title().should('eq', successLoginTitle)
        cy.Logout()
    })

    it("TC004 - Verify login using a registered email and a blank and  incorrect password", () =>{
        LoginPageObject.setEmail(validEmail)
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

    it("TC005 - Verify login using an unregistered email", () =>{
        LoginPageObject.setEmail("randomemail@gmail.com")
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //Verify error message showing user not found
        cy.get("#notistack-snackbar").contains('User not').should('be.visible')
        //verify that page did not proceed to dashboard
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)
        
    })
    it("TC006 - Verify login using random string as the email", () =>{
        LoginPageObject.setEmail("wewdsfdsfew")
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //Verify Invalid email error message
        cy.get('div').contains('Email must be a valid').should("be.visible")
        //Verify that page did not proceed to dashboard
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)
        
    })

    it("TC007 - Verify if the hide/unhide button in password works correctly", () => {
        LoginPageObject.setEmail(validEmail)
        LoginPageObject.setPassword(validPassword)
        //Verify that the input type for password is password
        cy.get('input[name=password]').should('have.attr', "type", "password")
        //Click the hide or show password icon
        cy.get('div#__next>div>main>div:nth-of-type(2)>div>form>div>div:nth-of-type(2)>div>div>button').click()
        
        //Verify that the input type changed
        cy.get('input[name=password]').should('have.attr', "type", "text")
    })
    it("TC008 - Verify the forget password function for registered account", () => {
        //Confirm that there is a button for forget password
        cy.get('a').contains('Forgot password')
        .click()

        //Verify that the url changed to https://dashboard.uniblock.dev/auth/reset-password
        cy.url().should('eq', 'https://dashboard.uniblock.dev/auth/reset-password')

        //Enter email
        cy.get('[name=email]')
        .type("renzdesierra08@gmail.com")

    })
    it("TC009 - Verify return to sign in link from reset password", () => {
        //Navigate to Forget Password page
        cy.get('a').contains('Forgot password')
        .click()
        
        //Confirm that there is a link for going back to sign in
        cy.get('a').contains('Return to ').should('exist') 
        .click()

        //Verify if the url is correct 
        cy.url().should('eq', 'https://dashboard.uniblock.dev/auth/login')
    })
})