import React from 'react';
import './GeofenceEvent.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapConf from './MapConf'

const Map = ReactMapboxGl({
  accessToken: mapConf.accessToken
});

function GeofenceEvent(props) {
  const coordinate = [props.geofenceCenter[1], props.geofenceCenter[0]];

  return (
    <div className="TravelEvent">
      <h1>Geofence</h1>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        interactive={false}
        center={coordinate}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={coordinate} />
        </Layer>
      </Map>
    </div>
  );
}

export default GeofenceEvent;