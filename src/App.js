import React, { Component } from 'react';
import Navbar from './Navbar'
import Maps from './Map'

class App extends Component {
  state = {
    locations: [
      {
        "id": "01",
        "title": "Park Ave Penthouse",
        "lat": "40.7713024",
        "lng": "-73.9632393"
      },
      {
        "id": "02",
        "title": "Chelsea Loft",
        "lat": "40.7444883",
        "lng": "-73.9949465"
      },
      {
        "id": "03",
        "title": "Union Square Open Floor Plan",
        "lat": "40.7347062",
        "lng": "-73.9895759"
      },
      {
        "id": "04",
        "title": "East Village Hip Studio",
        "lat": "40.7281777",
        "lng": "-73.984377"
      },
      {
        "id": "05",
        "title": "TriBeCa Artsy Bachelor Pad",
        "lat": "40.7195264",
        "lng": "-74.0089934"
      }
    ]
  }



  render() {
    return (
      <div>
        <Navbar locations={this.state.locations}/>
      </div>
    )
  }
}

export default App;