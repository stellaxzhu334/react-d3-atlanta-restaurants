import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as d3 from 'd3'; // Import d3 library

class Map extends Component {
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
        d3.csv(process.env.PUBLIC_URL + '/atlanta_data.csv').then((data) => {
            console.log('First Row:', data[0]);

            // Convert the columns to the specified data types
            const formattedData = data.map((row) => ({
                name_y: String(row.name_y), // Convert to string
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
                center={[33.773652, -84.35368489999999]}
                zoom={12}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {restaurants.map((restaurant, index) => {
                    console.log('Latitude:', restaurant.latitude);
                    console.log('Longitude:', restaurant.longitude);

                    // return (
                        // <Marker
                        //     key={index}
                        //     position={[restaurant.latitude, restaurant.longitude]}
                        // >
                        // </Marker>
                    // );
                }
                    //   <Marker
                    //     key={index}
                    //     position={[restaurant.latitude, restaurant.longitude]}
                    //   >
                    //     <Popup>
                    //       <div>
                    //         <h2>{restaurant.name_y}</h2>
                    //         <p>Rating: {restaurant.average_rating}</p>
                    //         {/* Add other restaurant information here */}
                    //       </div>
                    //     </Popup>
                    //   </Marker>
                )}
            </MapContainer>
        );
    }
}

export default Map;
