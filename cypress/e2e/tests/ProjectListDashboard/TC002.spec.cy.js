import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project list dashboard", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+2@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', 'Home | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        
        })
    
    it("TC002 - Create a new project in the Home | Uniblock Dashboard", () => {
        //Verify that the project shows expected message
        cy.get('p').contains('Welcome to Uniblock').should('be.visible')

        //Click the New Project Button
        cy.get('.MuiStack-root > button.MuiButtonBase-root').click()

        //Input projectName in the text field	
        cy.get('#projectName').type("testProject")
        
        //Click create	
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')
    })
})