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
            
            cy.wait(2000)
            cy.get('div').contains('Created At').click()
            cy.wait(2000)
            cy.get('div').contains(projectName).click();
            cy.wait(2000)
            cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click();
            cy.wait(2000)
            cy.get('#confirmProjectName').type(projectName);
            cy.wait(2000)
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
            cy.wait(2000)
        });
        
        cy.Logout()
        })
    
    it("TC009 - Verify the dense project list feature", () => {
        
        //Verify that the project shows expected message
        //Click the New Project Button
        cy.get('p').contains('Welcome to Uniblock').should('be.visible')
        cy.get('.MuiStack-root > button.MuiButtonBase-root').click()

        //Input projectName in the text field
        //Click create
        cy.get('#projectName').type("testProject1")
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click()

        //Verify the url it should include /project/list	
        cy.url().should('include', '/projects/list')
       
        const projectNames = ['testProject2', 'testProject3', 'testProject4', 'testProject5' ];

        projectNames.forEach((projectName) => {
            cy.get('.css-6su6fj > .MuiButtonBase-root').click();
            cy.get('#projectName').type(projectName);
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
          });

          //Click dense button
          cy.get('.css-sqkpig').should('exist').click()
          //Verify space between project items has collapsed	
          cy.get(".MuiTableCell-root").each(($cell) => {
            cy.wrap($cell).should("have.class", "MuiTableCell-sizeSmall");
          });
    })
})