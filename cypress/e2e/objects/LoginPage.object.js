class LoginPage {
    // Selectors
    constructor() {
        this.txtEmail = "input[name='email']";
        this.txtPword = "input[name='password']";
        this.btnSubmit = "button[type='submit']";
    }

    // Methods
    visit(paramObj = {}) {
        cy.viewport(1920, 1080);
        cy.visit("auth/login", paramObj);
        cy.window().then(($win) => {
            if ($win.document.URL === "https://dashboard-test.uniblock.dev/dashboard/projects/list") {
                cy.Logout().then(() => {
                    cy.viewport(1200, 720);
                    cy.visit("auth/login");
                })
            }
        })
        return cy;
    }

    setEmail(email) {
        cy.get(this.txtEmail).clear();
        cy.get(this.txtEmail).type(email);
        return cy;
    }
    setPassword(password) {
        cy.get(this.txtPword).clear();
        cy.get(this.txtPword).type(password);
        return cy;
    }
    clickLoginButton() {
        cy.get(this.btnSubmit).click();
        return cy;
    }
}

export default LoginPage;