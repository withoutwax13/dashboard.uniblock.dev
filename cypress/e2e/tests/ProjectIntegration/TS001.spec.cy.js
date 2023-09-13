import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project integration page	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+4@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC001 - Verify Page Location", () => {

        //Click New Project Button
        cy.get('button').contains('New Project').click()

        //Input projectName in the text field
        cy.get('#projectName').type("newProject")

        //Click create button
        cy.get('button').contains('Create').click()

        //Navigate to the project
        cy.get('div').contains('newProject').click()

        
        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

    })
})