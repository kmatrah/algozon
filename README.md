# Algozon

Algozon is an Appstore search application that uses the Algolia API to index and search apps.

## Content
This project contains :

* a backend built with Node.js that serves a REST API to add or remove apps from the Algolia apps index (it also serves the static assets).
* a frontend built with Inferno/Redux/Algolia JS Helper that displays an instant-search interface to search apps.

## Requirements

This project needs Node.js and NPM to be installed in order to build and run the application.

*grunt* is also required to build the frontend application. Please make sure that you have the *grunt-cli* npm package installed globally.
If not :

```bash
npm install -g grunt-cli
```

## Setup

### Frontend

To build the frontend application :

```bash
grunt
```

Produced assets will be put inside the *public* folder and served by the backend.

### Backend

The backend rely on 3 environment variables in order to run :

* PORT (5050 by default)
* APP_ID (Algolia Application ID)
* API_KEY (Algolia Admin API Key)

## Run

To run Algozon :
```bash
APP_ID=XXX API_KEY=YYY npm start
```