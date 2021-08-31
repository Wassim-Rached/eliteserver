import Axios from "axios";
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  USER_SIGNOUT,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GET_ROLE_USER_SUCCESS,
  GET_ROLE_USER_REQUEST,
  GET_ROLE_USER_FAIL,
} from "../constants/UserConstatns.js";

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post('/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      if(! data.message){
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        document.location.href = '/';
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post('/users/signin', { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      document.location.href = '/';
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/';
  };
  
  
  export const GetUserById = (UserId) => async (dispatch) => {
      dispatch({ type: GET_USER_REQUEST, payload: { UserId } });
      try {
        const { data } = await Axios.get('/users/profile/'+UserId);
        dispatch({ type: GET_USER_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_USER_FAIL,
          payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
            });
      }
    };
    
    export const DeleteUserById = (userId,config) => async (dispatch) => {
      dispatch({ type: DELETE_USER_REQUEST, payload: { userId,config } });
      try {
        const { data } = await Axios.post('/users/profile/delete/'+userId,"pp",config);
        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
        localStorage.removeItem('userInfo');
        // dispatch({ type: USER_SIGNOUT });
        document.location.href = '/';
      } catch (error) {
        dispatch({
          type: DELETE_USER_FAIL,
          payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    export const UpdateUserById = (formData,config) => async (dispatch,getState) => {
      dispatch({ type: UPDATE_USER_REQUEST, payload: { formData,config } });
      const {
        userSignin: { userInfo },
      } = getState();
      try {
        const { data } = await Axios.post('/users/profile/update',formData,config);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
        if(! data.message){
          localStorage.setItem('userInfo', JSON.stringify(data));
        }
      } catch (error) {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    export const GetRoleByCode = (code,config) => async (dispatch) => {
      dispatch({ type: GET_ROLE_USER_REQUEST, payload: { code,config } });
      try {
        const { data } = await Axios.post('/users/profile/getRole',code,config);
        dispatch({ type: GET_ROLE_USER_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_ROLE_USER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };