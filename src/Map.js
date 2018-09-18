import React, { Component}  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import './styles/Home.css';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
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
    searchQueryLocations: [],
    infoWindow: {}
  };

  checkMarkersState(){
    console.log(this.state.markers)
    console.log(this.state.searchQueryLocations)
  }

  componentDidMount() {
    this.initMap()
    this.initMarkers()
    this.setState({searchQueryLocations: this.state.locations})
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
      // set markers infowindow
      marker.infowindow = new window.google.maps.InfoWindow({
        content: marker.title,
        animation: window.google.maps.Animation.DROP
      });
      // populate marker infowindow on marker click
      marker.addListener('click', () => {
        this.populateInfoWindow(marker)
      });
      // stop marker bounce on marker click
      marker.infowindow.addListener('closeclick', () => {
        marker.setAnimation(null);
      });
      // set markers state
      this.setState(prevState => ({
        markers: [...prevState.markers, marker]
      }))

      marker.setMap(this.map);
      bounds.extend(marker.position);
    }

    this.map.fitBounds(bounds);
  }

  populateInfoWindow = (marker) => {
        // set clicked marker to selected place then check if its active marker
        this.setState(this.state.selectedPlace: marker)
        if(this.state.selectedPlace === this.state.activeMarker){
          return 
        }
        // show info window of clicked marker and close all others
        else if(this.state.selectedPlace !== this.state.activeMarker){
          for (var i = 0; i < this.state.markers.length; i++) {
            if(marker === this.state.markers[i] ){
              // bounce marker
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
              marker.infowindow.open(this.map, marker);
              this.setState({activeMarker: marker})

            } else{
                // close info window
                this.state.markers[i].infowindow.close();
                // stop bouncing
                this.state.markers[i].setAnimation(null);
            }
          }
        }    
  }


  updateQuery = (query) => {
    var largeInfoWindow = new window.google.maps.InfoWindow();
    this.setState({ query: query.trim() })
      for (var i = 0; i < this.state.markers.length; i++) {
        this.state.markers[i].setVisible(false);
      }

      let showingLocations
      const match = new RegExp(escapeRegExp(query), 'i')
      showingLocations = this.state.markers.filter((location) => match.test(location.title))
      this.setState({searchQueryLocations: showingLocations})
      this.setState({markers: showingLocations})
  }

    hrefMarkerLink = (index) => {
        window.google.maps.event.trigger(this.state.markers[index], 'click');

    }

  render() {
    if (!this.props.google) return <div>Oops something went wrong please try again later</div>
      return (
      <div>
        <div className="container-fluid">
          <span tabIndex="0" style={{fontSize: '6vh', cursor: 'pointer'}} onClick={this.props.openNav}>&#9776; Neighbors</span>
          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>×</a>
            <span style={{color: 'white', paddingRight: '10px', paddingLeft: '10px'}}>Search</span>
            <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
            {this.state.markers.map((location, index) => (
              <a key={location.id} className='restaurantName' onClick={(event) => this.hrefMarkerLink(index)}>
                {location.title}
              </a>
            ))}
          </div>
          <div className="map" id="map">
          </div>
        </div>
      </div>
    );
  }

}
export default Maps