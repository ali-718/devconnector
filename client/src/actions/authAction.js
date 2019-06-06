import {GET_ERRORS,SET_CURRENT_USER} from './types'
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData,history) => dispatch => {
   axios.post('/api/users/register',userData).then(res => 
    {
        history.push('/login')
    }).catch(e => dispatch({
       type:GET_ERRORS,
       payload:e.response.data
   }))}

export const loginUser = (currentUser) => dispatch => {
       axios.post('/api/users/login',currentUser).then(res => {
           console.log(res);
           //destructuring
           const {token} = res.data;
           //set token to localstorage
           localStorage.setItem("jwtToken",token)
            //set token to header
            setAuthToken(token);
            //Decode Token
            const decode = jwt_decode(token);
            //dipatching current user
            dispatch({
                type:SET_CURRENT_USER,
                payload:decode
            })
       }).catch(e => dispatch({
           type:GET_ERRORS,
           payload:e.response.data
       }))
   }
