class LoginPage {
  
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content-text'), 
        requiredMessage: () => cy.get('.oxd-input-field-error-message'),
        forgotPasswordLink: () => cy.get('.orangehrm-login-forgot')
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }


    login(username, password) {
        if (username !== '') {
            this.elements.usernameInput().type(username);
        }
        if (password !== '') {
            this.elements.passwordInput().type(password);
        }
        this.elements.loginBtn().click();
    }

    clickForgotPassword() {
        this.elements.forgotPasswordLink().click();
    }


    verifyDashboardUrl() {
        cy.url().should('include', '/dashboard');
    }

    verifyErrorMessage(expectedMessage) {
        this.elements.errorMessage().should('contain', expectedMessage);
    }

    verifyRequiredMessage(expectedMessage) {
        this.elements.requiredMessage().should('contain', expectedMessage);
    }

    verifyForgotPasswordUrl() {
        cy.url().should('include', '/requestPasswordResetCode');
    }
}

export default new LoginPage();