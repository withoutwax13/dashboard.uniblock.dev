import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project item overview page", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+2@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            //cy.title().should('eq', 'Get Started | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC012 - Verify that the page header contains the name of the project item.", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Verify new page contains projectName in header tag		
        cy.get('h4').contains('newProject').should('exist').and('be.visible')       
    })
})