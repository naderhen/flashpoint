A [Demo](https://flashpoint.herokuapp.com/) of this application is currently running on Heroku. 

![Flashpoint Weather](/screenshot.png?raw=true "Flashpoint Weather")

## Goals
This application is an attempt to demonstrate the ease in which we can develop a modern React + Redux Application using only RxJS as our data-flow layer.

In order to distill the problem down to its core use case, I've used a very minimal React application boilerplate to start with all of the necessary dependencies in place. This simply includes a basic Webpack development (and production) build process and an Express server to handle web requests and static asset services.

## Getting Started
To begin, you must first clone this repository and install all application dependencies via npm from within the application directory.
```
git clone git@github.com:naderhen/flashpoint.git
npm install
```

Once all dependencies have been installed, please start the development server from within the application directory.
```
npm run server
```

This will start up very simple Express Web Server. In development, we redirect all requests to our `app.js` and `style.css` to the bundles compiled via our Webpack build process.

Once everything is up and running, you will see the following message in your terminal:

```
Flashpoint Weather is listening at http://localhost:8080
```

When you visit the above URL in your browser, you should be greeted with the initial state of Flashpoint Weather!

Note: On first run in development mode, this could take a little longer than expected due to some recent changes in both NPM and Webpack. I'm currently working to resolve this. In the meantime, it might be faster to generate a build and serve it manually (this will not enable hot or live reloading).

## Building the app

There are a number of npm scripts supplied to help you build and run the app.

```
npm run build
npm run start
```

This will compile the application assets, place them in the `build` directory and start the Express Server in Production mode. You can run both of these tasks serially using `npm run deploy`.

## Deploying to Heroku

```
heroku create
git push heroku master
```

## What the Redux?
One of the most interested changes to the React ecosystem as of late has been in introduction of [Redux](https://github.com/rackt/redux) as an [Elm](http://www.elm-lang.org)-inspired Flux Framework. I won't go into the nitty gritty details of this way of managing Data Flow in React Applications but it's worth mentioning that I have taken it to heart in this project. However, instead of using Redux outright (I tend to think it introduces a little too much boilerplate code for simple apps like this) I have chosen to create a simplified version using RxJS Observables. 

Simply, we define a Top-Level State object that can only be updated via a dispatch to an `actions$` Observable Stream. This can be seen in its entirety within `main.js`. Note: In a more sophisticated application, there would be a slightly different organization of code. The reducer function would live within a `reducers` directory (There would most likely be multiple depending on the concerns of the application). The actions would live within their own directory as well, but this application only has one: `selectCity`. I'd love to talk about this implementation further, as there is definitely a lot to discuss!

## Notes

#### Forecast.io API
This application utilizes the Forecast.io Weather API. For simplicity, I've manually included our API Key directly in the Express Server configuration. This should not be done in a real-life application. API Keys should be handled using your preferred secret management framework.

#### HTTP Proxying
Because the Forecast.io API does not accept CORS Requests, we proxy all requests from our application through the Express server. You can see this very simply in `server.js`




