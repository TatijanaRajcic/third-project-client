import React, { Component } from 'react';
import axios from "../utils/axios";
import MainLayout from "../layout/MainLayout";
import UploadItem from "../components/UploadItem";
import "../stylesheets/UploadImages.css"


class UploadImages extends Component {
  constructor(props){
    super(props);

    this.state = { 
      uploadedImages: [],
      imagesNames: [],
      imagesDescriptions: [],
      error: null,
      nbrUploads: 1,
      uploads: ["default upload"]
    }

    this.addImage = this.addImage.bind(this);
    this.addImageName = this.addImageName.bind(this);
    this.addImageDescription = this.addImageDescription.bind(this);
    this.submitOwnImages = this.submitOwnImages.bind(this);
    this.addArtwork = this.addArtwork.bind(this);

  }

  addArtwork = (e)=> {
    e.preventDefault(); 
    let nbrUploads = this.state.nbrUploads
    let newUpload = "new upload"
    let allUploads = [...this.state.uploads, newUpload]
    this.setState({nbrUploads: nbrUploads+=1, uploads: allUploads})
  }

  addImage = function(imgContent) { // method that we use in the child component ImgItem
    let allUploadedImages = [...this.state.uploadedImages,imgContent];
    this.setState({
      uploadedImages: allUploadedImages,
    })
  }

  addImageName = function(imgName) { // method that we use in the child component ImgItem
    let allImagesNames = [...this.state.imagesNames,imgName];
    this.setState({
      imagesNames: allImagesNames,
    })
  }

  addImageDescription = function(imgDescription) { // method that we use in the child component ImgItem
    let allImagesDescriptions = [...this.state.imagesDescriptions,imgDescription];
    this.setState({
      imagesDescriptions: allImagesDescriptions,
    })
  }

  submitOwnImages = (e)=> {
    e.preventDefault(); 
    let form = new FormData();
    for(var x = 0; x<this.state.uploadedImages.length; x++) {
      form.append('file', this.state.uploadedImages[x]);
      form.append('filename', this.state.imagesNames[x]);
      form.append('filedescription', this.state.imagesDescriptions[x]);
    }
    axios({
      method: "PUT",
      baseURL: process.env.REACT_APP_API,
			url: "/exhibition/user-images",
      data: form
    })
    .then((response)=> {
      this.setState({error: ""});
      this.props.history.push(`/finalize/${response.data._id}`); // to redirect
    })
    .catch((err)=> {
      this.setState({error: err.message});
      if (err.response.data.message === "Forbidden") {
        this.props.history.push("/login"); // to redirect
      }
    })
  }

  render(){

    let allUploads = this.state.uploads.map(() => {
      return (
        <div>
          <UploadItem 
            addImage={this.addImage}
            addImageName={this.addImageName}
            addImageDescription={this.addImageDescription}
          />
        </div> 
      )
    })

    return (
      <MainLayout>
        <div className="UploadImages">
          <div>
            <h1>step 3 / upload your images</h1>
            <form className="FullPage" onSubmit={this.submitOwnImages}>{/* we don't want the default form submitting behaviour, so we're adding own submit handler   */}
              <div className="TopPage">
                {allUploads}
              </div>
              <div className="BottomPage">
                <button className="SubmitBtnUpload" onClick={this.addArtwork}>Add one artwork</button>
                <input className="SubmitBtnUpload" type="submit" value="Next" />
              </div>
            </form>
          </div>
          <div>
            
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default UploadImages;