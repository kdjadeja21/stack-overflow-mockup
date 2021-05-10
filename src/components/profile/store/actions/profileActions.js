import axios from '../../../../configs/axiosConfig';

export const GET_USER = 'GET USER';
export const GET_USER_TAGS = 'GET USER TAGS';
export const GET_USER_QUESTIONS = 'GET USER QUESTIONS';

export const getUser = (params) => {
    const request = axios.get('/2.2/users/' + params.userId + '?site=stackoverflow');

    return dispatch =>
        request.then(response => {
            return dispatch({
                type: GET_USER,
                payload: response.data
            });
        });
}

export const getUserTags = (params) => {
    const request = axios.get('/2.2/users/' + params.userId + '/tags?site=stackoverflow');

    return dispatch =>
        request.then(response => {
            return dispatch({
                type: GET_USER_TAGS,
                payload: response.data
            });
        });
}

export const getUserQuestions = (params) => {
    const request = axios.get('/2.2/users/' + params.userId + '/questions?site=stackoverflow');

    return dispatch =>
        request.then(response => {
            return dispatch({
                type: GET_USER_QUESTIONS,
                payload: response.data
            });
        });
}