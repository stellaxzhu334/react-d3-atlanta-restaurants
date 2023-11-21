import React from 'react';
import './App.css';
import Map from './charts/map.js';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Visualization of Atlanta Restaurants</h1>
      </header>
      <Map />
    </div>
  );
}

export default App;

