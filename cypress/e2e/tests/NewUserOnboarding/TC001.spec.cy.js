
describe("Scenario: Verify new user onboarding feature", () => {

    beforeEach(()=>{
        
    })
    afterEach(()=>{
        
        //Logout
        cy.Logout()
    })
    
    it("TC001 - Login using newly registered account", () => {
        cy.viewport(1920, 1080);
        //Visit the expected URL
        cy.visit('https://dashboard-test.uniblock.dev/auth/login')
        
        //Locate input field for the email and Type in the field the testEmail	
        cy.get("input[name='email']").should('exist').and('be.visible');
        cy.get("input[name='email']").clear();
        cy.get("input[name='email']").type("joemawmu+1st.new@gmail.com");

        //Locate input field for the password and Type in the field the testPassword	
        cy.get("input[name='password']").should('exist').and('be.visible');
        cy.get("input[name='password']").clear();
        cy.get("input[name='password']").type("Password123#");

        //Verify login button to exist and clickable
        cy.get('button').contains('Login').should('exist').and('not.have.attr', 'disabled');

        //Click the button
        cy.get('button').contains('Login').click();
        cy.wait(1000)

        //Brute force visit the link for now
        cy.visit('/dashboard/new-user-home');

        //Verify url to contain expectedUrl2
        cy.url().should('contain', '/dashboard/new-user-home');
        

    })
})