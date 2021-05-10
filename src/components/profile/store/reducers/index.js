import { combineReducers } from 'redux';
import user from './profileReducer';

const questionReducers = combineReducers({
    user
});

export default questionReducers;