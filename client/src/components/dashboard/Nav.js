import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav(params) {
  return (
    <div className="dash-nav">
      <div className="logo mb-2">
        logo
      </div>

      <ul>
        <li><NavLink exact to="/dashboard">Dashboard</NavLink></li>
        <li>
          <NavLink to="/dashboard/listings">Listings</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Nav
