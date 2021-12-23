import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

function App() {
  //States used
  const [celsius, setCelsius] = useState(false);
  const [fahrenheit, setFahrenheit] = useState(true);
  const [weather, setWeather] = useState("");
  const [hourly, setHourly] = useState(true);
  const [daily, setDaily] = useState(false);

  //Switch to Celsius when button is pressed
  const switchtoC = () => {
    setFahrenheit(false);
    setCelsius(true);
  };
  //Switch to Fahrenheit when button is pressed
  const switchtoF = () => {
    setCelsius(false);
    setFahrenheit(true);
  };
  //Show weather for next 24 hours when pressed
  const showhourly = () => {
    setDaily(false);
    setHourly(true);
  };
  //Show weather for next 8 days when pressed
  const showdaily = () => {
    setHourly(false);
    setDaily(true);
  };
  //To return temperature of next 24 hours and related icon
  function HourlyList(props) {
    const hlistItems = props.weather.hourly.data.map(function (item) {
      var dateunix = new Date(item["time"] * 1000);
      return (
        <li className="forecast-item" key={item["time"]}>
          <div>
            {" "}
            <div>{dateunix.getHours()}:00</div>
            <div>
              {item["icon"] === "clear-day" && (
                <i className="icon" class="wi wi-day-sunny"></i>
              )}
              {item["icon"] === "clear-night" && (
                <i className="icon" class="wi wi-night-clear"></i>
              )}
              {item["icon"] === "partly-cloudy-day" && (
                <i className="icon" class="wi wi-day-cloudy"></i>
              )}
              {item["icon"] === "cloudy" && (
                <i className="icon" class="wi wi-cloud"></i>
              )}
              {item["icon"] === "partly-cloudy-night" && (
                <i className="icon" class="wi wi-night-partly-cloudy"></i>
              )}
              {item["icon"] === "cloudy-night" && (
                <i className="icon" class="wi wi-night-cloudy"></i>
              )}
            </div>
            {fahrenheit ? (
              <div>{Math.round(item["temperature"])}° </div>
            ) : (
              <div>
                {Math.round((Math.round(item["temperature"] - 32) * 5) / 9)}°{" "}
              </div>
            )}
          </div>
        </li>
      );
    });
    let hlistslice = hlistItems.slice(0, 24); //Get only first 24 hours not all 48 hours
    return <ul>{hlistslice}</ul>;
  }
  //To return temperature of next 7 days and related icon
  function DailyList(props) {
    const dlistItems = props.weather.daily.data.map(function (item) {
      var dateunix2 = new Date(item["time"] * 1000);
      return (
        <li className="forecast-item" key={item["time"]}>
          <div>
            <div>
              {item["icon"] === "clear-day" && (
                <i className="icon" class="wi wi-day-sunny"></i>
              )}
              {item["icon"] === "partly-cloudy-day" && (
                <i className="icon" class="wi wi-day-cloudy"></i>
              )}
              {item["icon"] === "cloudy" && (
                <i className="icon" class="wi wi-cloud"></i>
              )}
              {fahrenheit ? (
                <div>{Math.round(item["temperatureMax"])}°</div>
              ) : (
                <div>
                  {Math.round(
                    (Math.round(item["temperatureMax"] - 32) * 5) / 9
                  )}
                  °{" "}
                </div>
              )}
            </div>
          </div>
        </li>
      );
    });
    return <ul>{dlistItems}</ul>;
  }

  //Getting Geolocation of User
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      var lat = position.coords.latitude;
      console.log("Longitude is :", position.coords.longitude);
      var lon = position.coords.longitude;
    });
  };

  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/30.0719,31.4774`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setWeather(json);
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
    getLocation();
  }, []);

  // Gets current date
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="header">
          <h2>INSTAWEATHER</h2>
          <div className="btn-container">
            <button className="btntemp" onClick={() => switchtoC()}>
              C
            </button>
            <button className="btntemp" onClick={() => switchtoF()}>
              F
            </button>
          </div>
        </div>

        {weather ? (
          <div>
            <div className="loc-weather">
              <div className="location-box">
                <div className="location">{weather.timezone}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                {/* Show Icon based on icon in response */}
                <div className="main-icon">
                  {weather.currently.icon === "clear-day" && (
                    <i className="icon" class="wi wi-day-sunny"></i>
                  )}
                  {weather.currently.icon === "clear-night" && (
                    <i className="icon" class="wi wi-night-clear"></i>
                  )}
                  {weather.currently.icon === "partly-cloudy-day" && (
                    <i className="icon" class="wi wi-day-cloudy"></i>
                  )}
                  {weather.currently.icon === "cloudy" && (
                    <i className="icon" class="wi wi-cloud"></i>
                  )}
                  {weather.currently.icon === "partly-cloudy-night" && (
                    <i className="icon" class="wi wi-night-partly-cloudy"></i>
                  )}
                  {weather.currently.icon === "cloudy-night" && (
                    <i className="icon" class="wi wi-night-cloudy"></i>
                  )}
                </div>
                {/* Display current weather summary */}
                <div className="weather">{weather.currently.summary}</div>
              </div>

              {/* If Fahrenheit is true then display temprature from response. If false then perform equation to turn to Celsius */}
              <div className="weather-box">
                <div className="temp">
                  {fahrenheit ? (
                    <div> {Math.round(weather.currently.temperature)}° </div>
                  ) : (
                    <div>
                      {Math.round(
                        (Math.round(weather.currently.temperature - 32) * 5) / 9
                      )}
                      °
                    </div>
                  )}
                </div>
                {/* Get Maximum and Minimum temperature */}
                <div className="maxmin">
                  {fahrenheit ? (
                    <div>
                      {Math.round(weather.daily.data[0].temperatureMax)}° /
                      {Math.round(weather.daily.data[0].temperatureMin)}°{" "}
                    </div>
                  ) : (
                    <div>
                      {Math.round(
                        (Math.round(weather.daily.data[0].temperatureMax - 32) *
                          5) /
                          9
                      )}
                      ° /
                      {Math.round(
                        (Math.round(weather.daily.data[0].temperatureMin - 32) *
                          5) /
                          9
                      )}
                      °{" "}
                    </div>
                  )}
                </div>
                <div className="summary"> {weather.daily.data[0].summary}</div>
              </div>
            </div>
            <div className="intervals">
              <button className="interval-btn" onClick={() => showhourly()}>
                Hourly {hourly && <div className="underline"></div>}
              </button>
              <button className="interval-btn" onClick={() => showdaily()}>
                Daily {daily && <div className="underline"></div>}
              </button>
              <div className="forecast">
                {/* Checks which of Hourly & Daily is pressed to display the relative info */}
                {hourly && <HourlyList weather={weather} />}
                {daily && <DailyList weather={weather} />}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
