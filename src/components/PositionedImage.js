import React, { Component } from 'react';
import Draggable from 'react-draggable';
import axios from "../utils/axios";
import "../stylesheets/PositionedImage.css"

export default class PositionedImage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultX: 0,
      defaultY: 0,
      hover: false
    }

    this.toggleHover = this.toggleHover.bind(this)
  }

  componentDidMount() {
    return axios({
      method: "GET",
      baseURL: process.env.REACT_APP_API,
			url: `/exhibition/position/${this.props.id}`,
      // data: this.state.defaultPosition
    })
      .then((response)=> {
        this.setState({
          defaultX: response.data.imageX,
          defaultY: response.data.imageY 
        });
        // this.props.history.push("/images"); // to redirect
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  toggleHover() {
    this.setState({hover: !this.state.hover})
  }

  render() {

    return (
      <Draggable position={{x: this.state.defaultX, y: this.state.defaultY}} onStart={() => false}>
        <div className="oneExhitionImageContainer" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
          {
            this.state.hover?
            <div className="InfoContainer">
              <p>{this.props.name}</p>
              <p>{this.props.description}</p>
            </div>
            :
            <>
            
            </>
          }
          <div className="oneExhibitionImage">
            <img src={this.props.src} alt="photo from the exhibition"/>
          </div>
        </div>
      </Draggable>
    )
  }
}
