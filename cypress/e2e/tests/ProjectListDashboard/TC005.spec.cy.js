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
        // Post-Condition: Delete and Logout
        const projectNames = [  'testProject5', 'testProject4', 'testProject3', 'testProject2', 'testProject1' ];
        
        projectNames.forEach((projectName) => {
            //Click the sorting button of the 'Created At' column
            cy.wait(500)
            cy.get('div').contains(projectName).click();
            cy.wait(500)
            cy.get('.css-wvtjil').contains('Delete').click()
            cy.wait(500)
            cy.get('#confirmProjectName').type(projectName);
            cy.wait(500)
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
            cy.wait(500)
        });

        cy.Logout()
        
        })
    
    it("TC005 - Verify that the project list dashboard correctly filters projects based on specified criteria.", () => {
         //Verify Url 
         cy.url().should('include', '/projects/list')

        //Verify if the list has 5 projects
        cy.get("table tbody tr").should("have.length", 6); //+1 for the default

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
        //Verify list displays only projects with selected filter	
        cy.xpath("//div[contains(@class,'MuiSelect-select MuiSelect-outlined')]").click()
        cy.get('li').contains('FREE').click()

        //Verify if the list has 5 projects
        cy.get("table tbody tr").should("have.length", 6); //+1 for the hidden tr ccontaining the no project text

        //Select PRO	
        cy.xpath("//div[contains(@class,'MuiSelect-select MuiSelect-outlined')]").click()
        cy.get('li').contains('PRO').click()

        //Verify if the list has 0 projects
        cy.get("table tbody tr").should("have.length", 1); //1 for the default containing the no project text

        //Select Enter	
        cy.xpath("//div[contains(@class,'MuiSelect-select MuiSelect-outlined')]").click()
        cy.get('li').contains('ENTER').click()

        //Verify if the list has 0 projects
        cy.get("table tbody tr").should("have.length", 1); //1 for the default containing the no project text

        //Verify list displays only projects with selected filter	
        cy.xpath("//div[contains(@class,'MuiSelect-select MuiSelect-outlined')]").click()
        cy.get('[data-value="all"]').click()
    })
})