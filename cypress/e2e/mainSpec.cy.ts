Cypress.Commands.addAll({
  selectBun() {
    cy.get('[data-cy^=bun] button').first().click();
  },
  selectMain() {
    cy.get('[data-cy^=main] button').first().click();
  },
  selectSauce() {
    cy.get('[data-cy^=sauce] button').first().click();
  },
  closeModal() {
    cy.get('[data-cy=modal] button').click();
  },
  isClearConstructor() {
    cy.get('[data-cy=noUpperBun]').should('have.text', 'Выберите булки');
    cy.get('[data-cy=noIngredients]').should('have.text', 'Выберите начинку');
    cy.get('[data-cy=noLowerBun]').should('have.text', 'Выберите булки');
  }
});
beforeEach(() => {
  cy.intercept('api/ingredients', { fixture: 'mockIngredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('api/auth/user', { fixture: 'mockUser.json' })
    .then(() => {
      cy.setCookie('accessToken', 'mockAccess');
      window.localStorage.setItem('refreshToken', 'refreshToken');
    })
    .as('getUser');
  cy.visit('/');
});
afterEach(() => {
  cy.clearCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
});
describe('Burger constructor test', () => {
  it('should add ingredients correctly', () => {
    cy.isClearConstructor();
    cy.selectBun();
    cy.selectMain();
    cy.selectSauce();
    cy.get('[data-cy=upperBun]').should('contain.text', 'булка');
    cy.get('[data-cy^=ingredient]').should('have.length', '2');
  });
  it('should open and close modal', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy^=bun]').first().click();
    cy.get('[data-cy=modal]').as('modal');
    cy.get('@modal').should('contain.text', 'Детали');
    cy.closeModal();
    cy.get('@modal').should('not.exist');
    //check close by overlay
    cy.get('[data-cy^=bun]:first').click();
    cy.get('[data-cy=outsideModal]').click({ force: true });
    cy.get('@modal').should('not.exist');
  });
  it('should correctly create order', () => {
    cy.selectBun();
    cy.selectMain();
    cy.intercept(
      {
        method: 'POST',
        url: 'orders'
      },
      { fixture: 'mockOrder.json' }
    );

    cy.get('[data-cy=orderSummary] button').click();
    cy.get('[data-cy=modal]').should('contain.text', '1111');
    cy.closeModal();
    cy.isClearConstructor();
  });
});
