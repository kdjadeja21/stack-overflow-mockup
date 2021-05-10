import { combineReducers } from 'redux';
import question from './questionReducer';

const questionReducers = combineReducers({
    question
});

export default questionReducers;