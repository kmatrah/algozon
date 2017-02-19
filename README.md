# Algozon

Algozon is an Appstore search application that uses the Algolia API to index and search apps.

[Live demo](https://evening-crag-60899.herokuapp.com)

## Content
This project contains :

* a backend built with Node.js that serves a REST API to add or remove apps from the Algolia apps index (it also serves the static assets).
* a frontend built with Inferno/Redux/Algolia JS Helper that displays an instant-search interface to search apps.

## Requirements

This project needs Node.js (>= 7.x) and NPM to be installed in order to build and run the application.

**grunt** is also required to build the frontend application. Please make sure that you have the **grunt-cli** npm package installed globally. If not :

```sh
$ npm install -g grunt-cli
```

Please refer to the **grunt** [documentation](http://gruntjs.com/getting-started) for other details.

## Setup

### Frontend

To build the frontend application (from the root folder of the project) :

```sh
$ grunt
```

Produced assets will be put inside the **public** folder and served by the backend.

### Backend

The backend rely on 3 environment variables in order to run :

* PORT (5000 by default)
* APP_ID (Algolia Application ID)
* API_KEY (Algolia Admin API Key)

## Run

To run Algozon :
```sh
$ APP_ID=XXX API_KEY=YYY npm start
```

## Code structure

The backend code can be found in the **src** folder and the frontend code in the **app** folder.

## Some ideas

* button to automatically copy the current URL (current state search) to the clipboard
* ability to set a bookmark as a default search when arriving on the homepage (e.g I want to see games by default everytime I open Algozon)
* manage tabindex on facets
* (for mobile) move the facets in a sliding panel that the user can open if he wants to filter by category
