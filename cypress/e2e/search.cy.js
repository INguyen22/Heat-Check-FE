import Search from '../fixtures/Search.json'

describe('The Search Page', () => {
  beforeEach(() => {
    cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, Search)
    cy.visit('localhost:3000/search/Denver')
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

  it('should have 20 restaurants', () => {
    cy.get('.restaurant').should("have.length", 20)
  })

  it('Should have Himalayan Spice as the first resturant', () => {
    cy.get('.restaurant').first().contains("Himalayan Spice")
      .get(".restRating").contains("Rating: 4.5")
      .get(".restaurantImage").first().should('have.attr', 'src').should('include', "https://s3-media2.fl.yelpcdn.com/bphoto/swlTvEXL5yVRzlOPWo4tYw/o.jpg")
  })

  it("should have Mehak India's Aroma as the last resturant", () => {
    cy.get(".restaurant").last().contains("Mehak India's Aroma")
      .get(".restRating").contains("Rating: 4.5")
      .get(".restaurantImage").last().should('have.attr', 'src').should('include', "https://s3-media1.fl.yelpcdn.com/bphoto/CzbzAT1SD9exma35ESPBUQ/o.jpg")
  })

  it("should be able to toggle between list and map view", () => {
    cy.get(".mapButton").click()
    cy.get(".mapboxgl-canvas").should('exist')
  })

  it("Once in map view, should be able to view restaurant pop up on marker", () => {
    cy.get(".mapButton").click()
    cy.get(".mapboxgl-canvas").should('exist')
    cy.get(".popupMarker").first().click()
    cy.get('.popupDetails').contains("Himalayan Spice")
    // cy.get(".popName").click()
  })

})