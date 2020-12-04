import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "semantic-ui-css/semantic.min.css"
import reportWebVitals from './reportWebVitals';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import spotifyReducer from "./reducers/SpotifyReducer";
import userReducer from "./reducers/UserReducer";
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.min"
import "jquery/dist/jquery.min"

import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
const reducers = combineReducers({spotifyReducer, userReducer});

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App/>
      </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
