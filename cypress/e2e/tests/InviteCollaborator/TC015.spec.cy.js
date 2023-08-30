import LoginPage from "../../objects/LoginPage.object"

describe("Scenario:Verify invite collaborator feature	", () => {
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
        // Post-Condition: delete added testuser
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[2]").click()
        cy.get('.css-1jhao0x').click()
        //Logout
        cy.Logout()
        })
    
    it("TC015 - Verify canceling deletion of collaborator", () => {
        
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
        
        //Delete the added user
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[2]").click()

        //Verify that the modal contains a close button and a delete button.
        cy.get('div').contains('Remove user from project').should('exist')

        //Click the close button.	
        cy.get('.css-z4rakn').click()

        cy.get('div').contains('Remove user from project').should('not.exist')

    })
})