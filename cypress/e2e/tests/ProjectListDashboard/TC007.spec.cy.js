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
        
        const projectNames = [  'testProject1', 'testProject2', 'testProject3', 'testProject4', 'testProject5', 'testProject6', 'testProject7',
        'testProject8', 'testProject9', 'testProject10', 'testProject11', 'testProject12', 'testProject13', 'testProject14', 'testProject15',
        'testProject16', 'testProject17', 'testProject18', 'testProject19', 'testProject20', 'testProject21','testProject22',
        'testProject23', 'testProject24', 'testProject25', 'testProject26', 'testProject27', 'testProject28' ];
        projectNames.forEach((projectName) => {
            //Click the sorting button of the 'Created At' column
            cy.get('div').contains('Created At').click({ timeout: 5000 })
            cy.get('div').contains(projectName).click({ timeout: 5000 });
            cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click({ timeout: 5000 });
            cy.get('#confirmProjectName').type(projectName);
            cy.wait(500)
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click({ timeout: 5000 });
        });

        cy.Logout()
        })
    
    it("TC007 - Verify pagination feature", () => {
        
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
       
        const projectNames = ['testProject2', 'testProject3', 'testProject4', 'testProject5', 'testProject6', 'testProject7',
        'testProject8', 'testProject9', 'testProject10', 'testProject11', 'testProject12', 'testProject13', 'testProject14', 'testProject15',
        'testProject16', 'testProject17', 'testProject18', 'testProject19', 'testProject20', 'testProject21', 'testProject22',
        'testProject23', 'testProject24', 'testProject25', 'testProject26', 'testProject27', 'testProject28' ];

        projectNames.forEach((projectName) => {
            cy.get('.css-6su6fj > .MuiButtonBase-root').click();
            cy.get('#projectName').type(projectName);
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
          });

        //Check if set to 5
        cy.get('.css-x23ptm').should('contain', 5)

        //Verify next page button is enabled then click
        cy.get('button[type="button"][aria-label="Go to next page"]').should('exist').and('be.enabled').click()

        //Verify previous page button is enabled.
        cy.get('button[type="button"][aria-label="Go to previous page"]').should('exist').and('be.enabled').click()	

        // set to 10
        cy.get('.css-x23ptm').click()
        cy.get('li.css-11x8hys[data-value=10]').click()

        //Verify number of items displayed in the list is 10.	
        cy.get("table tbody tr").should("have.length", 11); //+1 for the hidden tr ccontaining the no project text

        //Verify next page button is enabled then click
        cy.get('button[type="button"][aria-label="Go to next page"]').should('exist').and('be.enabled').click()

        //Verify previous page button is enabled.
        cy.get('button[type="button"][aria-label="Go to previous page"]').should('exist').and('be.enabled').click()	
        
        // set to 25
        cy.get('.css-x23ptm').click()
        cy.get('li.css-11x8hys[data-value=25]').click()

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Verify next page button is enabled then click
        cy.get('button[type="button"][aria-label="Go to next page"]').should('exist').and('be.enabled').click()

        //Verify previous page button is enabled.
        cy.get('button[type="button"][aria-label="Go to previous page"]').should('exist').and('be.enabled').click()	
    
    })
})