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
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        
        })
    
    it("TC002 - Create a new project in the Get Started | Uniblock Dashboard", () => {
        
        //Click New Project Button
        cy.get('button').contains("New Project").click()

        //Input projectName in the text field
        cy.get('#projectName').type("testProject")

        //Click the Create button
        cy.get('button').contains('Create').click()

        //Navigate to the project
        cy.get('tbody tr td div').contains('testProject').should('exist')
        .click()

        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')
    })
})