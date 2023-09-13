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
    
    it("TC013 - Verify Invalid Input Handling in Add Modal", () => {

        //Navigate to the project
        cy.get('div').contains('newProject').click()
    
        //Click the Integrations button
        cy.get("button").contains('Integrations').should('be.enabled').click()
        
        //Click the add button on an integration item.
        let IntegrationCards = ".css-1fkeqk1"
        cy.contains(`${IntegrationCards}`, 'Moralis').should('exist').within(() => {
            cy.get('button[aria-label="add key"]').click();
        });

        //Verify that the modal appears with input boxes for Name and Key, and close and create buttons.
        cy.get('div h2').contains('Configure Moralis').should('exist')
        
        //Click create
        cy.get('button').contains('Create').click()

        //Verify error message
        cy.get('div').contains("name is a required field").should('exist').and('be.visible')
        cy.get('div').contains("apiKey is a required field").should('exist').and('be.visible')

        //Click the close button
        cy.get('.css-10ygcul').click()
    })
})