import React, { Component, useEffect, useState } from "react";
import Pogoda from './Pogoda_na_dzis.module.css';
import Weather from './Weather';
import { Dimmer, Loader } from 'semantic-ui-react';


export default function Pogoda_na_dzis() {

 
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [Error, setError] = useState(null);

  
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
      
        getWeather(lat, long)
        .then(weather => {
          setWeatherData(weather);
          setError(null);
        })
        .catch(err => {
            setError(err.message);
          });
  
  
    }, [lat,long])

 


    function handleResponse(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Proszę włączyć swoją lokalizację na urządzeniu!");
        }
      }
    
      function getWeather(lat, long) {
        return fetch(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&lang={pl}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
          .then(res => handleResponse(res))
          
      }
      
      return (
        <div className={Pogoda.Pogoda_na_dzis}>
          {(!!weatherData && !!weatherData?.main ) ? (
            <div>
              <Weather weatherData={weatherData}/>
              
            </div>
          ): (
            <div className={Pogoda.Dimmerr}>
              <Dimmer active>
                <Loader>Ladowanie...</Loader>
              </Dimmer>
            </div>
          )}
        </div>
      );
    }