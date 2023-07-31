import LoginPage from "../../objects/LoginPage"

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
          .visit("https://dashboard.uniblock.dev/auth/login")
      })

    it("Verify successful login", () =>{
        LoginPageObject.setEmail(validEmail)
        LoginPageObject.setPassword(validPassword)
        LoginPageObject.clickLoginButton();
        //verify
        cy.url().should('eq', successLoginURL)
        cy.title().should('eq', successLoginTitle)
    })

})