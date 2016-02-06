import React from 'react';
import ReactDOM from 'react-dom';

// Assuming Mapbox/Leaflet is already exposed as `L`
// From: github: iamale/MapboxMap

var MapboxMap = React.createClass({
  renderMap: function() {
    var props = this.props;

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