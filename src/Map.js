import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZHNhbHBoYTIwMCIsImEiOiJjamJ6Z3RhenQzbTA2MnFsb3Zqbjg4bmNnIn0.plrNR1gR12RJqFJzSiZxzw',
  interactive: false,
  attributionControl: false,
  logoPosition: 'bottom-right'
});

export default Map;