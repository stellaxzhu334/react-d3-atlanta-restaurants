import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Define marker icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [15, 24], // Size of the icon
    iconAnchor: [7.5, 24], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [15, 15] // Size of the shadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class Map extends Component {
    onMarkerClick = (restaurant) => {
        this.props.onRestaurantSelect(restaurant);
    }

    render() {
        // Use restaurants passed from the parent component instead of local state
        const { restaurants } = this.props;

        return (
            <MapContainer
                center={[33.7756, -84.3963]}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
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
                        eventHandlers={{
                            click: () => this.onMarkerClick(restaurant),
                        }}
                    >
                        <Popup>
                            <div>
                                <h3>{restaurant.restaurant_name}</h3>
                                <p>Address: {restaurant.address}</p>
                                <p>Rating: {restaurant.average_rating}</p>
                                {/* other restaurant information here */}
                            </div>
                        </Popup>
                    </Marker>                
                ))}
            </MapContainer>
        );
    }
}

export default Map;
