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
            
        })
    })
    afterEach(()=>{
        // Post-Condition: 
        //Logout
        cy.Logout()
        })
    
    it("TC002 - Verify invitation with invalid emails", () => {
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()
        
        //Locate the Users then click
        cy.get("a").contains('Users').should('exist').click()

        //Verify the expectedURL
        cy.url().should('include', '/dashboard/projects/users/')

        //Verify that the collaborator list component on the page contains the ownerEmail
        cy.get("table thead tr th").contains("Email").should('exist')
        
        //Click the Invite button.
        cy.get(".css-1p02q7g").should('exist').click()

        //Verify that a modal titled "Invite user" appears.	
        cy.get("div").contains('Invite user').should('exist')

        //Verify that the modal contains an input field with the placeholder "Email".	
        cy.get('#newUserEmail').should('exist')

        //Verify that the modal contains a close button and an invite button.	
        cy.get(".css-z4rakn").should('exist')

        //------------------------------//
        //Input the email address of collaboratorTestEmail[0] into the input field.	
        cy.get('#newUserEmail').click().type('paul.example.com')

        //Click the invite button.
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()

        //Verify that the modal displays an error matching the errorMessage	
        cy.get("div").contains("must be a valid email").should('be.visible')

        //------------------------------//
        //Input the email address of collaboratorTestEmail[1] into the input field.	
        cy.get("#newUserEmail").clear()
        cy.get('#newUserEmail').click().type('paul@.com')

        //Click the invite button.
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()

         //Verify that the modal displays an error matching the errorMessage	
        cy.get("div").contains("must be a valid email").should('be.visible')

         //------------------------------//
         //Input the email address of collaboratorTestEmail[1] into the input field.	
        cy.get("#newUserEmail").clear()
        cy.get('#newUserEmail').click().type('paul@example')

        //Click the invite button.
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()

         //Verify that the modal displays an error matching the errorMessage	
        cy.get("div").contains("must be a valid email").should('be.visible')

        //Click close
        cy.get(".css-z4rakn").click()
    })
})