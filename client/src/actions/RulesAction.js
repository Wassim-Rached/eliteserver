import { GET_ALL_RULES_FAIL, GET_ALL_RULES_REQUEST, GET_ALL_RULES_SUCCESS, GET_RULE_FAIL, GET_RULE_REQUEST, GET_RULE_SUCCESS } from "../constants/RulesConstants";
import Axios from 'axios' 

export const GetAllRules = () => async (dispatch) => {
    dispatch({ type: GET_ALL_RULES_REQUEST });
    try {
      const { data } = await Axios.get('/rules');
      dispatch({ type: GET_ALL_RULES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_RULES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const GetRuleById = (ruleTitle) => async (dispatch) => {
    dispatch({ type: GET_RULE_REQUEST ,payload:ruleTitle});
    try {
      const { data } = await Axios.get('/rules/'+ruleTitle);
      dispatch({ type: GET_RULE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_RULE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
