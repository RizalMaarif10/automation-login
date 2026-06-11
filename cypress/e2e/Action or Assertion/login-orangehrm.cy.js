describe('OrangeHRM Login Automation', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC01 - "Pengguna Melakukan Login dengan username & password yang Valid"', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button[type="submit"]', 'Login').click();

    cy.url().should('include', '/dashboard');
  });

  it('TC02 - "Pengguna Login dengan Username & password yang tidak valid"', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.contains('button[type="submit"]', 'Login').click();

    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC03 - "Pengguna melakukan input username tanpa melakukan input password"', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.contains('button[type="submit"]', 'Login').click();

    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC04 - Pengguna melakukan input password tanpa melakukan input username ', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button[type="submit"]', 'Login').click();

    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC05 - Pengguna melakukan input username dan password dengan huruf besar kecil yang salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123'); 
    cy.contains('button[type="submit"]', 'Login').click();

    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

});