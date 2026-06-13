class RecruitmentPage {
  
    elements = {
        recruitmentMenu: () => cy.contains('span', 'Recruitment'),
        dropdownOptions: () => cy.get('[role="listbox"]'),
 
        jobTitleDropdown: () => cy.get('.oxd-select-text').eq(0),
        vacancyDropdown: () => cy.get('.oxd-select-text').eq(1),
        statusDropdown: () => cy.get('.oxd-select-text').eq(3), 
        
        candidateNameInput: () => cy.get('.oxd-autocomplete-text-input > input'),
        searchBtn: () => cy.get('button[type="submit"]'),
        resetBtn: () => cy.get('button[type="reset"]'),
        addBtn: () => cy.contains('button', 'Add'), 
        
        recordFoundText: () => cy.get('.orangehrm-horizontal-padding > span'),
        tableRow: () => cy.get('.oxd-table-body > .oxd-table-card') 
    }


    navigateToRecruitment() {
        this.elements.recruitmentMenu().click();
    }

    selectJobTitle(jobTitle) {
        this.elements.jobTitleDropdown().click();
        this.elements.dropdownOptions().contains(jobTitle).click();
    }

    selectVacancy(vacancy) {
        this.elements.vacancyDropdown().click();
        this.elements.dropdownOptions().contains(vacancy).click();
    }

    selectStatus(status) {
        this.elements.statusDropdown().click();
        this.elements.dropdownOptions().contains(status).click();
    }

    searchByCandidateName(name) {
        this.elements.candidateNameInput().type(name);
        cy.wait(2000); 
        this.elements.candidateNameInput().type('{downarrow}{enter}');
    }

    typeInvalidCandidateName(name) {
        this.elements.candidateNameInput().type(name);
    }

    clickSearch() {
        this.elements.searchBtn().click();
    }

    clickReset() {
        this.elements.resetBtn().click();
    }

    clickAddCandidate() {
        this.elements.addBtn().click();
    }


    verifyRecruitmentUrl() {
        cy.url().should('include', '/recruitment/viewCandidates');
    }

    verifyAddCandidateUrl() {
        cy.url().should('include', '/recruitment/addCandidate');
    }

    verifyDataExists() {
       
        this.elements.recordFoundText().should('be.visible');
    }

    verifyNoRecordsFound() {
        cy.get('.oxd-table-card').should('not.exist');
    }
}

export default new RecruitmentPage();