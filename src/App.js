import React, { Component } from 'react';
import GoogleMapLocations from './Locations'

class App extends Component {
  state = {
    locations: [
      {
        "id": "01",
        "title": "pseudo ville",
        "lat": "1111.1111",
        "lng": "122435.3"
      },
      {
        "id": "02",
        "title": "simple ville",
        "lat": "1111.1111",
        "lng": "122435.3"
      },
      {
        "id": "03",
        "title": "Beta ville",
        "lat": "1111.1111",
        "lng": "122435.3"
      }
    ]
  }
  render() {
    return (
      <div>
        <GoogleMapLocations locations={this.state.locations} />
      </div>
    )
  }
}

export default App;