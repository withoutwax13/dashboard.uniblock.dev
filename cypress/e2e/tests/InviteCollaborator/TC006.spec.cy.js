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
        for (let i = 0; i < 1; i++) {
            // Click the second button using XPath
            cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[2]").click();
            // Click the element with the specific class
            cy.get('.css-1jhao0x').click();
          }
        //Logout
        cy.Logout()
        })
    
    it.skip("TC006 - Verify case sensitivity during email invitation	", () => {
        
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
        cy.get('#newUserEmail').click().type('PAUL@example.com')

        //Click the invite button.
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()
        //Verify that the modal disappeared
        cy.get("div").contains('Invite user').should('not.exist')
        cy.get("table thead tr th").contains("Email").should('exist').click()
        cy.get('tbody').within(() => {
          cy.get('tr').eq(0).find('td').eq(1).should('contain', 'USER');
        });

        //------------------------------//
        cy.get(".css-1p02q7g").should('exist').click()
        //Input the email address of collaboratorTestEmail[1] into the input field.	
        cy.get("#newUserEmail").clear()
        cy.get('#newUserEmail').click().type('paul@test.com')

        //Click the invite button.
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click()
        //Verify that the modal disappeared
        cy.get("div").contains('Invite user').should('not.exist')

        cy.get('tbody').within(() => {
          // Use the cy.get() command to select the rows and check their length
          cy.get('tr').should('have.length', 5); //+1 for the default row
        });


    })
})