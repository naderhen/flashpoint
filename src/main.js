/**
 * App entry point
 */

// Polyfill
import "babel-polyfill";

// Libraries
import React from "react";
import ReactDOM from "react-dom";
import {ReplaySubject} from 'rxjs';
import App from './common/components/App';
import Request from 'superagent';

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";


// The state$ represents and Observable Stream of the current state of the
// application at any time. This can only be updated via new events on the
// actions$ stream.

var state$ = new ReplaySubject(1),
  	actions$ = new ReplaySubject(1);


// Here we define the initial state of the application.
// Cities are hard-coded for now, but this should be easily extensible to accept
// a larger list from the server or via Google Locations for example.
//
// Cities are indexed by id to minimize data redudancy once a city is selected
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


// This reducer is called on any update to the actions$ stream.
// It accepts the current state, action and returns a new state.
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


// The scan operater is an analog for the standard Javascript reduce method, but
// works on an indeterminate observable stream. It begins with the initial state
// and returns a new state via the reducer function  
var combined = actions$.scan(reducer, initialState).subscribe((state) => {
  state$.next(state);
})


// For each change to the top-level state, we log out the current state
// and re-render the root App Component. Note: This relies heavily on React's
// internal diffing to prevent overly expensive redraws. Don't do this in Angular!
state$.subscribe(
  (state) => {
  		console.log(state);
      ReactDOM.render(<App state={state}></App>, document.getElementById(DOM_APP_EL_ID));
})

// Here we simply bootstrap the application by supplying an initial city selection.
selectCity(initialState.cities[0])


// Typically, we would have a separate directory to house our application actions.
// In this fairly simple app, we only have one action: selecting a city.
// When this happens, we want the current state to reflect the loading state until
// a response is returned.
export function selectCity(city) {
	if (city) {
		console.log("Selecting City", city)
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
