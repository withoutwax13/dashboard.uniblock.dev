import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify project list dashboard", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+2@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            //cy.title().should('eq', 'Home | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
          
        cy.Logout()
        })
    
    it("TC008 - Verify project list search feature", () => {
        //Verify Url 
        cy.url().should('include', '/projects/list')

        //Type test in search bar
        cy.get('.css-1l2agqa').type('test')

        // set to 25
        cy.get('.css-x23ptm').click()
        cy.get('li.css-11x8hys[data-value=25]').click()

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Type testProject in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('testProject')

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Type testProject13 in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('testProject13')

        //Verify number of items displayed in the list is 1.	
        cy.get("table tbody tr").should("have.length", 2); //+1 for the hidden tr ccontaining the no project text

        //Type testProject in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('Project')

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Type testProject13 in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('dummy')

        //Verify number of items displayed in the list is 0.	
        cy.get("table tbody tr").should("have.length", 1); //+1 for the hidden tr ccontaining the no project text
        cy.get('.css-1l2agqa').clear()
        cy.wait(500)
    })
})