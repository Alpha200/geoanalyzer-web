import React from 'react';
import './TravelEvent.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZHNhbHBoYTIwMCIsImEiOiJjamJ6Z3RhenQzbTA2MnFsb3Zqbjg4bmNnIn0.plrNR1gR12RJqFJzSiZxzw'
});

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12
};

const coordinates = [
  [51.4644563, 7.1322513],
  [51.4732754, 7.1038306],
  [51.4623416, 7.0602934],
  [51.3296056, 6.8410707]
];

const converted = coordinates.map(
  coordinate => [coordinate[1], coordinate[0]]
);

console.log(converted);

const bounds = coordinates.reduce(function(bounds, coord) {
  return bounds.extend(coord);
}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

const convertedBounds = [[bounds.getNorthWest().lat, bounds.getNorthWest().lng], [bounds.getSouthEast().lat, bounds.getSouthEast().lng]];

function TravelEvent(props) {
  return (
    <div className="TravelEvent">
      <h1>Travel</h1>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        fitBounds={convertedBounds}
        fitBoundsOptions={{ padding: 20 }}
      >
        <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature coordinates={converted} />
        </Layer>
      </Map>
    </div>
  );
}

export default TravelEvent;