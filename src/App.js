import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react'
import Maps from './Map'
import './styles/Home.css';

class App extends Component {
  // open navigation button
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    console.log("clicked")
  }
  // close navigation button
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


  render() {
    return (
      <div>
        <Maps google={this.props.google} closeNav={this.closeNav} openNav={this.openNav}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  // replace with your own Google Maps API Key
  apiKey: ('PLACE_GOOGLE_API_KEY_HERE')
})(App)