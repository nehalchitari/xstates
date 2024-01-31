import React, { useState, useEffect } from "react";
import "./App.css";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    }
    fetchCountries();
  }, []);

  async function fetchStates(country) {
    const response = await fetch(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    );
    const data = await response.json();
    setStates(data);
  }

  async function fetchCities(country, state) {
    const response = await fetch(
      `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
    );
    const data = await response.json();
    setCities(data);
  }

  function handleCountryChange(event) {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setLocationText("");
    fetchStates(country);
  }

  function handleStateChange(event) {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setLocationText("");
    fetchCities(selectedCountry, state);
  }

  function handleCityChange(event) {
    const city = event.target.value;
    setSelectedCity(city);
    setLocationText(
      <p>
        <strong>You Selected</strong> <span className="city">{city}</span>,{" "}
        <strong className="state">{selectedState}</strong>,{" "}
        <strong className="country">{selectedCountry}</strong>
      </p>
    );
  }

  return (
    <div className="location-selector">
      <h2 className="center">Select Location</h2>
      <div className="dropdown-container">
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="center">{locationText}</div>
    </div>
  );
}

export default LocationSelector;