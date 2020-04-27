import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav(params) {
  return (
    <div className="dash-nav">
      LOGO

      <ul>
        <li><NavLink exact to="/dashboard">Dashboard</NavLink></li>
        <li>
          <NavLink to="/dashboard/listings">Listings</NavLink>
          <ul className="inner-nav">
            <li><NavLink to="/dashboard/listings/create">+ create</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Nav
