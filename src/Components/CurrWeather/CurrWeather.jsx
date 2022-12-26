import React from "react";

import { useState, useEffect } from "react";
const CurrWeather = ({ lon = 0, lat = 0 }) => {
  const [weather, setWeather] = useState({});
  const date = new Date();
  useEffect(() => {
    getTemp();
  }, [lon, lat]);

  const getTemp = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d7279808b9e377ce4dd7539ce31c8e96`
    );
    const data = await res.json();
    setWeather(data);
  };
  return (
    <>
      <div id="todayWeather" className="glass">
        <div>
          <p>Today's Weather</p>
          <img
            src={`http://openweathermap.org/img/wn/${
              weather?.weather ? weather?.weather[0]?.icon : "01d"
            }@2x.png`}
            alt="icon"
          ></img>
          <p>{`${date}`}</p>
          <p>Tempearature : {(weather?.main?.temp - 273.15).toFixed(2)}°C</p>
          <p>
            {(weather?.weather
              ? weather?.weather[0]?.description
              : ""
            ).toUpperCase()}
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrWeather;
