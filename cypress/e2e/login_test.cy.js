/// <reference types="cypress" />

import LoginPage from '../support/pages/LoginPage';

describe('OrangeHRM Login Feature - POM', () => {
    const validUsername = 'Admin';
    const validPassword = 'admin123';

    beforeEach(() => {
        LoginPage.visit();
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            const testName = this.currentTest.title.replace(/ /g, '_');
            cy.screenshot(`FAILED-${testName}`);
        }
    });

    it('TC.Log.001 - User login with valid username and valid password', () => {
        LoginPage.enterUsername(validUsername);
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        LoginPage.verifyDashboardVisible();
        cy.screenshot('TC.Log.001-SuccessfulLogin');
    });

    it('TC.Log.002 - User failed to login with invalid username and invalid password', () => {
        LoginPage.enterUsername('invalidUsername');
        LoginPage.enterPassword('invalidPassword');
        LoginPage.clickLogin();
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('TC.Log.002-InvalidUsernameAndPassword');
    });

    it('TC.Log.003 - User failed to login with invalid username and valid password', () => {
        LoginPage.enterUsername('invalidUsername');
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('TC.Log.003-InvalidUsername');
    });

    it('TC.Log.004 - User failed to login with valid username and invalid password', () => {
        LoginPage.enterUsername(validUsername);
        LoginPage.enterPassword('invalidPassword');
        LoginPage.clickLogin();
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('TC.Log.004-InvalidPassword');
    });

    it('TC.Log.005 - User failed to login with lowercase username and valid password', () => {
        LoginPage.enterUsername(validUsername.toLowerCase());
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('TC.Log.005-LowercaseUsername');
    });

    it('TC.Log.006 - User failed to login with valid username and uppercase password', () => {
        LoginPage.enterUsername(validUsername);
        LoginPage.enterPassword(validPassword.toUpperCase());
        LoginPage.clickLogin();
        LoginPage.verifyErrorMessage('Invalid credentials');
        cy.screenshot('TC.Log.006-UppercasePassword');
    });

    it('TC.Log.007 - User failed to login by leaving username and password field empty', () => {
        LoginPage.clickLogin();
        LoginPage.verifyRequiredField();
        cy.screenshot('TC.Log.007-EmptyFields');
    });

    it('TC.Log.008 - User failed to login by leaving username field empty and input valid password', () => {
        LoginPage.enterPassword(validPassword);
        LoginPage.clickLogin();
        LoginPage.verifyRequiredField();
        cy.screenshot('TC.Log.008-EmptyUsername');
    });

    it('TC.Log.009 - User failed to login by entering valid username and leaving password field empty', () => {
        LoginPage.enterUsername(validUsername);
        LoginPage.clickLogin();
        LoginPage.verifyRequiredField();
        cy.screenshot('TC.Log.009-EmptyPassword');
    });
});
