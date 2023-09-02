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
        
        const projectNames = [  'testProject28', 'testProject27', 'testProject26', 'testProject25', 'testProject24', 'testProject23', 'testProject22',
        'testProject21', 'testProject20', 'testProject19', 'testProject18', 'testProject17', 'testProject16', 'testProject15', 'testProject14',
        'testProject13', 'testProject12', 'testProject11', 'testProject10', 'testProject9', 'testProject8','testProject7',
        'testProject6', 'testProject5', 'testProject4', 'testProject3', 'testProject2', 'testProject1' ];
        projectNames.forEach((projectName) => {
            //Click the sorting button of the 'Created At' column
            cy.wait(500)
            cy.get('div').contains(projectName).click();
            cy.wait(500)
            cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root').click();
            cy.wait(500)
            cy.get('#confirmProjectName').type(projectName);
            cy.wait(500)
            cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
            cy.wait(500)
        });

        cy.Logout()
        })
    
    it.skip("TC008 - Verify project list search feature", () => {
        
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

        //Type test in search bar
        cy.get('.css-1l2agqa').type('test')

        // set to 25
        cy.get('.css-x23ptm').click()
        cy.get('li.css-11x8hys[data-value=25]').click()

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Type testProject in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('testProject')

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Type testProject13 in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('testProject13')

        //Verify number of items displayed in the list is 1.	
        cy.get("table tbody tr").should("have.length", 2); //+1 for the hidden tr ccontaining the no project text

        //Type testProject in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('Project')

        //Verify number of items displayed in the list is 25.	
        cy.get("table tbody tr").should("have.length", 26); //+1 for the hidden tr ccontaining the no project text

        //Type testProject13 in search bar
        cy.get('.css-1l2agqa').clear()
        cy.get('.css-1l2agqa').type('dummy')

        //Verify number of items displayed in the list is 0.	
        cy.get("table tbody tr").should("have.length", 1); //+1 for the hidden tr ccontaining the no project text
        cy.get('.css-1l2agqa').clear()
    })
})