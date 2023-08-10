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

        //Project 1
        cy.get('div').contains('testProject1').click()
        cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get('#confirmProjectName').type('testProject1')
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        
        //2
        cy.get('div').contains('testProject2').click()
        cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get('#confirmProjectName').type('testProject2')
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        //Project 3
        cy.get('div').contains('testProject3').click()
        cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get('#confirmProjectName').type('testProject3')
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        //Project 4
        cy.get('div').contains('testProject4').click()
        cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get('#confirmProjectName').type('testProject4')
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        //Project 5
        cy.get('div').contains('testProject5').click()
        cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get('#confirmProjectName').type('testProject5')
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        cy.Logout()
        
        })
    
    it("TC003 - Verify the project list sorting functionality", () => {
        //Verify that the project shows expected message
        cy.get('p').contains('Welcome to Uniblock').should('be.visible')

        //Click the New Project Button
        cy.get('.MuiStack-root > button.MuiButtonBase-root').click()

        //Input projectName in the text field	
        cy.get('#projectName').type("testProject1")
        
        //Click create	
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')

        //Create 2nd project
        //Input projectName in the text field
        cy.get('.css-6su6fj > .MuiButtonBase-root').click()	
        cy.get('#projectName').type("testProject2")
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Create 3rd project
        //Input projectName in the text field
        cy.get('.css-6su6fj > .MuiButtonBase-root').click()	
        cy.get('#projectName').type("testProject3")
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Create 4th project
        //Input projectName in the text field
        cy.get('.css-6su6fj > .MuiButtonBase-root').click()	
        cy.get('#projectName').type("testProject4")
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
        
        //Create 5th project
        //Input projectName in the text field
        cy.get('.css-6su6fj > .MuiButtonBase-root').click()	
        cy.get('#projectName').type("testProject5")
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

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