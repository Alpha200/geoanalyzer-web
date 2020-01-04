import React from 'react';
import './ClusterEvent.css';
import { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import Map from './Map';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

const convertCoordinates = function(coordinates) {
  return coordinates.map(
    coordinate => [coordinate[1], coordinate[0]]
  );
};

const circlePaint = {
  'circle-color': '#4790E5',
  'circle-radius': 5
};

function ClusterEvent(props) {
  const coordinates = props.event.geopoints.map(point => [point.latitude, point.longitude]);

  const bounds = coordinates.reduce(function(bounds, coord) {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  const convertedBounds = [[bounds.getNorthWest().lat, bounds.getNorthWest().lng], [bounds.getSouthEast().lat, bounds.getSouthEast().lng]];

  const features = convertCoordinates(coordinates).map(coordinate => <Feature key={`feature-${coordinate}`} coordinates={coordinate} />);

  return (
    <Card fluid className="ClusterEvent">
      {/* eslint-disable-next-line react/style-prop-object */}
      <Map style="mapbox://styles/mapbox/streets-v11"
        fitBounds={convertedBounds}
        fitBoundsOptions={{ padding: 20 }}
        interactive={false}
      >
        <Layer type="circle" paint={circlePaint}>
          {features}
        </Layer>
      </Map>
      <Card.Content>
        <Card.Header>Cluster</Card.Header>
        <Card.Meta>Time: {moment(props.event.from).format("HH:mm")} - {moment(props.event.to).format("HH:mm")}</Card.Meta>
        <Card.Meta>Location: {props.event.location}</Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default ClusterEvent;