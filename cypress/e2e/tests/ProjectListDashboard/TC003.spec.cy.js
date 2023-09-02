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
        // Post-Condition: Delete the test project thenLogout
        cy.get('div').contains('testProject').click()
        cy.wait(500)
        cy.get('.css-wvtjil').contains('Delete').click()
        cy.wait(500)
        cy.get('#confirmProjectName').type('testProject')
        cy.wait(500)
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        cy.Logout()
        })
    
    it("TC003 - Check if the dashboard displays the correct projects with their relevant details.", () => {
        
        //Verify if page displays projectName under name column	
        cy.url().should('eq', 'https://dashboard-test.uniblock.dev/dashboard/projects/list')
        //Verify if page displays projectName under name column
        cy.get("table").within(() => {

        //For date checking 
        const currentDate = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        const year = currentDate.getFullYear();
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
    
            //Check the data in the first row
            cy.get("tbody tr").eq(0).within(() => {
                cy.get("td").eq(0).should("contain", "testProject"); // Check Project Name
                cy.get("td").eq(1).should("contain", `${month} ${day}, ${year}`); // Check Date Created At
                cy.get("td").eq(2).should("contain", "FREE"); // Check Tier
            });
        
        });
    })
})