/// <reference types="cypress" />
// Import halaman Login dan Directory
import LoginPage from '../support/pages/loginPage';
import DirectoryPage from '../support/pages/directoryPage';

describe('OrangeHRM Directory Menu Test', () => {
    const username = 'Admin';
    const password = 'admin123';

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.enterUsername(username);
        LoginPage.enterPassword(password);
        LoginPage.clickLogin();
        LoginPage.verifyDashboardVisible();

        // Setup intercept & navigate
        DirectoryPage.interceptDirectoryApi();
        DirectoryPage.clickMenuDirectory();
        DirectoryPage.verifyOnDirectoryPage();
    });

    // TC.Dir.001: Pencarian karyawan dengan nama yang valid
    it('TC.Dir.001 - Should search for valid employee', () => {
        DirectoryPage.enterEmployeeName('Adel');
        DirectoryPage.selectJobTitle('HR Manager');
        DirectoryPage.selectLocation('Texas R&D');
        DirectoryPage.clickSearch();

        // Verifikasi hasil pencarian
        cy.wait('@searchDirectory').its('response.statusCode').should('eq', 200);
        cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').first().should('be.visible');

        // Screenshot hasil pencarian
        cy.screenshot('directory/TC.Dir.001-SearchValidEmployee');
    });

    // TC.Dir.002: Tampilan "No Records Found" untuk pencarian karyawan dengan nama yang tidak valid
    it('TC.Dir.002 - Should show no results for invalid employee', () => {
        DirectoryPage.enterEmployeeName('naem');
        DirectoryPage.selectJobTitle('HR Manager');
        DirectoryPage.selectLocation('New York Sales Office');
        DirectoryPage.clickSearch();

        cy.wait('@searchDirectory').its('response.statusCode').should('eq', 200);
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible');
        cy.screenshot('directory/TC.Dir.002-SearchInvalidEmployee');
    });

    // TC.Dir.003: Reset form pencarian
    it('TC.Dir.003 - Should reset the form', () => {
        DirectoryPage.enterEmployeeName('John');
        DirectoryPage.selectJobTitle('QA Lead');
        DirectoryPage.selectLocation('HQ - CA, USA');
        DirectoryPage.clickReset();

        cy.wait('@searchDirectory').its('response.statusCode').should('eq', 200);
        cy.get('input[placeholder="Type for hints..."]').should('have.value', '');
        cy.screenshot('directory/TC.Dir.003-ResetForm');
    });
})