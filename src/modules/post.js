import { handleActions, createAction } from 'redux-actions';

import { pender } from 'redux-pender';

import axios from 'axios';

function getPostAPI(postId){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';
// const GET_POST_PENDING = 'GET_POST_PENDING';
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'GET_POST_FAILURE';

// const getPostPending = createAction(GET_POST_PENDING);
// const getPostSuccess = createAction(GET_POST_SUCCESS);
// const getPostFailure = createAction(GET_POST_FAILURE);

export const getPost = createAction(GET_POST, getPostAPI);

const initialState = {
    data : {
        title : '',
        body : ''
    }
}

export default handleActions({
    ...pender({
        type : GET_POST,
        onSuccess : (state, action) => {
            const {title, body} = action.payload.data;
            return {
                data : {
                    title,
                    body
                }
            }
        },
        onCancel : (state, action) => {
            return {
                data : {
                    title : '취소됨',
                    body : '취소됨'
                }
            }
        }
    })
}, initialState);