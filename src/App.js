import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import TravelEvent from './TravelEvent';
import GeofenceEvent from './GeofenceEvent';


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      date: moment().startOf('day'),
      data: []
    };
  }

  loadData() {
    fetch(`http://localhost:5000/events/${this.state.date.toISOString()}`)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  nextDay() {
    this.setState({date: this.state.date.add(1, "day"), data: []});
    this.loadData();
  }

  prevDay() {
    this.setState({date: this.state.date.subtract(1, "day"), data: []});
    this.loadData()
  }

  componentDidMount () {
    this.loadData();
  }

  render () {
    return (
      <div className="App">
        <h1>{this.state.date.format("D. MMMM YYYY")}</h1>
        <button onClick={this.prevDay.bind(this)}>Previous day</button> <button onClick={this.nextDay.bind(this)} >Next day</button>
        {this.state.data.map(geoEvent => {
          switch (geoEvent.event_type) {
            case "geofence":
              const center = geoEvent.geopoints[0];
              return <GeofenceEvent geofenceCenter={[center.latitude, center.longitude]}/>;
            case "travel":
              const mappedPoints = geoEvent.geopoints.map(point => [point.latitude, point.longitude]);
              return <TravelEvent coordinates={mappedPoints} />;
            default:
              return <div className={"unknown-event-type"}>Unknown event type!</div>
          }
        })
        }
      </div>
    );
  }
}

export default App;
