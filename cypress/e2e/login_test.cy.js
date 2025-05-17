/// <reference types="cypress" />
import LoginPage from '../support/pages/loginPage';

// Mengatur pengujian untuk fitur Login
describe('OrangeHRM Login Feature with Intercept - POM', () => {
    const validUsername = 'Admin';
    const validPassword = 'admin123';

    // Sebelum setiap pengujian, kunjungi halaman Login dan intersep permintaan API
    beforeEach(() => {
        cy.intercept('GET', '**/i18n/messages').as('i18n'); 
        LoginPage.visit();
        cy.wait('@i18n'); // Tunggu request i18n selesai agar halaman benar-benar siap
    });    

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            const testName = this.currentTest.title.replace(/ /g, '_');
            cy.screenshot(`login/FAILED-${testName}`);
        }
    });

    // TC.Log.001: Login - isi username dan password valid
    it('TC.Log.001 - User login with valid username and valid password', () => {
        cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('actionSummary');
        LoginPage.enterUsername(validUsername);
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        cy.wait('@actionSummary');
        LoginPage.verifyDashboardVisible();
        cy.screenshot('login/TC.Log.001-SuccessfulLogin');
    });

    // TC.Log.002: Gagal login - isi username salah, password salah
    it('TC.Log.002 - User failed to login with invalid username and invalid password', () => {
        cy.intercept('GET', '**/i18n/messages').as('i18n');
        LoginPage.enterUsername('invalidUsername');
        LoginPage.enterPassword('invalidPassword');
        LoginPage.clickLogin();
        cy.wait('@i18n');
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('login/TC.Log.002-InvalidUsernameAndPassword');
    });

    // TC.Log.003: Gagal login - isi username salah, password valid
    it('TC.Log.003 - User failed to login with invalid username and valid password', () => {
        cy.intercept('GET', '**/i18n/messages').as('i18n');
        LoginPage.enterUsername('invalidUsername');
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        cy.wait('@i18n');
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('login/TC.Log.003-InvalidUsername');
    });

    // TC.Log.004: Gagal login - isi username valid, password salah
    it('TC.Log.004 - User failed to login with valid username and invalid password', () => {
        cy.intercept('GET', '**/i18n/messages').as('i18n');
        LoginPage.enterUsername(validUsername);
        LoginPage.enterPassword('invalidPassword');
        LoginPage.clickLogin();
        cy.wait('@i18n');
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('login/TC.Log.004-InvalidPassword');
    });

    // TC.Log.005: Gagal login - isi username valid, lowercase
    it('TC.Log.005 - User failed to login with lowercase username and valid password', () => {
        cy.intercept('GET', '**/i18n/messages').as('i18n');
        LoginPage.enterUsername(validUsername.toLowerCase());
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        cy.wait('@i18n');
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('login/TC.Log.005-LowercaseUsername');
    });

    // TC.Log.006: Gagal login - isi password valid, uppercase
    it('TC.Log.006 - User failed to login with valid username and uppercase password', () => {
        cy.intercept('GET', '**/i18n/messages').as('i18n');
        LoginPage.enterUsername(validUsername);
        LoginPage.enterPassword(validPassword.toUpperCase());
        LoginPage.clickLogin();
        cy.wait('@i18n');
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('login/TC.Log.006-UppercasePassword');
    });

    // TC.Log.007: Gagal login - isi username valid, kosongkan password
    it('TC.Log.007 - User failed to login by leaving username and password field empty', () => {
        LoginPage.clickLogin();
        LoginPage.verifyRequiredField();
        cy.screenshot('login/TC.Log.007-EmptyFields');
    });
    
    // TC.Log.008: Gagal login - isi password valid, kosongkan username
    it('TC.Log.008 - User failed to login by leaving username field empty and input valid password', () => {
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        LoginPage.verifyRequiredField();
        cy.screenshot('login/TC.Log.008-EmptyUsername');
    });
    
    // TC.Log.009: Gagal login - isi username valid, kosongkan password
    it('TC.Log.009 - User failed to login by entering valid username and leaving password field empty', () => {
        LoginPage.enterUsername(validUsername);
        LoginPage.clickLogin();
        LoginPage.verifyRequiredField();
        cy.screenshot('login/TC.Log.009-EmptyPassword');
    });    
});
