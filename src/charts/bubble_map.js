import React, { Component } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class Bubble_Map extends Component {
    render() {
        // Use restaurants passed from the parent component instead of local state
        const { restaurants } = this.props;

        return (
            <MapContainer
                center={[33.7756, -84.3963]}
                zoom={13}
                style={{ height: '600px', width: '100%' }} // Adjust the width as needed
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                /> 

                {restaurants.map((restaurant, index) => (
                    <CircleMarker
                        key={index}
                        center={[restaurant.latitude, restaurant.longitude]}
                        radius={Math.exp(restaurant.average_rating / 2)*2} // Adjust the scaling as needed
                        fillOpacity={0.5}
                        stroke={false}
                        color={`hsla(240, 100%, 50%, ${0.01 + (restaurant.average_rating * 10) * 0.01})`}
                    >
                        <Tooltip direction="top" permanent={false} opacity={0.8}>
                            <div>
                                <h3>{restaurant.restaurant_name}</h3>
                                <p>Num of Reviews: {restaurant.num_of_reviews}</p>
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
