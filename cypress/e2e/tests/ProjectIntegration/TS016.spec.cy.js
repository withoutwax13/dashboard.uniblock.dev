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
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: Delete the project then Logout
        cy.get('div').contains('newProject').click()
        cy.wait(500)
        cy.get('div span').contains('Delete project').click()
        cy.wait(500)
        cy.get('#confirmProjectName').type('newProject')
        cy.wait(500)
        cy.get('button').contains('Delete').click()
        cy.Logout()
        })
    
    it("TC016 - Verify Integration Item with 'Not Configured' Status", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get("button").contains('Integrations').should('be.enabled').click()
        
        //Click the add menu on the integration item.
        cy.contains('.css-crt53z', 'BinanceAPI').should('exist').within(() => {
            cy.get('p').contains('Coming soon').should('exist')
            let addButton = ".css-1gwtl1m"
            let dropdownButton = ".css-z4rakn"
            cy.get(`${addButton}`).should('be.disabled');
            cy.get(`${dropdownButton}`).should('be.disabled');
          });
        
          //Go to project overview
        cy.get('a div').contains('Overview').click()
    })
})