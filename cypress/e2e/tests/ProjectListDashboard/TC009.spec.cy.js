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
        
        const projectNames = [  'testProject1', 'testProject2', 'testProject3', 'testProject4', 'testProject5' ];
        projectNames.forEach((projectName) => {
            //Click the sorting button of the 'Created At' column
            
            cy.wait(1000)
            cy.get('div').contains('Created At').click()
            cy.wait(1000)
            cy.get('div').contains(projectName).click();
            cy.wait(1000)
            cy.get('div span').contains('Delete project').click()
            cy.wait(1000)
            cy.get('#confirmProjectName').type(projectName);
            cy.wait(1000)
            cy.get('button').contains('Delete').click()
            cy.wait(1000)
        });
        
        cy.Logout()
        })
    
    it("TC009 - Verify the dense project list feature", () => {
        
        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')
       
        const projectNames = ['testProject1', 'testProject2', 'testProject3', 'testProject4', 'testProject5' ];

        projectNames.forEach((projectName) => {
            cy.get('button').contains('New Project').click();
            cy.get('#projectName').type(projectName);
            cy.get('button').contains('Create').click();
          });

          //Click dense button
          cy.get('span').contains('Dense').should('exist').click()
          //Verify space between project items has collapsed	
          cy.get("tbody tr td").each(($cell) => {
            cy.wrap($cell).should("have.class", "MuiTableCell-sizeSmall");
          });
    })
})