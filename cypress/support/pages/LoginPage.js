class LoginPage {
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    }

    enterUsername(username) {
        cy.get('input[name="username"]').clear().type(username);
    }

    enterPassword(password) {
        cy.get('input[name="password"]').clear().type(password);
    }

    clickLogin() {
        cy.get('button[type="submit"]').click();
    }

    verifyDashboardVisible() {
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('be.visible');
    }

    verifyErrorMessage(message) {
        cy.contains(message).should('be.visible');
    }

    verifyRequiredField() {
        cy.contains('Required').should('exist');
    }
}

export default new LoginPage();
