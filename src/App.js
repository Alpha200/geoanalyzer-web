import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import TravelEvent from './TravelEvent';
import GeofenceEvent from './GeofenceEvent';
import ClusterEvent from './ClusterEvent';
import {
  Container,
  Form,
  Grid,
  GridColumn,
  Header,
  Loader,
  Menu,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Login from './Login';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      date: moment().startOf('day'),
      data: null,
      login: null
    };
  }

  loadData () {
    const headers = new Headers();
    console.log(this.state);
    headers.set('Authorization', 'Basic ' + btoa(this.state.login.username + ":" + this.state.login.password));

    fetch(
      `api/device/1/events/${this.state.date.toISOString()}`,
      { method: 'GET', headers }
      )
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  handleDateChange (event, {name, value}) {
   this.setState({ date: moment(value, 'DD-MM-YYYY'), data: null });
   this.loadData();
  }

  loginFinished (username, password) {
    this.setState({ login: { username, password }});
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevState.login == null && this.state.login != null) {
      this.loadData();
    }
  }

  render () {
    if(this.state.login === null) {
      return <Login onLoginFinished={this.loginFinished.bind(this)} />
    }

    let content;

    if (this.state.data !== null) {
      content = this.state.data.map(geoEvent => {
        switch (geoEvent.event_type) {
          case 'geofence':
            return <GeofenceEvent key={`geofence-${geoEvent.from}-${geoEvent.to}`} event={geoEvent} />;
          case 'travel':
            return <TravelEvent key={`travel-${geoEvent.from}-${geoEvent.to}`} event={geoEvent} />;
          case 'cluster':
            return <ClusterEvent key={`travel-${geoEvent.from}-${geoEvent.to}`} event={geoEvent} />;
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
              <Form>
                <DateInput
                  inline
                  name='date'
                  value={this.state.date.format("DD-MM-YYYY")}
                  onChange={this.handleDateChange.bind(this)}
                />
              </Form>
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
