import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { GetWeatherDetails } from "../redux/Actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
function Weather(props) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const { GetWeatherDetails } = props.action;
    GetWeatherDetails();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { GetWeatherDetails } = props.action;
    if (searchInput) GetWeatherDetails(searchInput);
    setSearchInput("");
  };

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };

  const { data, success } = props.weatherData;
  const { weather, sys, name, main } = data;

  return (
    <>
      <div className="container">
        <div className="heading">Meteo</div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Rechercher la météo par ville"
            value={searchInput}
            onChange={handleOnChange}
          />
          <button>Trouver</button>
        </form>
        <div className="helper-text">Tapez le nom de la ville et appuyez sur Entrer</div>
        <div className="info">
         
          <div>
          <small className="date">
            {success ? moment().format("MMM DD YYYY") : null}
          </small>
          <div className="location">
          <div className="forecast-info">
        
        <div className="forecast-value">
          <div className="degrees">
            <span className="degrees-count">
              {success ? main.temp : null}
            </span>
            C
          </div>
         
        </div>
      </div>
            {success ? name : null}
            <small>({success ? sys.country : null})</small>
          </div>
       
          </div>
          <div className="additional-info">
            <ul className="list">
              <li>
                <b>Se sentir comme</b> {success ? main.feels_like : null}
              </li>
              <li>
                <b>Température minimale</b> {success ? main.temp_min : null}
              </li>
              <li>
                <b>Température maximale</b> {success ? main.temp_max : null}
              </li>
              <li>
                <b>Pression</b> {success ? main.pressure : null}
              </li>
              <li>
                <b>Humidité</b> {success ? main.humidity : null}
              </li>
            </ul>
          </div>
        
          </div> 
      </div>
      <ToastContainer />
    </>
  );
}

const mapStateToProps = state => ({
  weatherData: state
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ GetWeatherDetails }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);