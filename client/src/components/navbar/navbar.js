import React from 'react'
import cart from '../../assets/cart-icon.png'
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
      <nav className="navbar mb-6" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
              <Link to='/'>
                  <img alt='cart' src={cart} width={50}/>
              </Link>
          </div>
      </nav>
   )
}
