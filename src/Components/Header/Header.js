import React from 'react'
import "./Header.css"
import Login from '../Login/Login'
import {useLocation} from 'react-router-dom'

const Header = ({signIn, setSignIn, setUser}) => {
  const location = useLocation()
  return (
    <div className='heatCheckHeader'>
        {location.pathname !== "/" && <div className='heatCheckHeader'> <h2 id="heat">HEAT</h2> <h2 id="check">CHECK</h2> </div>}
        <div className='signInSignOut'>
          <Login signIn={signIn} setSignIn={setSignIn} setUser={setUser} />
        </div>
    </div>
  )
}

export default Header