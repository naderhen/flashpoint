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
Note: On first run in development mode, this could take a little longer than expected due to some changes in the way static assets are configured in Webpack.

This will start up very simple Express Web Server. In development, we redirect all requests to our `app.js` and `style.css` to the bundles compiled via our Webpack build process.

Once everything is up and running, you will see the following message in your terminal:

```
Flashpoint Weather is listening at http://localhost:8080
```

When you visit the above URL in your browser, you should be greeted with the initial state of Flashpoint Weather!

## Notes

#### Forecast.io API
This application utilizes the Forecast.io Weather API. For simplicity, I've manually included our API Key directly in the Express Server configuration. This should not be done in a real-life application. API Keys should be handled using your preferred secret management framework.

#### HTTP Proxying
Because the Forecast.io API does not accept CORS Requests, we proxy all requests from our application through the Express server. You can see this very simply in `server.js`


