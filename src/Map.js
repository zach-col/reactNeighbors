import React, { Component}  from 'react';
import GoogleMapReact from "google-map-react";

const InfoWindow = ({ InfoTitle }) => <div><p className="infoTitle">{InfoTitle}</p></div>;


class Map extends Component {

  static defaultProps = {
    center: {
      lat: 40.7413549,
      lng: -73.9980244
    },
    zoom: 11
  }

  render() {
    return (

      <div style={{ height: '92vh', width: '100%'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <InfoWindow
            lat={40.7444883}
            lng={-73.9949465}
            InfoTitle={'Chicken'}
          />
          <InfoWindow
            lat={40.7347062}
            lng={-73.9895759}
            InfoTitle={'Pizza'}
          />
        </GoogleMapReact>
      </div>

    )
  }
}

export default Map