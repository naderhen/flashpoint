import React from 'react';
import Skycons from './ReactSkycons.js';
import {Line as LineChart} from 'react-chartjs';

export default class ForecastSummary extends React.Component {
  iconName() {
    return this.props.forecast_data.currently.icon.toUpperCase().replace(/-/g, '_');
  }

  chartData() {
    // Select only every other hourly temperature to make the UI less noisy.
    var hour_temps = _.filter(_.sortBy(_.map(this.props.forecast_data.hourly.data, function(hourly_item) {
      return {
        time: moment(hourly_item.time * 1000).toDate(),
        temperature: hourly_item.temperature
      }
    }), 'time'), function(hour_temp, idx) {
      return idx % 2 == 0;
    })

    return {
        labels: _.map(hour_temps, function(hour_temp) { return moment(hour_temp.time).format("M/D, hA"); }),
        datasets: [
            {
                label: "Hourly Temperatures",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: _.map(hour_temps, function(hour_temp) { return hour_temp.temperature; })
            }
        ]
    }
  }

  chartOptions() {
    return {
      responsive: true,
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> F"
    }
  }

  getIconColor(icon) {
    var map = {
      'CLEAR_DAY': "#ffd700",
      'CLEAR_NIGHT': "#003366",
      'PARTLY_CLOUDY_DAY': "#b0e0e6",
      'PARTLY_CLOUDY_NIGHT': "#468499",
      'CLOUDY': "#999999",
      'RAIN': "#191970",
      'SLEET': "#808080",
      'SNOW': "#dddddd",
      'WIND': "#e3e3e3",
      'FOG': "#c0c0c0"
    }

    return map[icon] || "black";
  }

  render() {
    var data = this.props.forecast_data.currently;

    return (
      <div>
        <div className="ui grid">
          <div className="six wide column">
            <Skycons icon={this.iconName()} color={this.getIconColor(this.iconName())}/>
          </div>
          <div className="ten wide column">
            <h1>{this.props.city.name}</h1>
            <h2>Currently: {data.summary}</h2>
          </div>
        </div>

        <div className="ui center aligned grid">
          <h5>Hourly Temperature Chart</h5>
          <LineChart data={this.chartData()} options={this.chartOptions()} width="750" height="250"/>
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
