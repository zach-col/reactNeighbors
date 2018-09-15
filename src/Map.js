import React, { Component}  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import './styles/Home.css';
export class Maps extends Component {

  state = {
    locations: [
          {"id": "01", title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {"id": "02", title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {"id": "03", title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {"id": "04", title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {"id": "05", title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {"id": "06", title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    map: {},
    markers: [],
    query: '',
    searchQueryLocations: []
  };
  
  checkMarkersState(){
    console.log(this.state.markers)
  }

  componentDidMount() {
    this.initMap()
    this.initMarkers()
  }

  initMap(){
      this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    });
    this.setState({map: this.map})
  }
  initMarkers(){
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i< this.state.locations.length; i++) {
      // Get the position from the location array.
      const position = this.state.locations[i].location;
      const title = this.state.locations[i].title;
      // Create a marker per location, and put into markers array.
      const marker = new window.google.maps.Marker({
        position: {lat: this.state.locations[i].location.lat, lng: this.state.locations[i].location.lng},
        title: this.state.locations[i].title,
        animation: window.google.maps.Animation.DROP,
        id: this.state.locations[i].id
      });

      this.setState(prevState => ({
        markers: [...prevState.markers, marker]
      }))


      marker.setMap(this.map);
      bounds.extend(marker.position);
    }
    this.map.fitBounds(bounds);
  }


  render() {
    if (!this.props.google) return <div>Oops something went wrong please try again later</div>
      return (
      <div>
        <div className="container-fluid">
          <span tabIndex="0" style={{fontSize: 30, cursor: 'pointer'}} onClick={this.props.openNav}>&#9776; Neighbors</span>
          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>×</a>
            <span style={{color: 'white', paddingRight: '10px', paddingLeft: '10px'}}>Search</span>
            <input type="text" name="search" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
            {this.state.markers.map((location) => (
              <a key={location.id} className='restaurantName' href={location.title}>
                {location.title}
              </a>
            ))}
          </div>
          <div className="map" id="map">
          </div>
        </div>
        <a href="javascript:void(0)" className="closebtn" onClick={this.checkMarkersState.bind(this)}>check markers state</a>
      </div>
    );
  }

}
export default Maps