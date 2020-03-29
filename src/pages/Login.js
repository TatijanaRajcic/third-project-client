import React, { Component } from 'react';
import MainLayout from "../layout/MainLayout";

// import stylesheet
import "../stylesheets/Login.css";

import {Link} from "react-router-dom";
import Auth from "../utils/Auth";
const auth = new Auth();

class Login extends Component {
  constructor(props){
    super(props);

    this.state = { 
      user : {
        username:'',
        password:''
      },
      error: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange = (e)=> {
    let user = {...this.state.user}
    user[e.target.name] = e.target.value // within the square brackets "[]" you can use dynamic keyss
    this.setState({ 
      user:user //
    })
  }

  handleFormSubmit = (e)=> {
    // debugger
    e.preventDefault();
    // STEP 1 OF LOGIN: SUBMIT THE LOGIN FORM IN THE FRONT END, CALLS THE LOGIN FUNCTION OF "Auth.js"
    auth.login(this.state.user.username, this.state.user.password)
      // STEP 5 OF LOGIN: ACT CONSEQUENTLY TO THE DATA SENT BY THE BACKEND (REDIRECT, SHOW ERRORS...)
      .then(()=> {
        this.setState({error: ""});
        this.props.history.push("/"); // to redirect
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        console.log(err.response.data.message)
      })
  }

  render(){
    return (
      <MainLayout>
        <div className="Login">
          <div className="login-content">
            <form onSubmit={this.handleFormSubmit}>{/* we don't want the default form submitting behaviour, so we're adding own submit handler   */}
              <div>
                <input className="login-inputs" type="text" name="username" placeholder="Username" value={this.state.user.username} onChange={this.handleFormChange} /> {/* reacts wants to be in charge of all the data   */}
              </div>
              <div>
                <input className="login-inputs" type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleFormChange} />{/* reacts wants to be in charge of all the data   */}
              </div>
              <div>
                <input className="login-btn" type="submit" value="Login" />
              </div>
              <p className="account-message">
                Don't have an account?
                <Link className="login-link" to="/signup"> Sign up</Link>
              </p>
            </form>
          </div>
          <div>
            <iframe scrolling="no" className= "login-iframe" src="https://poly.google.com/view/cV54p02NHQt/embed" frameborder="0" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>        
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default Login;