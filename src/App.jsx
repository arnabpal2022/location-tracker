import './App.css'
import React, {useState} from "react";

function App() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const geolocation = () => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },(error) =>{
        console.log("Location Error: ", error)
      })
    } else {
      console.log("Geolocation isn't Supported.")
    }
  }

  geolocation();

  return (
    <div>
      <h1>Current Location</h1>
      {latitude!== null && longitude!== null? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
