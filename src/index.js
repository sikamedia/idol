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

const logger = createLogger();

const idolApp = combineReducers({PaginationReducer, UIReducer, FetchParticipantReducer, VideoReducer});

let store = createStore(idolApp, applyMiddleware(thunk, logger));

const handleChange = () => {
	const currentValue = store.getState()
	window.state = currentValue
}

const unsubscribe = store.subscribe(handleChange)
handleChange()

render(
	<Provider store={store}>
	<AppIdol />
	</Provider>,
	document.getElementById('root'));
