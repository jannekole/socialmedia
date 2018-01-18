import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import './App.css';
import TopBar from './components/TopBar';
import FrontPageContainer from './containers/PostListContainer';
import UserPage from './containers/UserPage';

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
          <TopBar />
          <div className="" >
            <Route exact path="/" component={UserPage} />
            <Route path="/user/:userName" component={UserPage}/>
            <Route exact path="/userpage" component={UserPage} />
          </div>
        </div>
      </Router>
    </Provider>;
  }
}

export default App;
