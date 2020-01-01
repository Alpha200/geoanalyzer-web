import React from 'react';
import './App.css';
import TravelEvent from './TravelEvent';

const travelArgs = {
  event: {
  }
};

const coordinates = [
  [51.4644563, 7.1322513],
  [51.4732754, 7.1038306],
  [51.4623416, 7.0602934],
  [51.3296056, 6.8410707]
];

function App() {
  return (
    <div className="App">
      <TravelEvent coordinates={coordinates} />
    </div>
  );
}

export default App;
