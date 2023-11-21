import React from 'react';
import './App.css';
import Map from './charts/map.js';
import Bubble_Map from './charts/bubble_map.js';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Visualization of Atlanta Restaurants</h1>
      </header>
      {/* <div style={{ display: 'flex', width: '100%', gap: '10px' }}> */}
        <Map />
        <Bubble_Map />
      {/* </div> */}
    </div>
  );
}

export default App;

