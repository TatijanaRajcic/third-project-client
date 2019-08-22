import React, { Component } from 'react';
import axios from "../utils/axios";
import MainLayout from "../layout/MainLayout";
import ExhibitionItem from "../components/ExhibitionItem";
import "../stylesheets/Favorites.css";
import Auth from "../utils/Auth";
const auth = new Auth();

export default class Favorites extends Component {

  constructor(props){
    super(props);

    this.state = { 
      exhibitions: [],
      error: null
    }
  }

  componentDidMount() {

    axios.get(`${process.env.REACT_APP_API}/exhibition/own-favorites`)
      .then((response)=>{
        this.setState({exhibitions:response.data})
      })
      .catch((error)=>{
        this.setState({error:error})
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
            // CHANGER CE BOUT DE CODE PR POUVOIR ACCEDER AUX PROPERTIES DE L'OBJECT EXHIBITION.IMAGES[0]
            image = {exhibition.images[0].imgPath}
            // https://www.svrf.com/storage/svrf-previews/4537166810054656/images/thumbStandard.jpg
          />
        </div>
      )
    })

    return (
      <div>
        <MainLayout>
          <div className="FavoritesPage">
            <h1>Here are your favorites, {user.username} !</h1>
            <div className="allExhibitions">
              {exhibitionImages}
            </div>
          </div>
        </MainLayout>
      </div>
    )
  }
}

