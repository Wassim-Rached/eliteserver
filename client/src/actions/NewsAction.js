import { ADD_NEW_NEWS_FAIL, ADD_NEW_NEWS_REQUEST, ADD_NEW_NEWS_SUCCESS, GET_ALL_NEWS_FAIL, GET_ALL_NEWS_REQUEST, GET_ALL_NEWS_SUCCESS, GET_POSTER_FAIL, GET_POSTER_REQUEST, GET_POSTER_SUCCESS } from "../constants/NewsConstants";
import Axios from 'axios' 

export const GetAllNews = (size) => async (dispatch) => {
    dispatch({ type: GET_ALL_NEWS_REQUEST,payload:{size} });
    try {
      const { data } = await Axios.get('/news/' + size);
      dispatch({ type: GET_ALL_NEWS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_NEWS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const GetPosterById = (UserId) => async (dispatch) => {
    dispatch({ type: GET_POSTER_REQUEST, payload: { UserId } });
    try {
      const { data } = await Axios.get('/users/profile/poster/'+UserId);
      dispatch({ type: GET_POSTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_POSTER_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          });
    }
  };

  export const AddNewNews = (formData,config) => async (dispatch) => {
    dispatch({ type: ADD_NEW_NEWS_REQUEST, payload: { formData,config } });
    try {
      const { data } = await Axios.post('/news/add',formData,config);
      dispatch({ type: ADD_NEW_NEWS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_NEW_NEWS_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          });
    }
  };