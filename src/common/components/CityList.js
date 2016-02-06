import React from 'react';

export default class CityList extends React.Component {
  renderCityItem(city) {
    return (
      <div onClick={this.props.onSelect.bind(this, city)} key={city.id} className="item">
        <img className="ui avatar image" src={city.thumbnail_url}/>
        <div className="content">
          <a className="header">{city.name}</a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ui middle aligned divided list">
        {Object.keys(this.props.cities).map((city_id) => this.renderCityItem(this.props.cities[city_id]) )}
      </div>
    );
  }
}
