import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify deleting project API key feature", () => {
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
    
    it("TC004 - Verify deletion confirmation modal", () => {
    
        //verify url
        cy.url().should('include', 'projects/list')
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()

        //Locate the API Keys list component in the API Keys section of the page.
        cy.get("table thead th").contains("Key").should('exist')	

        //Click the delete button on the list        
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[1]").click()

        //Verify that a confirmation modal titled "Delete API Key" appears.
        cy.get(".css-1bn6w8i").contains("Delete API key").should('be.visible')

        //Click the close button in the modal.	
        cy.xpath("//button[text()='Close']").should('exist').click()
        
        //Verify that a confirmation modal titled "Delete API Key" disappears.
        cy.get("div").contains("Delete API key").should('not.exist')

        //Verify that the API key is no longer present in the API key list.	
        cy.get('.css-1xnox0e').within(() => {
            cy.get('tr').should('have.length', 2); //+1 for menu on the bottom
          });
    })
})