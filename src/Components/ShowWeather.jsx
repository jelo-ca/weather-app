import React from "react";
import { useState, useEffect } from "react";

function ShowWeather(props) {
  const [dynamicBackground, setDynamicBackground] = useState("");

  const data = props.data;
  const city = data.name;
  const country = data.sys ? props.data.sys.country : null;
  const temperature = data.main ? data.main.temp : null;
  const pressure = data.main ? data.main.pressure : null;
  const visibility = data.visibility ? data.visibility : null;
  const humidity = data.main ? data.main.humidity : null;
  const clouds = data.clouds ? data.clouds.all : null;

  // Values in standard units

  const pressureInAtm = (pressure / 1000).toFixed(2);
  const tempInCelcius = (temperature / 10).toFixed(2);
  const visibilityInKM = (visibility / 1000).toFixed(2);

  // Change border dynamically
  const dynamicBackgroundColor = (temp) => {
    if (temp < 10) {
      setDynamicBackground("#bbeafa");
    }
    if (temp > 10 && temp <= 30) {
      setDynamicBackground("#fcfa5b");
    }

    if (temp > 30) {
      setDynamicBackground("#ff512f");
    }
  };

  //  useEffect to call dynamicBackgroundColor function
  useEffect(() => {
    dynamicBackgroundColor(tempInCelcius);
  }, [tempInCelcius]);

  return (
    <React.Fragment>
      <div className="showWeather">
        <div
          className="weather_main"
          style={{ backgroundColor: dynamicBackground }}
        >
          <h1 className="weather_heading">
            {city} <span>{country}</span>
          </h1>
          <h3 className="temp">Temperature: {tempInCelcius}C</h3>
          <hr />
          <div className="weatherData-container">
            <div className="weatherData">
              <p>
                <span>Pressure</span> <br /> {pressureInAtm} atm
              </p>
              <p>
                <span>Visibility</span> <br /> {visibilityInKM} Km
              </p>
            </div>
            <div className="weatherData">
              <p>
                <span>Humidity:</span> <br /> {humidity} %
              </p>
              <p>
                <span>Clouds:</span> <br /> {clouds} %
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ShowWeather;
