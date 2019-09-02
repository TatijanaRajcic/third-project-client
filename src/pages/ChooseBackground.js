import React, { Component, Suspense, lazy } from 'react';
import '../stylesheets/ChooseBackground.css';
import MainLayout from "../layout/MainLayout";
const BgItem = React.lazy(() => import('../components/BgItem'));


export default class ChooseBackground extends Component {

  constructor(props) {
    super(props)
    this.state = {
      backgrounds: [67203,4537166810054656,5223009199587328,93375,5801016771477504,5698198140092416,120402,499450,657422,280349,5733748926578688,4630494771675136,5930532919574528,626640,4593526780198912,140446,5370793319989248]
    }
  }

  render() {

    let allBackgrounds = this.state.backgrounds.map((background) => {
      return (
        <>
          <BgItem 
            {...this.props} // the same as writing: history= {this.props.history}, match = {this.props.match}
            embedUrl = {`https://www.svrf.com/embed/vr/${background}`}
          />
        </>
      )
    })

    return (
      <MainLayout>
        <div className="ChooseBackground">
          <h1>step 1 / choose background</h1>
          <div className="backgrounds-container">
            <Suspense fallback={<div>Loading...</div>}>
              {allBackgrounds}
            </Suspense>
          </div>
        </div>          
      </MainLayout>
    )
  }
  
}


// -------------------------- WITH THE QUERY --------------------------------

// import React, { Component } from 'react';
// import BgItem from '../components/BgItem';
// import '../stylesheets/ChooseBackground.css';
// import MainLayout from "../layout/MainLayout";
// import {Link} from "react-router-dom";

// const Svrf = require('svrf');
// const svrf = new Svrf(process.env.SVRF_KEY);

// export default class ChooseBackground extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       backgrounds: [], 
//       query: ''
//     }

//     this.handleFormSubmit = this.handleFormSubmit.bind(this);

//   }

//   componentDidMount() {

//     svrf.media.getTrending({type: Svrf.enums.mediaType.PHOTO})
//       .then((res) => {
//         const mediaArray = res.media;
//         this.setState({backgrounds:mediaArray})
//       })
//       .catch((err) => console.error(err));

//   }

//   handleFormChange = (e)=> {
//     this.setState({ 
//       query: e.target.value
//     })
//   }

//   handleFormSubmit = (e)=> {

//     e.preventDefault(); // disable the default form behavious (redirecting to a new page)

//     const query = this.state.query;
//     const options = {
//       type: Svrf.enums.mediaType.VIDEO,
//     };

//     svrf.media.search(query, options)
//       .then((res) => {
//         const mediaArray = res.media;
//         this.setState({backgrounds:mediaArray})
//       })
//       .catch((err) => console.error(err));

//   }

//   render() {

//     let allBackgrounds = this.state.backgrounds.map((background) => {
//       return (
//         <div>
//           <BgItem 
//             embedUrl = {background.embedUrl}
//           />
//         </div>
//       )
//     })

//     return (
//       <MainLayout>

//         <div className="ChooseBackground">

//           <h1>STEP 1: CHOOSE THE VENUE OF YOUR EXHIBITION</h1>

//           <form onSubmit={this.handleFormSubmit}>{/* we don't want the default form submitting behaviour, so we're adding own submit handler   */}
//             <div>
//               <input type="text" name="background" placeholder="Search for a background" value={this.state.query} onChange={this.handleFormChange} /> {/* reacts wants to be in charge of all the data   */}
//             </div>
//             <div>
//               <input type="submit" value="Look for a inspirational background" />
//             </div>
//           </form>

//           <div className="allBackgrounds">
//             {allBackgrounds}
//           </div>
        
//         </div>

//       </MainLayout>
//     )
//   }
  
// }