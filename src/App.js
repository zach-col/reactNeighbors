import React, { Component } from 'react';
import Navbar from './Navbar'
import Map from './Map'

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
        <Navbar locations={this.state.locations} />
        <Map />
      </div>
    )
  }
}

export default App;