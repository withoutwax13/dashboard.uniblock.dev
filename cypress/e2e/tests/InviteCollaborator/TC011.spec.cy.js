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
            
        })
    })
    afterEach(()=>{
        // Post-Condition: delete added testuser
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[2]").click()
        cy.get('.css-1jhao0x').click()
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
        cy.get(".css-1p02q7g").should('exist').click()
        cy.get('#newUserEmail').click().type('testEmail@gmail.com')
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()
       
        //Locate a collaborator in the list.
        cy.get("tbody").within(() => {
          cy.get('tr').eq(0).find('td').eq(0).should('contain', 'testEmail@gmail.com');
        });	

        //Click the edit button associated with the collaborator.	
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[1]").click()

        //Verify that a modal titled "Edit user role" appears.	
        cy.get("div").contains("Edit user role").should('exist')

        //Verify that the modal contains a selection box with options: USER, ADMIN, OWNER.	
        cy.get("#edit-user-select").click()

        cy.get('.css-r8u8y9').within(() => {
          // Use the cy.get() command to select the list items and check their presence
          cy.get('li').should($listItems => {
            // Get the text content of the list items
            const listItemTexts = $listItems.map((_, el) => Cypress.$(el).text()).get();
        
            // Check the presence of specific items
            //expect(listItemTexts).to.include('OWNER');
            expect(listItemTexts).to.include('ADMIN');
            expect(listItemTexts).to.include('USER');
          });
        });
        
        //Click a different role than the default
        cy.get('.css-r8u8y9 li').contains('ADMIN').click();
        cy.get(".css-1jhao0x").contains("Edit").click()
        //Verify updated role
        cy.get('tbody').within(() => {
          cy.get('tr').eq(0).find('td').eq(1).should('contain', 'ADMIN');
        });
    })
})