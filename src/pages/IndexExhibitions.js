import React, { Component } from 'react';
import axios from "../utils/axios";
// import axiosModule from "axios";
import MainLayout from "../layout/MainLayout";
import ExhibitionItem from "../components/ExhibitionItem";
import "../stylesheets/IndexExhibition.css";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default class IndexExhibitions extends Component {

  constructor(props){
    super(props);

    this.state = { 
      exhibitions: [],
      error: null
    }
  }

  componentDidMount() {

    axios.get(`${process.env.REACT_APP_API}/index`)
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

  render() {

    let exhibitionImages = this.state.exhibitions.map((exhibition) => {
      let imgPath = ''
      if(exhibition.images.length) {
        imgPath = exhibition.images[0].imgPath
      }
      return (
        <div className="exhibitionDetails">
          <ExhibitionItem 
            key = {exhibition._id}
            id = {exhibition._id}
            name = {exhibition.name}
            description = {exhibition.description}
            creator = {exhibition.creator.username}
            image = {imgPath}
          />
        </div>
      )
    })

    return (
      <div>
        <MainLayout>
          <div class="IndexPage">
            <h1 className="Title">All exhibitions</h1>
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

