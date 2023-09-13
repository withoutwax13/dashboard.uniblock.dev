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
        cy.get('table tbody tr').eq(1) // Select the 2nd row (index 1)
        .find('td').eq(3).find('button').click(); // Click the delete button in the 4th column
        cy.get('button').contains('Delete').click()
          
        //Logout
        cy.Logout()
        })
    
    it("TC001 - Verify successful invitation", () => {
        
        //Create a project
        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Input projectName on the input text field		
        cy.get('#projectName').type("testProject")

        //Click Create
        cy.get('button').contains('Create').click()
        
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

        //Input the email address of collaboratorTestEmail into the input field.
        cy.get('#newUserEmail').click().type('testEmail@gmail.com')

        //Click the invite button.
        cy.get("form div button").contains('Invite').should('exist').click()
        //Verify that the modal disappears.
        cy.get("div").contains('Invite user').should('not.exist')

        //Verify that the email of collaboratorTestEmail is in the collaborator list component, with the role of a user.
        cy.get("tbody").within(() => {
            cy.get('tr').find('td').should('contain', 'testEmail@gmail.com');
        });
    })
})