import React, { useState } from "react";
import "./App.css";
import CurrWeather from "./Components/CurrWeather/CurrWeather";
import Location from "./Components/Location/Location";
import Sunny from "../src/Assets/Sunny.png";
import Cloudy from "../src/Assets/Cloudy.png";
function App() {
  const [location, setLocation] = useState({
    id: 56588,
    wikiDataId: "Q207098",
    type: "CITY",
    city: "Ghaziabad",
    name: "Ghaziabad",
    country: "India",
    countryCode: "IN",
    region: "Uttar Pradesh",
    regionCode: "UP",
    latitude: 28.666666666,
    longitude: 77.416666666,
    population: 2375820,
  });
  return (
    <>
      <div id="app" style={{ backgroundImage: `url(${Cloudy})` }}>
        <div id="currentWeather">
          <Location
            location={location}
            changeLocation={(loc) => setLocation(loc)}
          />
          <CurrWeather lon={location.longitude} lat={location.latitude} />
        </div>
      </div>
    </>
  );
}

export default App;
