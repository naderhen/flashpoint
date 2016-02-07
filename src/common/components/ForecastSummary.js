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

  renderStatistics(data) {
    var stats = [
      {key: 'current_temp', label: "Current Temperature", value: Math.floor(data.temperature) + String.fromCharCode(8457)},
      {key: 'feels_like', label: "Feels Like", value: Math.floor(data.apparentTemperature) + String.fromCharCode(8457)},
      {key: 'chance_precip', label: "Chance of Precipitation", value: Math.floor(data.precipProbability * 100) + '%'},
      {key: 'humidity', label: "Humidity", value: Math.floor(data.humidity * 100) + '%'},
      {key: 'cloud_cover', label: "Cloud Cover", value: Math.floor(data.cloudCover * 100) + '%'},
      {key: 'dew_point', label: "Dew Point", value: data.dewPoint + String.fromCharCode(8457)},
      {key: 'wind_speed', label: "Wind Speed (mph)", value: data.windSpeed}
    ]

    return (
      <div className="ui tiny four statistics">
        {stats.map(function(stat) {
          return (
            <div key={stat.key} className="ui tiny statistic">
              <div className="value">
                {stat.value}
              </div>
              <div className="label">
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    )
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
          {this.renderStatistics(data)}
        </div>
      </div>
    );
  }
}
