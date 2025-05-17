class ForgotPasswordPage {
    // Fungsi untuk mengunjungi halaman Lupa Password
    static visit() {
        cy.visit('/web/index.php/auth/requestPasswordResetCode');
    }

    // Fungsi untuk memasukkan username
    static enterUsername(username) {
        cy.get('input[name="username"]').clear().type(username);
    }

    // Fungsi untuk mengklik tombol Reset Password
    static clickResetPassword() {
        cy.get('button[type="submit"]').click();
    }

    // Fungsi untuk memverifikasi bahwa reset password berhasil
    static verifyResetSuccess() {
        cy.xpath("(//div[@class='orangehrm-card-container'])[1]").should('contain', 'Reset Password link sent successfully');
    }

    // Fungsi untuk memverifikasi pesan kesalahan jika username kosong
    static verifyUsernameRequired() {
        cy.get('.oxd-input-field-error-message')
          .should('contain', 'Required');
    }
}

export default ForgotPasswordPage;
