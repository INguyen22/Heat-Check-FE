import React from 'react'
import "./RestaurantCard.css"
import { Link } from 'react-router-dom'

const RestaurantCard = ({ restaurant }) => {
  const { name, id, imageUrl, rating } = restaurant
  return (
    <div key={id} className="restaurant">
      <img className='restaurantImage' src={imageUrl} alt={name} />
      <div className='restaurantInfo'>
        <Link className="restName" to={`/restaurant/${id}`}> {name} </Link>
        <p className='restRating'> Rating: {rating}</p>
      </div>
    </div>
  )
}

export default RestaurantCard