import React, { Component}  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
export class Maps extends Component {
  state= {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>{
    console.log("this is props " + this.state.selectedPlace)
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
  }

  onInfowWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })

  onMapClicked = () => {
    if(this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      })
  }




  render() {


const newList = this.props.searchLocations.map((location) => 

            <Marker
              key={location.id}
              name={location.title}
              onClick={this.onMarkerClick}
              position={{ lat: location.lat, lng: location.lng}}
            />
          )

    if (!this.props.loaded) return <div>Loading</div>
      return (
        <div>
        <Map
          className="map"
          google={this.props.google}
          onClick={this.onMapCLicked}
          initialCenter={{
            lat: 40.7413549, lng: -73.9980244
          }}
          style={{height: '92vh', position: 'relative', width: '100%'}}
          zoom={13}>

          {this.props.searchLocations.map((location) => (
            <Marker
              key={location.id}
              name={location.title}
              onClick={this.onMarkerClick}
              position={{ lat: location.lat, lng: location.lng}}
            />
          ))}


        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <p>{this.state.selectedPlace.name}</p>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBVoR4zb_hPaWYftpFW1EFWn12SCQePXjo')
})(Maps)