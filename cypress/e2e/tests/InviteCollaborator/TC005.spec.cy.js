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
        for (let i = 0; i < 3; i++) {
            // Delete the added users
            cy.get('table tbody tr').eq(0) // Select the 1st row (index 1)
            .find('td').eq(3).find('button').click(); // Click the delete button in the 4th column
            cy.get('button').contains('Delete').click()
          }
        //Logout
        cy.Logout()
        })
    
    it("TC005 - Verify invitation with invalid emails", () => {
        
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
        //Input the email address of collaboratorTestEmail[0] into the input field.	
        cy.get('#newUserEmail').click().type('paul@example.com')

        //Click the invite button.
        cy.get("form div button").contains('Invite').click()
        
        //Verify that the modal disappeared
        cy.get("div").contains('Invite user').should('not.exist')

        //------------------------------//
        cy.get("button").contains('Invite').should('exist').click()
        //Input the email address of collaboratorTestEmail[1] into the input field.	
        cy.get("#newUserEmail").clear()
        cy.get('#newUserEmail').click().type('paul@test.com')

        //Click the invite button.
        cy.get("form div button").contains('Invite').should('exist').click()
        
        //Verify that the modal disappeared
        cy.get("div").contains('Invite user').should('not.exist')

         //------------------------------//
         cy.get("button").contains('Invite').should('exist').click()
         //Input the email address of collaboratorTestEmail[1] into the input field.	
        cy.get("#newUserEmail").clear()
        cy.get('#newUserEmail').click().type('paul@example.net')

        //Click the invite button.
        cy.get("form div button").contains('Invite').click()
        //Verify that the modal disappeared
        cy.get("div").contains('Invite user').should('not.exist')
        
        cy.get('tbody').within(() => {
            cy.get('tr').each(($row, index) => {
              if (index < 3) {
                cy.wrap($row).find('td').eq(1).should('contain', 'USER');
              }
            })
          })
    })
})