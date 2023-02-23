import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { GetWeatherDetails } from "../redux/Actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  componentDidMount() {
    const { GetWeatherDetails } = this.props.action;
    GetWeatherDetails();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { searchInput } = this.state;
    const { GetWeatherDetails } = this.props.action;
    if (searchInput) GetWeatherDetails(this.state.searchInput);
    this.setState({ searchInput: "" });
  };
  handleOnChange = e => {
    this.setState({
      searchInput: e.target.value
    });
  };
  render() {
    const { data, success } = this.props.weatherData;
    const { weather, sys, name, main } = data;
    const { searchInput } = this.state;

    return (
      <>
        <div className="container">
          <div className="heading">Meteo</div>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Rechercher la météo par ville"
              value={searchInput}
              onChange={e => this.handleOnChange(e)}
            />
            <button>Trouver</button>
          </form>
          <div className="helper-text">Tapez le nom de la ville et appuyez sur Entrer</div>
          <div className="info">
            <div className="sub-heading">
              Prévisions météorologiques  <div>sur</div>
            </div>
            <small className="date">
              {success ? moment().format("MMM DD YYYY") : null}
            </small>
            <div className="location">
              {success ? name : null}
              <small>({success ? sys.country : null})</small>
            </div>
            <div className="forecast-info">
              <div className="forecast-icon">
                {success ? (
                  <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt=""
                  />
                ) : null}
              </div>
              <div className="forecast-value">
                <div className="degrees">
                  <span className="degrees-count">
                    {success ? main.temp : null}
                  </span>
                  C
                </div>
                {/* <span className="weather-condition">
                  {success ? weather[0].main : null}
                </span> */}
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
}

const mapStateToProps = state => ({
  weatherData: state
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ GetWeatherDetails }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
