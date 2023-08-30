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
            cy.title().should('eq', 'Get Started | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        
        })
    
    it("TC002 - Create a new project in the Get Started | Uniblock Dashboard", () => {
        /*For new users
        //Verify that the page is correct
        cy.url().should('include', 'new-user')
        
        //Verify that the project shows expected message
        cy.get('ol li').contains('Your first project').should('be.visible')

        //Input projectName in the text field	
        cy.get('#projectName').type("testProject")
        
        //Input projectPurpose in the text field	
        cy.get('#projectPurpose').type("To test")

        //Click create	
        cy.get('.css-1ggn6oq').click()

        //Click next
        cy.get('.css-1syqgxj').click()

        //Click next
        cy.get('.css-1syqgxj').click()
        
        //Click next
        cy.get('.css-1syqgxj').click()

        //Click finish
        cy.get('.css-1p02q7g').contains('Finish').click()
        */

        //Click New Project Button
        cy.get('.css-1p02q7g').click()

        //Input projectName in the text field
        cy.get('#projectName').type("testProject")

        //Click create button
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()

        //Navigate to the project
        cy.get('div').contains('testProject').click()

        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')
    })
})