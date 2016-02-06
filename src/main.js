/**
 * App entry point
 */

// Polyfill
import "babel-polyfill";

// Libraries
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Routes
import Routes from './common/components/Routes';
import {ReplaySubject} from 'rxjs';
import App from './common/components/App';

import Request from 'superagent';

// Base styling
import "./common/base.css";


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

var state$ = new ReplaySubject(1),
  	actions$ = new ReplaySubject(1);

var initialState = {
	requesting_forecast: false,
	forecast_data: null,
	cities: {
		0: {id: 0, name: "New York, NY", lat: '40.7921', lng: '-73.9439', thumbnail_url: '/seals/ny.png'},
		1: {id: 1, name: "Chicago, IL", lat: '41.8843', lng: '-87.6324', thumbnail_url: '/seals/chicago.png'},
		2: {id: 2, name: "Seattle, WA", lat: '47.6036', lng: '-122.3294', thumbnail_url: '/seals/seattle.jpg'},
		3: {id: 3, name: "Houston, TX", lat: '29.7605', lng: '-95.3698', thumbnail_url: '/seals/houston.png'},
		4: {id: 4, name: "San Diego, CA", lat: '32.7157', lng: '-117.1617', thumbnail_url: '/seals/sandiego.png'}
	},
  	selectedCity: null
};

var reducer = function(state, action) {
  switch (action && action.key) {
    case "SELECT_CITY":
      	return {...state, selectedCity: action.data.city_id};
    case "REQUESTING_FORECAST":
    	return {...state, requesting_forecast: true, forecast_data: null};
    case "FORECAST_SUCCESS":
    	return {...state, requesting_forecast: false, forecast_data: action.data}
    default:
      return state;
  }
}

var combined = actions$.scan(reducer, initialState).subscribe((state) => {
  state$.next(state);
})

state$.subscribe(
  (state) => {
  		console.log(state);
      ReactDOM.render(<App state={state}></App>, document.getElementById(DOM_APP_EL_ID));
})

selectCity(initialState.cities[0])

export function selectCity(city) {
	if (city) {
		actions$.next({key: "SELECT_CITY", data: {city_id: city.id}});
		actions$.next({key: "REQUESTING_FORECAST"});
		Request
			.get('/forecast')
			.query(city)
			.set('Accept', 'application/json')
			.end(function(err, res){
				actions$.next({key: "FORECAST_SUCCESS", data: res.body});
			});
	}
}
