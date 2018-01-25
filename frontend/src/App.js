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
import PageContentContainer from './containers/PageContentContainer';

import reducer from './reducers';

var store = createStore(reducer, composeWithDevTools(
  applyMiddleware(
    thunk,
    logger
  )
));

class App extends Component {
  render() {

    var pageContent = <div className="" >
      <Route exact path="/" component={UserPage} />
      <Route path="/user/:userName" component={UserPage}/>
      <Route exact path="/userpage" component={UserPage} />
    </div>;

    return <Provider store={store}>
      <Router>
        <div>
          <TopBar />
          {/* {pageContent} */}
          <PageContentContainer />
        </div>
      </Router>
    </Provider>;
  }
}

export default App;
