import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Navbar from './Navbar'
import Maps from './Map'
class App extends Component {
  state = {
    locations: [
          {"id": "01", title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {"id": "02", title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {"id": "03", title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {"id": "04", title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {"id": "05", title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {"id": "06", title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    mapsLocations: [1,2,3]
  }

  render() {
    return (
      <div>
        <Navbar locations={this.state.locations}/>
        <Maps mapLocations={this.state.locations} google={this.props.google}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBVoR4zb_hPaWYftpFW1EFWn12SCQePXjo')
})(App)