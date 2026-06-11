// Menggunakan './loginpage' karena kedua file berada di folder yang sama
import loginpage from './loginpage';

describe('OrangeHRM Login with POM & Intercept', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    loginpage.visit();
  });

  it('TC01 - login menggunakan akun valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSukses');

    loginpage.inputUsername('Admin');
    loginpage.inputPassword('admin123');
    loginpage.clickLogin();

    cy.wait('@loginSukses');
    loginpage.verifyDashboardUrl(); 
  });

  it('TC02 - login menggunakan akun tidak valid', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('pesanError');

    loginpage.inputUsername('Admin');
    loginpage.inputPassword('salah123');
    loginpage.clickLogin();

    cy.wait('@pesanError');
    loginpage.verifyErrorMessage('Invalid credentials'); 
  });

  it('TC03 - melakukan forgot password', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('lupaPassword');

    loginpage.clickForgotPassword();

    cy.wait('@lupaPassword');
    loginpage.verifyForgotPasswordUrl();
  });

  it('TC04 - Mocking 500 Server Error', () => {
    cy.intercept('POST', '**/auth/validate', { statusCode: 500 }).as('serverDown');

    loginpage.inputUsername('Admin');
    loginpage.inputPassword('admin123');
    loginpage.clickLogin();

    cy.wait('@serverDown');
  });

  it('TC05 - Mocking 401 Unauthorized ', () => {
    cy.intercept('POST', '**/auth/validate', { statusCode: 401 }).as('aksesDitolak');

    loginpage.inputUsername('Admin');
    loginpage.inputPassword('admin123');
    loginpage.clickLogin();

    cy.wait('@aksesDitolak');
  });

});