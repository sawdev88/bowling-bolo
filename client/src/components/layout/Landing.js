import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

function Landing(props) {
  const currentState = useSelector(state => state);
  useEffect(() => {
    if (currentState.auth.isAuthenticated) {
      // redirect logged in user to dash
      props.history.push('/dashboard')
    }
  }, [currentState])

  return (
    <div className = "text-center mt-5" > MERN Boilerplate </div>
  )
}

export default Landing;
