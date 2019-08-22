import React, { Component } from 'react';
import axios from "../utils/axios";
import { withRouter } from "react-router"; 



class ExhibitionItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      error:null
    }

    this.addFavorite = this.addFavorite.bind(this);

  }

  addFavorite() {
    debugger
    return axios({
      method: "PUT",
      baseURL: process.env.REACT_APP_API,
			url: "/exhibition/add-favorite",
      data: {id:this.props.id}
    })
      .then(()=> {
        debugger
        this.setState({error: ""});
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  render() {

    return (
      <div className="ExhibitionItem">
        <h1>Exhibition: {this.props.name}</h1>
        <h2>Exhibition description: {this.props.description}</h2>
        {
          this.props.location.pathname !== "/profile"?
          <>
            <h2>Created by: {this.props.creator}</h2>
          </>
          :
          <>
          </>
        }
        <img src={this.props.image} alt=""/>
        {
          this.props.location.pathname === "/index"?
          <>
            <button onClick={this.addFavorite}>Favorite</button>
          </>
          :
          <>
          </>
        }
      </div>
    )
  }
}

export default withRouter(ExhibitionItem)