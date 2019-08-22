import React, { Component } from 'react';
import axios from "../utils/axios";
import { withRouter } from "react-router"; 
import "../stylesheets/ExhibitionItem.css";
import {Link} from "react-router-dom";


class ExhibitionItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      error:null,
      clicked: false
    }

    this.addFavorite = this.addFavorite.bind(this);
    this.beingAdded = this.beingAdded.bind(this)
    this.beingDeleted = this.beingDeleted.bind(this)

  }

  beingAdded() {
    this.setState({
      clicked:true
    })
  }

  beingDeleted() {
    this.setState({
      clicked:false
    })
  }

  addFavorite() {
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
            <button className="remove" onClick={()=>{this.props.deleteExhibition(this.props.id)}}><img src="/images/remove.png" alt=""/></button>
          </>
        }
        <img src={this.props.image} alt=""/>
        {
          this.props.location.pathname === "/index"?
          <>

          {
            this.state.clicked?
            <>
              <button className="unfavorite"><img src="/images/red-heart.png" alt=""/></button>
              {/* <button className="unfavorite" onClick={()=>{this.removeFavorite();this.beingDeleted()}}><img src="/images/red-heart.png" alt=""/></button> */}
            </>
            :
            <>
              <button className="favorite" onClick={()=>{this.addFavorite();this.beingAdded()}}><img src="/images/heart.png" alt=""/></button>
            </>
          }

{/* <button className="favorite" onClick={this.addFavorite}><img src="/images/heart.png" alt=""/></button> */}

          </>
          :
          <>
          </>
        }
        <Link to={`/show/${this.props.id}`}>
          <img src="/images/details.png" alt=""/>
        </Link>
      </div>
    )
  }
}

export default withRouter(ExhibitionItem)