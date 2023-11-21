import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as d3 from 'd3'; // Import d3 library

// define marker icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [15, 24], // Size of the icon
    iconAnchor: [7.5, 24], // Point of the icon which will correspond to marker's location
    popupAnchor: [0,-20], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [15, 15] // Size of the shadow
});

L.Marker.prototype.options.icon = DefaultIcon;

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
                zoom={13}
                style={{ height: '500px', width: '70%' }}
            >

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            /> 

            {restaurants.map((restaurant, index) => (
                <Marker
                    key={index}
                    position={[restaurant.latitude, restaurant.longitude]}
                    icon={DefaultIcon}
                >
                    <Popup>
                        <div>
                            <h3>{restaurant.restaurant_name}</h3>
                            <p>Rating: {restaurant.average_rating}</p>
                            {/* Add other restaurant information here */}
                        </div>
                    </Popup>
                </Marker>                
            ))}
            </MapContainer>
        );
    }
}

export default Map;
