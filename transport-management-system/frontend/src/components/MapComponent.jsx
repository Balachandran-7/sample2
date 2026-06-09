import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const socket = io('http://localhost:5000'); // Connect to backend

const MapComponent = ({ buses = [] }) => {
    const [busLocations, setBusLocations] = useState({});

    useEffect(() => {
        // Initial locations can be passed via props or fetched
        const initialLocs = {};
        buses.forEach(bus => {
            if (bus.currentLocation) {
                initialLocs[bus._id] = bus.currentLocation;
            }
        });
        setBusLocations(initialLocs);

        socket.on('receive_location', (data) => {
            setBusLocations((prev) => ({
                ...prev,
                [data.busId]: { lat: data.lat, lng: data.lng },
            }));
        });

        return () => {
            socket.off('receive_location');
        };
    }, [buses]);

    const defaultCenter = [12.9716, 77.5946]; // Default to Bangalore or college location

    return (
        <MapContainer center={defaultCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {Object.entries(busLocations).map(([busId, location]) => (
                <Marker key={busId} position={[location.lat, location.lng]}>
                    <Popup>
                        Bus ID: {busId}
                    </Popup>
                </Marker>
            ))}
            {/* Render static bus locations if no live data yet */}
            {buses.map(bus => (
                bus.currentLocation && bus.currentLocation.lat && (
                    <Marker key={bus._id} position={[bus.currentLocation.lat, bus.currentLocation.lng]}>
                        <Popup>{bus.busNumber} - {bus.route?.routeName}</Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
};

export default MapComponent;
