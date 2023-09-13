import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify invite collaborator feature	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+3.1@gmail.com')
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
    
    it("TC011 - Verify editing collaborator role by admin", () => {
        
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

        //Click the edit button associated with the collaborator.	
        cy.get('table tbody tr').eq(3) // Select the 4TH row (index 1)
        .find('td').eq(2).find('button').click(); // Click the edit button in the 3rd column
        cy.get('button').contains('Edit').should('exist')

        //Verify that a modal titled "Edit user role" appears.	
        cy.get("div").contains("Edit user role").should('exist')

        //Verify that the modal contains a selection box with options: USER, ADMIN, OWNER.	
        cy.get("#edit-user-select").click()

        cy.get('ul[aria-labelledby="edit-user-select-label"]').within(() => {
          // Use the cy.get() command to select the list items and check their presence
          cy.get('li').should($listItems => {
            // Get the text content of the list items
            const listItemTexts = $listItems.map((_, el) => Cypress.$(el).text()).get();
        
            // Check the presence of specific items
            expect(listItemTexts).to.include('Admin');
            expect(listItemTexts).to.include('User');
          });
        });
        
        //Click a different role than the default
        cy.get('li').contains('Admin').click();
        cy.get("button").contains("Edit").click()
        //Verify updated role
        cy.get('tbody').within(() => {
          cy.get('tr').eq(3).find('td').eq(1).should('contain', 'ADMIN');
        });
    })
})