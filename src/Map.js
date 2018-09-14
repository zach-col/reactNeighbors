import React, { Component}  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import './styles/Home.css';
export class Maps extends Component {

  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    map: {},
    newMarkers: []
  };

  componentDidMount() {

    this.initMap()
  }
  initMap(){

    const markers = []
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    });
    this.setState({map: map})
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i< this.props.mapLocations.length; i++) {
      // Get the position from the location array.
      var position = this.props.mapLocations[i].location;
      var title = this.props.mapLocations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new window.google.maps.Marker({
        position: {lat: this.props.mapLocations[i].location.lat, lng: this.props.mapLocations[i].location.lng},
        title: this.props.mapLocations[i].title,
        animation: window.google.maps.Animation.DROP,
        id: this.props.mapLocations[i].id
      });
      markers.push(marker);
      var newMarkers = this.state.newMarkers
      this.setState(newMarkers: markers);
      marker.setMap(map);
      bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
  }

  render() {
    console.log(this.state.newMarkers)
    if (!this.props.google) return <div>Loading</div>
      return (
      <div>
        <div className="container-fluid">
          <div className="map" id="map">
          </div>
        </div>
      </div>
    );
  }

}
export default Maps