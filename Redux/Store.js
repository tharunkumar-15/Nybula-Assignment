import {createStore,combineReducers} from 'redux'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useReducer from './Reducers';

const rootReducer=combineReducers({useReducer})

export const Store=createStore(rootReducer,applyMiddleware(thunk));