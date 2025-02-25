// cypress/e2e/login.spec.ts

/// <reference types="cypress" />

describe('Login Flow', () => {
    beforeEach(() => {
      // Usa la baseUrl definida en cypress.config.ts
      cy.visit('/login');
    });
  
    it('should show error with invalid credentials', () => {
      cy.get('input[type="email"]').type('invalid@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Verifica que aparezca un mensaje de error
      cy.contains('Error in login').should('be.visible');
    });
  
    it('should login successfully with valid credentials', () => {
      // Usamos nuestro comando personalizado "cy.login"
      cy.login('abranbullshit@gmail.com', 'abranbullshit');
  
      // Verifica redirección a la home
      cy.url().should('eq', 'http://localhost:5173/');
      // Verifica que se muestre algún texto de bienvenida
      cy.contains('Welcome').should('be.visible');
    });
  });
  
  