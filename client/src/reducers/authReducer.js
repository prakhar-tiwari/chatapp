import {SET_CURRENT_USER,GET_USERS} from '../actions/types';

const initialState={
    isAuth:false,
    user:{},
    users:[]
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuth:!(Object.entries(action.payload).length === 0 && action.payload.constructor === Object),
                user:action.payload
            }

        case GET_USERS:
            return{
                ...state,
                users:Object.assign(state.users,action.payload)
            }

        default:
            return state
    }
}

export default authReducer;
