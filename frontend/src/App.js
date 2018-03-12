import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import './App.css';
import TopBar from './containers/TopBarContainer';
import FrontPageContainer from './containers/FrontPageContainer';
import LoginPageContainer from './containers/LoginPageContainer';

import reducer from './reducers';

let store = createStore(reducer, composeWithDevTools(
  applyMiddleware(
    thunk,
    logger
  )
));

class App extends Component {
  render() {
    return <Provider store={store}>
      <Router>
        <div>
          <Route component={TopBar} />
          <Route exact path="/" component={FrontPageContainer} />
          <Route path="/user/:username" component={FrontPageContainer} />
          <Route path="/login" component={LoginPageContainer} />

        </div>
      </Router>
    </Provider>;
  }
}

export default App;
