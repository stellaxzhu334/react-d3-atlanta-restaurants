// About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div>
      
      <header>
        <h1>Visualization of Atlanta Restaurants</h1>
      </header>

      <div className="content-area group">
        <div className="container">
          <div className="main-area">
            <h2>Introduction</h2>
            <p>&nbsp;&nbsp; This website is dedicated to providing users with more trustworthy ratings and customized restaurant selection methods. The website is designed for users who want to find satisfying restaurants in Atlanta.</p>
            <h2>How to Use</h2>
            {/* <p>&nbsp;&nbsp;When users click the 'Before/After' button, they gain insight into the ratings both before and after the removal of fake reviews. Clicking the 'Change' button allows users to observe how the ratings are altered following the removal of fake reviews. This visualization significantly enhances the comparative analysis of the impact of fake review removal.</p> */}
            <p>&nbsp;&nbsp;For the bubble map, users can move their mice on the circles which denote restaurants on the map. The information panel will show average rating for the selected restaurant. Circles are with different color and size. Circles for higher ratings restaurants are with dark colors and larger size.</p>
            <p>&nbsp;&nbsp;For the second interactive map, users can click on any marker to gain additional information of a restaruant. The information will be displayed in the form of a bar chart and a word cloud. These visualizations provide a closer look at the distribution of reviews and frequently used words, offering more details and insights.</p>
            {/* <h2>Contact Us</h2>
            <p>XXX, XXX</p>
            <p>Xin He, xhe383@gatech.edu</p>
            <p>XXX, XXX</p>
            <p>XXX, XXX</p>
            <p>XXX, XXX</p> */}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default About;
