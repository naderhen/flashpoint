import React from 'react';
import CityList from './CityList';
import ForecastSummary from './ForecastSummary';
import MapboxMap from './MapboxMap.js';
import {selectCity} from '../../main.js';

export default class App extends React.Component {
  renderMainContainer() {
    if (!this.props.state.requesting_forecast && this.props.state.forecast_data) {
      return <ForecastSummary city={this.props.state.cities[this.props.state.selectedCity]} forecast_data={this.props.state.forecast_data}></ForecastSummary>;
    } else {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      )
    }
    
  }

  render() {
    // NYC is the default location
    var location = {lat: '40.7921', lng: '-73.9439'}

    if (this.props.state.selectedCity) {
      var city = this.props.state.cities[this.props.state.selectedCity];
      location = {lat: city.lat, lng: city.lng};
    }


      console.log('rerendering', location)

    return (
      <div>
        <MapboxMap
          mapId="mapbox.streets"
          zoomControl={false}
          center={[location.lat, location.lng]} zoom={10}/>
        <div className="ui divider"></div>
        <div className="ui main container">
        	<div className="ui grid">
        		<div className="four wide column">
        			<CityList onSelect={selectCity} cities={this.props.state.cities}></CityList>
        		</div>
        		<div className="twelve wide column">
              {this.renderMainContainer()}
        		</div>
          </div>
        </div>
      </div>
    );
  }
}
