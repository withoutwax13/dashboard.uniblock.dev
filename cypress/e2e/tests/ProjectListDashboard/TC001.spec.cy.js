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
    
    it("TC001 - Ensure the dashboard displays an appropriate message when there are no projects available.", () => {
        //Verify that the page is correct
        cy.url().should('include', 'new-user')
        
        //Verify that the project shows expected message
        cy.get('p').contains('Welcome to Uniblock').should('be.visible')
        
        //Proceed to dashboard
        cy.get('.MuiButtonBase-root > .MuiAvatar-root > .MuiAvatar-img').click()
        cy.get('.css-1kxe5pk > :nth-child(2)').click()

        //Check if the table displays No Project
        cy.get(':nth-child(1) > .MuiTypography-inherit > .MuiButtonBase-root').click()
        cy.get('div').contains('No Projects').should('be.visible')
    })
})