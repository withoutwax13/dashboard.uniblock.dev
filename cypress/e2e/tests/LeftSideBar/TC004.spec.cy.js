import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify Left side Bar", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', data.Dashboard.title).should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
        it.skip("TC004 - Verify SDK Navigation in RESOURCES Section", () => {
            cy.intercept('GET', 'https://www.npmjs.com/package/@uniblock/uniblocksdk').as('linkClicked');
            
            // Click the link
            cy.get('a').contains('SDK').click();
            
            // Wait for the interception to complete
            cy.wait('@linkClicked').then((interception) => {
              const url = interception.response.url;
              console.log('Intercepted URL:', url);
              
              // Visit the URL in the same window
              cy.visit(url);
              
              // Verify if the URL is correct after navigation
              cy.url().should('eq', url); // Use the same URL variable
              
              cy.go('back'); // Navigate back
            });
          });
          
          
          
        
})