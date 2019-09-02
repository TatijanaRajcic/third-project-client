import React, { Component } from 'react';
import axios from "../utils/axios";
import MainLayout from "../layout/MainLayout";
import ExhibitionItem from "../components/ExhibitionItem";
import "../stylesheets/Profile.css";
import "../stylesheets/ExhibitionsList.css";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Auth from "../utils/Auth";
const auth = new Auth();


export default class Profile extends Component {

  constructor(props){
    super(props);

    this.state = { 
      exhibitions: [],
      error: null
    }

    this.deleteExhibition = this.deleteExhibition.bind(this);

  }

  componentDidMount() {

    this.getExhibitions()
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  getExhibitions(){

    axios.get(`${process.env.REACT_APP_API}/exhibition/own-exhibitions`)
      .then((response)=>{
        this.setState({exhibitions:response.data})
      })
      .catch((error)=>{
        this.setState({error:error})
      })
  }


  deleteExhibition = function(exhibitionId) {
    debugger
    return axios({
      method: "GET",
      baseURL: process.env.REACT_APP_API,
			url: `/exhibition/delete-exhibition/${exhibitionId}`,
    })
      .then(()=> {
        const exhibitionsCopy = [...this.state.exhibitions];
        const exhibitions = exhibitionsCopy.filter(exhibition => exhibition._id !== exhibitionId);
        this.setState({error: "", exhibitions});
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  render() {

    let user = auth.getUser()

    let exhibitionImages = this.state.exhibitions.map((exhibition) => {
      let imgPath = ''
      if(exhibition.images.length) {
        imgPath = exhibition.images[0].imgPath
      }
      return (
        <div className="exhibition-details">
          <ExhibitionItem 
            key = {exhibition._id}
            id = {exhibition._id}
            name = {exhibition.name}
            description = {exhibition.description}
            creator = {exhibition.creator.username}
            deleteExhibition = {this.deleteExhibition}
            image = {imgPath}
          />
        </div>
      )
    })

    return (
      <div>
        <MainLayout>
          <div className="ProfilePage">
            <h1>Here are your exhibitions, {user.username} !</h1>
            <div className="all-exhibitions-container">
              {exhibitionImages}
            </div>
            <button onClick={this.scrollToTop} className="scroll-btn">Up</button>
          </div>
        </MainLayout>
      </div>
    )
  }
}

