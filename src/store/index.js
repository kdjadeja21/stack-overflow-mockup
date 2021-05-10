import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import questions from '../components/question-page/store/reducers';
import profile from '../components/profile/store/reducers';

const createReducer = asyncReducers =>
    combineReducers({
        questions,
        profile,
        ...asyncReducers
    });

const enhancer = applyMiddleware(thunk);

const store = createStore(createReducer(), enhancer);

export default store;