import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import './App.css';
import TopBar from './containers/TopBarContainer';
import UserPage from './containers/UserPage';
import FrontPage from './containers/FrontPage';
import PageContentContainer from './containers/PageContentContainer';
import LoginPageContainer from './containers/LoginPageContainer';

import reducer from './reducers';

var store = createStore(reducer, composeWithDevTools(
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
          {/* <Route exact path="/" component={FrontPage} />
          <Route path="/user/:username" component={UserPage} /> */}

          <PageContentContainer />
        </div>
      </Router>
    </Provider>;
  }
}

export default App;
