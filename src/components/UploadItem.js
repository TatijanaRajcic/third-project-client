import React, { Component } from 'react';
import "../stylesheets/UploadItem.css"


export default class UploadItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imgName: '',
      imgContent: '',
      imgDescription: '',
      display:""
    }
  }

  handleNameFormChange = (e)=> {
    this.setState({ 
      imgName: e.target.value
    })
  }

  handleDescriptionFormChange = (e)=> {
    this.setState({ 
      imgDescription: e.target.value
    })
  }

  handleFormChangeAndUpload = (e)=> {
    this.setState({
      imgContent: e.target.files[0]
      }, () => {
        this.props.addImage(this.state.imgContent);
        this.props.addImageName(this.state.imgName);
        this.props.addImageDescription(this.state.imgDescription)
      });
  }

  render() {

    return (
      <div className="oneUploadItem">
        <div className="oneUploadItemBox">
          <div className="oneInput">
            <label>awesome name</label>
            <input className="InputField" type="text" name="imgName" value={this.state.imgName} onChange={this.handleNameFormChange} /> {/* reacts wants to be in charge of all the data   */}
          </div>
          <div className="oneInput">
            <label for="imgDescription">tell us more about it...</label>
            <textarea className="TextArea" name="imgDescription" rows="5" cols="50" value={this.state.imgDescription} onChange={this.handleDescriptionFormChange}></textarea>
          </div>
          <div className="oneFileInput">
            <input className="InputFile" type="file" name="imgContent" placeholder="upload your file" onChange={this.handleFormChangeAndUpload} /> {/* reacts wants to be in charge of all the data   */}
          </div>
        </div>
      </div>
    )
  }
}


