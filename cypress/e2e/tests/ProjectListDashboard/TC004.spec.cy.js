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
            cy.title().should('not.eq', data.LoginPage.title)
        })
    
    })
    afterEach(()=>{
    
        cy.Logout()
        
        })
    
    it("TC004 - Verify the project list sorting functionality", () => {
        /*//Click New Project Button
        cy.get('.css-1p02q7g').click()

        //Input projectName in the text field	
        cy.get('#projectName').type("testProject1")
        
        //Click create	
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()*/

        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')

        //Create 2 to 5 project
        const projectNames = ['testProject1', 'testProject2', 'testProject3', 'testProject4', 'testProject5' ];

        projectNames.forEach((projectName) => {
            cy.wait(1000)
            cy.get('.css-1p02q7g').click()
            cy.wait(1000)
            cy.get('#projectName').type(projectName);
            cy.wait(1000)
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
            cy.wait(1000)
          });


        //Verify if the list has 5 projects
        cy.get("table tbody tr").should("have.length", 5);

        //Verify if top item in the list matches projectName[4]	
        cy.get("table").within(() => {

            //Check the data in the first row
            cy.get("tbody tr").eq(0).within(() => {
                cy.get("td").eq(0).should("contain", "testProject5"); // Check Project Name
            });
        
        });

        //Click the sorting button of the 'Created At' column
        cy.get('div').contains('Created At').click()

        //Verify if top item in the list matches projectName[0]	
        cy.get("table").within(() => {

            //Check the data in the first row
            cy.get("tbody tr").eq(0).within(() => {
                cy.get("td").eq(0).should("contain", "testProject1"); // Check Project Name
            });
        
        });

        //Verify that the projects are rearranged according to the sorting criteria	
        cy.get("table").within(() => {
            cy.get("tbody").within(() => {
              cy.get("tr").eq(0).should("contain", "testProject1");
              cy.get("tr").eq(1).should("contain", "testProject2");
              cy.get("tr").eq(2).should("contain", "testProject3");
              cy.get("tr").eq(3).should("contain", "testProject4");
              cy.get("tr").eq(4).should("contain", "testProject5");
            });
          });
    })
})