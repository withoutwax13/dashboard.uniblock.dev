import LoginPage from "../../objects/LoginPage.object"

describe("Scenario:Verify invite collaborator feature	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            LoginPageObject.setEmail(data.LoginPage.validCredentials.email)
            cy.get("input[name='email']").type('+3.2@gmail.com')
            LoginPageObject.setPassword(data.LoginPage.validCredentials.password)
            LoginPageObject.clickLoginButton();
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    })
    afterEach(()=>{
        // Post-Condition: 
        //Logout
        cy.Logout()
        })
    
    it.skip("TC016 - Verify delete button usability for non-admin or non-owner users", () => {
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()
        
        //Locate the Users then click
        cy.get("a").contains('Users').should('exist').click()

        //Verify the expectedURL
        cy.url().should('include', '/dashboard/projects/users/')

        //Verify that the collaborator list component on the page contains the ownerEmail
        cy.get("table thead tr th").contains("Email").should('exist')
        
        //Check the Invite button.
        cy.get("button").contains('Invite').should('exist').and('be.disabled')

        //Click the edit button associated and should be disabled	
        cy.get('table tbody tr').eq(0) // Select the 1st row (index 1)
        .find('td').eq(2).find('button').should('exist').and('be.disabled') 

        //Click the delete button associated and should be disabled	
        cy.get('table tbody tr').eq(0) // Select the 1st row (index 1)
        .find('td').eq(3).find('button').should('exist').and('be.disabled') 
    })
})