// Un test de bout en bout simulant une interaction de recherche de l'utilisateur dans votre application.
describe('Search functionality', () => {
    it('User can search for an album', () => {
      cy.visit('/');
      cy.get('#search').type('Example Album');
      cy.get('form').submit();
      cy.contains('Example Album').should('exist');
    });
  });
  