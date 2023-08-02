class SignupPage {
    //Selectors
    txtEmail="input[name='email']";
    txtPword="input[name='password']";
    txtconfirmPword="input[name='confirmPassword']";
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
    setConfirmPassword(confirmPassword)
    {
        cy.get(this.txtconfirmPword).clear()
        cy.get(this.txtconfirmPword).type(confirmPassword)
    }
    clickSignupButton(){
        cy.get(this.btnSubmit).click()
    }
}

export default SignupPage;