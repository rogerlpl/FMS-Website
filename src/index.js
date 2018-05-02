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

import { composeWithDevTools } from 'redux-devtools-extension';

const hist = createBrowserHistory();
const routeMiddleware = routerMiddleware(hist)

const store = createStore(
    reducers, 
  map(),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routeMiddleware
    )
  )
)

//store.dispatch(push('/login'))

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
