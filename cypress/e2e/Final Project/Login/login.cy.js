import loginPage from '../../../support/pages/LoginPage';

describe('Automation OrangeHRM - Fitur Login ', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC01 - Sukses Login Menggunakan Akun Valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSukses');
    
    loginPage.login('Admin', 'admin123');
    
    cy.wait('@loginSukses');
    loginPage.verifyDashboardUrl();
  });

  it('TC02 - Gagal Login karena Username Salah', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('pesanError');
    
    loginPage.login('SalahUsername', 'admin123');
    
    cy.wait('@pesanError');
    loginPage.verifyErrorMessage('Invalid credentials');
  });

  it('TC03 - Gagal Login karena Password Salah', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('pesanError');
    
    loginPage.login('Admin', 'salahpassword');
    
    cy.wait('@pesanError');
    loginPage.verifyErrorMessage('Invalid credentials');
  });

  it('TC04 - Gagal Login karena Username dan Password Salah', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('pesanError');
    
    loginPage.login('SalahUsername', 'salahpassword');
    
    cy.wait('@pesanError');
    loginPage.verifyErrorMessage('Invalid credentials');
  });

  it('TC05 - Gagal Login karena Mengosongkan Username', () => {
    loginPage.login('', 'admin123');
    loginPage.verifyRequiredMessage('Required');
  });

  it('TC06 - Gagal Login karena Mengosongkan Password', () => {
    loginPage.login('Admin', '');
    
    loginPage.verifyRequiredMessage('Required');
  });

  it('TC07 - Gagal Login karena Mengosongkan Semua Kolom', () => {
    loginPage.login('', '');
    loginPage.verifyRequiredMessage('Required');
    cy.get('.oxd-input-field-error-message').should('have.length', 2);
  });

  it('TC08 - Sukses Mengakses Halaman Lupa Password', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('halamanReset');
    loginPage.clickForgotPassword();
    cy.wait('@halamanReset');
    loginPage.verifyForgotPasswordUrl();
  });

});