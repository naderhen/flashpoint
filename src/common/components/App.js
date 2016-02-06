import React from 'react';
import CityList from './CityList';
import {selectCity} from '../../main.js';

export default class App extends React.Component {
  render() {

    return (
      <div className="ui main container">
      	<div className="ui grid">
      		<div className="four wide column">
      			<CityList onSelect={selectCity} cities={this.props.state.cities}></CityList>
      		</div>
      		<div className="twelve wide column">
      			{this.props.state.requesting_forecast.toString()}
      			{this.props.state.cities[this.props.state.selectedCity].name}
      		</div>
        </div>
      </div>
    );
  }
}
