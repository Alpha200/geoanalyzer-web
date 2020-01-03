import React from 'react';
import './GeofenceEvent.css';
import { Layer, Feature } from 'react-mapbox-gl';
import Map from './Map';
import { Card } from 'semantic-ui-react';

function GeofenceEvent (props) {
  const coordinate = [props.geofenceCenter[1], props.geofenceCenter[0]];

  return (
    <Card fluid className="TravelEvent">
      {/* eslint-disable-next-line react/style-prop-object */}
      <Map style="mapbox://styles/mapbox/streets-v11" center={coordinate}>
        <Layer type="symbol" id="marker" layout={{'icon-image': 'marker-15'}}>
          <Feature coordinates={coordinate}/>
        </Layer>
      </Map>
      <Card.Content>
        <Card.Header>Geofence {props.geofenceName}</Card.Header>
      </Card.Content>
    </Card>
  );
}

export default GeofenceEvent;