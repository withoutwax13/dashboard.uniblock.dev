// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

///  <reference types="cypress"/>
/// <reference types="cypress-xpath"/>


Cypress.Commands.add("Logout", ()=>{
    //cy.xpath("(//img[@class='MuiAvatar-img css-1hy9t21'])[1]").click()
    //cy.xpath("(//li[contains(@class,'MuiButtonBase-root MuiMenuItem-root')])[4]").click()
    cy.get('.MuiButtonBase-root > .MuiAvatar-root > .MuiAvatar-img').click()
    cy.get('.MuiPaper-root > :nth-child(8)').click()
})