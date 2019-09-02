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
      clicked: false,
      hover: false
    }

    this.addFavorite = this.addFavorite.bind(this);
    this.beingAdded = this.beingAdded.bind(this);
    this.beingDeleted = this.beingDeleted.bind(this);
    this.toggleHover = this.toggleHover.bind(this)

  }

  toggleHover() {
    this.setState({hover: !this.state.hover})
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

    let specificIcon;
    if (this.props.location.pathname === "/index") {
      specificIcon = "/images/details-blue.png"
    } else if (this.props.location.pathname ==="/profile") {
      specificIcon = "/images/details-grey.png"
    } else {
      specificIcon = "/images/details-pink.png"
    }

    return (
      <div className="ExhibitionItem" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <h1>{this.props.name}</h1>
        <img className="exhibition-main-img"src={this.props.image} alt=""/>
        <div className="exhibition-footer">
          {
            this.props.location.pathname !== "/profile"?
            <>
              <h2 className="CreatorTitle">Created by: {this.props.creator}</h2>
            </>
            :
            <>
              {
                this.state.hover?
                <>
                  <button className="remove" onClick={()=>{this.props.deleteExhibition(this.props.id)}}><img src="/images/remove-grey.png" alt=""/></button>
                </>
                :
                <>
                  <button className="remove" onClick={()=>{this.props.deleteExhibition(this.props.id)}}><img src="/images/remove.png" alt=""/></button>
                </>
              }
            </>
          }
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
              {
                this.state.hover?
                <>
                  <button className="favorite" onClick={()=>{this.addFavorite();this.beingAdded()}}><img src="/images/heart-blue.png" alt=""/></button>
                </>
                :
                <>
                  <button className="favorite" onClick={()=>{this.addFavorite();this.beingAdded()}}><img src="/images/heart.png" alt=""/></button>
                </>
              }
              </>
            }
            </>
            :
            <>
            </>
          }
          {
            this.state.hover?
            <>
              <Link to={`/show/${this.props.id}`}>
                <img src={specificIcon} alt=""/>
              </Link>
            </>
            :
            <>
              <Link to={`/show/${this.props.id}`}>
                <img src="/images/details.png" alt=""/>
              </Link>
            </>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(ExhibitionItem)