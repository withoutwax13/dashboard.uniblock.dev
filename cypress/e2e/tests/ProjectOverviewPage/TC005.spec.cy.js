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
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Delete extra API key then Logout
        
        cy.get('table tbody tr td').eq(3).find('button').click()
        cy.wait(500)
        cy.get('button').contains('Delete').click()
        cy.Logout()
        })
    
    it("TC005 - Verify that the page displays the section API Keys", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Verify new page contains API Keys
        cy.get('div').contains('API Keys').should('exist')

        //Verify the section contains a button	(New API)
        cy.get('button').contains('New API').should('exist').click()

        //Verify API item list length is 2	
        cy.get('table tbody').find('tr').should('have.length', 3) //+1 for the menu on the bottom
    })
})