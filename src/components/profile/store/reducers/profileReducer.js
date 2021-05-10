import * as Actions from '../actions';

const initialState = {
    userData: null,
    userTags: null,
    userQuestions: null
};

const userProfile = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_USER: {
            return {
                ...state,
                userData: action.payload
            };
        }
        case Actions.GET_USER_TAGS: {
            return {
                ...state,
                userTags: action.payload
            };
        }
        case Actions.GET_USER_QUESTIONS: {
            return {
                ...state,
                userQuestions: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default userProfile;