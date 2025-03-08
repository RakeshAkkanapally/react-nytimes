require('@cypress/xpath')
describe('Article Detail Page', () => {
    it('should load the article detail page when clicked', () => {

      cy.visit(`http://localhost:5173/article/100000010038337`)

      cy.contains('Loading...').should('not.exist');
   
      cy.get('h1').should('not.be.empty');
 
      cy.contains('Read Full Article').should('have.attr', 'target', '_blank');
  
      cy.get('img').should('have.attr', 'src');

      cy.xpath('//*[contains(text(),\'Back to List\')]').click()

      cy.get('.MuiCard-root').should('have.length.greaterThan', 0);

    });
  });
  