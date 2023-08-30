import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify deleting project item feature", () => {
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
    
    it.skip("TC006 - Verify deleting a project item and checking if its unique project overview URL redirects to dashboard page URL", () => {
       //Click New Project Button
       cy.get('.css-1p02q7g').click()

       //Input projectName in the text field
       cy.get('#projectName').type("newProject")

       //Click create button
       cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()

       //Navigate to the project
       cy.get('div').contains('newProject').click()

        //Verify new page url contains expectedText	
        cy.url().should('include', 'dashboard/projects/overview')

        //Click Delete button	
        cy.get('.css-wvtjil').contains('Delete').click()
        cy.wait(500)

        //Input projectName in the text input field
        cy.get('#confirmProjectName').type('newProject')
        cy.wait(500)

        //Click delete button
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Verify redirected to dashboard page	
        cy.url().should('include', 'https://dashboard-test.uniblock.dev/dashboard/projects/list')

        //Verify projectName does not exist in project list
        cy.get('div').contains('No Projects').should('be.visible')

        //Launch to uniqueOverviewPageURL as URL
        cy.go('back')

        //
        cy.url().should('not.include', 'overview')

    })
})