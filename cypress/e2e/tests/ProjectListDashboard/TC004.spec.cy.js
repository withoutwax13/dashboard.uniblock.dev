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
    
        cy.Logout()
        
        })
    
    it("TC004 - Verify the project list sorting functionality", () => {

        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')

        //Create 1 to 5 project
        const projectNames = ['testProject1', 'testProject2', 'testProject3', 'testProject4', 'testProject5' ];

        projectNames.forEach((projectName) => {
            cy.wait(1000)
            //Click the new project  button
            cy.get('button').contains('New Project').click()
            cy.wait(1000)
            //Type the project name from array
            cy.get('#projectName').type(projectName);
            cy.wait(1000)
            //Click the Create button
            cy.get('button').contains('Create').click()
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