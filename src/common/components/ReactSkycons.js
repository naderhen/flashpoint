import React from 'react';
import ReactDOM from 'react-dom';

const ReactSkycons = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    autoplay: React.PropTypes.bool,
    icon: React.PropTypes.oneOf([
      'CLEAR_DAY',
      'CLEAR_NIGHT',
      'PARTLY_CLOUDY_DAY',
      'PARTLY_CLOUDY_NIGHT',
      'CLOUDY',
      'RAIN',
      'SLEET',
      'SNOW',
      'WIND',
      'FOG'
    ])
  },

  getDefaultProps() {
    return {
      color: null,
      autoplay: true
    };
  },

  getInitialState() {
    return {
      skycons: new Skycons({'color': this.props.color})
    };
  },

  componentDidMount() {
    this.state.skycons.add(ReactDOM.findDOMNode(this), Skycons[this.props.icon]);
    if(this.props.autoplay){
      this.state.skycons.play();
    }
  },

  componentWillReceiveProps(nextProps) {
   this.state.skycons.set(ReactDOM.findDOMNode(this), Skycons[nextProps.icon]);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.state.skycons.pause();
    this.state.skycons.remove(ReactDOM.findDOMNode(this));
  },

  play() {
    this.state.skycons.play();
  },

  pause() {
    this.state.skycons.pause();
  },

  render() {
    let props = {};
    for(let prop in this.props){
      props[prop] = this.props[prop];
    }
    delete props.autoplay;
    return (
      <canvas {...props} />
    );
  }
});

export default ReactSkycons;