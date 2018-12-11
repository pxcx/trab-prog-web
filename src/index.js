import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
// reducers
import aulasReducer from './store/reducers/aulas.js';
import salasReducer from './store/reducers/salas.js';
import loginReducer from './store/reducers/login.js';

// store
const store = createStore(combineReducers({
	aulas: aulasReducer,
	salas: salasReducer,
	login: loginReducer
}), applyMiddleware(thunk));

// app
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root')
);
