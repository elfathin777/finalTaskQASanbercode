class LoginPage {
    // Fungsi untuk mengunjungi halaman Login
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    }

    // Fungsi untuk memasukkan username
    enterUsername(username) {
        cy.get('input[name="username"]').clear().type(username);
    }

    // Fungsi untuk memasukkan password
    enterPassword(password) {
        cy.get('input[name="password"]').clear().type(password);
    }

    // Fungsi untuk mengklik tombol Login
    clickLogin() {
        cy.get('button[type="submit"]').click();
    }

    // Fungsi untuk memverifikasi halaman Dashboard
    verifyDashboardVisible() {
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('be.visible');
    }

    // Fungsi untuk memverifikasi pesan kesalahan
    verifyErrorMessage(message) {
        cy.contains(message).should('be.visible');
    }

    // Fungsi untuk memverifikasi pesan kesalahan untuk field yang kosong
    verifyRequiredField() {
        cy.contains('Required').should('exist');
    }
}

export default new LoginPage();
