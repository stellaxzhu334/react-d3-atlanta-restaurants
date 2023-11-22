import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import App1 from './App1';
import App2 from './App2';
import App3 from './App3';
import App4 from './App4';
import * as d3 from 'd3';

class App extends Component {
  // ... your existing code

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            
            <nav className="site-nav">
              <ul className="group">
                <li><a href="/about">Description</a></li>
                <li><a href="/before">Before</a></li>
                <li><a href="/after">After</a></li>
                <li><a href="/change">Change</a></li>
              </ul>
            </nav>
          </header>
          <div className="flex-column-container">
            <Routes>
              <Route path="/about" element={<App3 />} />
              <Route path="/before" element={<App1 />} />
              <Route path="/after" element={<App2 />} />
              <Route path="/change" element={<App4 />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
