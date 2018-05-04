import React from "react";
import { render } from "react-dom";

import { createBrowserHistory } from "history";

import { Route, Switch } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import indexRoutes from "routes/index.jsx";

import "assets/css/material-dashboard-react.css";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  reducers from './reducers/index'
import { Map as map } from 'immutable';
import thunk from 'redux-thunk';

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import immutablejs from 'redux-storage-decorator-immutablejs'

import { composeWithDevTools } from 'redux-devtools-extension';

const hist = createBrowserHistory();
const routeMiddleware = routerMiddleware(hist)

const reducer = storage.reducer(reducers);


let engine = createEngine('user');

engine = immutablejs(engine, [
              ['user']

]);

const storageMiddleware = storage.createMiddleware(engine);


const store = createStore(
    reducer, 
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routeMiddleware,
      storageMiddleware
    )
  )
)

const load = storage.createLoader(engine);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

render(
  <Provider store={store}>
    <ConnectedRouter history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;

        })}
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
