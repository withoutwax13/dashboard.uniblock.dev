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
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC008 - Verify Integration Item with Coming Soon Status", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get("button").contains('Integrations').should('be.enabled').click()
        
        //Locate an integration with coming soon
        cy.contains('.css-crt53z', 'BinanceAPI').should('exist').within(() => {
            //Check that the add and dropdown button menu is disabled.
            let addButton = ".css-1gwtl1m"
            let dropdownButton = ".css-z4rakn"
            cy.get(`${addButton}`).should('be.disabled');
            cy.get(`${dropdownButton}`).should('be.disabled');
          });
        
    })
})