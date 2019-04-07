import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {HashRouter} from 'react-router-dom'
import reducer from './reducer/rootReducer.js'
import './index.css';
import App from './App';


const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));

