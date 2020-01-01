import React from 'react';
import './TravelEvent.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import mapConf from './MapConf'

const Map = ReactMapboxGl({
  accessToken: mapConf.accessToken
});

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 9
};

const convertCoordinates = function(coordinates) {
  return coordinates.map(
    coordinate => [coordinate[1], coordinate[0]]
  );
};

function TravelEvent(props) {
  const coordinates = props.coordinates;

  const bounds = coordinates.reduce(function(bounds, coord) {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  const convertedBounds = [[bounds.getNorthWest().lat, bounds.getNorthWest().lng], [bounds.getSouthEast().lat, bounds.getSouthEast().lng]];

  return (
    <div className="TravelEvent">
      <h1>Travel</h1>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        fitBounds={convertedBounds}
        fitBoundsOptions={{ padding: 20 }}
        interactive={false}
      >
        <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature coordinates={convertCoordinates(coordinates)} />
        </Layer>
      </Map>
    </div>
  );
}

export default TravelEvent;