import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project integration page	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+4@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            //cy.title().should('eq', 'Get Started | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Delete the project then Logout
        cy.get('div').contains('newProject').click()
        cy.wait(500)
        cy.get('.css-wvtjil').contains('Delete').click()
        cy.wait(500)
        cy.get('#confirmProjectName').type('newProject')
        cy.wait(500)
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        cy.Logout()
        })
    
    it("TC016 - Verify Integration Item with 'Not Configured' Status", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get(".css-1p02q7g").contains('Integrations').should('be.enabled').click()
        
        //Click the burger menu on the integration item.
        cy.contains('.css-crt53z', 'BinanceAPI').should('exist').within(() => {
            cy.get('p').contains('Coming soon').should('exist')
            cy.get('.css-1gwtl1m').should('be.disabled');
            cy.get('.css-z4rakn').should('be.disabled');
          });
        
          //Go to project overview
        cy.get('.css-xdiy5h').contains('Overview').click()
    })
})