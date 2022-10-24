import React from 'react'
import { Link } from 'react-router-dom'
import "./SideContainer.css"

const SideContainer = ({ search, restaurantInApp, user}) => {
    //add conidtional rendering to not show restaurant button if search is not defined
  return (
    <div className='sideBar'>
      {user.user ? <h2 className='welcome'>Welcome, {user.user.username}!</h2> : <></>}
        <button className='sideButton'><Link className="navigation" to={`/`}>Homepage</Link></button>
        {search && <button className='sideButton'><Link className="navigation" to={`/search/${search}`}>Restaurants</Link></button>}
        {restaurantInApp && <button className='sideButton'><Link className="navigation" to={`/restaurant/${restaurantInApp}`}>Last Restaurant</Link></button>}
        <button className='sideButton'> <Link className='navigation' to={`/about-heat-check`}> About Heat Check </Link></button>
    </div>
  )
}

export default SideContainer