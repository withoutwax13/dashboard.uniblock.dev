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
            cy.title().should('eq', 'Home | Uniblock Dashboard').should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
        cy.get('div').contains('testProject').click()
        cy.get('.css-wvtjil').contains('Delete').click()
        cy.get('#confirmProjectName').type('testProject')
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        cy.Logout()
        })
    
    it("TC006 - Verify feature to view detailed information about a specific project", () => {
       
        //Click the New Project Button
        cy.get('.css-1p02q7g').click()

        //Input projectName in the text field	
        cy.get('#projectName').type("testProject")
        
        //Click create	
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')

        cy.get("table").within(() => {
            //Check the data in the first row
            cy.get("tbody tr").eq(0).within(() => {
                cy.get("td").eq(0).should("contain", "testProject"); // Check Project Name
            });
    
        });
        
        //Click the project item
        cy.get("table").within(() => {
            cy.get("tbody").within(() => {
              cy.get("tr").eq(0).should("contain", "testProject").click();
            });
        });

        //Verify if page was navigated to URL containing 
        cy.url().should('include', '/projects/overview')
        
        //Verify if page contains the project name
        cy.get('div').contains('Project Overview testProject').should('exist').and('be.visible')
    })
})