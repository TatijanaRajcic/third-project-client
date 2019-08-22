import React from 'react'
import "../stylesheets/Home.css";
import {Link} from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <div>
      <MainLayout>
        <div className="Home">
          <div className="LeftSideBar">
            <Link to="/background">
              Create exhibition
            </Link>
          </div>

          <div className="Empty">
          </div>

          <div className="HomeIframe">
            <iframe className= "Fullscreen" src="https://poly.google.com/view/ab0SP8HCU57/embed" frameborder="0" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>        
          </div>
          <div className="RightSideBar">
            <Link to="/index">
              Browse exhibitions
            </Link>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}
