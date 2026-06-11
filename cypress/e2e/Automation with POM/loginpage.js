class LoginPage {

    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
        forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
        errorMessage: () => cy.get('.oxd-alert-content-text')
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    inputUsername(username) {
        this.elements.usernameInput().type(username);
    }

    inputPassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickLogin() {
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

    verifyForgotPasswordUrl() {
        cy.url().should('include', '/requestPasswordResetCode');
    }
}

export default new LoginPage();