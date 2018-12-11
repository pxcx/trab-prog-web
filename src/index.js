import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';

import aulasReducer from './store/reducers/aulas.js';
import salasReducer from './store/reducers/salas.js';
const store = createStore(combineReducers({
	aulas: aulasReducer,
	salas: salasReducer
}), applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root')
);
