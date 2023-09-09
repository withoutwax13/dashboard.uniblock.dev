import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify adding new project item feature", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+4@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            
        })
    })
    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
        })
    
    it("TC0015 - Verify that the modal can be closed by clicking outside the modal or pressing the 'Esc' key without saving the project.", () => {

        //Click New Project Button
        cy.get('button').contains("New Project").should('exist').click()

        //Check if modal appears
        cy.get('div h2').contains('New project').should('exist')
        
        //Input projectName on the input text field		
        cy.get('#projectName').type("testData")

        //Press Esc key
        cy.get('#projectName').type('{esc}');

        //Input projectName in the search input field	
        cy.get('input[placeholder="Search..."').type('testData')
        
        //Verify 0 item has been displayed	
        cy.get('table tbody') 
            .find('tr')
            .should('have.length', 1) // 1 for the default; 

    })
})