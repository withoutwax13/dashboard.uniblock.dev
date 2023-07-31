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
      

    it("TC007 - Verify login using a registered email and correct password", () =>{
        LoginPageObject.setEmail(validEmail)
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //verify
        cy.url().should('eq', successLoginURL)
        cy.title().should('eq', successLoginTitle)
        cy.Logout()
    })

    it("TC008 - Verify login using a registered email and a blank and  incorrect password", () =>{
        LoginPageObject.setEmail(validEmail)
        LoginPageObject.clickLoginButton();
        //verify error message password is required
        //cy.get("//div[contains(@class,'MuiFormHelperText-root Mui-error')]").should("be.visible")

        LoginPageObject.setPassword("adadsa")
        LoginPageObject.clickLoginButton();
        //verify
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)

    })

    it("TC009 - Verify login using an unregistered email", () =>{
        LoginPageObject.setEmail("randomemail@gmail.com")
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //verify
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)
        
    })
    it("TC010 - Verify login using random string as the email", () =>{
        LoginPageObject.setEmail("wewdsfdsfew")
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //verify Invalid email message
        
        //verify
        cy.url().should('not.eq', successLoginURL)
        cy.title().should('not.eq', successLoginTitle)
        
    })
})