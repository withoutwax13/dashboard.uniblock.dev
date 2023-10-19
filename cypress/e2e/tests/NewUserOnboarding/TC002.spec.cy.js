import LoginPage from "../../objects/LoginPage.object"

describe("Scenario: Verify invite collaborator feature	", () => {
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        cy.viewport(1920, 1080);
        //Visit the expected URL
        cy.visit('/auth/login')
        
        //Locate input field for the email and Type in the field the testEmail	
        cy.get("input[name='email']").should('exist').and('be.visible');
        cy.get("input[name='email']").clear();
        cy.get("input[name='email']").type("joemawmu+1st.new@gmail.com");

        //Locate input field for the password and Type in the field the testPassword	
        cy.get("input[name='password']").should('exist').and('be.visible');
        cy.get("input[name='password']").clear();
        cy.get("input[name='password']").type("Password123#");

        //Click the button
        cy.get('button').contains('Login').click();
        cy.wait(2000)

        //Brute force visit the link for now
        cy.visit('/dashboard/new-user-home');
    })
    afterEach(()=>{
          
        //Logout
        cy.Logout()
        })
    
    it("TC002 - Verify all the new user onboarding feature", () => {
        let expectedTitle = "Get Started | Uniblock Dashboard";				
        let testProjectName = "testProject";
        let testEmail = "joemawmu+3rd.new@gmail.com";
        
        //Verify url to contain expectedUrl2
        cy.url().should('contain', '/dashboard/new-user-home');
        
        //Verify the title of the page to be the expectedTitle
        cy.title().should('eq', expectedTitle);

        //Verify that the form that contains "Project Details" exists and visible
        cy.get('div span').contains('Project Details').should('exist').and('be.visible')

        //Verify input field for project name to exist and is visible
        cy.get('#projectName').should('exist').and('be.visible');

        //Locate the Create Project Button and verify if clickable	
        cy.get('button').contains('Create Project').should('exist').and('be.visible');

        //Click the Create Project Button 	
        cy.get('button').contains('Create Project').click();

        //Error message shows "Required field"
        cy.get('div').contains('Required field').should('exist')

        //Locate the Next button and verify that its disabled	
        cy.get('button.css-1cihjvc').contains('Next').should('be.visible').and('have.attr', 'disabled', 'disabled')
        
        //Type in the input field the testProjectName	
        cy.get('#projectName').type(testProjectName);

        //Click the Create Project Button 	
        cy.get('button').contains('Create Project').click();

        //Verify that confirmation div that contains "Click "Next" to continue" exists and visible 	
        cy.get('div').contains('Click "Next" to continue').should('be.visible')

        //Verify Next button to be clickable	
        cy.get('button.css-1cihjvc').contains('Next').should('exist').and('not.have.attr', 'disabled');

        //Click the Next Button	
        cy.get('button.css-1cihjvc').contains('Next').click()

        //Verify that the form contains "Invite User" exists and visible
        cy.get('div').contains('Invite User').should('exist')
        
        //Verify that there is an input field for email address 	
        cy.get('#newUserEmail').should('exist').and('be.visible')

        //Locate the button for Add user
        cy.get('button').contains('Add User').should('exist')

        //Click the button for Add User	
        cy.get('button').contains('Add User').click()

        //Error message shows "Email is require"
        cy.get('div').contains('Email is required').should('be.visible');
        
        //Type the testEmail in the input field	
        cy.get('#newUserEmail').type(testEmail);

        //Click the button for Add User	
        cy.get('button').contains('Add User').click()

        //Locate the email table 	
        cy.get('table thead').contains('Email').should('exist');

        //Verify that the testEmail is in the table		
        cy.get('table tbody tr').contains(testEmail).should('exist')

        //Click the Next Button	
        cy.get('button.css-1cihjvc').contains('Next').click()

        //Verify that the Provider Integration div exists	
        cy.get('div').contains('Provider Integrations').should('exist').and('be.visible');

        //Verify that there are diferent providers suggested in blockchain part	
        cy.get('div h6').contains('Blockchain').should('exist')
            .parent()
            .find('div').should('have.length.at.least', 7);
        
        //Verify that there are different choices in Market area	
        cy.get('div h6').contains('Market').should('exist')
            .parent()
            .find('div').should('have.length.at.least', 4);

        //Verify Moralis option to exist	
        cy.get('div').contains('Moralis').should('exist');

        //Click the Moralis option in blockchain	
        cy.get('div.css-1aubfh6').contains('Moralis').click();

        //Verify that confirmation div that contains "Click "Next" to continue" exists and visible 	
        cy.get('div').contains('Click "Next" to continue').should('be.visible')

        //Click the Next Button	
        cy.get('button.css-1cihjvc').contains('Next').click()

        //Verify that the Try Unified API Endpoints div exists	
        cy.get('div').contains('Try Unified API').should('exist')

        //Click the Next Button	
        cy.get('button.css-1cihjvc').contains('Next').click()

        //Verify that the All Providers div exists	
        cy.get('div').contains('All Providers').should('exist')

        //Locate the Finish button
        cy.get('button').contains('Finish').should('exist')
        
        //Click the Finish button	
        cy.get('button').contains('Finish').click()

        //Verify that the url contains '/project/overview'	
        cy.url().should('contain', '/project/overview')
    })
})