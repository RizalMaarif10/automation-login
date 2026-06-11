describe('Quiz 3 - OrangeHRM Login Intercepts', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC01 - melakukan login dengan akun valid (Intercept URL Validasi Login)', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSukses');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSukses');
    cy.url().should('include', '/dashboard');
  });

  it('TC02 - login menggunakan akun tidak valid (Intercept URL Pesan error)', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('pesanError');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();

    cy.wait('@pesanError');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC03 - melakukan forgot password (Intercept URL Navigasi Reset Password)', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('lupaPassword');
    cy.get('.orangehrm-login-forgot-header').click();
    cy.wait('@lupaPassword');
    cy.url().should('include', '/requestPasswordResetCode');
  });

  it('TC04 - Mocking 500 Server Error (Validasi Lain - Manipulasi 500)', () => {
    cy.intercept('POST', '**/auth/validate', { statusCode: 500 }).as('serverDown');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@serverDown');
  });

  it('TC05 - Login Data Benar Tapi Akses Ditolak Server', () => {
    cy.intercept('POST', '**/auth/validate', { statusCode: 401 }).as('aksesDitolak');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@aksesDitolak');
  });

});