// Mengimpor halaman ForgotPasswordPage
import ForgotPasswordPage from '../support/pages/forgotPasswordPage';

// Mengatur pengujian untuk fitur Lupa Password
describe('Forgot Password Test', () => {
    // Sebelum setiap pengujian, kunjungi halaman Lupa Password dan intersep permintaan API
    beforeEach(() => {
        ForgotPasswordPage.visit();
        cy.intercept('POST', '**/web/index.php/api/v2/auth/forgot-password').as('forgotPasswordApi');
    });

    // Pengujian untuk permintaan reset password dengan username yang valid
    it('should request password reset with valid username', () => {
        // Memasukkan username 'Admin'
        ForgotPasswordPage.enterUsername('Admin');
        // Mengklik tombol Reset Password
        ForgotPasswordPage.clickResetPassword();
        // Memverifikasi bahwa reset password berhasil
        ForgotPasswordPage.verifyResetSuccess();
        // Mengambil screenshot hasil
        cy.screenshot('forgotpassword/TC.FP.001-ForgotPasswordSuccess');
    });

    // Pengujian untuk menampilkan pesan kesalahan jika username kosong
    it('should show required message when username is empty', () => {
        // Mengklik tombol Reset Password tanpa memasukkan username
        ForgotPasswordPage.clickResetPassword();
        // Memverifikasi bahwa pesan kesalahan ditampilkan
        ForgotPasswordPage.verifyUsernameRequired();
        // Mengambil screenshot hasil
        cy.screenshot('forgotpassword/TC.FP.002-ForgotPasswordEmptyUsername');
    });
});
