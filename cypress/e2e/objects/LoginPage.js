class LoginPage {
    //Selectors
    txtEmail="input[name='email']";
    txtPword="input[name='password']";
    btnSubmit="button[type='submit']"
    
    //Methods
    visit(){
         return cy.visit("https://dashboard.uniblock.dev/auth/login")
    }

    setEmail(email)
    {
        cy.get(this.txtEmail).clear()
        cy.get(this.txtEmail).type(email)
    }
    setPassword(password)
    {
        cy.get(this.txtPword).clear()
        cy.get(this.txtPword).type(password)
    }
    clickLoginButton(){
        cy.get(this.btnSubmit).click()
    }
}

export default LoginPage;