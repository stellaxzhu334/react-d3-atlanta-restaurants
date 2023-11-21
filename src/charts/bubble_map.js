import React, { Component } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3'; // Import d3 library


class Bubble_Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        };
    }

    componentDidMount() {
        // Load the CSV data when the component mounts
        this.loadCSVData();
    }

    loadCSVData() {
        // Use d3.csv to load the CSV data
        d3.csv(process.env.PUBLIC_URL + '/atlanta_biz_data.csv').then((data) => {
            console.log('First Row:', data[0]);

            // Convert the columns to the specified data types
            const formattedData = data.map((row) => ({
                restaurant_name: String(row.restaurant_name), // Convert to string
                address: String(row.address), // Convert to string
                latitude: parseFloat(row.latitude), // Convert to float
                longitude: parseFloat(row.longitude), // Convert to float
                num_of_reviews: parseInt(row.num_of_reviews, 10), // Convert to integer
                text_processed: String(row.text_processed), // Convert to string
                average_rating: parseFloat(row.average_rating) // Convert to float
            }));

            // Assuming that the CSV data structure matches your restaurant data
            this.setState({ restaurants: formattedData });
        }).catch(error => {
            console.error('Error loading the CSV file:', error);
        });
    }

    render() {
        const { restaurants } = this.state;

        return (
            <MapContainer
                center={[33.7756, -84.3963]}
                zoom={12}
                style={{ height: '300px', width: '30%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                /> 

                {restaurants.map((restaurant, index) => (
                    <CircleMarker
                        key={index}
                        center={[restaurant.latitude, restaurant.longitude]}
                        radius={Math.exp(restaurant.average_rating / 2)}
                        fillOpacity={0.5}
                        stroke={false}
                        color={`hsla(240, 100%, 50%, ${0.01 + (restaurant.average_rating * 10) * 0.01})`}
                    >
                        <Tooltip direction="top" permanent={false} opacity={0.8}>
                            <div>
                                <h3>{restaurant.restaurant_name}</h3>
                                <p>Rating: {restaurant.average_rating}</p>
                                {/* Add other restaurant information here */}
                            </div>
                        </Tooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        );
    }
}

export default Bubble_Map;
