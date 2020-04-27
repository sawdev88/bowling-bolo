import React, { useState } from 'react';
import PrivateRoute from "../private-route/PrivateRoute";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import PropTypes from "prop-types";
import './Dash.scss';

import Nav from './Nav';
import Home from './Home';
import Listings from './Listings/Listings';

function Dashboard(props) {
  const [tab, changeTab] = useState(0);

  const changeView = (params) => {
    changeTab(params)
  }

  return (
    <div>
      <Nav onClick={ changeView } />

      <div className="dash-container">
          <PrivateRoute {...props} />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, {logoutUser})(Dashboard);
