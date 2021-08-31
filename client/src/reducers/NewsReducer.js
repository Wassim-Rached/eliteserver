import { ADD_NEW_NEWS_FAIL, ADD_NEW_NEWS_REQUEST, ADD_NEW_NEWS_SUCCESS, GET_ALL_NEWS_FAIL, GET_ALL_NEWS_REQUEST, GET_ALL_NEWS_SUCCESS, GET_POSTER_FAIL, GET_POSTER_REQUEST, GET_POSTER_SUCCESS } from "../constants/NewsConstants";

export const getAllNewsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_NEWS_REQUEST:
        return { loading: true };
      case GET_ALL_NEWS_SUCCESS:
        return { loading: false, allNews: action.payload };
      case GET_ALL_NEWS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const getPosterReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_POSTER_REQUEST:
        return { loading: true };
      case GET_POSTER_SUCCESS:
        return { loading: false, getPoster: action.payload };
      case GET_POSTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const addNewNewsReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_NEW_NEWS_REQUEST:
        return { loading: true };
      case ADD_NEW_NEWS_SUCCESS:
        return { loading: false, newNews: action.payload };
      case ADD_NEW_NEWS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };