import loginPage from '../../../support/pages/loginpage';
import recruitmentPage from '../../../support/pages/reqruitmentpage';

describe('Automation OrangeHRM - Menu Recruitment ', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    loginPage.visit();
    cy.intercept('POST', '**/auth/validate').as('loginSukses');
    loginPage.login('Admin', 'admin123');
    cy.wait('@loginSukses');

    cy.intercept('GET', '**/recruitment/candidates**').as('loadCandidates');
    recruitmentPage.navigateToRecruitment();
    cy.wait('@loadCandidates');
  });

  it('TC01 - Sukses Mengakses Halaman Recruitment', () => {
    recruitmentPage.verifyRecruitmentUrl();
  });

  it('TC02 - Mencari Kandidat Berdasarkan Job Title', () => {
    cy.intercept('GET', '**/recruitment/candidates**').as('searchJobTitle');
    
    recruitmentPage.selectJobTitle('Software Engineer');
    recruitmentPage.clickSearch();
    
    cy.wait('@searchJobTitle');
    recruitmentPage.verifyDataExists();
  });

  it('TC03 - Mencari Kandidat Berdasarkan Vacancy (Lowongan)', () => {
    cy.intercept('GET', '**/recruitment/candidates**').as('searchVacancy');
    recruitmentPage.selectVacancy('Software Engineer'); 
    recruitmentPage.clickSearch();
    
    cy.wait('@searchVacancy');
    recruitmentPage.verifyDataExists();
  });

  it('TC04 - Mencari Kandidat Berdasarkan Status Rekrutmen', () => {
    cy.intercept('GET', '**/recruitment/candidates**').as('searchStatus');
    
    recruitmentPage.selectStatus('Hired'); 
    recruitmentPage.clickSearch();
    
    cy.wait('@searchStatus');
    recruitmentPage.verifyDataExists();
  });

  it('TC05 - Mencari Kandidat Menggunakan Kombinasi Filter', () => {
    cy.intercept('GET', '**/recruitment/candidates**').as('searchKombinasi');
    
    recruitmentPage.selectJobTitle('Software Engineer');
    recruitmentPage.selectStatus('Hired');
    recruitmentPage.clickSearch();
    
    cy.wait('@searchKombinasi');
    cy.get('.orangehrm-horizontal-padding').should('be.visible');
  });

 it('TC06 - Mencari Kandidat dengan Nama yang Tidak Terdaftar (Invalid)', () => {
    cy.get('.oxd-autocomplete-text-input > input')
      .type('sabrialonso')
      .blur(); 
    
    
    cy.get('.oxd-input-field-error-message').should('contain', 'Invalid');
  });

  it('TC07 - Reset Form Pencarian Recruitment', () => {
    recruitmentPage.typeInvalidCandidateName('John Doe');
    recruitmentPage.selectJobTitle('Software Engineer');

    recruitmentPage.clickReset();

    cy.get('.oxd-autocomplete-text-input > input').should('be.empty');
    cy.get('.oxd-select-text').eq(0).should('contain', '-- Select --');
  });

  it('TC08 - Sukses Mengakses Halaman Tambah Kandidat (Add Candidate)', () => {
    recruitmentPage.clickAddCandidate();
    recruitmentPage.verifyAddCandidateUrl();
    
    cy.get('input[name="firstName"]').should('be.visible');
  });

});