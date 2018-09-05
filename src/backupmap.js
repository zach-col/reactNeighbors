import React, { Component}  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
export class Maps extends Component {
  render() {
        const style = {
          width: '100%',
          height: '92vh'
        }
    return (

        <Map
          google={this.props.google}
          style={style}
          center={{
            lat: 40.7413549,
            lng: -73.9980244
          }}
          zoom={13}
          onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBVoR4zb_hPaWYftpFW1EFWn12SCQePXjo')
})(Maps)