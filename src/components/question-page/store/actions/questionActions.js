import axios from '../../../../configs/axiosConfig';

export const GET_QUESTIONS = 'GET QUESTIONS';

export const getQuestions = () => {
    const request = axios.get('/2.2/questions/featured?site=stackoverflow');

    return dispatch =>
        request.then(response => {
            return dispatch({
                type: GET_QUESTIONS,
                payload: response.data
            });
        });
}