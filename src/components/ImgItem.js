import React, { Component } from 'react';
import axiosModule from "axios";
import "../stylesheets/ImgItem.css"
import LazyLoad from 'react-lazy-load';

export default class ImgItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      image: {
        title:'',
        primaryImage:'',
        clicked: false
      }
    }

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

  componentDidMount() {
    axiosModule.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.props.imageId}`)
      .then((response)=>{
        debugger
        this.setState({image:response.data})
      })
      .catch((error)=>{
        this.setState({error:error})
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageId !== prevProps.imageId) {
      axiosModule.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.props.imageId}`)
      .then((response)=>{
        debugger
        this.setState({image:response.data})
      })
      .catch((error)=>{
        this.setState({error:error})
      })
    }
  }

  render() {

    return (
      <div className="oneMuseumImage">
        <div className="TitleContainer">
          <h1 className="Ellipsis">{this.state.image.title}</h1>
        </div>
        <div className="ImageContainer">
          <LazyLoad>
            <img src={this.state.image.primaryImage} alt=""/>
          </LazyLoad>
        </div>
        <div className="BtnContainer">
          {
            this.state.clicked?
            <>
              <button className="DeleteBtn" onClick={()=>{this.props.deleteImage(this.props.imageId);this.beingDeleted()}}>delete me</button>
            </>
            :
            <>
              <button className="AddBtn" onClick={()=>{this.props.addImage(this.state.image.title,this.state.image.primaryImage,this.props.imageId);this.beingAdded()}}>add me</button>
            </>
          }
        </div>
      </div>
    )
  }
}
