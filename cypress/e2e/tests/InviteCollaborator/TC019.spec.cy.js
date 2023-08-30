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
    
    it("TC019 - Verify deletion of multiple collaborators", () => {
        
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
        cy.wait(2000)
        //Add 2nd testemail
        cy.get(".css-1p02q7g").should('exist').click()
        cy.get('#newUserEmail').click().type('testEmail2@gmail.com')
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()
          //Locate a collaborator in the list.
        	
        //Delete the added user
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[2]").click()

        //Verify that the modal contains a close button and a delete button.	
        cy.get('div').contains('Remove user from project').should('exist')

        //Click the delete button.	
        cy.get('.css-1jhao0x').click()

        //Verify that the collaborator is removed in the collaborator list.	
        cy.get("tbody").within(() => {
            cy.get('tr').eq(0).find('td').eq(0).should('not.contain', 'testEmail@gmail.com');
          });
          
        //Click the delete button for the 2nd testemail	
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[2]").click()
        cy.get('.css-1jhao0x').click()

        //Verify that the collaborator is removed in the collaborator list.	
        cy.get("tbody").within(() => {
            cy.get('tr').eq(0).find('td').eq(0).should('not.contain', 'testEmail2@gmail.com');
          });
        	
    })
})