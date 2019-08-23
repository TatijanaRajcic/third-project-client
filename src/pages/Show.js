import React, { Component } from 'react';
import axios from "../utils/axios";
import axiosModule from "axios";
import MainLayout from "../layout/MainLayout";
import PositionedImage from "../components/PositionedImage";
import "../stylesheets/ShowExhibition.css"


class Show extends Component {

  constructor(props){
    super(props);

    this.state = { 
      exhibition: {
        name:"",
        description:"",
        images:[],
        background_image:"",
        audio:"",
      },
      error: null
    }

  }

  componentDidMount() {
    let {params} = this.props.match
    var currentExhibition = params.id

    axios.get(`${process.env.REACT_APP_API}/exhibition/show/${currentExhibition}`)
      .then((response)=>{
        this.setState({exhibition:response.data}, () => {
          axiosModule.get(`https://api.voicerss.org/?key=6e944fc56139476f827e50b5e3cfe966&hl=en-us&src=${response.data.description}`)
          .then((response)=>{
            this.setState({audio:response.request.responseURL})
          })
          .catch((error)=>{
            this.setState({error:error})
          })
        });
      })
      .catch((err)=>{
        this.setState({error:err})
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  render() {

    let exhibitionImages = this.state.exhibition.images.map((image) => {
      return (
        <PositionedImage
          key={image._id}
          id={image._id}
          src = {image.imgPath}
          description = {image.imgDescription}
          name = {image.imgName}
        />
      )
    })

    return (
      <div>
        <MainLayout>
          <div className="ExhibitionContainer" id="canvas">
            <iframe className="FullScreen" src={this.state.exhibition.background_image}></iframe>
            <div className="ImagesContainer">
              {exhibitionImages}
            </div>
            <div className="ContentContainer">
              <div className="Content">
                <h1>{this.state.exhibition.name}</h1>
                <div>
                  <h2>About this exhibition... </h2>
                  <p>{this.state.exhibition.description}</p>
                </div>
                <audio
                  controls
                  src={this.state.audio}>
                </audio>
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
    )
  }
}

export default Show