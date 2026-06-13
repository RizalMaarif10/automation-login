class DirectoryPage {
    elements = {
        directoryMenu: () => cy.contains('span', 'Directory'),
        employeeNameInput: () => cy.get('.oxd-autocomplete-text-input > input'),
        dropdownOptions: () => cy.get('[role="listbox"]'), 
        jobTitleDropdown: () => cy.get('.oxd-select-text').eq(0), 
        locationDropdown: () => cy.get('.oxd-select-text').eq(1), 
        searchBtn: () => cy.get('button[type="submit"]'),
        resetBtn: () => cy.get('button[type="reset"]'),
        profileCard: () => cy.get('.orangehrm-directory-card'), 
        recordFoundText: () => cy.get('.orangehrm-horizontal-padding > span') 
    }


    navigateToDirectory() {
        this.elements.directoryMenu().click();
    }

    searchByEmployeeName(name) {
        this.elements.employeeNameInput().type(name);
        cy.wait(2000); 
        this.elements.employeeNameInput().type('{downarrow}{enter}');
    }

    typeInvalidEmployeeName(name) {
        this.elements.employeeNameInput().type(name);
    }

    selectJobTitle(jobTitle) {
        this.elements.jobTitleDropdown().click();
        this.elements.dropdownOptions().contains(jobTitle).click();
    }

    selectLocation(location) {
        this.elements.locationDropdown().click();
        this.elements.dropdownOptions().contains(location).click();
    }

    clickSearch() {
        this.elements.searchBtn().click();
    }

    clickReset() {
        this.elements.resetBtn().click();
    }
    verifyDirectoryUrl() {
        cy.url().should('include', '/directory/viewDirectory');
    }

    verifyCardIsDisplayed() {
        this.elements.profileCard().should('be.visible');
    }

    verifyMultipleCardsDisplayed() {
        this.elements.profileCard().should('have.length.greaterThan', 1);
    }

    verifyNoRecordsFound() {
        cy.get('.oxd-toast-content').should('contain', 'No Records Found');
    }
}

export default new DirectoryPage();