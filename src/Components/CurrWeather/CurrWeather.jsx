import React from "react";

import { useState, useEffect } from "react";
const CurrWeather = ({ lon = 0, lat = 0 }) => {
  const [weather, setWeather] = useState({});
  const [aqi, setAqi] = useState({});
  const date = new Date();
  useEffect(() => {
    getTemp();
    getAQI();
    // eslint-disable-next-line
  }, [lon, lat]);

  const getAQI = async () => {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d7279808b9e377ce4dd7539ce31c8e96`
    );
    const data = await res.json();
    setAqi(data.list[0]);
  };

  const getTemp = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d7279808b9e377ce4dd7539ce31c8e96`
    );
    const data = await res.json();
    setWeather(data);
  };

  const getAQISeverity = () => {
    let sev = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor",
    };
    return sev[aqi?.main ? aqi?.main?.aqi : 1];
  };
  return (
    <>
      <div id="todayWeather" className="glass">
        <div>
          <p>Today's Weather</p>
          <div id="Aqi">
            <img
              src={`http://openweathermap.org/img/wn/${
                weather?.weather ? weather?.weather[0]?.icon : "01d"
              }@2x.png`}
              alt="icon"
            ></img>
            <p>
              Air Quality:
              <p>{getAQISeverity()}</p>
              <p>
                PM_2.5:{" "}
                <strong>{aqi?.components ? aqi?.components?.pm2_5 : 0}</strong>{" "}
                , PM_10:{" "}
                <strong>{aqi?.components ? aqi?.components?.pm10 : 0}</strong>
              </p>
              <p>
                CO: <strong>{aqi?.components ? aqi?.components?.co : 0}</strong>{" "}
                , O<sub>3</sub>:{" "}
                <strong>{aqi?.components ? aqi?.components?.o3 : 0}</strong>
              </p>
              <p>
                NO: <strong>{aqi?.components ? aqi?.components?.no : 0}</strong>{" "}
                , NO<sub>2</sub>:{" "}
                <strong>{aqi?.components ? aqi?.components?.no2 : 0}</strong>
              </p>
              <p>
                SO<sub>2</sub>:{" "}
                <strong>{aqi?.components ? aqi?.components?.so2 : 0}</strong> ,
                NH<sub>3</sub>:{" "}
                <strong>{aqi?.components ? aqi?.components?.nh3 : 0}</strong>
              </p>
            </p>
          </div>
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
