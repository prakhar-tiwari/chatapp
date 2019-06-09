import {GET_MESSAGES,CLEAR_CHAT,SEND_MESSAGE} from '../actions/types';

const initialState={
    messages:[]
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_MESSAGES:
            return{
                messages:Object.assign(state.messages,action.payload)
            }


        case CLEAR_CHAT:
            return{
                messages:action.payload
            }

        default: return state
    }
}

export default authReducer;
