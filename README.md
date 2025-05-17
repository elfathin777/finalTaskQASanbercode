# 📘 OrangeHRM - Cypress Automation Test

Repository ini berisi automation testing untuk fitur **Login**, **Forgot Password**, dan **Dashboard (Directory)** pada website [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/), menggunakan **Cypress** dengan pendekatan **Page Object Model (POM)** serta penggunaan `cy.intercept()` untuk menangani API request.

## ✅ Fitur yang Diuji

| No. | Fitur                 | Deskripsi                                                             |
| --- | --------------------- | --------------------------------------------------------------------- |
| 1   | Login                 | Validasi login dengan skenario sukses dan gagal menggunakan intercept |
| 2   | Forgot Password       | Validasi form reset password (berhasil dan kosong)                    |
| 3   | Directory (Dashboard) | Pencarian karyawan berdasarkan nama, job title, lokasi; reset form    |

---

## 📂 Struktur Direktori

```
cypress/
├── e2e/
│   ├── login.cy.js               // Test untuk fitur Login
│   ├── forgotPassword.cy.js     // Test untuk fitur Forgot Password
│   └── directory.cy.js          // Test untuk fitur Directory
│
└── support/
    ├── pages/
    │   ├── loginPage.js
    │   ├── forgotPasswordPage.js
    │   └── directoryPage.js
    └── e2e.js                   // Global handler (screenshot & error)
```

---

## 💡 Tools

* **Cypress v12+**
* **Page Object Model (POM)**
* **Intercept API (`cy.intercept`)**
* **Negatif & Positif Testing**

---

## 🚀 Cara Menjalankan

1. Clone repo:

   ```bash
   git clone https://github.com/elfathin777/finalTaskQASanbercode.git
   cd orangehrm-cypress-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan Cypress:

   ```bash
   npx cypress open
   ```

---

* Screenshot otomatis disimpan di folder `/cypress/screenshots`.
* `cy.intercept()` digunakan untuk menunggu respons dari request API agar lebih stabil.
