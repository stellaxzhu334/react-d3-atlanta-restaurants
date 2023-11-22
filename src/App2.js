import React, { Component } from 'react';
import './App.css';
import Map from './charts/map.js';
import Bubble_Map from './charts/bubble_map.js';
import CustomBarChart from './charts/barchart.js';
import WordCloudComponent from './charts/wordcloud.js';
import RatingFilter from './components/rating_filter.js';
import * as d3 from 'd3'; // Import d3 library


class App2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // use atlanta_biz_data
            restaurants: [], // Full list of restaurants
            filteredRestaurants: [], // Filtered list based on rating
            selectedRating: 3, // Start with a default rating
            selectedRestaurant:[], // for creating wordcloud
            // use atlanta_biz_rating_percent_data
            ratingPercentages: [], // rating percentages for restaurants
            selectedRatingPercentages: [],
        };
    }

    componentDidMount() {
        this.loadRestaurantCSVData();
        this.loadRatingPercentageCSVData();
    }

    loadRestaurantCSVData() {
        d3.csv(process.env.PUBLIC_URL + '/atlanta_biz_data_after.csv').then((data) => {
            const formattedData = data.map((row) => ({
                restaurant_name: String(row.restaurant_name),
                address: String(row.address),
                latitude: parseFloat(row.latitude),
                longitude: parseFloat(row.longitude),
                num_of_reviews: parseInt(row.num_of_reviews, 10),
                text_processed: String(row.text_processed),
                average_rating: parseFloat(row.average_rating)
            }));
            this.setState({ restaurants: formattedData }, () => { // set restaurants to formattedData
                this.filterRestaurants(this.state.selectedRating);
            });
        }).catch(error => {
            console.error('Error loading the CSV file:', error);
        });
    }

    loadRatingPercentageCSVData() {
        d3.csv(process.env.PUBLIC_URL + '/atlanta_biz_rating_percent_data_after.csv').then((data) => {
            const formattedData = data.map((row) => ({
                restaurant_name: String(row.restaurant_name),
                one: parseFloat(row["1.0"]),
                two: parseFloat(row["2.0"]),
                three: parseFloat(row["3.0"]),
                four: parseFloat(row["4.0"]),
                five: parseFloat(row["5.0"])
            }));
            this.setState({ ratingPercentages: formattedData }, () => { // set ratingPercentages to formattedData
                // this.filterRestaurants(this.state.selectedRestaurant);
            });
        }).catch(error => {
            console.error('Error loading the CSV file:', error);
        });
    }

    onRestaurantSelect = (selectedRestaurantX) => {
        // update selectedRatingPercentages
        const ratingPercentage = this.state.ratingPercentages.find(rating =>
            rating.restaurant_name === selectedRestaurantX.restaurant_name
        );
        if (ratingPercentage) {
            this.setState({ selectedRatingPercentages: ratingPercentage });
        } else {
            console.error(`Rating percentages for ${selectedRestaurantX.restaurant_name} not found.`);
        }

        // update selectedRestaurant
        const selectedRestaurantInMap = this.state.restaurants.find(restaurant =>
            restaurant.restaurant_name === selectedRestaurantX.restaurant_name
        );
        //console.log(selectedRestaurantInMap);
        if (selectedRestaurantInMap) {
            this.setState({ selectedRestaurant: selectedRestaurantInMap }, () => {
                // console.log(this.state.selectedRestaurant);
            });
        } else {
            console.error(`Restaurant data for selected ${selectedRestaurantX.restaurant_name} not found.`);
        }
    }



    filterRestaurants = (rating) => {
        const filteredRestaurants = this.state.restaurants.filter(restaurant => {
            return restaurant.average_rating >= rating && restaurant.average_rating < rating + 1;
        });
        this.setState({ filteredRestaurants });
    }

    handleRatingChange = (newRating) => {
        this.filterRestaurants(parseFloat(newRating));
    };

    handleViewAll = () => {
        // Reset the filteredRestaurants to include all restaurants
        this.setState({ filteredRestaurants: this.state.restaurants });
    };

    render() {
        return (
            <div className="App">
                <header>
                    <h1>After Fake Review Removal</h1>
                </header>
                <RatingFilter onRatingChange={this.handleRatingChange} />
                <button onClick={this.handleViewAll} className="view-all-button" style={{
                    position: 'absolute',
                    top: '10px',
                    right: '250px',
                    zIndex: 1000,
                    fontSize: '20px'
                }}>
                    <b>View All Restaurants</b>
                </button>
                <div className="flex-column-container">
                    <div>
                        <Bubble_Map restaurants={this.state.filteredRestaurants} />
                        <p><b>Bubble Map👆:</b> This visualization provides an overview of restaurant ratings across Atlanta. <br />Higher-rated restaurants are represented by larger and more saturated bubbles, while lower-rated ones appear as smaller and lighter bubbles on the map. <br /> Hover over the bubble to see restaurant-specific information.</p>
                    </div>
                    <div>
                        <Map
                            restaurants={this.state.filteredRestaurants}
                            onRestaurantSelect={this.onRestaurantSelect}
                        />
                    </div>
                    <div className="flex-row-container">
                        <CustomBarChart data={this.state.selectedRatingPercentages} />
                        <WordCloudComponent restaurant={this.state.selectedRestaurant}/>
                    </div>
                    <p> When you click on any marker on the second interactive map, additional information will be displayed in the form of a bar chart and a word cloud. <br /> These visualizations provide a closer look at the distribution of reviews and frequently used words, offering more details and insights.</p>

                </div>
            </div>
        );
    }
}

export default App2;

