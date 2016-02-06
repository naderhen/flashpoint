import React from 'react';
import ReactDOM from 'react-dom';

// Assuming Mapbox/Leaflet is already exposed as `L`
// Adapted From: github: iamale/MapboxMap

var MapboxMap = React.createClass({
  renderMap: function() {
    var self = this,
        props = this.props;

    var mapId = props.mapId || props.src || "mapbox.streets";

    var options = {};
    var ownProps = ['mapId', 'onMapCreated'];
    for (var k in props) {
      if (props.hasOwnProperty(k) && ownProps.indexOf(k) === -1) {
        options[k] = props[k];
      }
    }

    L.mapbox.accessToken = 'pk.eyJ1IjoibmFkZXJoZW4iLCJhIjoiUHJRS0RxNCJ9.czZQUsvk27nluAj8phjylA';
    this.map = L.mapbox.map(ReactDOM.findDOMNode(this), mapId, options);

    Object.keys(props.cities).map(function(city_id) {
      var city = props.cities[city_id];
      var layer = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [city.lng, city.lat]
        },
        properties: {
            title: city.name,
            // one can customize markers by adding simplestyle properties
            // https://www.mapbox.com/guides/an-open-platform/#simplestyle
            'marker-size': 'large',
            'marker-color': '#3bb2d0',
            'marker-symbol': 'city'
        }
      }).addTo(self.map);

      layer.on('click', function(e) {
        props.onSelect.call(this, city);
      })
    })

    if (this.props.onMapCreated) {
      this.props.onMapCreated(map, L);
    }
  },

  componentDidMount: function(argument) {
    this.renderMap();
  },

  componentDidUpdate() {
    if (this.map) {
      this.map.remove();
    }

    this.renderMap();
  },

  render: function() {
    var mapStyle = {
      width: '100%',
      height: '250px',
      display: 'block'
    };

    return (
      <div style={mapStyle}></div>
    );
  }
});

module.exports = MapboxMap;