import React from "react";
import { useState, useEffect } from "react";
const Forecast = ({ lat, lon }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getforeCast();
  }, [lat, lon]);

  const getforeCast = async () => {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d7279808b9e377ce4dd7539ce31c8e96`
    );
    const data = await res.json();
    setForecast(data.list);
  };
  return (
    <>
      <div id="forecast">
        {forecast.map((weather, i) => {
          return (
            <div className="weather glass" key={i}>
              <img
                src={`http://openweathermap.org/img/wn/${
                  weather?.weather ? weather?.weather[0]?.icon : "01d"
                }@2x.png`}
                alt="icon"
                loading="lazy"
              ></img>
              <p>{weather?.dt_txt ? weather?.dt_txt : ""}</p>
              <p>{weather?.weather ? weather?.weather[0]?.description : ""}</p>
              <p>
                {weather?.main ? (weather?.main?.temp - 273.15).toFixed(2) : 0}
                <sup>o</sup>C
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Forecast;
