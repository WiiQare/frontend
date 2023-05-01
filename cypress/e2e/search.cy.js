describe('Search text on Google', () => {
    it('Should return search result', () => {
        cy.visit("https://google.com");

        cy.get('#APjFqb').type('Ironman').type("{enter}");
        cy.get('.FPdoLc > center > .gNO89b').click();
    });
    
});
