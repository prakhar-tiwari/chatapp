import axios from 'axios';
import { GET_MESSAGES, CLEAR_CHAT, SEND_MESSAGE } from './types';

export const getMessages = (userId, guestId) => dispatch => {
    axios
        .post("/getmessages", {
            userId: userId,
            guestId: guestId
        })
        .then(result => {
            dispatch({
                type: GET_MESSAGES,
                payload: result.data
            })
        })
        .catch(err => {
            console.log(err);
        });
}

export const sendMessage = (messageInfo) => dispatch => {
    axios
        .post("/sendmessage", messageInfo)
        .then(result => {
            
        })
        .catch(err => {
            console.log(err);
        });
}


export const getAllMessages = (messages) => dispatch => {
    dispatch({
        type: GET_MESSAGES,
        payload: messages
    })
}

export const clearChat = () => dispatch => {
    dispatch({
        type: CLEAR_CHAT,
        payload: []
    })
}