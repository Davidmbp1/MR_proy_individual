// cypress/support/index.d.ts
/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to perform login
         * @example cy.login('user@example.com', 'password123')
         */
        login(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  // Necesario para que TypeScript trate este archivo como un módulo
  export {};
  