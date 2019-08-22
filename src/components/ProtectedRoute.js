import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from "../utils/Auth";
const auth = new Auth();
// we are first deconstructing the props that ProtectedRoute receives and 
// spreading the rest. In this case we are assigning all remaining props to rest.
// Deconstructing: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operatoren/Destructuring_assignment
// Spreading: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
const ProtectedRoute  = ({component: Component, redirectUrl, ...rest}) => {
  // We are creating a <Route /> component dynamically 
  // if the user is not logged in we are redirecting
  // if the us IS logged in we're rendering the <Component />, which
  // might be something like <Profile />    
  return (
      <Route
        {...rest}
        render={ props  => {
            var user = auth.getUser();
            if(user){
              return <Component {...props} />
            } else {
              return <Redirect to={{pathname: redirectUrl || '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;