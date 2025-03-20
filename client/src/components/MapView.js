import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ locations, locationType }) => {
  const [position, setPosition] = useState([0.3476, 32.5825]); // Default: Kampala
  const [zoom, setZoom] = useState(7);
  
  // Try to get user's position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          setZoom(10);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);
  
  return (
    <div className="map-container" style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations && locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.location.coordinates[1], location.location.coordinates[0]]}
          >
            <Popup>
              <div>
                <h4>{location.name}</h4>
                <p>{location.address}</p>
                <p><strong>District:</strong> {location.district}</p>
                <p><strong>Contact:</strong> {location.contactPhone}</p>
                <p><strong>Hours:</strong> {location.operatingHours}</p>
                
                {locationType === 'vaccination' && (
                  <p><strong>Available Vaccines:</strong> {location.availableVaccines.join(', ')}</p>
                )}
                
                {locationType === 'testing' && (
                  <>
                    <p><strong>Test Types:</strong> {location.testTypes.join(', ')}</p>
                    <p><strong>Result Wait Time:</strong> {location.resultWaitTime}</p>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
