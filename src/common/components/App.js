import React from 'react';
import CityList from './CityList';
import ForecastSummary from './ForecastSummary';
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
    return (
      <div className="ui main container">
        <div className="ui grid">
          <div className="four column centered row">
            <h1>Flashpoint Weather</h1>
          </div>
        </div>
      	<div className="ui grid">
      		<div className="four wide column">
      			<CityList onSelect={selectCity} cities={this.props.state.cities}></CityList>
      		</div>
      		<div className="twelve wide column">
            {this.renderMainContainer()}
      		</div>
        </div>
      </div>
    );
  }
}
