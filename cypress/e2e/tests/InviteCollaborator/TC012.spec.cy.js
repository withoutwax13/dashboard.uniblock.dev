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
            
        })
    })
    afterEach(()=>{
        // Post-Condition: 
        //Logout
        cy.Logout()
        })
    
    it("TC012 - Verify editing collaborator role by user (restricted)", () => {
        
        //Check if there is a project then click
        cy.get("table tbody tr td").contains("testProject").should('exist').click()
        
        //Locate the Users then click
        cy.get("a").contains('Users').should('exist').click()

        //Verify the expectedURL
        cy.url().should('include', '/dashboard/projects/users/')

        //Verify that the collaborator list component on the page contains the ownerEmail
        cy.get("table thead tr th").contains("Email").should('exist')
        
        //Check the Invite button.
        cy.get(".css-1p02q7g").should('exist').and('be.disabled')

        //Check the delete and edit button if disavled
        cy.get(".css-10ygcul").should('exist').and('be.disabled')

    })
})