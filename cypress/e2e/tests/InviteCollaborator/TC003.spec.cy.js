import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify invite collaborator feature	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+3@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: 
        //Logout
        cy.Logout()
        })
    
    it("TC003 - Verify invitation with empty email field", () => {
        
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()
        
        //Locate the Users then click
        cy.get("a").contains('Users').should('exist').click()

        //Verify the expectedURL
        cy.url().should('include', '/dashboard/projects/users/')

        //Verify that the collaborator list component on the page contains the ownerEmail
        cy.get("table thead tr th").contains("Email").should('exist')
        
        //Click the Invite button.
        cy.get("button").contains('Invite').should('exist').click()

        //Verify that a modal titled "Invite user" appears.	
        cy.get("div").contains('Invite user').should('exist')

        //Verify that the modal contains an input field with the placeholder "Email".	
        cy.get('#newUserEmail').should('exist')

        //Verify that the modal contains a close button and an invite button.	
        cy.get("form div button").contains('Close').should('exist')
        cy.get("form div button").contains('Invite').should('exist')


        //------------------------------//
        //Input the email address of collaboratorTestEmail into the input field.	
        cy.get('#newUserEmail').click().type(' ')

        //Click the invite button.
        cy.get("form div button").contains('Invite').click()

        //Verify that the modal displays an error matching the errorMessage	
        cy.get("div").contains("must be a valid email").should('be.visible')

        //Click the close button.
        cy.get("button").contains('Close').click()

        //Verify that the modal displays an error matching the errorMessage	
        cy.get("div").contains("must be a valid email").should('be.visible')

    })
})