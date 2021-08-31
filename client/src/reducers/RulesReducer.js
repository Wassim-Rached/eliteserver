import { GET_ALL_RULES_FAIL, GET_ALL_RULES_REQUEST, GET_ALL_RULES_SUCCESS, GET_RULE_FAIL, GET_RULE_REQUEST, GET_RULE_SUCCESS } from "../constants/RulesConstants";

export const getAllRulesReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_RULES_REQUEST:
        return { loading: true };
      case GET_ALL_RULES_SUCCESS:
        return { loading: false, getRules: action.payload };
      case GET_ALL_RULES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const getRuleByIdReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_RULE_REQUEST:
        return { loading: true };
      case GET_RULE_SUCCESS:
        return { loading: false, getRule: action.payload };
      case GET_RULE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
