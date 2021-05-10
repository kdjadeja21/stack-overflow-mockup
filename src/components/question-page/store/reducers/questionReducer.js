import * as Actions from '../actions';

const initialState = {
    featuredQuestions: null
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_QUESTIONS: {
            return {
                ...initialState,
                featuredQuestions: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default questions;