import axios from "axios";
import jwtDecode from "jwt-decode";
import {SET_CURRENT_USER,GET_USERS} from './types';

export const getUsers=()=>dispatch=>{
  axios.get("/getusers")
  .then(result=>{
    dispatch({
      type:GET_USERS,
      payload:result.data
    })
  })
  .catch(err=>{
    console.log(err);
  })
}

export const login = (user,props) => dispatch=> {
  axios
    .post("/login", user)
    .then(result => {
      const { token } = result.data;
      localStorage.setItem('token',token);
      const decodedToken = jwtDecode(token);
      dispatch(setCurrentUser(decodedToken));
      props.history.push('/');
    })
    .catch(err => {
      console.log(err);
    });
};

export const setCurrentUser = (decodedToken) => {
    return{
      type:SET_CURRENT_USER,
      payload:decodedToken
    }
};

export const logout=(props)=>dispatch=>{
  localStorage.removeItem('token');
  dispatch(setCurrentUser({}));
}
