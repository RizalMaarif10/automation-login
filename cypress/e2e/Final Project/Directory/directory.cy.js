import loginPage from '../../../support/pages/loginpage';
import directoryPage from '../../../support/pages/directorypage';

describe('Automation OrangeHRM - Menu Directory ', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => { loginPage.visit();
    cy.intercept('POST', '**/auth/validate').as('loginSukses');
    loginPage.login('Admin', 'admin123'); cy.wait('@loginSukses');
    cy.intercept('GET', '**/directory/employees**').as('loadDirectory');
    directoryPage.navigateToDirectory();
    cy.wait('@loadDirectory');
  });

  it('TC01 - Sukses Mengakses Halaman Directory', () => {
    directoryPage.verifyDirectoryUrl();
  });

  it('TC02 - Mencari Karyawan Berdasarkan Nama Valid', () => {
    cy.intercept('GET', '**/directory/employees**').as('searchNama');
    
    directoryPage.searchByEmployeeName('Peter');
    directoryPage.clickSearch();
    
    cy.wait('@searchNama');
    directoryPage.verifyCardIsDisplayed();
  });

  it('TC03 - Mencari Karyawan Berdasarkan Job Title (Jabatan)', () => {
    cy.intercept('GET', '**/directory/employees**').as('searchJabatan');

    directoryPage.selectJobTitle('HR Manager'); 
    directoryPage.clickSearch();
    
    cy.wait('@searchJabatan');
    directoryPage.verifyCardIsDisplayed();
  });

  it('TC04 - Mencari Karyawan Berdasarkan Lokasi (Location)', () => {
    cy.intercept('GET', '**/directory/employees**').as('searchLokasi');
    
    directoryPage.selectLocation('Texas R&D');
    directoryPage.clickSearch();
    
    cy.wait('@searchLokasi');
    directoryPage.verifyCardIsDisplayed();
  });

  it('TC05 - Mencari Karyawan Menggunakan Kombinasi Filter (Jabatan & Lokasi)', () => {
    cy.intercept('GET', '**/directory/employees**').as('searchKombinasi');
    
    directoryPage.selectJobTitle('Chief Executive Officer');
    directoryPage.selectLocation('Texas R&D');
    directoryPage.clickSearch();
    
    cy.wait('@searchKombinasi');
    cy.get('.orangehrm-horizontal-padding').should('be.visible'); 
  });

  it('TC06 - Mencari Karyawan dengan Form Kosong (Menampilkan Semua Data)', () => {
    cy.intercept('GET', '**/directory/employees**').as('searchAll');

    directoryPage.clickSearch();
    
    cy.wait('@searchAll');
    directoryPage.verifyMultipleCardsDisplayed();
  });

  it('TC07 - Mencari Karyawan dengan Nama yang Tidak Terdaftar (Invalid)', () => {
    cy.get('.oxd-autocomplete-text-input > input')
      .type('nahlul')
      .blur();

    cy.get('.oxd-input-field-error-message').should('contain', 'Invalid');
  });

  it('TC08 - Reset Form Pencarian', () => {
    directoryPage.searchByEmployeeName('Peter');
    directoryPage.selectJobTitle('HR Manager'); 
    directoryPage.clickReset();

    cy.get('.oxd-autocomplete-text-input > input').should('be.empty');
    cy.get('.oxd-select-text').eq(0).should('contain', '-- Select --');
    cy.get('.oxd-select-text').eq(1).should('contain', '-- Select --');
  });

});