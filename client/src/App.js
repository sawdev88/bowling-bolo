import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";
import {useSelector} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Spinner from './components/elements/Spinner';

import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/dashboard/Home";
import Listings from "./components/dashboard/Listings/Listings";
import CreateListing from "./components/dashboard/Listings/CreateListing";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

function isLoading() {
  console.log(store)
  console.log(store.getState())
}

function App() {
  const isLoading = store.getState().auth.loading;
  return (<Provider store={store}>
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact={true} path="/" component={Landing}/>
        <Route exact={true} path="/login" component={Login}/>
        <Switch>
          <Dashboard exact={true} path="/dashboard" component={Home} />
          <Dashboard exact={true} path="/dashboard/listings" component={Listings} />
          <Dashboard exact={true} path="/dashboard/listings/create" component={CreateListing} />
        </Switch>
      </div>
      { isLoading && <Spinner /> }
    </Router>
  </Provider>);
}

export default App;
