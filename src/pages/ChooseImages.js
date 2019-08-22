import React, { Component } from 'react';
import axios from "../utils/axios";
import axiosModule from "axios";
// I need different axios settings depending on the request I'm doing (to external API or to my API)
import ImgItem from "../components/ImgItem";
import MainLayout from "../layout/MainLayout";
import "../stylesheets/ChooseImages.css";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default class ChooseImages extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imagesIDs: [], 
      query: '', 
      error: null,
      selectedImages: []
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addImage = this.addImage.bind(this);
    this.submitMuseumImages = this.submitMuseumImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  // Default display of images
  componentDidMount() {
    axiosModule.get("https://collectionapi.metmuseum.org/public/collection/v1/search?q=utagawa")
      .then((response)=>{
        this.setState({imagesIDs:response.data.objectIDs.slice(0,49)})
      })
      .catch((error)=>{
        this.setState({error:error})
      })
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  handleFormChange = (e)=> {
    this.setState({ 
      query: e.target.value 
    })
  }

  handleFormSubmit = (e)=> {
    e.preventDefault(); // disable the default form behavious (redirecting to a new page)

    const query = this.state.query;

    axiosModule.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)
      .then((response)=>{
        if (response.data.objectIDs) {
          this.setState({imagesIDs:response.data.objectIDs.slice(0,49)})
        } else {
          this.setState({imagesIDs:response.data.objectIDs})
        }
      })
      .catch((error)=>{
        this.setState({error:error})
      })

  }

  addImage = function(imageTitle, imageSrc, imageId) { // method that we use in the child component ImgItem
    let imageToAdd = {imgName:imageTitle,imgPath:imageSrc,exhibition:"",imgId:imageId};
    let allSavedImages = [...this.state.selectedImages,imageToAdd];
    this.setState({
      selectedImages: allSavedImages,
    })
  }

  deleteImage = function(imageId) {
    let allSavedImages = [...this.state.selectedImages];
    let updatedImages = allSavedImages.filter(image => image.imgId !== imageId);
    this.setState({
      selectedImages: updatedImages,
    })
  }

  submitMuseumImages() {
    return axios({
      method: "PUT",
      baseURL: process.env.REACT_APP_API,
			url: "/exhibition/museum-images",
      data: {museum_images: [...this.state.selectedImages]}
    })
      .then(()=> {
        this.setState({error: ""});
        this.props.history.push("/upload"); // to redirect
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  render() {
    let allImages

    if (this.state.imagesIDs) { // the response from axios when there are no artworks is null (and not a empty array; that's why we cannot use length)
      allImages = this.state.imagesIDs.map((imageId) => {
        return (
          <div>
            <ImgItem 
              key={imageId}
              imageId = {imageId}
              addImage={this.addImage}
              deleteImage={this.deleteImage}
            />
          </div>
        )
      })
    }

    return (

      <MainLayout>

        <div className="ChooseImages">
          <h1>step 2 / look for inspiration</h1>

          <form onSubmit={this.handleFormSubmit}>
            <div className="InputQuery">
              <input type="text" className="InputField" name="image" placeholder="Search for artists or artworks" value={this.state.query} onChange={this.handleFormChange} />
              <input type="submit" className="QueryBtn" value="Go" />
            </div>
          </form>

          <div>
            {
              this.state.imagesIDs ?
              <>
                <div className="allMuseumImages">
                  {allImages}
                </div>

                <div>
                  <button onClick={this.scrollToTop} className="SubmitBtn">Keep looking</button>
                  <button className="SubmitBtn" onClick={this.submitMuseumImages}>Next step</button>
                </div>
              </>
              :
              <>
                <div className="SearchMessage">
                  <h1>Sorry but this search was unsuccessful! Look for another artist!</h1>
                </div>
              </>
            }
          </div>

        </div>

      </MainLayout>
      
    )
  }
  
}