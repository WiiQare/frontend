/// <reference types="cypress">

describe('Login Page', () => {
	beforeEach(() => {
		cy.viewport("macbook-13")
	  })
    it('Visits Login Page', () => {
      cy.visit('http://localhost:3000');


      cy.get('#outlined-basic').type("frdrcpeter@gmail.com")
      cy.get('#outlined-basic1').type("123456")

      cy.get('.css-1p5q5e5-MuiStack-root > .css-0 > .MuiButtonBase-root').click()

    })
  })