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
        // Post-Condition: Delete extra API key then Logout
        
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[1]").click()
        cy.get('.css-1jhao0x').click()
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
        cy.get('.css-1spjef0').find('tr').should('have.length', 3) //+1 for the menu on the bottom
    })
})