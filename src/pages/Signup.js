import React, { Component } from 'react';
import Auth from "../utils/Auth";
import MainLayout from "../layout/MainLayout";

// import stylesheet
import "../stylesheets/Signup.css";

const auth = new Auth();

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = { 
      user : {
        username:'',
        password:'',
        email:''
      },
      error: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange = (e)=> {
    let user = {...this.state.user}
    user[e.target.name] = e.target.value // within the square brackets "[]" you can use dynamic keyss
    this.setState({ 
      user:user 
    })
  }

  handleFormSubmit = (e)=> {
    debugger
    e.preventDefault();
    // STEP 1 OF SIGNUP: SUBMIT THE SIGNUP FORM IN THE FRONT END, CALLS THE SIGNUP FUNCTION OF "Auth.js"
    auth.signup(this.state.user)
    // STEP 5 OF SIGN-UP: ACT CONSEQUENTLY TO THE DATA SENT BY THE BACKEND (REDIRECT, SHOW ERRORS...)
      .then(()=> {
        // debugger
        this.setState({error: ""});
        this.props.history.push("/"); // to redirect
      })
      .catch((err)=> {
        // debugger
        this.setState({error: err.response.data.message});
        console.log(err.response.data.message)
      })
  }

  render(){
    return (
      <MainLayout>
        <div className="Signup">
          <div className="signup-content">
            <form onSubmit={this.handleFormSubmit}>{/* we don't want the default form submitting behaviour, so we're adding own submit handler   */}
              <div>
                <input className="signup-inputs" type="text" name="username" placeholder="Username" value={this.state.user.username} onChange={this.handleFormChange} /> {/* reacts wants to be in charge of all the data   */}
              </div>
              <div>
                <input className="signup-inputs" type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleFormChange} />{/* reacts wants to be in charge of all the data   */}
              </div>
              <div>
                <input className="signup-inputs" type="email" name="email" placeholder="Email" checked={this.state.user.email} onChange={this.handleFormChange} />{/* reacts wants to be in charge of all the data   */}
              </div>
              <div>
                <input className="signup-btn" type="submit" value="Create account" />
              </div>
            </form>
          </div>
          <div>
            <iframe scrolling="no" className= "signup-iframe" src="https://poly.google.com/view/3mHT-lSmFvK/embed" frameborder="0" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>        
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default Signup;