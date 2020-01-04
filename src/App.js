import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import TravelEvent from './TravelEvent';
import GeofenceEvent from './GeofenceEvent';
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  GridColumn,
  Header,
  Loader,
  Menu,
} from 'semantic-ui-react';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      date: moment().startOf('day'),
      data: null
    };
  }

  loadData () {
    fetch(`http://localhost:5000/events/${this.state.date.toISOString()}`)
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  nextDay () {
    this.setState({date: this.state.date.add(1, 'day'), data: null});
    this.loadData();
  }

  prevDay () {
    this.setState({date: this.state.date.subtract(1, 'day'), data: null});
    this.loadData();
  }

  componentDidMount () {
    this.loadData();
  }

  render () {
    let content;

    if (this.state.data !== null) {
      content = this.state.data.map(geoEvent => {
        switch (geoEvent.event_type) {
          case 'geofence':
            return <GeofenceEvent key={`geofence-${geoEvent.from}-${geoEvent.to}`} event={geoEvent} />;
          case 'travel':
            const mappedPoints = geoEvent.geopoints.map(point => [point.latitude, point.longitude]);
            return <TravelEvent key={`travel-${geoEvent.from}-${geoEvent.to}`} coordinates={mappedPoints}
                                distance={geoEvent.distance}/>;
          default:
            return <div key={`unknown-${geoEvent.from}-${geoEvent.to}`} className={'unknown-event-type'}>Unknown event
              type!</div>;
        }
      });
    } else {
      content = <div/>;
    }

    return (
      <div className="App">
        <Menu>
          <Menu.Item header>Geoanalyzer</Menu.Item>
          <Menu.Item
            name='day'
            active={true}
          >Day</Menu.Item>
        </Menu>
        <Container>
          <Loader active={this.state.data == null}/>
          <Grid stackable>
            <GridColumn width={6}>
              <Header as='h2' content={this.state.date.format('D. MMMM YYYY')} textAlign='center'/>
              <ButtonGroup widths={'2'}>
                <Button
                  onClick={this.prevDay.bind(this)}>Previous day</Button>
                <Button
                  onClick={this.nextDay.bind(this)}
                  disabled={moment().isBefore(moment(this.state.date).add(1, 'day'))}>Next day</Button>
              </ButtonGroup>
            </GridColumn>
            <GridColumn width={10}>
              {content}
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
