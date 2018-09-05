import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';

function getPostAPI(postId){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);

export const getPost = (postId) => dispatch => {
    // 먼저 요청이 시작되었다는 것을 알립니다.
    dispatch(getPostPending());

    // 요청을 시작합니다. 여기에서 만든 promose를 return 해야 나중에 컴포넌트에서
    // 호출 할 때 getPost().then(...)을 할수 있습니다.

    return getPostAPI(postId).then((response) => {
        // 요청이 성공했다면 서버 응답 내용을 payload로 설정하여
        // GET_POST_SUCCESS 액션을 디스패치합니다.
        dispatch(getPostSuccess(response));
        // 나중에 getPostAPI.then을 했을 때 then 에 전달하는
        // 함수에서 response에 접근 할 수 있게 합니다.
        return response;
    })
    .catch(error => {
        //오류가 발생하면 오류 내용을 payload로 설정하여
        // GET_POST_FAILURE 액션을 디스패치 합니다.
        dispatch(getPostFailure(error));
        // error를 throw 하여 이 함수를 실행 한 후
        // 다시한번 catch 할 수 있게 합니다.
        throw(error);
    })
}

const initialState = {
    pending : false,
    error : false,
    data : {
        title : '',
        body : ''
    }
}

export default handleActions({
    [GET_POST_PENDING] : (state, action) =>{
        return {
            ...state,
            pending : true,
            error : false,
        };
    },
    [GET_POST_SUCCESS] : (state, action) => {
        const {title, body} = action.payload.data;
        return {
            ...state,
            pending : false,
            data : {
                title,
                body
            }
        };
    },
    [GET_POST_FAILURE] : (state, action) => {
        return{
            ...state,
            pending : false,
            error : true
        };
    }
}, initialState);