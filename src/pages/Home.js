import React from 'react'
import {Link} from "react-router-dom";
import MainLayout from "../layout/MainLayout";

// import stylesheet
import "../stylesheets/Home.css";

export default function Home() {
  return (
    <div>
      <MainLayout>
        <div className="Home">
          <div className="side-bar">
            <Link to="/background">
              Create exhibition
            </Link>
          </div>
          <div className="iframe-container">
            <iframe className= "iframe" src="https://poly.google.com/view/ab0SP8HCU57/embed" frameborder="0" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>        
          </div>
          <div className="side-bar">
            <Link to="/index">
              Browse exhibitions
            </Link>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}
