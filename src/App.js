import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Maps from './Map'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './styles/Home.css';
class App extends Component {

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    console.log("clicked")
  }

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
  apiKey: ('AIzaSyBVoR4zb_hPaWYftpFW1EFWn12SCQePXjo')
})(App)