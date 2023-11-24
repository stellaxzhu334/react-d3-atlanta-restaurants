import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';


class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            
            <nav className="site-nav">
              <ul className="group">
                <li><a href="/about">About</a></li>
                <li><a href="/home">Home</a></li>
              </ul>
            </nav>
          </header>
          <div className="flex-column-container">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
