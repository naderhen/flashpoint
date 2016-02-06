import React from 'react';
import Skycons from './ReactSkycons.js';

export default class ForecastSummary extends React.Component {
  iconName() {
    return this.props.forecast_data.currently.icon.toUpperCase().replace(/-/g, '_');
  }

  render() {
    var data = this.props.forecast_data.currently;

    return (
      <div>
        <div className="ui grid">
          <div className="six wide column">
            <Skycons icon={this.iconName()} />
          </div>
          <div className="ten wide column">
            <h1>{this.props.city.name}</h1>
            <h2>{data.summary}</h2>
            <h3>for: {moment().format("MMM DD, YYYY")}</h3>
          </div>
        </div>

        <div className="ui segment">
          <div className="ui four statistics">
            <div className="statistic">
              <div className="value">
                {Math.floor(data.temperature)}&#8457;
              </div>
              <div className="label">
                Current Temperature
              </div>
            </div>

            <div className="statistic">
              <div className="value">
                {Math.floor(data.apparentTemperature)}&#8457;
              </div>
              <div className="label">
                Feels Like
              </div>
            </div>

            <div className="statistic">
              <div className="value">
                {Math.floor(data.precipProbability * 100)} %
              </div>
              <div className="label">
                Chance of Precipitation
              </div>
            </div>

            <div className="statistic">
              <div className="value">
                {Math.floor(data.humidity * 100)} %
              </div>
              <div className="label">
                Humidity
              </div>
            </div>

            <div className="statistic">
              <div className="value">
                {Math.floor(data.cloudCover) * 100} %
              </div>
              <div className="label">
                Cloud Cover
              </div>
            </div>

            <div className="statistic">
              <div className="value">
                {data.dewPoint}&#8457;
              </div>
              <div className="label">
                Dew Point
              </div>
            </div>

            <div className="statistic">
              <div className="value">
                {data.windSpeed}
              </div>
              <div className="label">
                Wind Speed (mph)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
