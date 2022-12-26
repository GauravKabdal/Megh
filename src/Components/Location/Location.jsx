import React from "react";
import "../Location/Location.css";
import { locURL, locOption } from "../../APIDetails";
import { useState } from "react";
const Location = ({ location = "", changeLocation = () => {} }) => {
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLocation = async (loc) => {
    const url = `${locURL}namePrefix=${loc}`;
    try {
      const res = await fetch(url, locOption);
      const data = await res.json();
      setData(data?.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  const debounce = (cb, delay = 1000) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      setLoading(true);
      timeout = setTimeout(() => {
        cb(args);
        console.log(args);
      }, delay);
    };
  };

  const handleChange = debounce((val) => getLocation(val));
  return (
    <>
      <div
        onClick={() => setSearch(!search)}
        id="selectedLocation"
        className="glass"
      >
        <div>
          <p>{location.city}</p>
          <p>
            {location.region} , {location.country}
          </p>
        </div>
        <div>
          <p>Latitude :{location.latitude}</p>
          <p>Longitude :{location.longitude}</p>
        </div>
      </div>
      {search && (
        <div
          className="modal"
          onClick={(e) => e.target.className === "modal" && setSearch(!search)}
        >
          <div id="search">
            <input
              type="text"
              placeholder="Search...."
              onChange={(e) => handleChange(e.target.value)}
            />
            {loading ? (
              <div className="spinnerBox">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {data.map((loc, i) => {
                  return (
                    <div
                      className="locations"
                      key={i}
                      onClick={() => {
                        changeLocation(loc);
                        setSearch(!search);
                        setData([]);
                      }}
                    >
                      <p>{loc.city}</p>
                      <span>
                        {loc.region} , {loc.country}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Location;
