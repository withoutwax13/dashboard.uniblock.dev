import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify adding project API key feature", () => {
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
        // Post-Condition: delete new api key then 
        //Logout
        cy.xpath("(//div[@class='MuiBox-root css-17hckkm']//button)[1]").click()
        cy.get(".css-1bn6w8i").contains("Delete API key").should('be.visible')
        cy.xpath("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[5]").click()
        cy.Logout()
        })
    
    it("TC004 - Verify the behavior of the API key list after adding a new API key", () => {
    
        //verify url
        cy.url().should('include', 'projects/list')
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()

        //Locate the API Keys list component in the API Keys section of the page.
        cy.get("table thead th").contains("Key").should('exist')	

        //Verify the total number of API Keys in the list and store the value as totalAPI.
        cy.get('.css-1xnox0e').within(() => {
            cy.get('tr').should('have.length', 2); //+1 for menu on the bottom
          });

        //Locate the New API key then click
        cy.get("div").contains("New API Key").should('exist').click()

        //Verify the total number of API Keys in the list is totalAPI + 1.	
        cy.get('.css-1xnox0e').within(() => {
            cy.get('tr').should('have.length', 3); //+1 for menu on the bottom
          });
    })
})