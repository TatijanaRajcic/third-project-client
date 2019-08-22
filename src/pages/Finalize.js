import React, { Component } from 'react';
import axios from "../utils/axios";
import axiosModule from "axios";
import MainLayout from "../layout/MainLayout";
import "../stylesheets/Finalize.css";
import DraggableItem from "../components/DraggableItem";
import qs from "querystring"; // used for parsing a javascript object in the right format (x-www-form-urlencoded)


class ShowExhibition extends Component {

  constructor(props){
    super(props);

    this.state = { 
      exhibition: {
        name:"",
        description:"",
        images:[],
        background_image:"",
        audio: ""
      },
      error: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

  }

  componentDidMount() {
    let {params} = this.props.match
    var currentExhibition = params.id

    axios.get(`${process.env.REACT_APP_API}/exhibition/finalize/${currentExhibition}`)
      .then((response)=>{
        this.setState({exhibition:response.data})
      })
      .catch((err)=>{
        this.setState({error:err})
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  updatePosition = function(imageId,position) { // method that we use in the child component 
    return axios({
      method: "PUT",
      baseURL: process.env.REACT_APP_API,
			url: "/exhibition/position",
      data: {imageId: imageId, position: position}
    })
      .then(()=> {
        this.setState({error: ""});
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  handleFormChange = (e)=> {
    let exhibition = {...this.state.exhibition}
    exhibition[e.target.name] = e.target.value // within the square brackets "[]" you can use dynamic keyss
    this.setState({ 
      exhibition:exhibition //
    })
  }

  handleFormSubmit = (e)=> {
    e.preventDefault(); // disable the default form behavious (redirecting to a new page)
    return axios({
      method: "PUT",
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      baseURL: process.env.REACT_APP_API,
			url: "/exhibition/finalize",
      data: qs.stringify(this.state.exhibition), // don't send data in json format => cors error
    })
    .then((exhibition)=> {
      this.props.history.push(`/show/${exhibition.data._id}`);
    })
    .catch((err)=> {
      this.setState({error: err.response.data.message});
      if (err.response.data.message === "Forbidden") {
        this.props.history.push("/login"); // to redirect
      }
    })
  }

  deleteImage = function(imageId) {
    debugger
    return axios({
      method: "GET",
      baseURL: process.env.REACT_APP_API,
			url: `/exhibition/delete-image/${imageId}`,
    })
      .then(()=> {
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

    let exhibitionImages = this.state.exhibition.images.map((image) => {

      return (
        <DraggableItem
          key={image._id}
          id={image._id}
          src = {image.imgPath}
          updatePosition={this.updatePosition}
          deleteImage={this.deleteImage}
        />
      )
    })

    return (
      <div>
        <MainLayout>
          <div className="FinalizeExhibition">
            <iframe className="FullScreen" src={this.state.exhibition.background_image}></iframe>
            <div className="ImagesContainer">
              {exhibitionImages}
            </div>
            <div className="ContentContainer">
              <div className="NewDescription">
                <form className="FullPage" onSubmit={this.handleFormSubmit}>{/* we don't want the default form submitting behaviour, so we're adding own submit handler   */}
                  <div className="TopPage">
                    <h1>step 4 / Finalize your exhibition</h1>
                    <div className="InputField">
                      <label>Name of exhibition</label>
                      <input type="text" name="name" value={this.state.exhibition.name} onChange={this.handleFormChange} /> {/* reacts wants to be in charge of all the data   */}
                    </div>
                    <div className="InputField">
                      <label for="description">Description</label>
                      <textarea className="TextArea" name="description" rows="15" cols="30" alue={this.state.exhibition.description} onChange={this.handleFormChange}></textarea>
                    </div>
                    <div>
                      <p>(Psst... You can move your images)</p>
                    </div>
                  </div>
                  <div className="BottomPage">
                    <input className="SubmitBtn" type="submit" value="Save your exhibition" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
    )
  }
}

export default ShowExhibition