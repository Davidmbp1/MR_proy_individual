// cypress/support/index.d.ts
/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * @example cy.login('user@example.com', 'password123')
         */
        login(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  export {};
  