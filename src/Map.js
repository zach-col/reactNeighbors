import React, { Component}  from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import './styles/Home.css';
export class Maps extends Component {

  // state
  state = {
    locations: [
          {"id": "01", title: 'Park Ave Penthouse', info: 'no', location: {lat: 40.7713024, lng: -73.9632393}},
          {"id": "02", title: 'Chelsea Loft', info: 'yes', location: {lat: 40.7444883, lng: -73.9949465}},
          {"id": "03", title: 'Union Square Open Floor Plan', info: 'yeah', location: {lat: 40.7347062, lng: -73.9895759}},
          {"id": "04", title: 'East Village Hip Studio', info: 'yup', location: {lat: 40.7281777, lng: -73.984377}},
          {"id": "05", title: 'TriBeCa Artsy Bachelor Pad', info: 'yes', location: {lat: 40.7195264, lng: -74.0089934}},
          {"id": "06", title: 'Chinatown Homey Space', info: 'no', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    map: {},
    markers: [],
    query: '',
    searchQueryLocations: [],
    infoWindow: {},
    locationName: '',
    locationAddress: '',
    locationUsersSignedIn: "",
    isLoaded: false,
    show: false
  };

  // bootstrap modal
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // close bootstrap modal
  handleClose() {
    this.setState({ show: false });
  }

  // open bootstrap modal
  handleShow() {
    this.setState({ show: true });
  }

  // google failure message

  gm_authFailure(){
      alert("You Must Enter A Valid Google API Key")
  }

  // load map and markers on init load
  componentDidMount() {
    this.initMap()
    window.gm_authFailure = this.gm_authFailure;
    this.initMarkers()
    this.setState({searchQueryLocations: this.state.locations})
  }

  // load map
  initMap(){
      this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    })
    this.setState({map: this.map})
  }

  // fetch foursquare data
  markerDemo(marker){
    const searchQuery = marker.title
    // replace with your own Foursquare id and client secret
    const start = 'https://api.foursquare.com/v2/venues/explore?client_id=PLACE_CLIENT_ID_HERE&client_secret=PLACE_CLIENT_SECRET_HERE&v=20180323'
    const near = '&near=new york'
    const query = '&query=' + searchQuery
    const limit = '&limit=1'
    const fourSquareUrl = start + near + query + limit
    return  fetch(fourSquareUrl)
    .then((res) => { return res.json()})
    .then((result) => {
      const locationName = result['response']['groups'][0].items[0].venue.name
      const locationAddress = result['response']['groups'][0].items[0].venue.location.address + ", " + result['response']['groups'][0].items[0].venue.location.city
      const locationUsersSignedIn = result['response']['groups'][0].items[0].venue.hereNow.summary
      this.setState({locationName})
      this.setState({locationAddress})
      this.setState({locationUsersSignedIn})
      console.log(result['response']['groups'][0].items[0].venue)
      // open pop up modal
      this.handleShow();
    })
    .catch(function(e) {
        console.log("check your foursquare API", e)
    });
  }

  // load markers
  initMarkers(){

    var bounds = new window.google.maps.LatLngBounds();

    for (var i = 0; i< this.state.locations.length; i++) {
      // Create a marker per location, and put into markers array.
      const marker = new window.google.maps.Marker({
        position: {lat: this.state.locations[i].location.lat, lng: this.state.locations[i].location.lng},
        title: this.state.locations[i].title,
        info: this.state.item,
        animation: window.google.maps.Animation.DROP,
        id: this.state.locations[i].id
      });
      // set markers infowindow
      marker.infowindow = new window.google.maps.InfoWindow({
        content: marker.title + "</br>" + marker.info ,
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
    this.markerDemo(marker)
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
          setTimeout(function(){ marker.setAnimation(null); }, 750);

          this.setState({activeMarker: marker})

        } else{
            // stop bouncing
            this.state.markers[i].setAnimation(null);
        }
      }
    }    
  }

  // update search query state
  updateQuery = (query) => {
    this.setState({ query: query})
  }

  // close all infowindows and stop animation
  closeAllInfoWindows(){
    for (var i = 0; i < this.state.markers.length; i++) {
      // close info window
      this.state.markers[i].infowindow.close();
      // stop bouncing
      this.state.markers[i].setAnimation(null);
    }
  }

  /* show marker infowindow and animate if you click marker link */
  hrefMarkerLink = (marker) => {
    this.closeAllInfoWindows()
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 750);
    this.markerDemo(marker)
  }

  // close popup modal
  close() {
    this.setState({ showModal: false });
  }

  // open popup modal
  open() {
    this.setState({ showModal: true });
  }

  render() {
    if (!this.props.google) return <div>Oops something went wrong please try again later</div>
    {/* show all locations in nav by default */}
    const search = []
    for (var i = 0; i < this.state.markers.length; i++) {
      const title = this.state.markers[i].title
      if(title.toLowerCase().includes(this.state.query.toLowerCase()) || title.toLowerCase().includes(this.state.query)){
          search.push(this.state.markers[i])
      } else {

      }
    }

    {/* show all markers on map by default */}
    if(this.state.query){
      for (var i = 0; i < this.state.markers.length; i++) {
        {/* show marker if it matches search query */}
        if(this.state.markers[i].title.toLowerCase().includes(this.state.query.toLowerCase()) ||this.state.markers[i].title.includes(this.state.query)){
          this.state.markers[i].setVisible(true);
        } else {
          {/* hide marker if it does not match search query*/}
          this.state.markers[i].setVisible(false)
          this.state.markers[i].infowindow.close();
        }
      }
    } else {
    { /* if there is no query load all markers */}
      for (var z = 0; z < this.state.markers.length; z++) {
        this.state.markers[z].setVisible(true)
      }
    }

      return (
      <div>
        <div className="container-fluid">
          {/* navbar button */}
          <span tabIndex="0" style={{fontSize: '6vh', cursor: 'pointer'}} onClick={this.props.openNav}>&#9776; Neighbors</span>
          { this.state.item }
          {/* navigation menu */}
          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>×</a>
            <span style={{color: 'white', paddingRight: '10px', paddingLeft: '32px'}}>Search</span>
            {/* search input */}
            <input type="text" className="navSearchBar" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
            {search.map((location) => (
              <a href="#" key={location.id} className='restaurantName' onClick={(event) => this.hrefMarkerLink(location)}>
                {location.title}
              </a>
            ))}
            {/* made with info icons */}
            <p className="navInfo">Made with</p>
            <a href="https://developers.google.com/maps/documentation/javascript/tutorial"  rel="noopener noreferrer" target="_blank" className="fa fa-google" style={{fontSize: '36px', color:'#5498f6', display: 'inline-block'}}></a>&nbsp;&nbsp;&#43;
            <a href="https://developer.foursquare.com/docs/api" rel="noopener noreferrer" target="_blank" className="fa fa-foursquare" style={{fontSize: '36px', color:'#e74578', display: 'inline-block'}}></a>
          </div>
          <div className="map" id="map" role="application">
          </div>
        </div>

        {/* bootstrap popup modal */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Created with Foursquare</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.state.locationName} details</h4>
            <p>Address: {this.state.locationAddress}</p>
            <p>Users Signed In: { this.state.locationUsersSignedIn }</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

}
export default Maps