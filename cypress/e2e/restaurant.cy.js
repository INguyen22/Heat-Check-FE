import { getByPlaceholderText } from '@testing-library/react'
import Restaurant from '../fixtures/Restaurant.json'
import Restaurant2 from "../fixtures/Restaurant2.json"
import Review from "../fixtures/Review.json"
import User from "../fixtures/User.json"
describe('The Single Restaurant Page', () => {
  beforeEach(() => {
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant)
    cy.visit('localhost:3000/restaurant/Ttk8uzixI-qX8LhdHINV9A')
  })

  it('should have a restaurant name', () => {
    cy.get('.restaurantName').contains("Toro")
  })

  it('should have the city name of the restaurant', () => {
    cy.get(".cityName").contains("Denver, CO 77777")
  })

  it("Should have a empty menu", () => {
    cy.get(".menuTitle").contains("Hot Menu")
    cy.get(".dishCardInfo").should('have.length', 0)
  })

  it('should have a button to add a review for a dish', () => {
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").contains("Add New Dish Review")
  })

  it('should have a header', () => {
    cy.get(".heatCheckHeader")
      .get("#heat").contains("HEAT")
      .get("#check").contains("CHECK")
  })

  it('should have a sidebar', () => {
    cy.get(".sideBar")
      .get(".sideButton").should("have.length", 3)
      .get(".sideButton").first().contains("Homepage")
      .get(".sideButton").last().contains("About Heat Check")
  })

  it('should be able to see a form to add a new dish', () => {
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").click({ force: true })
      .get(".exitModalImage").should("exist")
      .get(".fire").should('have.length', 5)
      .get(".spiceRating").contains("rating: 0")
      .get('input[name="dishName"]')
      .get(".submitNewDishButton").contains("Add New Dish Review")
  })

  it("should be able to add a new dish review", () => {
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant2)
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").click({ force: true })
      .get(".fire").first().click()
      .get(".spiceRating").contains("rating: 1")
      .get('input[name="dishName"]').type('Kirby').should('have.value', 'Kirby')
      .get(".submitNewDishButton").click()
      .get(".dishCardInfo").should('have.length', 1)
  })

  it("should be able to see a dish's details in more depth", () => {
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant2).as("getRest2")
    cy.wait('@getRest2')
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").click({ force: true })
      .get(".fire").first().click()
      .get(".spiceRating").contains("rating: 1")
      .get('input[name="dishName"]').type('kirby').should('have.value', 'kirby')
      .get(".submitNewDishButton").click()
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Review).as("getReview")
      .get(".dishName").click()
    cy.wait("@getReview")
      .get(".backButton").should("exist")
      .get(".reviewsHeader").contains("Customer Reviews")
  })

  it("should be able to go back to the restaurant view when in the dish details", () => {
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant2).as("getRest2")
    cy.wait('@getRest2')
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").click({ force: true })
      .get(".fire").first().click()
      .get(".spiceRating").contains("rating: 1")
      .get('input[name="dishName"]').type('kirby').should('have.value', 'kirby')
      .get(".submitNewDishButton").click()
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Review).as("getReview")
      .get(".dishName").click()
    cy.wait("@getReview")
      .get(".backButton").click({ force: true })
      .get(".backButton").should('not.exist')
      .get(".dishCardInfo").should('have.length', 1)
  })

  it("should be able to exit the form if the user doesn't want to add a review", () => {
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").click({ force: true })
      .get(".exitModalImage").click()
      .get(".exitModalImage").should('not.exist')
  })

  it("should be able to delete a dish", () => {
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant2).as("getRest2")
    cy.wait('@getRest2')
    cy.get('.signInButton').click().wait(1000)
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
    cy.get('input[class*="loginInput"]').type('1')
    cy.get('.logInButton').click({ force: true })
    cy.get(".addNewDishButton").click({ force: true })
      .get(".fire").first().click()
      .get(".spiceRating").contains("rating: 1")
      .get('input[name="dishName"]').type('kirby').should('have.value', 'kirby')
      .get(".submitNewDishButton").click()
    cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant).as("getRest")
    cy.get(".deleteDishButton").click()
    cy.wait('@getRest')
      .get(".dishCardInfo").should('have.length', 0)
  })

})