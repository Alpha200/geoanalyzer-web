import React from 'react';
import './GeofenceEvent.css';
import { Layer, Feature } from 'react-mapbox-gl';
import Map from './Map';
import { Card } from 'semantic-ui-react';
import mapboxgl from 'mapbox-gl';

const geofencePaint = {
  'fill-color': '#4790E5',
  'fill-opacity': 0.6
};

function GeofenceEvent (props) {
  const event = props.event;
  let cardMap;

  if (event.geofence.type === "circle") {
    /* eslint-disable-next-line react/style-prop-object */
    cardMap = <Map style="mapbox://styles/mapbox/streets-v11"
                   center={[event.geofence.center[1], event.geofence.center[0]]}
                   zoom={[12]}
                   fitBoundsOptions={{ padding: 20 }}>
      <Layer type="circle">
        <Feature coordinates={event.geofence.center} />
      </Layer>
    </Map>;
  } else if (event.geofence.type === "polygon") {
    const bounds = event.geofence.points.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(event.geofence.points[0], event.geofence.points[0]));

    const convertedBounds = [[bounds.getNorthWest().lat, bounds.getNorthWest().lng], [bounds.getSouthEast().lat, bounds.getSouthEast().lng]];

    const polygon = event.geofence.points.map(coordinate => [coordinate[1], coordinate[0]]);

    /* eslint-disable-next-line react/style-prop-object */
    cardMap = <Map style="mapbox://styles/mapbox/streets-v11"
                   fitBounds={convertedBounds}
                   fitBoundsOptions={{ padding: 20 }}>
      <Layer type="fill" paint={geofencePaint}>
        <Feature coordinates={polygon} />
      </Layer>
    </Map>;
  }

  return (
    <Card fluid className="GeofenceEvent">
      {cardMap}
      <Card.Content>
        <Card.Header>Geofence {props.geofenceName}</Card.Header>
      </Card.Content>
    </Card>
  );
}

export default GeofenceEvent;