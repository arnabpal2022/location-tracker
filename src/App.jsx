import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Change the URL to your server URL

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          socket.emit('location', { latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          socket.emit('location', { latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    socket.on('location', (data) => {
      setLatitude(data.latitude);
      setLongitude(data.longitude);
    });

    return () => {
      socket.off('location');
    };
  }, []);

  return (
    <div>
      <h1>Current Location</h1>
      {latitude !== null && longitude !== null ? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
