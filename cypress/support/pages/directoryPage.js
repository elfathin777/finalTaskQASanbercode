class DirectoryPage {
    // Fungsi untuk membuka menu sidebar
    openSidebarMenu() {
        cy.get('body').then($body => {
            if ($body.find('aside .oxd-main-menu').length === 0) {
                cy.get('button.oxd-icon-button').first().click();
            }
        });
    }

    // Fungsi untuk mengklik menu Directory
    clickMenuDirectory() {
        cy.get('aside').should('be.visible');
        cy.get('body').then($body => {
            if ($body.find('a[href="/web/index.php/directory/viewDirectory"]').length === 0) {
                this.openSidebarMenu();
            }
        });

        cy.get('a[href="/web/index.php/directory/viewDirectory"]').should('be.visible').click();
    }

    // Fungsi untuk intersep permintaan API pencarian directory
    interceptDirectoryApi() {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('searchDirectory');
    }

    // Fungsi untuk memverifikasi halaman Directory
    verifyOnDirectoryPage() {
        cy.url().should('include', '/directory');
        cy.get('h6').should('contain', 'Directory');
    }

    // Fungsi untuk memasukkan nama karyawan
    enterEmployeeName(name) {
        cy.get('input[placeholder="Type for hints..."]').clear().type(name);
    }

    // Fungsi untuk memilih job title
    selectJobTitle(jobTitle) {
        cy.get('.oxd-select-text').eq(0).click();
        cy.get('.oxd-select-dropdown').contains(jobTitle).click();
    }

    // Fungsi untuk memilih lokasi
    selectLocation(location) {
        cy.get('.oxd-select-text').eq(1).click();
        cy.get('.oxd-select-dropdown').contains(location).click();
    }

    // Fungsi untuk mengklik tombol Search
    clickSearch() {
        cy.get('button[type="submit"]').contains('Search').click();
    }

    // Fungsi untuk mengklik tombol Reset
    clickReset() {
        cy.get('button[type="reset"]').contains('Reset').click();
    }

    // Fungsi untuk memverifikasi hasil pencarian
    verifySearchResult(expectedName) {
        cy.get('.oxd-table-cell').should('contain', expectedName);
    }

    // Fungsi untuk memverifikasi pesan "No Records Found"
    verifyNoResult() {
        cy.get('.orangehrm-horizontal-padding').should('contain', 'No Records Found');
    }
}

export default new DirectoryPage();
