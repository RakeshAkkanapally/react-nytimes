require('@cypress/xpath')
describe('Article List Page', () => {
  it('should load the article list', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Loading...').should('not.exist'); 

    cy.get('.MuiCard-root').should('have.length.greaterThan', 0);

    cy.get('.MuiTypography-root').each(($el) => {
      cy.wrap($el).should('not.be.empty');
    });

    cy.xpath('//*[contains(text(),\'Read More\')]').first().click();
    
    cy.get('h1').should('not.be.empty');
  });
});
