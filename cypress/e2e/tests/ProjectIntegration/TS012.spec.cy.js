import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project integration page	", () => {
    var LoginPageObject = new LoginPage()
    let moraliskey = 'CFIqYOUXPOqNiDIsATAStH06jsHQep4CC3Q3QQQ2Xjp244kS5kh0v44eOuyLUrrL';

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
    
    it("TC012 - Verify Close Button in Add Modal", () => {

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

        //Click the close button
        cy.get('.css-10ygcul').click()
    })
})