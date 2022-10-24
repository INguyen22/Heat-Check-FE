import React, { useState } from 'react'
import heatLogo from "../Images/heat-check-2.png"
import { useNavigate } from "react-router-dom";
import "./Homepage.css"

const Homepage = () => {
  const [address, setAddress] = useState("")
  const [addressError, setAddressError] = useState(false)
  const navigate = useNavigate()

const submitAddress = (event) => {
  event.preventDefault();
  setAddressError(false)
  if (address) {
    navigate(`/search/${address}`)
  } else {
    setAddressError(true)
  }

}

  return (
    <div className='homepage'>
      <img className='heatCheckLogo' src={heatLogo} alt="heat check logo"/>
      <form className='addressForm'>
        <input
          name='address'
          value={address}
          placeholder="Input address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <button className='searchButton' onClick={(e) => submitAddress(e)}>Search</button>
      </form>
      {addressError && <h2 className='addressErrorMsg'>Please enter a valid city, address or zip code!</h2>}
    </div>
  )
}

export default Homepage