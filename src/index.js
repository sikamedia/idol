import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ParticipantList from './components/ParticipantList';
import ParticipantDetails from './containers/ParticipantDetails';
import AppIdol from './AppIdol';
import PaginationReducer from './reducers/PaginationReducer';
import FetchParticipantsReducer from './reducers/FetchParticipantsReducer';
import VideoReducer from './reducers/VideoReducer';


const logger = createLogger();

const NotFound = () => (<h1>404.. This page is not found!</h1>);


// const allReducers = combineReducers({PaginationReducer, UIReducer, FetchParticipantReducer, VideoReducer});
const allReducers = combineReducers({
  pagination: PaginationReducer,
  FetchParticipantsReducer,
  VideoReducer,
  routing: routerReducer,
});

// const allReducers = Object.assign({}, PaginationReducer,  UIReducer, FetchParticipantReducer, VideoReducer, {routing: routerReducer} );
// let store = createStore(idolApp, applyMiddleware(thunk, logger));

const middleware = [thunk, logger];
const store = createStore(allReducers, composeWithDevTools(applyMiddleware(...middleware)));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// history.listen(location => analyticsService.track(location.pathname))

// console log enables the printing of log, window log
const handleChange = () => {
  const currentValue = store.getState();
  window.state = currentValue;
};

const unsubscribe = store.subscribe(handleChange);
handleChange();


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppIdol}>
        <IndexRoute component={ParticipantList} />
        <Route path="idol/:nameTag" component={ParticipantDetails} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root'));

