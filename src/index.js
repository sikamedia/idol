import React from 'react'
import { render } from 'react-dom'
import AppIdol from './AppIdol'
import PaginationReducer from './reducers/PaginationReducer'
import UIReducer from './reducers/UIReducer'
import FetchParticipantReducer from './reducers/FetchParticipantReducer'
import VideoReducer from './reducers/VideoReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import ParticipantList from './components/ParticipantList'
import ParticipantDetails from './components/ParticipantDetails'

const logger = createLogger();

//const allReducers = combineReducers({PaginationReducer, UIReducer, FetchParticipantReducer, VideoReducer});
const allReducers = combineReducers({PaginationReducer, UIReducer, FetchParticipantReducer, VideoReducer, routing: routerReducer});

//const allReducers = Object.assign({}, PaginationReducer,  UIReducer, FetchParticipantReducer, VideoReducer, {routing: routerReducer} );
//let store = createStore(idolApp, applyMiddleware(thunk, logger));

const store = createStore(allReducers, applyMiddleware(thunk, logger));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const handleChange = () => {
	const currentValue = store.getState()
	window.state = currentValue
}

const unsubscribe = store.subscribe(handleChange)
handleChange()

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={AppIdol}>
				<Route path="idols" component={ParticipantList}/>
				<Route path="idolvideos" component={ParticipantDetails}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'));

/*
render(
	<Provider store={store}>
		<AppIdol/>
	</Provider>,
	document.getElementById('root'));*/