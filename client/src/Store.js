import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {userSigninReducer,getUserReducer, userRegisterReducer, deleteUserReducer, updateUserReducer, getRoleReducer} from './reducers/UserReducer'
import {addNewNewsReducer, getAllNewsReducer, getPosterReducer} from './reducers/NewsReducer'
import { getAllRulesReducer, getRuleByIdReducer } from './reducers/RulesReducer';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  }
};
const reducer = combineReducers({
  userSignin:userSigninReducer,
  userRegister:userRegisterReducer,
  GetUser:getUserReducer,
  updateUser:updateUserReducer,
  deleteUser:deleteUserReducer,
  getRole:getRoleReducer,
  getAllNews:getAllNewsReducer,
  getPoster:getPosterReducer,
  addnewNews:addNewNewsReducer,
  getAllRules:getAllRulesReducer,
  getRulebyId:getRuleByIdReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;