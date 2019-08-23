import React, { Component } from 'react';
import axios from "../utils/axios";
import MainLayout from "../layout/MainLayout";
import ExhibitionItem from "../components/ExhibitionItem";
import "../stylesheets/Profile.css";
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

    axios.get(`${process.env.REACT_APP_API}/exhibition/own-exhibitions`)
      .then((response)=>{
        this.setState({exhibitions:response.data})
      })
      .catch((error)=>{
        this.setState({error:error})
      })
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  deleteExhibition = function(exhibitionId) {
    debugger
    return axios({
      method: "GET",
      baseURL: process.env.REACT_APP_API,
			url: `/exhibition/delete-exhibition/${exhibitionId}`,
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

    let user = auth.getUser()

    let exhibitionImages = this.state.exhibitions.map((exhibition) => {
      return (
        <div className="exhibitionDetails">
          <ExhibitionItem 
            key = {exhibition._id}
            id = {exhibition._id}
            name = {exhibition.name}
            description = {exhibition.description}
            creator = {exhibition.creator.username}
            deleteExhibition = {this.deleteExhibition}
            // CHANGER CE BOUT DE CODE PR POUVOIR ACCEDER AUX PROPERTIES DE L'OBJECT EXHIBITION.IMAGES[0]
            // image = {exhibition.images[0].imgPath}
            // https://www.svrf.com/storage/svrf-previews/4537166810054656/images/thumbStandard.jpg
          />
        </div>
      )
    })

    return (
      <div>
        <MainLayout>
          <div className="ProfilePage">
            <h1>Here are your exhibitions, {user.username} !</h1>
            <div className="allExhibitions">
              {exhibitionImages}
            </div>
            <button onClick={this.scrollToTop} className="ScrollBtn">Up</button>
          </div>
        </MainLayout>
      </div>
    )
  }
}

