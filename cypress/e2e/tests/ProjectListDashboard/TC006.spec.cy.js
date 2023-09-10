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
            cy.title().should('eq', 'Projects: List | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
        cy.wait(1000)
        cy.get('div').contains('testProject').click()
        cy.get('div span').contains('Delete project').click()
        cy.get('#confirmProjectName').type('testProject')
        cy.get('button').contains('Delete').click()
        cy.Logout()
        })
    
    it("TC006 - Verify feature to view detailed information about a specific project", () => {
        const projectName = "testProject"
        //Click the New Project Button
        cy.get('button').contains('New Project').click()

        //Input projectName in the text field	
        cy.get('#projectName').type(`${projectName}`)
        
        //Click create	
        cy.get('button').contains('Create').click()
        
        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')

        cy.get("table").within(() => {
            //Check the data in the first row
            cy.get("tbody tr").eq(0).within(() => {
                cy.get("td").eq(0).should("contain", `${projectName}`); // Check Project Name
            });
    
        });
        
        //Click the project item
        cy.get("table").within(() => {
            cy.get("tbody").within(() => {
              cy.get("tr").eq(0).should("contain", `${projectName}`).click();
            });
        });

        //Verify if page was navigated to URL containing 
        cy.url().should('include', '/projects/overview')
        
        //Verify if page contains the project name
        cy.get('div h4').contains(`Project Overview · ${projectName}`).should('exist').and('be.visible')
    })
})