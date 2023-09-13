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
        // Post-Condition: delete added testuser
        cy.get('table tbody tr').eq(3) // Select the 3rd row (index 1)
       .find('td').eq(3).find('button').click(); // Click the delete button in the 4th column
       cy.get('button').contains('Delete').click()
       cy.wait(1000)
        //Logout
        cy.Logout()
        })
    
    it("TC018 - Verify deletion confirmation prompt", () => {
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()
        
        //Locate the Users then click
        cy.get("a").contains('Users').should('exist').click()

        //Verify the expectedURL
        cy.url().should('include', '/dashboard/projects/users/')

        //Verify that the collaborator list component on the page contains the ownerEmail
        cy.get("table thead tr th").contains("Email").should('exist')
        
        //Add a testemail
        cy.get("button").contains('Invite').click()
        cy.get('#newUserEmail').click().type('testEmail@gmail.com')
        cy.get('form div button').contains('Invite').click()
       
        //Locate a collaborator in the list.
        cy.get("tbody").within(() => {
          cy.get('tr').eq(3).find('td').eq(0).should('contain', 'testEmail@gmail.com');
        });	
        
        //Delete the added user
        cy.get('table tbody tr').eq(3) // Select the 3rd row (index 1)
        .find('td').eq(3).find('button').click(); // Click the delete button in the 4th column
        
        //Verify that the modal contains a close button and a delete button.
        cy.get('div').contains('Remove user from project').should('exist')

        cy.get('button').contains('Close').click()
        cy.wait(1000)

        cy.get('div').contains('Remove user from project').should('not.exist')
		
    })
})